// src/js/Jadwal.js

// --- 1. Data Dummy (Simulasi dari Database/API) ---
// Data dummy untuk jadwal kuliah
const courseSchedules = [
    { id: 101, kelas: '1IA01', hari: 'Senin', mataKuliah: 'Konsep Teknologi Informasi A', waktu: '2-Jan', ruang: 'G229', dosen: 'RASMADANISA SUSANNA HERAWATI' },
    { id: 102, kelas: '1IA01', hari: 'Senin', mataKuliah: 'Konsep Teknologi Informasi 2C', waktu: '4-Mar', ruang: 'G229', dosen: 'FARIDA AMALYA' },
    { id: 103, kelas: '1IA01', hari: 'Senin', mataKuliah: 'Pendidikan Kewarganegaraan', waktu: '7-Jun', ruang: 'G229', dosen: 'ERNI KARYATI' },
    { id: 104, kelas: '1IA01', hari: 'Senin', mataKuliah: 'Konsep Teknologi Informasi B', waktu: '9-Aug', ruang: 'G125', dosen: 'WINARDIH' },
    { id: 105, kelas: '1IA01', hari: 'Kamis', mataKuliah: 'Teknologi Kecerdasan Artifisial', waktu: 'U57Y', ruang: 'G125', dosen: 'TEAM TEACHING' },
    { id: 106, kelas: '1IA01', hari: 'Kamis', mataKuliah: 'Pendidikan Agama Islam', waktu: '2-Jun', ruang: 'E221', dosen: 'APOJDIN' },
    { id: 107, kelas: '1IA01', hari: 'Kamis', mataKuliah: 'Algoritma & Pemrograman 2A', waktu: '4-Mar', ruang: 'G231', dosen: 'ENDAH KURNIASIH' },
    { id: 108, kelas: '1IA01', hari: 'Kamis', mataKuliah: 'Algoritma & Pemrograman 2B', waktu: '7-Jun', ruang: 'G243', dosen: 'RATIH PURWANINGTYAS' },
    { id: 109, kelas: '1IA01', hari: 'Kamis', mataKuliah: 'Konsep Teknologi Informasi C', waktu: '10 Sep', ruang: 'G218', dosen: 'DDI. SUBIAYANTI' },
    { id: 110, kelas: '1IA01', hari: 'Jumat', mataKuliah: 'Fisika dan Kimia Dasar 2A', waktu: '2-Jan', ruang: 'F314', dosen: 'HENING HENDRATO' },
    { id: 111, kelas: '1IA01', hari: 'Jumat', mataKuliah: 'Matematika Dasar 3A', waktu: '4-Mar', ruang: 'E514', dosen: 'EVA ZULFA MAILIKAH' },
    { id: 112, kelas: '1IA01', hari: 'Jumat', mataKuliah: 'Matematika Informatika 2', waktu: '8-Jul', ruang: 'F315', dosen: 'YULI FITRIANI' },
    { id: 113, kelas: '1IA01', hari: 'Jumat', mataKuliah: 'Fisika dan Kimia Dasar 2B', waktu: '10 Sep', ruang: 'E315', dosen: 'LESTARI OCTAVIA' },
    { id: 114, kelas: '1IA01', hari: 'Sabtu', mataKuliah: 'Praktikum Teknologi Kecerdasan Artifisial', waktu: '4-Mar', ruang: 'G316', dosen: 'TIM DOSEN' }
];

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
let filteredCourseSchedules = courseSchedules; // Untuk menyimpan hasil filter jika ada

// --- 4. Fungsi Render Tabel Jadwal Kuliah ---
function renderCourseSchedules() {
    if (!courseScheduleBody) {
        console.error("Elemen dengan ID 'course-schedule-body' tidak ditemukan.");
        return;
    }
    courseScheduleBody.innerHTML = ''; // Kosongkan isi tabel

    const startIndex = (currentCourseSchedulePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSchedules = filteredCourseSchedules.slice(startIndex, endIndex);

    if (paginatedSchedules.length === 0) {
        // Jumlah kolom sekarang adalah 6
        courseScheduleBody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-gray-600">Tidak ada jadwal kuliah yang cocok dengan pencarian.</td></tr>`;
        updateCourseSchedulePaginationControls();
        return;
    }

    paginatedSchedules.forEach(schedule => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        // Menghapus <td> "Action" dari akhir template literal
        row.innerHTML = `
            <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${schedule.kelas}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.hari}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.mataKuliah}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.waktu}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.ruang}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.dosen}</td>
        `;
        courseScheduleBody.appendChild(row);
    });

    updateCourseSchedulePaginationControls();
}

function updateCourseSchedulePaginationControls() {
    if (!courseSchedulePaginationInfo || !courseScheduleCurrentPageSpan || !courseSchedulePrevBtn || !courseScheduleNextBtn) {
        return;
    }
    const totalItems = filteredCourseSchedules.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalItems === 0) {
        courseSchedulePaginationInfo.textContent = '0-0 of 0';
        courseScheduleCurrentPageSpan.textContent = '0';
    } else {
        const startItem = (currentCourseSchedulePage - 1) * itemsPerPage + 1;
        const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);
        courseSchedulePaginationInfo.textContent = `${startItem}-${endItem} of ${totalItems}`;
        courseScheduleCurrentPageSpan.textContent = currentCourseSchedulePage;
    }

    courseSchedulePrevBtn.classList.toggle('opacity-50', currentCourseSchedulePage === 1);
    courseSchedulePrevBtn.classList.toggle('pointer-events-none', currentCourseSchedulePage === 1);

    courseScheduleNextBtn.classList.toggle('opacity-50', currentCourseSchedulePage >= totalPages);
    courseScheduleNextBtn.classList.toggle('pointer-events-none', currentCourseSchedulePage >= totalPages);
}

// --- 5. Fungsi Filter ---
function applyCourseScheduleFilters() {
    const searchTerm = scheduleSearchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredCourseSchedules = [...courseSchedules];
    } else {
        filteredCourseSchedules = courseSchedules.filter(schedule => 
            Object.values(schedule).some(value => 
                String(value).toLowerCase().includes(searchTerm)
            )
        );
    }

    currentCourseSchedulePage = 1;
    renderCourseSchedules();
}

// --- 6. Event Handlers ---
if (courseSchedulePrevBtn && courseScheduleNextBtn) {
    courseSchedulePrevBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentCourseSchedulePage > 1) {
            currentCourseSchedulePage--;
            renderCourseSchedules();
        }
    });

    courseScheduleNextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const totalPages = Math.ceil(filteredCourseSchedules.length / itemsPerPage);
        if (currentCourseSchedulePage < totalPages) {
            currentCourseSchedulePage++;
            renderCourseSchedules();
        }
    });
}

if (scheduleSearchInput) {
    scheduleSearchInput.addEventListener('input', applyCourseScheduleFilters);
}

// --- 7. Inisialisasi Saat Halaman Dimuat ---
document.addEventListener('DOMContentLoaded', () => {
    filteredCourseSchedules = [...courseSchedules];
    renderCourseSchedules();
});