<?php
session_start();
include 'db.php';

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$username = $_SESSION['username'];

$stmt = $conn->prepare("SELECT * FROM form_ganti_ruang WHERE nama = ? ORDER BY id DESC");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$forms = [];
while ($row = $result->fetch_assoc()) {
    $forms[] = $row;
}

header('Content-Type: application/json');
echo json_encode($forms);
?>
