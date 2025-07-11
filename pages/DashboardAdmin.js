// src/js/DashboardAdmin.js

// --- 1. Data Dummy (Simulasi dari Database/API) ---
// Data dummy untuk formulir ganti ruang
const roomChangeRequests = [
    {
        id: 1,
        tanggal: '5/19/25',
        nama: 'Daffa Dio',
        namaDosenPengganti: '',
        mataKuliah: 'Konsep Data Mining',
        kelas: '3A13',
        ruang: 'E112',
        waktu: '1/2',
        alasan: 'Ruangan terlalu panas',
        status: 'Diproses' // Initial status
    },
    {
        id: 2,
        tanggal: '5/20/25',
        nama: 'Ralfi',
        namaDosenPengganti: 'ANNAUCITA OKTIANDA RAHMA',
        mataKuliah: 'Algoritma & Pemrograman',
        kelas: '3A14',
        ruang: 'E113',
        waktu: '3/4',
        alasan: 'Ruangan terlalu kecil',
        status: 'Disetujui'
    },
    {
        id: 3,
        tanggal: '5/21/25',
        nama: 'Rifki',
        namaDosenPengganti: 'MUHAMMAD NAJIB RAMADHAN',
        mataKuliah: 'Algoritma & Pemrograman',
        kelas: '3A15',
        ruang: 'E114',
        waktu: '9/10',
        alasan: 'AC mati',
        status: 'Ditolak'
    },
    {
        id: 4,
        tanggal: '5/22/25',
        nama: 'Yoga',
        namaDosenPengganti: '',
        mataKuliah: 'Algoritma & Pemrograman',
        kelas: '3A16',
        ruang: 'E115',
        waktu: '5/6',
        alasan: 'Ruangan terlalu panas',
        status: 'Diproses'
    },
    {
        id: 5,
        tanggal: '5/23/25',
        nama: 'Ana',
        namaDosenPengganti: 'ETY SUTANTY',
        mataKuliah: 'Algoritma & Pemrograman',
        kelas: '3A17',
        ruang: 'E116',
        waktu: '5/6',
        alasan: 'Ruangan terlalu panas',
        status: 'Diproses'
    },
    {
        id: 6,
        tanggal: '5/24/25',
        nama: 'Nabil',
        namaDosenPengganti: 'JONNIAN',
        mataKuliah: 'Algoritma & Dasar 2A',
        kelas: '3A18',
        ruang: 'E117',
        waktu: '4/5',
        alasan: 'Ruangan terlalu panas',
        status: 'Diproses'
    },
    {
        id: 7,
        tanggal: '5/25/25',
        nama: 'Dian',
        namaDosenPengganti: 'DYAN PRAMITA',
        mataKuliah: 'Algoritma & Dasar 2A',
        kelas: '3A19',
        ruang: 'E118',
        waktu: '5/6',
        alasan: 'Ruangan terlalu panas',
        status: 'Diproses'
    },
    {
        id: 8,
        tanggal: '5/26/25',
        nama: 'Mia',
        namaDosenPengganti: 'HELENAWATY',
        mataKuliah: 'Pengembangan Aplikasi Pendidikan',
        kelas: '3A20',
        ruang: 'E119',
        waktu: '7/8',
        alasan: 'Ruangan terlalu panas',
        status: 'Diproses'
    },
    {
        id: 9,
        tanggal: '5/27/25',
        nama: 'Abbas',
        namaDosenPengganti: 'ERLINA',
        mataKuliah: 'Konsep Teknologi Informasi B',
        kelas: '3A11',
        ruang: 'E221',
        waktu: '1/2',
        alasan: 'Ruangan terlalu panas',
        status: 'Diproses'
    },
    // Tambahkan lebih banyak data dummy jika diperlukan untuk paginasi
    { id: 10, tanggal: '5/28/25', nama: 'Zahra', namaDosenPengganti: '', mataKuliah: 'Database Systems', kelas: '4B01', ruang: 'F101', waktu: '1/2', alasan: 'Kapasitas kurang', status: 'Diproses' },
    { id: 11, tanggal: '5/29/25', nama: 'Budi', namaDosenPengganti: 'SUTANTO', mataKuliah: 'Web Programming', kelas: '5C02', ruang: 'G201', waktu: '3/4', alasan: 'Pencahayaan kurang', status: 'Disetujui' }
];

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
const roomChangeRequestsBody = document.getElementById('room-change-requests-body');
const courseScheduleBody = document.getElementById('course-schedule-body');

const roomRequestPaginationInfo = document.getElementById('room-request-pagination-info');
const roomRequestPrevBtn = document.getElementById('room-request-prev');
const roomRequestNextBtn = document.getElementById('room-request-next');
const roomRequestCurrentPageSpan = document.getElementById('room-request-current-page');

const courseSchedulePaginationInfo = document.getElementById('course-schedule-pagination-info');
const courseSchedulePrevBtn = document.getElementById('course-schedule-prev');
const courseScheduleNextBtn = document.getElementById('course-schedule-next');
const courseScheduleCurrentPageSpan = document.getElementById('course-schedule-current-page');

const scheduleSearchInput = document.getElementById('schedule-search-input');
const addScheduleBtn = document.getElementById('add-schedule-btn');

// Room Request Search/Filter 
const requestSearchInput = document.getElementById('request-search-input');

// Edit/Add Schedule Modal Elements
const editScheduleModal = document.getElementById('edit-schedule-modal');
const editScheduleForm = document.getElementById('edit-schedule-form');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const modalTitle = document.getElementById('modal-title'); // For changing modal title
const submitScheduleBtn = document.getElementById('submit-schedule-btn'); // For changing submit button text

const editScheduleId = document.getElementById('edit-schedule-id');
const editKelas = document.getElementById('edit-kelas');
const editHari = document.getElementById('edit-hari');
const editMataKuliah = document.getElementById('edit-mata-kuliah');
const editWaktu = document.getElementById('edit-waktu');
const editRuang = document.getElementById('edit-ruang');
const editDosen = document.getElementById('edit-dosen');

// --- 3. Fungsi Utility & State untuk Paginasi ---
const itemsPerPage = 10; // Jumlah item per halaman

// State untuk paginasi formulir ganti ruang
let currentRoomRequestPage = 1;
let filteredRoomRequests = roomChangeRequests; // Untuk menyimpan hasil filter jika ada

// State untuk paginasi jadwal kuliah
let currentCourseSchedulePage = 1;
let filteredCourseSchedules = courseSchedules; // Untuk menyimpan hasil filter jika ada

// State for modal mode (add or edit)
let isEditMode = false;


// --- 4. Fungsi Render Tabel Formulir Ganti Ruang ---
function renderRoomChangeRequests() {
    roomChangeRequestsBody.innerHTML = ''; // Kosongkan isi tabel

    const startIndex = (currentRoomRequestPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRequests = filteredRoomRequests.slice(startIndex, endIndex);

    if (paginatedRequests.length === 0) {
        roomChangeRequestsBody.innerHTML = `<tr><td colspan="9" class="p-4 text-center text-gray-600">Tidak ada formulir ganti ruang.</td></tr>`;
        roomRequestPaginationInfo.textContent = '0-0 of 0';
        roomRequestCurrentPageSpan.textContent = '0';
        roomRequestPrevBtn.classList.add('opacity-50', 'pointer-events-none');
        roomRequestNextBtn.classList.add('opacity-50', 'pointer-events-none');
        return;
    }
    
    paginatedRequests.forEach(request => {
        // Determine badge/row color based on status
        let statusBadgeClass = '';
        switch (request.status) {
            case 'Diproses':
                statusBadgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300'; // Kuning untuk Diproses
                break;
            case 'Disetujui':
                statusBadgeClass = 'bg-green-100 text-green-800 border-green-300'; // Hijau untuk Disetujui
                break;
            case 'Ditolak':
                statusBadgeClass = 'bg-red-100 text-red-800 border-red-300'; // Merah untuk Ditolak
                break;
            default:
                statusBadgeClass = 'bg-gray-100 text-gray-800 border-gray-300'; // Default
        }

        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50'; // Add hover effect to rows
        row.innerHTML = `
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.tanggal}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.nama}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.namaDosenPengganti}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.mataKuliah}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.kelas}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.ruang}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.waktu}</td>
            <td class="px-4 py-2 text-sm text-gray-500 max-w-[150px] truncate" title="${request.alasan}">${request.alasan}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm font-medium">
                <select data-id="${request.id}" class="status-dropdown block w-full py-1 px-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-xs ${statusBadgeClass}">
                    <option value="Diproses" ${request.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
                    <option value="Disetujui" ${request.status === 'Disetujui' ? 'selected' : ''}>Disetujui</option>
                    <option value="Ditolak" ${request.status === 'Ditolak' ? 'selected' : ''}>Ditolak</option>
                </select>
            </td>
        `;
        roomChangeRequestsBody.appendChild(row);
    });

    updateRoomRequestPaginationControls();
}

function updateRoomRequestPaginationControls() {
    const totalPages = Math.ceil(filteredRoomRequests.length / itemsPerPage);
    roomRequestPaginationInfo.textContent = `${Math.min(filteredRoomRequests.length, (currentRoomRequestPage - 1) * itemsPerPage + 1)}-${Math.min(filteredRoomRequests.length, currentRoomRequestPage * itemsPerPage)} of ${filteredRoomRequests.length}`;
    roomRequestCurrentPageSpan.textContent = currentRoomRequestPage;

    // Enable/disable Prev/Next buttons
    if (currentRoomRequestPage === 1) {
        roomRequestPrevBtn.classList.add('opacity-50', 'pointer-events-none');
    } else {
        roomRequestPrevBtn.classList.remove('opacity-50', 'pointer-events-none');
    }

    if (currentRoomRequestPage === totalPages || totalPages === 0) {
        roomRequestNextBtn.classList.add('opacity-50', 'pointer-events-none');
    } else {
        roomRequestNextBtn.classList.remove('opacity-50', 'pointer-events-none');
    }
}

// --- 5. Fungsi Render Tabel Jadwal Kuliah ---
function renderCourseSchedules() {
    courseScheduleBody.innerHTML = ''; // Kosongkan isi tabel

    const startIndex = (currentCourseSchedulePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSchedules = filteredCourseSchedules.slice(startIndex, endIndex);

    if (paginatedSchedules.length === 0) {
        courseScheduleBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-gray-600">Tidak ada jadwal kuliah.</td></tr>`;
        courseSchedulePaginationInfo.textContent = '0-0 of 0';
        courseScheduleCurrentPageSpan.textContent = '0';
        courseSchedulePrevBtn.classList.add('opacity-50', 'pointer-events-none');
        courseScheduleNextBtn.classList.add('opacity-50', 'pointer-events-none');
        return;
    }

    paginatedSchedules.forEach(schedule => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50'; // Add hover effect to rows
        row.innerHTML = `
            <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${schedule.kelas}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.hari}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.mataKuliah}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.waktu}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.ruang}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.dosen}</td>
            <td class="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                <button data-id="${schedule.id}" class="edit-btn text-purple-600 hover:text-purple-900 mx-1 p-1 rounded-full hover:bg-purple-100"><i class="fas fa-edit"></i></button>
                <button data-id="${schedule.id}" class="delete-btn text-red-600 hover:text-red-900 mx-1 p-1 rounded-full hover:bg-red-100"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        courseScheduleBody.appendChild(row);
    });

    updateCourseSchedulePaginationControls();
}

function updateCourseSchedulePaginationControls() {
    const totalPages = Math.ceil(filteredCourseSchedules.length / itemsPerPage);
    courseSchedulePaginationInfo.textContent = `${Math.min(filteredCourseSchedules.length, (currentCourseSchedulePage - 1) * itemsPerPage + 1)}-${Math.min(filteredCourseSchedules.length, currentCourseSchedulePage * itemsPerPage)} of ${filteredCourseSchedules.length}`;
    courseScheduleCurrentPageSpan.textContent = currentCourseSchedulePage;

    // Enable/disable Prev/Next buttons
    if (currentCourseSchedulePage === 1) {
        courseSchedulePrevBtn.classList.add('opacity-50', 'pointer-events-none');
    } else {
        courseSchedulePrevBtn.classList.remove('opacity-50', 'pointer-events-none');
    }

    if (currentCourseSchedulePage === totalPages || totalPages === 0) {
        courseScheduleNextBtn.classList.add('opacity-50', 'pointer-events-none');
    } else {
        courseScheduleNextBtn.classList.remove('opacity-50', 'pointer-events-none');
    }
}


// --- 6. Fungsi untuk Membuka Modal (Add/Edit) ---
function openScheduleModal(scheduleData = null) {
    editScheduleForm.reset(); // Clear previous form data
    editScheduleId.value = ''; // Ensure ID is clear

    if (scheduleData) { // Edit mode
        isEditMode = true;
        modalTitle.textContent = 'Edit Jadwal Kuliah';
        submitScheduleBtn.textContent = 'Simpan Perubahan';
        
        editScheduleId.value = scheduleData.id;
        editKelas.value = scheduleData.kelas;
        editHari.value = scheduleData.hari;
        editMataKuliah.value = scheduleData.mataKuliah;
        editWaktu.value = scheduleData.waktu;
        editRuang.value = scheduleData.ruang;
        editDosen.value = scheduleData.dosen;
    } else { // Add mode
        isEditMode = false;
        modalTitle.textContent = 'Tambah Jadwal Kuliah Baru';
        submitScheduleBtn.textContent = 'Tambah Jadwal';
        // No need to fill fields, they are already reset
    }

    editScheduleModal.classList.remove('hidden'); // Show the modal
}

// --- 7. Event Handlers ---

// Handle status change for Room Change Requests (Dropdown)
roomChangeRequestsBody.addEventListener('change', (event) => {
    const targetSelect = event.target.closest('.status-dropdown');
    if (targetSelect) {
        const requestId = parseInt(targetSelect.dataset.id);
        const newStatus = targetSelect.value;

        const request = roomChangeRequests.find(req => req.id === requestId);
        if (request) {
            request.status = newStatus;
            console.log(`Request ID: ${requestId}, New Status: ${newStatus}`);
            // In a real app, you'd send this update to your backend API here

            // Update class of the select element to reflect new status color
            let statusBadgeClass = '';
            switch (newStatus) {
                case 'Diproses':
                    statusBadgeClass = 'bg-yellow-100 text-yellow-800 border-yellow-300';
                    break;
                case 'Disetujui':
                    statusBadgeClass = 'bg-green-100 text-green-800 border-green-300';
                    break;
                case 'Ditolak':
                    statusBadgeClass = 'bg-red-100 text-red-800 border-red-300';
                    break;
                default:
                    statusBadgeClass = 'bg-gray-100 text-gray-800 border-gray-300';
            }
            targetSelect.className = `status-dropdown block w-full py-1 px-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-xs ${statusBadgeClass}`;
        }
    }
});

// Handle edit/delete buttons for Course Schedules
courseScheduleBody.addEventListener('click', (event) => {
    const editBtn = event.target.closest('.edit-btn');
    const deleteBtn = event.target.closest('.delete-btn');

    if (editBtn) {
        const scheduleId = parseInt(editBtn.dataset.id);
        const scheduleToEdit = courseSchedules.find(s => s.id === scheduleId);
        if (scheduleToEdit) {
            openScheduleModal(scheduleToEdit); // Open modal in edit mode
        }
    } else if (deleteBtn) {
        const scheduleId = parseInt(deleteBtn.dataset.id);
        if (confirm(`Apakah Anda yakin ingin menghapus jadwal ini (ID: ${scheduleId})?`)) {
            // In a real app, you'd send a DELETE request to your backend API
            const initialLength = filteredCourseSchedules.length;
            
            // Remove from both filtered and original data arrays
            filteredCourseSchedules = filteredCourseSchedules.filter(s => s.id !== scheduleId);
            courseSchedules.splice(courseSchedules.findIndex(s => s.id === scheduleId), 1); // Remove from original data source

            console.log(`Delete schedule with ID: ${scheduleId}`);
            renderCourseSchedules(); // Re-render table

            // Adjust page if current page becomes empty after deletion
            if (filteredCourseSchedules.length % itemsPerPage === 0 && currentCourseSchedulePage > 1 && filteredCourseSchedules.length < initialLength) {
                currentCourseSchedulePage--;
                renderCourseSchedules();
            }
        }
    }
});

// Submit handler for Edit/Add Schedule Form
editScheduleForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const newScheduleData = {
        kelas: editKelas.value,
        hari: editHari.value,
        mataKuliah: editMataKuliah.value,
        waktu: editWaktu.value,
        ruang: editRuang.value,
        dosen: editDosen.value
    };

    if (isEditMode) { // Logic for editing existing schedule
        const id = parseInt(editScheduleId.value);
        const originalIndex = courseSchedules.findIndex(s => s.id === id);
        if (originalIndex !== -1) {
            courseSchedules[originalIndex] = { ...newScheduleData, id: id }; // Keep original ID
        }
        // Also update filtered array to ensure consistency in current view
        const filteredIndex = filteredCourseSchedules.findIndex(s => s.id === id);
        if (filteredIndex !== -1) {
            filteredCourseSchedules[filteredIndex] = { ...newScheduleData, id: id };
        }
        console.log("Updated Schedule:", newScheduleData);
        // In a real app: Send PUT/PATCH request to backend to update schedule
    } else { // Logic for adding new schedule
        // For dummy data, generate a simple unique ID
        const newId = Math.max(...courseSchedules.map(s => s.id)) + 1; // Get max ID and increment
        const newSchedule = { ...newScheduleData, id: newId };
        courseSchedules.push(newSchedule); // Add to original data
        console.log("Added New Schedule:", newSchedule);
        // In a real app: Send POST request to backend to add new schedule
    }

    // Re-apply filters and render to ensure new/updated item is visible and sorted correctly
    applyCourseScheduleFilters(); // This will also re-render
    editScheduleModal.classList.add('hidden'); // Hide the modal
});

// Cancel button for Edit Schedule Form
cancelEditBtn.addEventListener('click', () => {
    editScheduleModal.classList.add('hidden'); // Hide the modal
});

// Allow modal to be closed by clicking outside or pressing ESC
editScheduleModal.addEventListener('click', (event) => {
    if (event.target === editScheduleModal) { // Only close if clicking on the overlay itself
        editScheduleModal.classList.add('hidden');
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !editScheduleModal.classList.contains('hidden')) {
        editScheduleModal.classList.add('hidden');
    }
});


// Pagination Event Listeners for Room Change Requests
roomRequestPrevBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    if (currentRoomRequestPage > 1) {
        currentRoomRequestPage--;
        renderRoomChangeRequests();
    }
});

roomRequestNextBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const totalPages = Math.ceil(filteredRoomRequests.length / itemsPerPage);
    if (currentRoomRequestPage < totalPages) {
        currentRoomRequestPage++;
        renderRoomChangeRequests();
    }
});

// Pagination Event Listeners for Course Schedules
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

// Universal Search for Course Schedules
scheduleSearchInput.addEventListener('input', () => {
    applyCourseScheduleFilters();
});

function applyCourseScheduleFilters() {
    const searchTerm = scheduleSearchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredCourseSchedules = [...courseSchedules]; // Reset to original if search is empty
    } else {
        filteredCourseSchedules = courseSchedules.filter(schedule => {
            // Check all relevant fields for the search term
            return (
                schedule.kelas.toLowerCase().includes(searchTerm) ||
                schedule.hari.toLowerCase().includes(searchTerm) ||
                schedule.mataKuliah.toLowerCase().includes(searchTerm) ||
                schedule.waktu.toLowerCase().includes(searchTerm) ||
                schedule.ruang.toLowerCase().includes(searchTerm) ||
                schedule.dosen.toLowerCase().includes(searchTerm) ||
                schedule.id.toString().includes(searchTerm) // Also allow searching by ID
            );
        });
    }

    currentCourseSchedulePage = 1; // Reset to first page on filter change
    renderCourseSchedules();
}

// Universal Search for Room Change Requests
requestSearchInput.addEventListener('input', () => {
    applyRoomRequestFilters();
});

function applyRoomRequestFilters() {
    const searchTerm = requestSearchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredRoomRequests = [...roomChangeRequests];
    } else {
        filteredRoomRequests = roomChangeRequests.filter(request => {
            return (
                request.tanggal.toLowerCase().includes(searchTerm) ||
                request.nama.toLowerCase().includes(searchTerm) ||
                request.namaDosenPengganti.toLowerCase().includes(searchTerm) ||
                request.mataKuliah.toLowerCase().includes(searchTerm) ||
                request.kelas.toLowerCase().includes(searchTerm) ||
                request.ruang.toLowerCase().includes(searchTerm) ||
                request.waktu.toLowerCase().includes(searchTerm) ||
                request.alasan.toLowerCase().includes(searchTerm)
            );
        });
    }
    currentRoomRequestPage = 1; // Reset to first page on filter change
    renderRoomChangeRequests();
}


// --- Add Schedule Button functionality ---
addScheduleBtn.addEventListener('click', () => {
    openScheduleModal(null); // Open modal in add mode (passing null for new schedule)
});


// --- 7. Inisialisasi Saat Halaman Dimuat ---
document.addEventListener('DOMContentLoaded', () => {
    renderRoomChangeRequests();
    renderCourseSchedules();
});