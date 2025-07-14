// File: src/js/DashboardAdmin.js

// --- 1. State Aplikasi ---
const itemsPerPage = 10; // Jumlah item per halaman untuk kedua tabel

// State untuk paginasi formulir ganti ruang
let currentRoomRequestPage = 1;
let totalRoomRequests = 0; // Total item form ganti ruang dari backend

// State untuk paginasi jadwal kuliah
let currentCourseSchedulePage = 1;
let totalCourseSchedules = 0; // Total item jadwal dari backend
let globalCourseSchedulesData = []; // Untuk menyimpan data jadwal yang terakhir di-fetch, berguna untuk mengisi modal edit

// State untuk mode modal (add atau edit jadwal)
let isEditMode = false;

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

const scheduleSearchInput = document.getElementById('schedule-search-input'); // Pencarian Jadwal
const addScheduleBtn = document.getElementById('add-schedule-btn'); // Tombol Tambah Jadwal

const requestSearchInput = document.getElementById('request-search-input'); // Pencarian Formulir Ganti Ruang

// Elemen Modal Edit/Add Jadwal (pastikan ID ini ada di DashboardAdmin.php HTML)
const editScheduleModal = document.getElementById('edit-schedule-modal');
const editScheduleForm = document.getElementById('edit-schedule-form');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const modalTitle = document.getElementById('modal-title');
const submitScheduleBtn = document.getElementById('submit-schedule-btn');

const editScheduleId = document.getElementById('edit-schedule-id');
const editKelas = document.getElementById('edit-kelas');
const editHari = document.getElementById('edit-hari');
const editMataKuliah = document.getElementById('edit-mata-kuliah'); // Pastikan ID ini ada di HTML modal
const editWaktu = document.getElementById('edit-waktu');
const editRuang = document.getElementById('edit-ruang');
const editDosen = document.getElementById('edit-dosen'); // Pastikan ID ini ada di HTML modal

// --- 3. Fungsi untuk Fetch dan Render Tabel Formulir Ganti Ruang ---
async function fetchAndRenderRoomChangeRequests() {
    roomChangeRequestsBody.innerHTML = ''; // Kosongkan isi tabel

    const searchTerm = requestSearchInput.value.toLowerCase().trim();
    // URL API untuk mengambil semua form ganti ruang dengan paginasi dan pencarian
    const url = `/SIGARA/php/get_all_change_requests.php?page=${currentRoomRequestPage}&limit=${itemsPerPage}&search=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) { // Cek jika respons HTTP tidak OK (misal: 403 Forbidden)
            if (response.status === 403) {
                 roomChangeRequestsBody.innerHTML = `<tr><td colspan="9" class="p-4 text-center text-red-600">Akses ditolak. Anda tidak memiliki izin untuk melihat data ini.</td></tr>`;
                 totalRoomRequests = 0; // Reset total
                 updateRoomRequestPaginationControls(); // Update paginasi untuk menampilkan 0
                 return;
            } else {
                 throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        const data = await response.json();

        if (data.status === 'error') {
            console.error("Error fetching room change requests:", data.message);
            roomChangeRequestsBody.innerHTML = `<tr><td colspan="9" class="p-4 text-center text-red-600">Gagal memuat formulir: ${data.message}</td></tr>`;
            totalRoomRequests = 0;
        } else {
            const requestsToRender = data.requests;
            totalRoomRequests = data.totalItems;

            if (requestsToRender.length === 0) {
                roomChangeRequestsBody.innerHTML = `<tr><td colspan="9" class="p-4 text-center text-gray-600">Tidak ada formulir ganti ruang yang cocok dengan pencarian.</td></tr>`;
            } else {
                requestsToRender.forEach(request => {
                    let statusBadgeClass = '';
                    switch (request.status) {
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

                    const row = document.createElement('tr');
                    row.className = 'hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.tanggal}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.nama}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.dosen_pengampu}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.mata_kuliah}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.kelas}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.ruang}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${request.waktu}</td>
                        <td class="px-4 py-2 text-sm text-gray-500 max-w-[150px] truncate" title="${request.alasan}">${request.alasan}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            <select data-id="${request.id}" data-original-status="${request.status}" class="status-dropdown block w-full py-1 px-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-xs ${statusBadgeClass}">
                                <option value="Diproses" ${request.status === 'Diproses' ? 'selected' : ''}>Diproses</option>
                                <option value="Disetujui" ${request.status === 'Disetujui' ? 'selected' : ''}>Disetujui</option>
                                <option value="Ditolak" ${request.status === 'Ditolak' ? 'selected' : ''}>Ditolak</option>
                            </select>
                        </td>
                    `;
                    roomChangeRequestsBody.appendChild(row);
                });
            }
        }
        updateRoomRequestPaginationControls();
    } catch (error) {
        console.error("Fetch error for room change requests:", error);
        roomChangeRequestsBody.innerHTML = `<tr><td colspan="9" class="p-4 text-center text-red-600">Terjadi kesalahan jaringan atau server.</td></tr>`;
        totalRoomRequests = 0;
        updateRoomRequestPaginationControls();
    }
}

function updateRoomRequestPaginationControls() {
    const totalPages = Math.ceil(totalRoomRequests / itemsPerPage);
    roomRequestPaginationInfo.textContent = `${Math.min(totalRoomRequests, (currentRoomRequestPage - 1) * itemsPerPage + 1)}-${Math.min(totalRoomRequests, currentRoomRequestPage * itemsPerPage)} of ${totalRoomRequests}`;
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

// --- 4. Fungsi untuk Fetch dan Render Tabel Jadwal Kuliah ---
async function fetchAndRenderCourseSchedules() {
    courseScheduleBody.innerHTML = ''; // Kosongkan isi tabel

    const searchTerm = scheduleSearchInput.value.toLowerCase().trim();
    // URL API untuk mengambil jadwal kuliah dengan paginasi dan pencarian
    const url = `/SIGARA/php/get_schedules.php?page=${currentCourseSchedulePage}&limit=${itemsPerPage}&search=${encodeURIComponent(searchTerm)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) { // Cek jika respons HTTP tidak OK (misal: 403 Forbidden)
            if (response.status === 403) {
                 courseScheduleBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-red-600">Akses ditolak. Anda tidak memiliki izin untuk melihat data ini.</td></tr>`;
                 totalCourseSchedules = 0; // Reset total
                 updateCourseSchedulePaginationControls(); // Update paginasi untuk menampilkan 0
                 return;
            } else {
                 throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        const data = await response.json();

        if (data.status === 'error') {
            console.error("Error fetching schedules:", data.message);
            courseScheduleBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-red-600">Gagal memuat jadwal: ${data.message}</td></tr>`;
            totalCourseSchedules = 0;
        } else {
            globalCourseSchedulesData = data.schedules; // Simpan data yang di-fetch untuk edit modal
            totalCourseSchedules = data.totalItems;

            if (globalCourseSchedulesData.length === 0) {
                courseScheduleBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-gray-600">Tidak ada jadwal kuliah yang cocok dengan pencarian.</td></tr>`;
            } else {
                globalCourseSchedulesData.forEach(schedule => {
                    const row = document.createElement('tr');
                    row.className = 'hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">${schedule.kelas}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.hari}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.mata_kuliah}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.waktu}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.ruang}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${schedule.nama_dosen}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                            <button data-id="${schedule.id_jadwal}" class="edit-btn text-purple-600 hover:text-purple-900 mx-1 p-1 rounded-full hover:bg-purple-100"><i class="fas fa-edit"></i></button>
                            <button data-id="${schedule.id_jadwal}" class="delete-btn text-red-600 hover:text-red-900 mx-1 p-1 rounded-full hover:bg-red-100"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    `;
                    courseScheduleBody.appendChild(row);
                });
            }
        }
        updateCourseSchedulePaginationControls();
    } catch (error) {
        console.error("Fetch error for schedules:", error);
        courseScheduleBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-red-600">Terjadi kesalahan jaringan atau server.</td></tr>`;
        totalCourseSchedules = 0;
        updateCourseSchedulePaginationControls();
    }
}

function updateCourseSchedulePaginationControls() {
    const totalPages = Math.ceil(totalCourseSchedules / itemsPerPage);
    courseSchedulePaginationInfo.textContent = `${Math.min(totalCourseSchedules, (currentCourseSchedulePage - 1) * itemsPerPage + 1)}-${Math.min(totalCourseSchedules, currentCourseSchedulePage * itemsPerPage)} of ${totalCourseSchedules}`;
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

// --- 5. Fungsi untuk Membuka Modal (Add/Edit Jadwal) ---
function openScheduleModal(scheduleData = null) {
    editScheduleForm.reset(); // Kosongkan form
    editScheduleId.value = ''; // Pastikan ID bersih

    if (scheduleData) { // Mode Edit: isi form dengan data yang ada
        isEditMode = true;
        modalTitle.textContent = 'Edit Jadwal Kuliah';
        submitScheduleBtn.textContent = 'Simpan Perubahan';
        
        editScheduleId.value = scheduleData.id_jadwal; // Menggunakan id_jadwal
        editKelas.value = scheduleData.kelas;
        editHari.value = scheduleData.hari;
        editMataKuliah.value = scheduleData.mata_kuliah; // Menggunakan mata_kuliah
        editWaktu.value = scheduleData.waktu;
        editRuang.value = scheduleData.ruang;
        editDosen.value = scheduleData.nama_dosen; // Menggunakan nama_dosen
    } else { // Mode Tambah: kosongkan form
        isEditMode = false;
        modalTitle.textContent = 'Tambah Jadwal Kuliah Baru';
        submitScheduleBtn.textContent = 'Tambah Jadwal';
    }

    editScheduleModal.classList.remove('hidden'); // Tampilkan modal
}

// --- 6. Event Handlers ---

// Handle perubahan status untuk Formulir Ganti Ruang (Dropdown)
roomChangeRequestsBody.addEventListener('change', async (event) => {
    const targetSelect = event.target.closest('.status-dropdown');
    if (targetSelect) {
        const requestId = parseInt(targetSelect.dataset.id);
        const newStatus = targetSelect.value;
        const originalStatus = targetSelect.dataset.originalStatus; // Ambil status asli sebelum perubahan

        try {
            const response = await fetch('/SIGARA/php/update_change_request_status.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${requestId}&status=${encodeURIComponent(newStatus)}`
            });
            const data = await response.json();

            if (data.status === 'success') {
                console.log('Status berhasil diperbarui di database.');
                // Update data-original-status setelah berhasil diubah
                targetSelect.dataset.originalStatus = newStatus; 
                // Optional: tampilkan notifikasi kecil
            } else {
                console.error('Gagal memperbarui status:', data.message);
                alert('Gagal memperbarui status: ' + data.message);
                // Kembalikan dropdown ke nilai semula jika update gagal
                targetSelect.value = originalStatus; 
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghubungi server.');
            targetSelect.value = originalStatus; // Kembalikan nilai jika ada error jaringan
        }

        // Perbarui kelas elemen select untuk mencerminkan warna status baru (visual di frontend)
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
});

// Handle tombol edit/delete untuk Jadwal Kuliah
courseScheduleBody.addEventListener('click', async (event) => { // Pastikan fungsi ini async
    const editBtn = event.target.closest('.edit-btn');
    const deleteBtn = event.target.closest('.delete-btn');

    if (editBtn) {
        const scheduleId = parseInt(editBtn.dataset.id);
        const scheduleToEdit = globalCourseSchedulesData.find(s => s.id_jadwal === scheduleId); // Cari dari data yang sudah di-fetch
        if (scheduleToEdit) {
            openScheduleModal(scheduleToEdit);
        } else {
            alert('Jadwal tidak ditemukan.');
        }
    } else if (deleteBtn) {
        const scheduleId = parseInt(deleteBtn.dataset.id);
        if (confirm(`Apakah Anda yakin ingin menghapus jadwal ini (ID: ${scheduleId})?`)) {
            try {
                const response = await fetch('/SIGARA/php/delete_schedule.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `id=${scheduleId}` // Kirim ID ke backend
                });
                const data = await response.json();

                if (data.status === 'success') {
                    alert(data.message);
                    fetchAndRenderCourseSchedules(); // Muat ulang data setelah hapus
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error("Delete fetch error:", error);
                alert("Terjadi kesalahan jaringan atau server saat menghapus.");
            }
        }
    }
});

// Submit handler untuk Form Tambah/Edit Jadwal
editScheduleForm.addEventListener('submit', async (event) => { // Pastikan fungsi ini async
    event.preventDefault(); // Mencegah submit form default

    const formData = new FormData();
    formData.append('kelas', editKelas.value);
    formData.append('hari', editHari.value);
    formData.append('mataKuliah', editMataKuliah.value); // Sesuaikan dengan 'mata_kuliah' di PHP
    formData.append('waktu', editWaktu.value);
    formData.append('ruang', editRuang.value);
    formData.append('dosen', editDosen.value); // Sesuaikan dengan 'nama_dosen' di PHP

    let url = '';
    if (isEditMode) { // Jika mode edit
        url = '/SIGARA/php/update_schedule.php';
        formData.append('id', editScheduleId.value); // Sertakan ID untuk operasi update
    } else { // Jika mode tambah
        url = '/SIGARA/php/add_schedule.php';
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData // Mengirim data form
        });
        const data = await response.json();

        if (data.status === 'success') {
            alert(data.message);
            editScheduleModal.classList.add('hidden'); // Sembunyikan modal
            fetchAndRenderCourseSchedules(); // Muat ulang data jadwal
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Terjadi kesalahan jaringan atau server.");
    }
});

// Tombol Batal pada Modal Edit Jadwal
cancelEditBtn.addEventListener('click', () => {
    editScheduleModal.classList.add('hidden');
});

// Menutup modal jika klik di luar atau tekan ESC
editScheduleModal.addEventListener('click', (event) => {
    if (event.target === editScheduleModal) {
        editScheduleModal.classList.add('hidden');
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !editScheduleModal.classList.contains('hidden')) {
        editScheduleModal.classList.add('hidden');
    }
});

// --- Event Listener Paginasi dan Pencarian ---

// Paginasi Formulir Ganti Ruang
roomRequestPrevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentRoomRequestPage > 1) {
        currentRoomRequestPage--;
        fetchAndRenderRoomChangeRequests();
    }
});

roomRequestNextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const totalPages = Math.ceil(totalRoomRequests / itemsPerPage);
    if (currentRoomRequestPage < totalPages) {
        currentRoomRequestPage++;
        fetchAndRenderRoomChangeRequests();
    }
});

// Paginasi Jadwal Kuliah
courseSchedulePrevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (currentCourseSchedulePage > 1) {
        currentCourseSchedulePage--;
        fetchAndRenderCourseSchedules();
    }
});

courseScheduleNextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const totalPages = Math.ceil(totalCourseSchedules / itemsPerPage);
    if (currentCourseSchedulePage < totalPages) {
        currentCourseSchedulePage++;
        fetchAndRenderCourseSchedules();
    }
});

// Pencarian Jadwal Kuliah
scheduleSearchInput.addEventListener('input', () => {
    currentCourseSchedulePage = 1; // Reset ke halaman pertama saat mencari
    fetchAndRenderCourseSchedules();
});

// Pencarian Formulir Ganti Ruang
requestSearchInput.addEventListener('input', () => {
    currentRoomRequestPage = 1; // Reset ke halaman pertama saat mencari
    fetchAndRenderRoomChangeRequests();
});

// Tombol "Tambah Jadwal"
addScheduleBtn.addEventListener('click', () => {
    openScheduleModal(null); // Buka modal dalam mode tambah
});

// --- 7. Inisialisasi Saat Halaman Dimuat ---
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderRoomChangeRequests(); // Muat data formulir
    fetchAndRenderCourseSchedules(); // Muat data jadwal
});