<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGARA - Jadwal</title>
    <link href="../dist/output.css" rel="stylesheet" />
</head>

<body>
    <div id="header-placeholder" data-include-path="../_includes/_header.php"></div>
    <main class="flex-grow p-8">
        <div class="container mx-auto bg-white rounded-lg shadow-lg p-8 max-w-7xl">
            <section>
                <h1 class="text-2xl font-bold text-gray-800 mb-6 flex justify-between items-center">
                    Jadwal Kuliah
                    <div class="flex items-center space-x-4">
                        <label for="schedule-search-input" class="text-base font-semibold text-gray-700">Cari Jadwal :</label>
                        <input type="text" id="schedule-search-input" placeholder="Kelas, Ruang, Dosen, dll..." class="p-2 border border-gray-300 rounded-md text-sm w-64">

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
    
    <div id="footer-placeholder" data-include-path="../_includes/_footer.php"></div>
    <script src="../src/js/loadIncludes.js" defer></script>
    <script src="../src/js/Jadwal.js" defer></script>
</body>
</html>