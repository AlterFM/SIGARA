
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGARA - Ruang Kelas</title>
    <link href="../dist/output.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 min-h-screen flex flex-col">
    <!-- Header Placeholder -->
    <div id="header-placeholder" data-include-path="../_includes/_header.php"></div>

    <main class="flex-grow p-8 flex">
        <div class="container mx-auto bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-xl font-bold text-gray-800">Ruang Kelas - Kampus E</h1>
                <p class="text-sm text-gray-600">Sabtu, 15 Mei 2025<br>Jam: 20 : 42</p>
            </div>

            <div class="flex space-x-6">
                <aside class="w-64 flex-shrink-0">
                    <div class="bg-white border border-gray-300 rounded-lg p-4 mb-6">
                        <h2 class="font-semibold text-gray-800 mb-3">Pilih Gedung :</h2>
                        <div id="gedung-buttons" class="space-y-2">
                            <button data-gedung="1" class="w-full text-left px-4 py-2 rounded-md bg-purple-700 text-white font-medium shadow">Gedung 1</button>
                            <button data-gedung="2" class="w-full text-left px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Gedung 2</button>
                            <button data-gedung="3" class="w-full text-left px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Gedung 3</button>
                            <button data-gedung="4" class="w-full text-left px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Gedung 4</button>
                            <button data-gedung="5" class="w-full text-left px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Gedung 5</button>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-300 rounded-lg p-4">
                        <h2 class="font-semibold text-gray-800 mb-3">Waktu :</h2>
                        <div class="space-y-3">
                            <div>
                                <label for="tanggal" class="block text-sm text-gray-700 mb-1">Tanggal :</label>
                                <input type="date" id="tanggal" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
                            </div>
                            <div>
                                <label for="hari" class="block text-sm text-gray-700 mb-1">Hari :</label>
                                <input type="text" id="hari" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500" readonly>
                            </div>
                            <div>
                                <label for="jam" class="block text-sm text-gray-700 mb-1">Jam :</label>
                                <input type="time" id="jam" class="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500">
                            </div>
                        </div>
                    </div>
                </aside>

                <section class="flex-grow">
                    <div id="lantai-buttons" class="flex space-x-2 mb-4">
                        <button data-lantai="1" class="px-6 py-2 rounded-t-md bg-purple-700 text-white font-medium">Lantai 1</button>
                        <button data-lantai="2" class="px-6 py-2 rounded-t-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Lantai 2</button>
                        <button data-lantai="3" class="px-6 py-2 rounded-t-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Lantai 3</button>
                        <button data-lantai="4" class="px-6 py-2 rounded-t-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Lantai 4</button>
                    </div>

                    <div class="border border-gray-300 rounded-lg overflow-hidden">
                        <div class="grid grid-cols-10 text-center text-sm font-semibold text-gray-700 bg-gray-100 border-b border-gray-300">
                            <div class="p-3 border-r border-gray-300">R/W</div>
                            <div class="p-3 border-r border-gray-300">Jam-1</div>
                            <div class="p-3 border-r border-gray-300">Jam-2</div>
                            <div class="p-3 border-r border-gray-300">Jam-3</div>
                            <div class="p-3 border-r border-gray-300">Jam-4</div>
                            <div class="p-3 border-r border-gray-300">Jam-5</div>
                            <div class="p-3 border-r border-gray-300">Jam-6</div>
                            <div class="p-3 border-r border-gray-300">Jam-7</div>
                            <div class="p-3 border-r border-gray-300">Jam-8</div>
                            <div class="p-3">Jam-9</div>
                            </div>

                        <div id="room-schedule-body">
                            </div>
                    </div>
                </section>
            </div>
        </div>
    </main>

    <!-- Footer Placeholder -->
    <div id="footer-placeholder" data-include-path="../_includes/_footer.php"></div>
    <script src="../src/js/loadIncludes.js" defer></script>
    <script src="../src/js/ruangan.js" defer></script>
</body>
</html>