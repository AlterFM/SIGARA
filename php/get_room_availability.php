<?php
// File: SIGARA/php/get_room_availability.php

include 'db.php';
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$gedung = $_GET['gedung'] ?? '1';
$lantai = $_GET['lantai'] ?? '1';
$hari = $_GET['hari'] ?? 'Senin';

$jam_slots = [
    'Jam-1', 'Jam-2', 'Jam-3', 'Jam-4', 'Jam-5',
    'Jam-6', 'Jam-7', 'Jam-8', 'Jam-9', 'Jam-10'
];

function getAffectedTimeSlotIndices($waktu_string, $total_slots) {
    $affected = [];
    $jam_array = explode('/', trim($waktu_string));
    foreach ($jam_array as $jam) {
        $jam = (int)trim($jam);
        if ($jam >= 1 && $jam <= $total_slots) {
            $affected[] = $jam - 1;
        }
    }
    return array_unique($affected);
}

$room_availability_data = [];

try {
    // Ambil ruangan
    $stmt = $conn->prepare("SELECT nama_ruang FROM data_ruangan WHERE gedung = ? AND lantai = ?");
    $stmt->bind_param("si", $gedung, $lantai);
    $stmt->execute();
    $result = $stmt->get_result();

    $rooms = [];
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row['nama_ruang'];
    }
    $stmt->close();

    if (empty($rooms)) {
        echo json_encode(['status' => 'success', 'roomData' => []]);
        exit;
    }

    // Inisialisasi slot jam semua ruangan sebagai 'Kosong'
    foreach ($rooms as $room_name) {
        $room_availability_data[$room_name] = array_fill(0, count($jam_slots), 'Kosong');
    }

    // Ambil jadwal sesuai ruangan dan hari
    $placeholders = implode(',', array_fill(0, count($rooms), '?'));
    $query = "SELECT ruang, waktu, kelas FROM jadwal WHERE hari = ? AND ruang IN ($placeholders)";
    $stmt = $conn->prepare($query);

    // Siapkan parameter
    $types = 's' . str_repeat('s', count($rooms)); // satu untuk hari, sisanya untuk ruang
    $params = array_merge([$hari], $rooms);
    $refs = [];
    foreach ($params as $key => $value) {
        $refs[$key] = &$params[$key];
    }

    call_user_func_array([$stmt, 'bind_param'], array_merge([$types], $refs));
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $ruang = $row['ruang'];
        $waktu = $row['waktu'];
        $kelas = $row['kelas'];

        if (!isset($room_availability_data[$ruang])) continue;

        $indices = getAffectedTimeSlotIndices($waktu, count($jam_slots));
        foreach ($indices as $i) {
            $room_availability_data[$ruang][$i] = [
                'status' => 'Isi',
                'kelas' => $kelas
            ];
        }
    }

    $stmt->close();

    ksort($room_availability_data);

    echo json_encode([
        'status' => 'success',
        'roomData' => $room_availability_data
    ]);

} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Gagal memuat data ruangan: ' . $e->getMessage()]);
} finally {
    $conn->close();
}
