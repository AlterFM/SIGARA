<?php
// File: SIGARA/php/get_all_change_requests.php
session_start();
include 'db.php'; // Pastikan path ini benar

// Pastikan hanya admin yang bisa mengakses
if (!isset($_SESSION['role_user']) || $_SESSION['role_user'] !== 'Admin') {
    http_response_code(403); // Forbidden
    echo json_encode(['status' => 'error', 'message' => 'Akses ditolak.']);
    exit();
}

// Menonaktifkan tampilan error langsung di output (penting untuk API)
// Error akan tetap tercatat di php_error_log jika error_logging diaktifkan
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json');

$searchTerm = $_GET['search'] ?? '';
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

$conditions = [];
$params = [];
$types = '';

// Kolom yang bisa dicari
$searchable_columns = ['tanggal', 'nama', 'dosen_pengampu', 'mata_kuliah', 'kelas', 'ruang', 'waktu', 'alasan', 'status'];

if (!empty($searchTerm)) {
    $search_clauses = [];
    foreach ($searchable_columns as $col) {
        $search_clauses[] = "$col LIKE ?";
        $params[] = '%' . $searchTerm . '%';
        $types .= 's';
    }
    $conditions[] = "(" . implode(" OR ", $search_clauses) . ")";
}

// Query untuk menghitung total item (untuk paginasi)
$sql_count = "SELECT COUNT(*) AS total FROM form_ganti_ruang";
if (!empty($conditions)) {
    $sql_count .= " WHERE " . implode(" AND ", $conditions);
}

$stmt_count = $conn->prepare($sql_count);
if (!empty($conditions)) {
    // Siapkan array referensi untuk bind_param
    $refs_count = [];
    foreach ($params as $key => $value) {
        $refs_count[$key] = &$params[$key]; // Buat referensi ke setiap nilai
    }
    call_user_func_array([$stmt_count, 'bind_param'], array_merge([$types], $refs_count));
}
$stmt_count->execute();
$count_result = $stmt_count->get_result()->fetch_assoc();
$total_items = $count_result['total'];
$stmt_count->close();

// Query untuk mengambil data form ganti ruang
$sql = "SELECT id, tanggal, nama, dosen_pengampu, mata_kuliah, kelas, ruang, waktu, alasan, status FROM form_ganti_ruang";
if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}
$sql .= " ORDER BY tanggal DESC, id DESC LIMIT ? OFFSET ?"; // Urutkan berdasarkan tanggal terbaru dan ID

$params_for_data = $params; // Salin parameter pencarian
$params_for_data[] = $limit;
$params_for_data[] = $offset;
$types_for_data = $types . 'ii'; // Tambahkan tipe untuk limit dan offset

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("SQL Prepare Failed (get_all_change_requests): " . $conn->error);
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyiapkan query data formulir.']);
    exit();
}
// Siapkan array referensi untuk bind_param (ini adalah perbaikan utamanya)
$refs_data = [];
foreach ($params_for_data as $key => $value) {
    $refs_data[$key] = &$params_for_data[$key]; // Buat referensi ke setiap nilai
}
call_user_func_array([$stmt, 'bind_param'], array_merge([$types_for_data], $refs_data));

$stmt->execute();
$result = $stmt->get_result();

$requests = [];
while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

echo json_encode([
    'status' => 'success',
    'requests' => $requests,
    'totalItems' => $total_items,
    'currentPage' => $page,
    'itemsPerPage' => $limit
]);

$stmt->close();
$conn->close();
?>