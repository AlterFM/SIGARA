<?php
// File: SIGARA/php/get_room_availability.php

include 'db.php'; // Pastikan path ke db.php benar
header('Content-Type: application/json');

// --- Tampilkan error saat debugging ---
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// --- Ambil Parameter dari URL ---
$gedung = $_GET['gedung'] ?? '1';
$lantai = $_GET['lantai'] ?? '1';
$hari = $_GET['hari'] ?? 'Senin'; // Tambahan filter hari

// --- Definisi Slot Jam ---
$jam_slots = [
    'Jam-1', 'Jam-2', 'Jam-3', 'Jam-4', 'Jam-5',
    'Jam-6', 'Jam-7', 'Jam-8', 'Jam-9', 'Jam-10'
];

// --- Fungsi bantu untuk mapping waktu DB ke indeks jam slot ---
function getAffectedTimeSlotIndices($waktu_string, $total_slots) {
    $affected = [];
    $jam_array = explode('/', trim($waktu_string));
    foreach ($jam_array as $jam) {
        $jam = (int)trim($jam);
        if ($jam >= 1 && $jam <= $total_slots) {
            $affected[] = $jam - 1; // ubah jadi indeks array
        }
    }
    return array_unique($affected);
}

$room_availability_data = [];

try {
    // --- 1. Ambil daftar ruangan dari data_ruangan ---
    $stmt = $conn->prepare("SELECT nama_ruang FROM data_ruangan WHERE gedung = ? AND lantai = ?");
    $stmt->bind_param("si", $gedung, $lantai);
    $stmt->execute();
    $result = $stmt->get_result();

    $rooms = [];
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row['nama_ruang'];
    }
    $stmt->close();

    // Jika tidak ada ruangan ditemukan
    if (empty($rooms)) {
        echo json_encode(['status' => 'success', 'roomData' => []]);
        exit;
    }

    // --- 2. Inisialisasi semua slot ruangan sebagai 'Kosong' ---
    foreach ($rooms as $room_name) {
        $room_availability_data[$room_name] = array_fill(0, count($jam_slots), 'Kosong');
    }

    // --- 3. Ambil jadwal berdasarkan ruangan & hari ---
    $placeholders = implode(',', array_fill(0, count($rooms), '?'));
    $query = "SELECT ruang, waktu FROM jadwal WHERE ruang IN ($placeholders) AND hari = ?";

    $stmt = $conn->prepare($query);

    // --- Bind Parameter Dinamis ---
    $types = str_repeat('s', count($rooms)) . 's'; // ruangan + hari
    $params = array_merge($rooms, [$hari]);

    $bind_names[] = $types;
    foreach ($params as $key => $value) {
        $bind_names[] = &$params[$key]; // gunakan referensi
    }

    call_user_func_array([$stmt, 'bind_param'], $bind_names);

    $stmt->execute();
    $result = $stmt->get_result();

    // --- 4. Tandai slot ruangan sebagai 'Isi' berdasarkan jadwal ---
    while ($row = $result->fetch_assoc()) {
        $ruang = $row['ruang'];
        $waktu = $row['waktu'];

        if (!isset($room_availability_data[$ruang])) continue;

        $indices = getAffectedTimeSlotIndices($waktu, count($jam_slots));
        foreach ($indices as $i) {
            $room_availability_data[$ruang][$i] = 'Isi';
        }
    }

    $stmt->close();

    // --- 5. Kembalikan data JSON ke frontend ---
    ksort($room_availability_data); // urutkan ruangan
    echo json_encode(['status' => 'success', 'roomData' => $room_availability_data]);

} catch (Exception $e) {
    error_log("Error in get_room_availability.php: " . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'Terjadi kesalahan saat memuat data ruangan: ' . $e->getMessage()
    ]);
} finally {
    $conn->close();
}
