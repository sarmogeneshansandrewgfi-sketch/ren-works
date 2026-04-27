<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$dbname = 'ren-ren works tailoring';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

// 1. TODAY'S SALES
$today = date('Y-m-d');
$result = $conn->query("SELECT COALESCE(SUM(total_amount), 0) as total FROM sales WHERE DATE(sale_date) = '$today'");
$row = $result->fetch_assoc();
$todaysSales = (float)$row['total'];

// 2. PENDING ORDERS
$result = $conn->query("SELECT COUNT(*) as count FROM sales WHERE LOWER(status) = 'pending'");
$row = $result->fetch_assoc();
$pendingOrders = (int)$row['count'];

// 3. MONTHLY TARGET (April 2026)
$result = $conn->query("SELECT COALESCE(SUM(total_amount), 0) as total FROM sales WHERE YEAR(sale_date) = 2026 AND MONTH(sale_date) = 4");
$row = $result->fetch_assoc();
$monthlyCurrent = (float)$row['total'];
$monthlyTotal = 18000;
$targetPercentage = $monthlyTotal > 0 ? round(($monthlyCurrent / $monthlyTotal) * 100) : 0;

// 4. PURCHASE FREQUENCY DATA
$frequencyData = [];

$freqQuery = "SELECT 
    CASE 
        WHEN purchase_count = 1 THEN 'First-time Buyers'
        WHEN purchase_count BETWEEN 2 AND 3 THEN '2-3 Purchases'
        WHEN purchase_count BETWEEN 4 AND 6 THEN '4-6 Purchases'
        WHEN purchase_count BETWEEN 7 AND 10 THEN '7-10 Purchases'
        WHEN purchase_count > 10 THEN '10+ Purchases'
    END as segment,
    COUNT(*) as customers
FROM (
    SELECT customer_id, COUNT(*) as purchase_count 
    FROM sales 
    WHERE customer_id IS NOT NULL AND customer_id > 0 
    GROUP BY customer_id
) as pc
WHERE customer_id IS NOT NULL
GROUP BY segment";

$freqResult = $conn->query($freqQuery);
$colors = ['#fde68a', '#fcd34d', '#fbbf24', '#fb923c', '#f59e0b'];
$index = 0;

if ($freqResult && $freqResult->num_rows > 0) {
    while($row = $freqResult->fetch_assoc()) {
        if ($row['segment']) {
            $frequencyData[] = [
                'segment' => $row['segment'],
                'purchases' => (int)$row['customers'],
                'color' => $colors[$index % count($colors)]
            ];
            $index++;
        }
    }
}

// If no data, show empty array
if (empty($frequencyData)) {
    $frequencyData = [
        ['segment' => 'First-time Buyers', 'purchases' => 0, 'color' => '#fde68a'],
        ['segment' => '2-3 Purchases', 'purchases' => 0, 'color' => '#fcd34d'],
        ['segment' => '4-6 Purchases', 'purchases' => 0, 'color' => '#fbbf24'],
        ['segment' => '7-10 Purchases', 'purchases' => 0, 'color' => '#fb923c'],
        ['segment' => '10+ Purchases', 'purchases' => 0, 'color' => '#f59e0b']
    ];
}

// 5. ORDERS LIST
$orders = [];

$ordersQuery = "SELECT 
    s.sale_id, 
    COALESCE(c.first_name, 'Guest') as first_name,
    COALESCE(c.last_name, '') as last_name,
    s.total_amount, 
    DATE(s.sale_date) as sale_date, 
    COALESCE(s.status, 'Pending') as status
FROM sales s 
LEFT JOIN customers c ON s.customer_id = c.customer_id 
ORDER BY s.sale_date DESC 
LIMIT 20";

$ordersResult = $conn->query($ordersQuery);

if ($ordersResult && $ordersResult->num_rows > 0) {
    while($row = $ordersResult->fetch_assoc()) {
        // Build customer name
        $firstName = $row['first_name'] ?? 'Guest';
        $lastName = $row['last_name'] ?? '';
        $fullName = $firstName;
        if ($lastName && $lastName != '') {
            $fullName .= ' ' . $lastName;
        }
        if ($fullName == 'Guest' || $fullName == 'Guest ') {
            $fullName = 'Guest Customer';
        }
        
        // Get initials
        $initial = 'G';
        if ($firstName && $firstName != 'Guest') {
            $initial = strtoupper(substr($firstName, 0, 1));
            if ($lastName && $lastName != '') {
                $initial .= strtoupper(substr($lastName, 0, 1));
            }
        }
        
        // Get items for this order
        $items = 'View Details';
        $itemsQuery = "SELECT GROUP_CONCAT(DISTINCT p.product_name SEPARATOR ', ') as product_list 
                       FROM sale_items si 
                       JOIN products p ON si.product_id = p.product_id 
                       WHERE si.sale_id = " . $row['sale_id'];
        $itemsResult = $conn->query($itemsQuery);
        if ($itemsResult && $itemsResult->num_rows > 0) {
            $itemsRow = $itemsResult->fetch_assoc();
            if ($itemsRow['product_list']) {
                $items = $itemsRow['product_list'];
            }
        }
        
        $orders[] = [
            'id' => 'ORD-' . str_pad($row['sale_id'], 3, '0', STR_PAD_LEFT),
            'customer' => [
                'name' => $fullName,
                'initial' => $initial
            ],
            'items' => $items,
            'amount' => (float)$row['total_amount'],
            'date' => $row['sale_date'],
            'status' => ucfirst(strtolower($row['status']))
        ];
    }
}

// Build the final response
$response = [
    'success' => true,
    'todaysSales' => $todaysSales,
    'pendingOrders' => $pendingOrders,
    'monthlyCurrent' => $monthlyCurrent,
    'monthlyTotal' => $monthlyTotal,
    'targetPercentage' => $targetPercentage,
    'purchaseFrequencyData' => $frequencyData,
    'orders' => $orders
];

// Return clean JSON
echo json_encode($response, JSON_PRETTY_PRINT);

$conn->close();
?>