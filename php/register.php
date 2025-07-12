<?php
// File: SIGARA/php/register.php

// Koneksi ke database
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'sigara_db';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Koneksi database gagal']));
}

// Ambil data dari form POST
$nama = $_POST['nama'] ?? '';
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$no_telp = $_POST['no_telp'] ?? '';
$role = $_POST['user_type'] ?? '';

// Validasi sederhana
if (!$nama || !$username || !$password || !$role) {
    echo json_encode(['status' => 'error', 'message' => 'Semua kolom wajib diisi.']);
    exit;
}

// Set default status sebagai Non-Aktif (admin yang aktifkan)
$status = 'Aktif';

// Query insert tanpa hash
$stmt = $conn->prepare("INSERT INTO user (nama_user, username, password, role_user, status_user, nomor_telpon_user) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $nama, $username, $password, $role, $status, $no_telp);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Registrasi berhasil! Tunggu aktivasi admin.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal menyimpan data. Username mungkin sudah terdaftar.']);
}

$stmt->close();
$conn->close();
?>
