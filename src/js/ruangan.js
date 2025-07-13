// File: src/js/ruangan.js

// --- 1. State Aplikasi (Gedung, Lantai yang sedang aktif) ---
let currentGedung = '1'; // Default
let currentLantai = '1'; // Default
let currentHari = 'Senin'; // Default awal


// --- 2. Referensi ke Elemen DOM ---
const gedungButtonsContainer = document.getElementById('gedung-buttons');
const lantaiButtonsContainer = document.getElementById('lantai-buttons');
const roomScheduleBody = document.getElementById('room-schedule-body');
const hariSelect = document.getElementById('hari-select');


// --- 3. Fungsi Utama untuk Fetch dan Merender Tabel Ruangan ---
async function fetchAndRenderRoomSchedule() {
    roomScheduleBody.innerHTML = ''; // Kosongkan isi tabel sebelumnya

    // Membangun URL untuk request API, tanpa parameter tanggal dan hari
    const url = `/SIGARA/php/get_room_availability.php?gedung=${currentGedung}&lantai=${currentLantai}&hari=${currentHari}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.status === 'error') {
            console.error("Error fetching room availability:", data.message);
            roomScheduleBody.innerHTML = `<div class="p-4 text-center text-red-600">Gagal memuat ketersediaan ruangan: ${data.message}</div>`;
            return;
        }

        const roomAvailabilityData = data.roomData; // Ini adalah objek `roomData` dari backend

        if (Object.keys(roomAvailabilityData).length === 0) {
            roomScheduleBody.innerHTML = `<div class="p-4 text-center text-gray-600">Tidak ada ruangan terdaftar untuk Gedung ${currentGedung} Lantai ${currentLantai}.</div>`;
            return;
        }

        // Iterasi melalui setiap ruangan yang diterima dari backend
        for (const roomNumber in roomAvailabilityData) {
            const scheduleStatuses = roomAvailabilityData[roomNumber]; // Array status 'Isi'/'Kosong'
            const row = document.createElement('div');
            // Pastikan ini match dengan grid-cols di HTML (1 R/W + 10 Jam = grid-cols-11)
            row.className = 'grid grid-cols-11 text-center text-sm border-b border-gray-200 last:border-b-0';

            // Kolom Nama Ruangan
            const roomNameCell = document.createElement('div');
            roomNameCell.className = 'p-3 border-r border-gray-200 font-medium text-gray-800 bg-gray-50';
            roomNameCell.textContent = roomNumber;
            row.appendChild(roomNameCell);

            // Kolom Status Jam
            scheduleStatuses.forEach(status => {
                const statusCell = document.createElement('div');
                statusCell.className = 'p-3 border-r border-gray-200';
                if (status === 'Kosong') {
                    statusCell.classList.add('bg-green-100', 'text-green-700', 'font-semibold'); // Warna hijau untuk 'Kosong'
                } else { // Status 'Isi'
                    statusCell.classList.add('bg-red-100', 'text-red-700', 'font-semibold'); // Warna merah untuk 'Isi'
                }
                statusCell.textContent = status;
                row.appendChild(statusCell);
            });
            roomScheduleBody.appendChild(row);
        }

    } catch (error) {
        console.error("Fetch error:", error);
        roomScheduleBody.innerHTML = `<div class="p-4 text-center text-red-600">Terjadi kesalahan saat mengambil data ruangan. Periksa koneksi atau server.</div>`;
    }
}

// --- 4. Fungsi untuk Mengupdate Tampilan Tombol Aktif ---
function updateActiveButton(container, activeValue, dataAttribute) {
    Array.from(container.children).forEach(button => {
        if (button.dataset[dataAttribute] === activeValue) {
            button.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            button.classList.add('bg-purple-700', 'text-white', 'shadow');
        } else {
            button.classList.remove('bg-purple-700', 'text-white', 'shadow');
            button.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        }
    });
}

// --- 5. Event Listeners ---

// Event Listener untuk tombol Gedung
gedungButtonsContainer.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('button');
    if (clickedButton && clickedButton.dataset.gedung) {
        currentGedung = clickedButton.dataset.gedung;
        
        // Asumsi lantai 1 selalu ada saat gedung berubah, atau Anda bisa fetch lantai yang tersedia
        currentLantai = '1'; 

        updateActiveButton(gedungButtonsContainer, currentGedung, 'gedung');
        updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai'); // Perbarui tombol lantai juga
        fetchAndRenderRoomSchedule(); // Muat ulang data
    }
});

// Event Listener untuk tombol Lantai
lantaiButtonsContainer.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('button');
    if (clickedButton && clickedButton.dataset.lantai) {
        currentLantai = clickedButton.dataset.lantai;
        updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');
        fetchAndRenderRoomSchedule(); // Muat ulang data
    }
});

// --- 6. Inisialisasi Saat Halaman Dimuat ---
document.addEventListener('DOMContentLoaded', () => {
    // Set tombol aktif awal
    updateActiveButton(gedungButtonsContainer, currentGedung, 'gedung');
    updateActiveButton(lantaiButtonsContainer, currentLantai, 'lantai');


    // Panggil fungsi utama untuk pertama kali memuat dan menampilkan data
    fetchAndRenderRoomSchedule();
});
hariSelect.addEventListener('change', (event) => {
    currentHari = event.target.value;
    fetchAndRenderRoomSchedule();
});