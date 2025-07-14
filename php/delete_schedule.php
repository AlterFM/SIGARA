<?php
// File: SIGARA/php/delete_schedule.php
session_start();
include 'db.php'; // Pastikan path ini benar
header('Content-Type: application/json');

// Pastikan hanya admin yang bisa mengakses
if (!isset($_SESSION['role_user']) || $_SESSION['role_user'] !== 'Admin') {
    http_response_code(403); // Forbidden
    echo json_encode(['status' => 'error', 'message' => 'Akses ditolak.']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null; // ID jadwal yang akan dihapus (dari JS)

    if (empty($id)) {
        echo json_encode(['status' => 'error', 'message' => 'ID jadwal tidak boleh kosong.']);
        exit();
    }

    // Pastikan nama kolom ID sesuai dengan tabel `jadwal` Anda (id_jadwal)
    $stmt = $conn->prepare("DELETE FROM jadwal WHERE id_jadwal = ?");
    $stmt->bind_param("i", $id); // i untuk integer id_jadwal

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Jadwal berhasil dihapus.']);
        } else {
            echo json_encode(['status' => 'info', 'message' => 'Jadwal dengan ID tersebut tidak ditemukan.']);
        }
    } else {
        error_log("Error deleting schedule: " . $stmt->error);
        echo json_encode(['status' => 'error', 'message' => 'Gagal menghapus jadwal: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Metode request tidak diizinkan.']);
}
?>