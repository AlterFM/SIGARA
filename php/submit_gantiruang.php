<?php
include 'db.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tanggal = $_POST['tanggal'];
    $nama = $_POST['nama'];
    $dosen = $_POST['dosen'];
    $matakuliah = $_POST['matakuliah'];
    $kelas = $_POST['kelas'];
    $ruang = $_POST['ruang'];
    $waktu = $_POST['waktu'];
    $alasan = $_POST['alasan'];

    $stmt = $conn->prepare("INSERT INTO form_ganti_ruang (tanggal, nama, dosen_pengampu, mata_kuliah, kelas, ruang, waktu, alasan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $tanggal, $nama, $dosen, $matakuliah, $kelas, $ruang, $waktu, $alasan);
    $stmt->execute();

    header("Location: ../pages/gantiruang.php?success=1");
    exit;
}
?>
