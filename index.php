<?php
session_start();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGARA - Sistem Informasi Ganti Ruang & Jadwal Akademik</title>
    <link href="/SIGARA/dist/output.css" rel="stylesheet" /> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="bg-white font-sans">
    <!-- <pre><?php print_r($_SESSION); ?></pre> -->
    <?php include "_includes/_header.php"; ?>
    <main>
        <!-- Konten Hero Section -->
        <section class="container mx-auto px-4 pt-12 pb-24 max-w-7xl">
            <div class="grid md:grid-cols-2 items-center gap-8">
                <div class="space-y-6">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Sistem Informasi Ganti Ruang & Jadwal Akademik
                    </h1>
                    <p class="text-lg text-gray-500">Kampus E, Universitas Gunadarma</p>
                    <div class="flex space-x-4 pt-4">
                        <!-- Perbaiki link agar mengarah ke halaman di folder pages/ -->
                        <a href="/SIGARA/pages/jadwal.php" class="bg-custom-purple text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">Cek Jadwal</a>
                        <a href="/SIGARA/pages/ruangan.php" class="bg-white text-gray-600 font-semibold px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Cek Ruangan</a>
                    </div>
                </div>
                <div class="hidden md:block">
                    <img src="./src/img/Gunadarma.png" alt="Kampus E Universitas Gunadarma" class="w-full h-full object-cover rounded-lg hero-image-clip">
                </div>
            </div>
        </section>

        <!-- Section Fitur -->
        <section class="bg-white py-20">
            <div class="container mx-auto px-4 max-w-6xl">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Card 1: Periksa Jadwal -->
                    <div class="bg-card-purple border border-card-purple rounded-xl p-6 text-center flex flex-col items-center shadow-md">
                        <div class="bg-icon-purple rounded-xl p-4 inline-block mb-4">
                            <!-- Pastikan path gambar benar relatif dari index.html -->
                            <img src="./src/img/calender.png" class="h-10 w-10" alt="Calendar Icon"> 
                        </div>
                        <p class="font-semibold text-gray-700">Periksa Jadwal Terbaru Secara Langsung</p>
                    </div>

                    <!-- Card 2: Proses Ganti Ruang -->
                    <div class="bg-card-green border border-card-green rounded-xl p-6 text-center flex flex-col items-center shadow-md">
                        <div class="bg-icon-green rounded-xl p-4 inline-block mb-4">
                            <!-- Pastikan path gambar benar relatif dari index.html -->
                            <img src="./src/img/puter.png" class="h-10 w-10" alt="Computer Icon">
                        </div>
                        <p class="font-semibold text-gray-700">Proses Ganti Ruang Mudah</p>
                    </div>
                    
                    <!-- Card 3: Pantau Status Form -->
                    <div class="bg-card-gray border border-card-gray rounded-xl p-6 text-center flex flex-col items-center shadow-md">
                        <div class="bg-icon-gray rounded-xl p-4 inline-block mb-4">
                            <!-- Pastikan path gambar benar relatif dari index.html -->
                            <img src="./src/img/pc.png" class="h-10 w-10" alt="Monitor Icon"> 
                        </div>
                        <p class="font-semibold text-gray-700">Pantau Langsung Status Form Anda</p>
                    </div>

                    <!-- Card 4: Cepat dan Efisien -->
                    <div class="bg-card-pink border border-card-pink rounded-xl p-6 text-center flex flex-col items-center shadow-md">
                        <div class="bg-icon-pink rounded-xl p-4 inline-block mb-4">
                            <!-- Pastikan path gambar benar relatif dari index.html -->
                            <img src="./src/img/jam.png" class="h-10 w-10" alt="Clock Icon">
                        </div>
                        <p class="font-semibold text-gray-700">Cepat dan Efisien</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Placeholder untuk Footer (path yang benar untuk file di root) -->
    <div id="footer-placeholder" data-include-path="/SIGARA/_includes/_footer.php"></div>
    <!-- Script untuk memuat header dan footer -->
    <script src="/SIGARA/dist/js/loadIncludes.js"></script>
    
</body>
</html>