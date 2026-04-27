<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$dbname = 'ren-ren works tailoring';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Handle GET request to fetch products
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT product_id as id, product_name as name, price, description FROM products WHERE status = 'active' LIMIT 8");
    
    if (!$result) {
        echo json_encode(['success' => false, 'error' => 'Query failed: ' . $conn->error]);
        $conn->close();
        exit;
    }
    
    $products = [];
    while($row = $result->fetch_assoc()) {
        $products[] = [
            'id' => (string)$row['id'],
            'name' => $row['name'],
            'price' => (float)($row['price'] ?? 0),
            'description' => $row['description'] ?: 'Premium quality tailoring product'
        ];
    }
    
    echo json_encode(['success' => true, 'products' => $products]);
    $conn->close();
    exit;
}

// Handle POST request to create order
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['items']) || empty($input['items'])) {
        echo json_encode(['success' => false, 'error' => 'No items in order']);
        $conn->close();
        exit;
    }
    
    $items = $input['items'];
    $total = (float)$input['total'];
    $paymentMethod = $input['payment_method'] ?? 'Card';
    $customerId = $input['customer_id'] ?? null;
    
    // Generate order number
    $orderNumber = 'ORD-' . date('Ymd') . '-' . rand(100, 999);
    
    // Start transaction
    $conn->begin_transaction();
    
    try {
        // 1. Insert into sales table
        $stmt = $conn->prepare("INSERT INTO sales (order_number, customer_id, total_amount, sale_date, status, created_at) VALUES (?, ?, ?, NOW(), 'Completed', NOW())");
        $stmt->bind_param("sid", $orderNumber, $customerId, $total);
        $stmt->execute();
        $saleId = $conn->insert_id;
        
        // 2. Insert into sale_items table
        $itemStmt = $conn->prepare("INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)");
        
        foreach ($items as $item) {
            $productId = (int)$item['id'];
            $quantity = (int)$item['quantity'];
            $price = (float)$item['price'];
            $subtotal = $price * $quantity;
            
            $itemStmt->bind_param("iiidd", $saleId, $productId, $quantity, $price, $subtotal);
            $itemStmt->execute();
        }
        
        // 3. Insert into payments table (Revenue)
        $paymentStmt = $conn->prepare("INSERT INTO payments (sale_id, payment_method, amount, payment_type, payment_status, payment_date) VALUES (?, ?, ?, 'Revenue', 'Paid', NOW())");
        $paymentStmt->bind_param("isd", $saleId, $paymentMethod, $total);
        $paymentStmt->execute();
        
        // 4. Create cart record (optional - for tracking)
        $cartStmt = $conn->prepare("INSERT INTO carts (customer_id, created_at) VALUES (?, NOW())");
        $cartStmt->bind_param("i", $customerId);
        $cartStmt->execute();
        $cartId = $conn->insert_id;
        
        // 5. Insert cart items
        $cartItemStmt = $conn->prepare("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)");
        foreach ($items as $item) {
            $productId = (int)$item['id'];
            $quantity = (int)$item['quantity'];
            $cartItemStmt->bind_param("iii", $cartId, $productId, $quantity);
            $cartItemStmt->execute();
        }
        
        // Commit transaction
        $conn->commit();
        
        echo json_encode([
            'success' => true,
            'order_number' => $orderNumber,
            'sale_id' => $saleId,
            'cart_id' => $cartId,
            'message' => 'Order created successfully'
        ]);
        
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    
    $conn->close();
    exit;
}
?>