<?php
// config/db.php
// ─────────────────────────────────────────────────────────────
// Place this file at:  C:/xampp/htdocs/ren-ren-works/config/db.php
// ─────────────────────────────────────────────────────────────

$host     = 'localhost';
$dbname   = 'ren-ren works tailoring';  // your exact DB name from phpMyAdmin
$username = 'root';
$password = '';                          // blank by default in XAMPP

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}