<?php
// File: SIGARA/php/get_schedules.php

include 'db.php'; 

header('Content-Type: application/json');

$searchTerm = $_GET['search'] ?? '';
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
$offset = ($page - 1) * $limit;

$conditions = [];
$params = [];
$types = '';

// Kolom yang akan dicari
// Pastikan nama kolom sesuai dengan tabel 'jadwal' Anda
$searchable_columns = ['kelas', 'hari', 'mata_kuliah', 'ruang', 'nama_dosen'];

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
$sql_count = "SELECT COUNT(*) AS total FROM jadwal"; // Sesuaikan dengan nama tabel Anda 'jadwal'
if (!empty($conditions)) {
    $sql_count .= " WHERE " . implode(" AND ", $conditions);
}

$stmt_count = $conn->prepare($sql_count);
if (!empty($conditions)) {
    $stmt_count->bind_param($types, ...$params);
}
$stmt_count->execute();
$count_result = $stmt_count->get_result()->fetch_assoc();
$total_items = $count_result['total'];
$stmt_count->close();

// Query untuk mengambil data jadwal dengan paginasi dan pencarian
// Pastikan nama kolom sesuai dengan tabel 'jadwal' Anda: id_jadwal, kelas, hari, mata_kuliah, waktu, ruang, nama_dosen
$sql = "SELECT id_jadwal, kelas, hari, mata_kuliah, waktu, ruang, nama_dosen FROM jadwal"; // Sesuaikan nama tabel 'jadwal'
if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}
$sql .= " LIMIT ? OFFSET ?";

// Tambahkan tipe untuk LIMIT dan OFFSET
$params_for_data = $params; // Duplikasi params karena count dan data menggunakan params yang sama di bagian conditions
$params_for_data[] = $limit;
$params_for_data[] = $offset;
$types_for_data = $types . 'ii'; // Tambahkan 'ii' untuk integer (limit, offset)

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement: ' . $conn->error]);
    exit();
}
$stmt->bind_param($types_for_data, ...$params_for_data);
$stmt->execute();
$result = $stmt->get_result();

$schedules = [];
while ($row = $result->fetch_assoc()) {
    $schedules[] = $row;
}

echo json_encode([
    'status' => 'success',
    'schedules' => $schedules,
    'totalItems' => $total_items,
    'currentPage' => $page,
    'itemsPerPage' => $limit
]);

$stmt->close();
$conn->close();
?>