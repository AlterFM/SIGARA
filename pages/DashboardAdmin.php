<?php
session_start();
if (!isset($_SESSION['role_user']) || $_SESSION['role_user'] !== 'Admin') {
    header("Location: ../index.php");
    exit();
}
?>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGARA - Admin Dashboard</title>
    <link rel="stylesheet" href="../dist/output.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* Custom styles for modal overlay */
        .modal-overlay {
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px); /* Optional: adds a blur effect */
        }
    </style>
</head>

<body class="bg-gray-100 min-h-screen flex flex-col">
    <!-- Header Placeholder -->
    <div id="header-placeholder" data-include-path="../_includes/_header.php"></div>

    <main class="flex-grow p-8">
        <div class="container mx-auto bg-white rounded-lg shadow-lg p-8 max-w-7xl"> 

            <section class="mb-10">
                <h1 class="text-2xl font-bold text-gray-800 mb-6">Daftar Formulir Ganti Ruang</h1>

                <div class="mb-4 flex justify-between items-center">
                    <input type="text" id="request-search-input" placeholder="Cari Tanggal, Nama, Mata Kuliah..." class="p-2 border border-gray-300 rounded-md text-sm w-80">
                </div>

                <div class="overflow-x-auto overflow-y-auto max-h-96 border border-gray-200 rounded-lg"> 
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50 sticky top-0 z-10"> 
                            <tr>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosen</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Kuliah</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruang</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alasan</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody id="room-change-requests-body" class="bg-white divide-y divide-gray-200">
                            </tbody>
                    </table>
                </div>
                <div class="px-4 py-2 bg-gray-50 text-right text-xs text-gray-500 rounded-b-lg border-t border-gray-200">
                    <span id="room-request-pagination-info">1-10 of 87</span>
                    <span class="ml-4">
                        <a href="#" class="text-purple-600 hover:text-purple-800" id="room-request-prev">Previous</a>
                        <span class="mx-2" id="room-request-current-page">1</span>
                        <a href="#" class="text-purple-600 hover:text-purple-800" id="room-request-next">Next</a>
                    </span>
                </div>
            </section>

            <section>
                <h1 class="text-2xl font-bold text-gray-800 mb-6 flex justify-between items-center">
                    Jadwal Kuliah
                    <div class="flex items-center space-x-4">
                        <label for="schedule-search-input" class="text-base font-semibold text-gray-700">Cari Jadwal :</label>
                        <input type="text" id="schedule-search-input" placeholder="Kelas, Ruang, Dosen, dll..." class="p-2 border border-gray-300 rounded-md text-sm w-64">
                        <button id="add-schedule-btn" class="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300">
                            <i class="fas fa-plus mr-2"></i>Tambah Jadwal
                        </button>
                    </div>
                </h1>

                <div class="overflow-x-auto overflow-y-auto max-h-96 border border-gray-200 rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50 sticky top-0 z-10"> 
                            <tr>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hari</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Kuliah</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruang</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosen</th>
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody id="course-schedule-body" class="bg-white divide-y divide-gray-200">
                            </tbody>
                    </table>
                </div>
                <div class="px-4 py-2 bg-gray-50 text-right text-xs text-gray-500 rounded-b-lg border-t border-gray-200">
                    <span id="course-schedule-pagination-info">1-10 of 87</span>
                    <span class="ml-4">
                        <a href="#" class="text-purple-600 hover:text-purple-800" id="course-schedule-prev">Previous</a>
                        <span class="mx-2" id="course-schedule-current-page">1</span>
                        <a href="#" class="text-purple-600 hover:text-purple-800" id="course-schedule-next">Next</a>
                    </span>
                </div>
            </section>

        </div>
    </main>



    <div id="edit-schedule-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50 modal-overlay">
        <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 id="modal-title" class="text-xl font-bold mb-4">Edit Jadwal Kuliah</h2> 
            <form id="edit-schedule-form">
                <input type="hidden" id="edit-schedule-id">
                <div class="mb-4">
                    <label for="edit-kelas" class="block text-gray-700 text-sm font-bold mb-2">Kelas:</label>
                    <input type="text" id="edit-kelas" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="mb-4">
                    <label for="edit-hari" class="block text-gray-700 text-sm font-bold mb-2">Hari:</label>
                    <input type="text" id="edit-hari" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="mb-4">
                    <label for="edit-mata-kuliah" class="block text-gray-700 text-sm font-bold mb-2">Mata Kuliah:</label>
                    <input type="text" id="edit-mata-kuliah" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="mb-4">
                    <label for="edit-waktu" class="block text-gray-700 text-sm font-bold mb-2">Waktu:</label>
                    <input type="text" id="edit-waktu" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="mb-4">
                    <label for="edit-ruang" class="block text-gray-700 text-sm font-bold mb-2">Ruang:</label>
                    <input type="text" id="edit-ruang" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="mb-6">
                    <label for="edit-dosen" class="block text-gray-700 text-sm font-bold mb-2">Dosen:</label>
                    <input type="text" id="edit-dosen" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                </div>
                <div class="flex items-center justify-between">
                    <button type="submit" id="submit-schedule-btn" class="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Simpan Perubahan</button>
                    <button type="button" id="cancel-edit-btn" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Batal</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Footer Placeholder -->
    <div id="footer-placeholder" data-include-path="../_includes/_footer.php"></div>
    <script src="../src/js/loadIncludes.js" defer></script>
    <script src="../src/js/DashboardAdmin.js"></script>
</body>
</html>