<?php
// File: SIGARA/php/update_change_request_status.php
session_start();
include 'db.php'; // Pastikan path ini benar

// Menonaktifkan tampilan error langsung di output (SANGAT PENTING untuk API)
// Error akan tetap tercatat di php_error_log jika error_logging diaktifkan di php.ini
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL); // Aktifkan semua error reporting ke log

header('Content-Type: application/json');

// Pastikan hanya admin yang bisa mengakses
if (!isset($_SESSION['role_user']) || $_SESSION['role_user'] !== 'Admin') {
    http_response_code(403); // Forbidden
    echo json_encode(['status' => 'error', 'message' => 'Akses ditolak. Anda bukan admin.']); // Pesan lebih spesifik
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;
    $status = $_POST['status'] ?? null;

    // Validasi input
    if ($id === null || $status === null) { // Gunakan === null untuk cek keberadaan
        echo json_encode(['status' => 'error', 'message' => 'ID atau Status tidak boleh kosong.']);
        exit();
    }

    // Pastikan ID adalah integer
    $id = (int)$id; 
    
    // Validasi status yang diterima (hanya izinkan nilai yang valid sesuai ENUM di DB)
    $valid_statuses = ['Diproses', 'Disetujui', 'Ditolak'];
    if (!in_array($status, $valid_statuses)) {
        echo json_encode(['status' => 'error', 'message' => 'Status yang diberikan tidak valid.']);
        exit();
    }

    try {
        // Siapkan query UPDATE
        $sql_update = "UPDATE form_ganti_ruang SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        $stmt = $conn->prepare($sql_update);
        
        if ($stmt === false) {
            error_log("Prepare statement failed in update_change_request_status.php: " . $conn->error);
            throw new Exception("Gagal menyiapkan statement database.");
        }

        // Bind parameter. Variabel langsung dilewatkan ke bind_param, jadi tidak perlu & atau call_user_func_array
        $stmt->bind_param("si", $status, $id); // s untuk status (string), i untuk id (integer)

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(['status' => 'success', 'message' => 'Status formulir berhasil diperbarui.']);
            } else {
                // affected_rows 0 bisa berarti ID tidak ditemukan atau status tidak berubah
                echo json_encode(['status' => 'info', 'message' => 'Tidak ada perubahan pada status formulir atau ID tidak ditemukan.']);
            }
        } else {
            error_log("Execute statement failed in update_change_request_status.php: " . $stmt->error);
            throw new Exception("Gagal mengeksekusi update database.");
        }

        $stmt->close();
        $conn->close();

    } catch (Exception $e) {
        error_log("Exception in update_change_request_status.php: " . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan server: ' . $e->getMessage()]);
    }

} else {
    // Jika bukan metode POST
    echo json_encode(['status' => 'error', 'message' => 'Metode request tidak diizinkan.']);
}
?>