<?php
// File: SIGARA/php/update_schedule.php
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
    $id = $_POST['id'] ?? null; // ID jadwal yang akan diupdate (dari JS)
    $kelas = $_POST['kelas'] ?? '';
    $hari = $_POST['hari'] ?? '';
    $mata_kuliah = $_POST['mataKuliah'] ?? ''; // Nama dari JS
    $waktu = $_POST['waktu'] ?? '';
    $ruang = $_POST['ruang'] ?? '';
    $nama_dosen = $_POST['dosen'] ?? ''; // Nama dari JS (dosen -> nama_dosen di DB)

    if (empty($id) || empty($kelas) || empty($hari) || empty($mata_kuliah) || empty($waktu) || empty($ruang) || empty($nama_dosen)) {
        echo json_encode(['status' => 'error', 'message' => 'Semua kolom wajib diisi dan ID jadwal harus ada.']);
        exit();
    }

    // Pastikan nama kolom sesuai dengan tabel `jadwal` Anda (id_jadwal)
    $stmt = $conn->prepare("UPDATE jadwal SET kelas=?, hari=?, mata_kuliah=?, waktu=?, ruang=?, nama_dosen=?, updated_at = CURRENT_TIMESTAMP WHERE id_jadwal = ?");
    // ssssssi -> 6 string + 1 integer untuk id_jadwal
    $stmt->bind_param("ssssssi", $kelas, $hari, $mata_kuliah, $waktu, $ruang, $nama_dosen, $id);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Jadwal berhasil diperbarui.']);
        } else {
            echo json_encode(['status' => 'info', 'message' => 'Tidak ada perubahan pada jadwal atau ID jadwal tidak ditemukan.']);
        }
    } else {
        error_log("Error updating schedule: " . $stmt->error);
        echo json_encode(['status' => 'error', 'message' => 'Gagal memperbarui jadwal: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Metode request tidak diizinkan.']);
}
?>