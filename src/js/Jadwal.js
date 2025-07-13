// src/js/Jadwal.js
let globalCourseSchedules = []; // Akan menyimpan data dari server
let totalCourseSchedules = 0;

// --- 2. Referensi ke Elemen DOM ---
const courseScheduleBody = document.getElementById('course-schedule-body');
const courseSchedulePaginationInfo = document.getElementById('course-schedule-pagination-info');
const courseSchedulePrevBtn = document.getElementById('course-schedule-prev');
const courseScheduleNextBtn = document.getElementById('course-schedule-next');
const courseScheduleCurrentPageSpan = document.getElementById('course-schedule-current-page');
const scheduleSearchInput = document.getElementById('schedule-search-input');

// --- 3. Fungsi Utility & State untuk Paginasi ---
const itemsPerPage = 10; // Jumlah item per halaman
let currentCourseSchedulePage = 1;

// --- 4. Fungsi untuk Fetch dan Render Tabel Jadwal Kuliah ---
async function fetchAndRenderCourseSchedules() {
    if (!courseScheduleBody) {
        console.error("Elemen dengan ID 'course-schedule-body' tidak ditemukan. Pastikan elemen ada di HTML.");
        return;
    }

    const searchTerm = scheduleSearchInput.value.toLowerCase().trim();
    // Membangun URL untuk request API
    const url = `/SIGARA/php/get_schedules.php?page=${currentCourseSchedulePage}&limit=${itemsPerPage}&search=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.status === 'error') {
            console.error("Error fetching schedules:", data.message);
            const colspan = courseScheduleBody.closest('table').querySelector('thead tr').children.length;
            courseScheduleBody.innerHTML = `<tr><td colspan="${colspan}" class="p-4 text-center text-red-600">Gagal memuat jadwal: ${data.message}</td></tr>`;
            totalCourseSchedules = 0; // Reset total items
        } else {
            globalCourseSchedules = data.schedules; // Simpan data yang di-fetch
            totalCourseSchedules = data.totalItems;

            courseScheduleBody.innerHTML = ''; // Kosongkan isi tabel

            if (globalCourseSchedules.length === 0) {
                const colspan = courseScheduleBody.closest('table').querySelector('thead tr').children.length;
                courseScheduleBody.innerHTML = `<tr><td colspan="${colspan}" class="p-4 text-center text-gray-600">Tidak ada jadwal kuliah yang cocok dengan pencarian.</td></tr>`;
            } else {
                globalCourseSchedules.forEach(schedule => {
                    const row = document.createElement('tr');
                    row.className = 'hover:bg-gray-50';
                    // Pastikan nama properti cocok dengan nama kolom di database Anda
                    row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${schedule.kelas}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.hari}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.mata_kuliah}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.waktu}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.ruang}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.nama_dosen}</td>
                    `;
                    courseScheduleBody.appendChild(row);
                });
            }
        }
        updateCourseSchedulePaginationControls(); // Perbarui kontrol paginasi
    } catch (error) {
        console.error("Fetch error:", error);
        const colspan = courseScheduleBody.closest('table').querySelector('thead tr').children.length;
        courseScheduleBody.innerHTML = `<tr><td colspan="${colspan}" class="p-4 text-center text-red-600">Terjadi kesalahan jaringan atau server.</td></tr>`;
        totalCourseSchedules = 0; // Reset total items on error
        updateCourseSchedulePaginationControls(); // Update pagination controls even on error
    }
}

function updateCourseSchedulePaginationControls() {
    if (!courseSchedulePaginationInfo || !courseScheduleCurrentPageSpan || !courseSchedulePrevBtn || !courseScheduleNextBtn) {
        console.error("Elemen paginasi tidak ditemukan.");
        return;
    }

    const totalPages = Math.ceil(totalCourseSchedules / itemsPerPage);

    if (totalCourseSchedules === 0) {
        courseSchedulePaginationInfo.textContent = '0-0 of 0';
        courseScheduleCurrentPageSpan.textContent = '0';
    } else {
        const startItem = (currentCourseSchedulePage - 1) * itemsPerPage + 1;
        const endItem = Math.min(startItem + itemsPerPage - 1, totalCourseSchedules);
        courseSchedulePaginationInfo.textContent = `${startItem}-${endItem} of ${totalCourseSchedules}`;
        courseScheduleCurrentPageSpan.textContent = currentCourseSchedulePage;
    }

    // Aktifkan/non-aktifkan tombol Previous
    courseSchedulePrevBtn.classList.toggle('opacity-50', currentCourseSchedulePage === 1);
    courseSchedulePrevBtn.classList.toggle('pointer-events-none', currentCourseSchedulePage === 1);

    // Aktifkan/non-aktifkan tombol Next
    courseScheduleNextBtn.classList.toggle('opacity-50', currentCourseSchedulePage >= totalPages || totalPages === 0);
    courseScheduleNextBtn.classList.toggle('pointer-events-none', currentCourseSchedulePage >= totalPages || totalPages === 0);
}

// --- 5. Fungsi Filter (Sekarang hanya memanggil fetch ulang) ---
function applyCourseScheduleFilters() {
    currentCourseSchedulePage = 1; // Reset ke halaman pertama saat filter berubah
    fetchAndRenderCourseSchedules();
}

// --- 6. Event Handlers ---
// Event listener untuk tombol Previous
if (courseSchedulePrevBtn) {
    courseSchedulePrevBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentCourseSchedulePage > 1) {
            currentCourseSchedulePage--;
            fetchAndRenderCourseSchedules();
        }
    });
}

// Event listener untuk tombol Next
if (courseScheduleNextBtn) {
    courseScheduleNextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const totalPages = Math.ceil(totalCourseSchedules / itemsPerPage);
        if (currentCourseSchedulePage < totalPages) {
            currentCourseSchedulePage++;
            fetchAndRenderCourseSchedules();
        }
    });
}

// Event listener untuk input pencarian
if (scheduleSearchInput) {
    // Gunakan 'input' agar pencarian realtime saat user mengetik
    scheduleSearchInput.addEventListener('input', applyCourseScheduleFilters);
}

// --- 7. Inisialisasi Saat Halaman Dimuat ---
document.addEventListener('DOMContentLoaded', () => {
    // Panggil fungsi utama untuk pertama kali memuat dan menampilkan data
    fetchAndRenderCourseSchedules();
});