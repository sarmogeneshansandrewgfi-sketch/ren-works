<?php
header('Access-Control-Allow-Origin: http://localhost:5178');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$dbname = 'ren-ren works tailoring';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $stmt = $pdo->query("SELECT product_id as id, product_name as name, COALESCE(price, 0) as price FROM products WHERE status = 'active'");
    $products = $stmt->fetchAll();
    echo json_encode(['success' => true, 'products' => $products]);
} catch(Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>