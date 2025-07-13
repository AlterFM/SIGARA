<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGARA - Ruang Kelas</title>
    <link href="../dist/output.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="bg-gray-100 min-h-screen flex flex-col">
    <?php include __DIR__ . '/../_includes/_header.php'; ?>

    <main class="flex-grow p-8 flex">
        <div class="container mx-auto bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-xl font-bold text-gray-800">Ruang Kelas - Kampus E</h1>
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

                    </aside>
                <div class="mb-4">
                    <label for="hari-select" class="block text-sm font-medium text-gray-700 mb-1">Pilih Hari:</label>
                    <select id="hari-select" class="block w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="Senin">Senin</option>
                        <option value="Selasa">Selasa</option>
                        <option value="Rabu">Rabu</option>
                        <option value="Kamis">Kamis</option>
                        <option value="Jum'at">Jum'at</option>
                        <option value="Sabtu">Sabtu</option>
                    </select>
                </div>


                <section class="flex-grow">
                    <div id="lantai-buttons" class="flex space-x-2 mb-4">
                        <button data-lantai="1" class="px-6 py-2 rounded-t-md bg-purple-700 text-white font-medium">Lantai 1</button>
                        <button data-lantai="2" class="px-6 py-2 rounded-t-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Lantai 2</button>
                        <button data-lantai="3" class="px-6 py-2 rounded-t-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Lantai 3</button>
                        <button data-lantai="4" class="px-6 py-2 rounded-t-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200">Lantai 4</button>
                    </div>

                    <div class="border border-gray-300 rounded-lg overflow-hidden">
                        <div class="grid grid-cols-11 text-center text-sm font-semibold text-gray-700 bg-gray-100 border-b border-gray-300">
                            <div class="p-3 border-r border-gray-300">R/W</div>
                            <div class="p-3 border-r border-gray-300">Jam-1</div>
                            <div class="p-3 border-r border-gray-300">Jam-2</div>
                            <div class="p-3 border-r border-gray-300">Jam-3</div>
                            <div class="p-3 border-r border-gray-300">Jam-4</div>
                            <div class="p-3 border-r border-gray-300">Jam-5</div>
                            <div class="p-3 border-r border-gray-300">Jam-6</div>
                            <div class="p-3 border-r border-gray-300">Jam-7</div>
                            <div class="p-3 border-r border-gray-300">Jam-8</div>
                            <div class="p-3 border-r border-gray-300">Jam-9</div>
                            <div class="p-3">Jam-10</div>
                        </div>

                        <div id="room-schedule-body">
                            </div>
                    </div>
                </section>
            </div>
        </div>
    </main>

    <div id="footer-placeholder" data-include-path="../_includes/_footer.php"></div>
    <script src="../src/js/loadIncludes.js" defer></script>
    <script src="../src/js/ruangan.js" defer></script>
</body>
</html>