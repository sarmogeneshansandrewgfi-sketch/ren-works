<?php
// C:/xampp/htdocs/ren-ren-works/api/save_reservation.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if (session_status() === PHP_SESSION_NONE) session_start();
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { echo json_encode(['success'=>false,'error'=>'POST required']); exit; }

$body = json_decode(file_get_contents('php://input'), true);

foreach (['fullName','email','phone','appointmentDate','appointmentTime','clothingType','fabric'] as $f) {
    if (empty($body[$f])) { echo json_encode(['success'=>false,'error'=>"Missing: $f"]); exit; }
}

$customer_id = $_SESSION['user_id'] ?? 1;
$timeObj     = DateTime::createFromFormat('h:i A', trim($body['appointmentTime']));
$timeSql     = $timeObj ? $timeObj->format('H:i:s') : '09:00:00';

try {
    $pdo->prepare("
        INSERT INTO reservations (customer_id,reservation_date,appointment_date,appointment_time,clothing_type,fabric_type,special_requests,status,total_price,created_at)
        VALUES (?,CURDATE(),?,?,?,?,?,'pending',0.00,NOW())
    ")->execute([$customer_id, $body['appointmentDate'], $timeSql, $body['clothingType'], $body['fabric'], $body['specialRequests'] ?? null]);

    echo json_encode(['success'=>true, 'reservation_id'=>(int)$pdo->lastInsertId(), 'message'=>'Reservation confirmed!']);
} catch (Exception $e) {
    echo json_encode(['success'=>false, 'error'=>$e->getMessage()]);
}