<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: ../pages/login.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIGARA - Ganti Ruang</title>
    <link href="/SIGARA/dist/output.css" rel="stylesheet" /> 
</head>

<body class="bg-gray-100 min-h-screen flex flex-col">

  <!-- Section 1: Header -->
  <header id="header-placeholder" data-include-path="../_includes/_header.php"></header>

  <!-- Section 2: Main Content -->
  <main class="flex-grow p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Ganti Ruang - Kampus E</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Kolom 1: Gambar -->
      <section class="flex justify-center items-start pt-4">
        <img src="../src/img/orang.png" alt="Illustration" class="max-w-full h-auto w-450 lg:w-450">
      </section>

      <!-- Kolom 2: Formulir Ganti Ruang -->
      <section class="w-full max-w-md mx-auto">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-5 text-center">Formulir Ganti Ruang</h2>
          <form class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Tanggal :</label>
              <input type="text" value="19/05/2025" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600">
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Nama :</label>
              <input type="text" value="Daffa Dio" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600">
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Nama Dosen Pengampu :</label>
              <input type="text" value="Emastuti" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600">
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">MataKuliah :</label>
              <input type="text" value="Konsep Data Mining" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600">
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Kelas :</label>
              <input type="text" value="3A13" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600">
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Ruang :</label>
              <input type="text" value="E 112" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600">
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Waktu :</label>
              <input type="text" value="Jam ke 1/2" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600">
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Alasan :</label>
              <textarea class="p-2 border border-gray-300 rounded-md bg-gray-50 min-h-[80px] resize-y focus:ring-2 focus:ring-purple-200 focus:border-purple-600">Ruangan Terlalu Panas Dan AC Tidak Dingin Proyektor tidak bisa dipakai</textarea>
            </div>
            <button type="submit" class="bg-purple-700 text-white py-3 px-7 rounded-md font-semibold text-base self-end hover:bg-purple-800 transition">Kirim</button>
          </form>
        </div>
      </section>

      <!-- Kolom 3: Status dan Info -->
      <section class="flex flex-col gap-5 w-full max-w-sm mx-auto">
        <!-- Status -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-5">Status Formulir Ganti Ruang</h2>
          <div class="flex flex-col">
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <span class="text-sm text-gray-600 w-[110px]">Form : 09/04/2025</span>
              <span class="text-base text-gray-700 flex-grow mx-3">Ruang E126 Tersedia</span>
              <span class="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Disetujui</span>
            </div>
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <span class="text-sm text-gray-600 w-[110px]">Form : 09/04/2025</span>
              <span class="text-base text-gray-700 flex-grow mx-3">Dalam peninjauan Admin</span>
              <span class="px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold">Diproses</span>
            </div>
            <div class="flex items-center justify-between py-3">
              <span class="text-sm text-gray-600 w-[110px]">Form : 09/04/2025</span>
              <span class="text-base text-gray-700 flex-grow mx-3">Tidak ada ruang kosong</span>
              <span class="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">Ditolak</span>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-5">Info Penting</h2>
          <p class="text-base text-gray-700 mb-2"><strong>Jam Operasional</strong></p>
          <p class="text-base text-gray-700 mb-2">Senin - Jumat : 07.00 - 16.00 WIB</p>
          <p class="text-base text-gray-700 mb-2">Sabtu Pukul : 09.00 - 16.00 WIB</p>
          <p class="text-base text-gray-700 mb-5">Minggu/Hari Nasional : Libur</p>
          <p class="text-sm text-gray-600 border-t pt-4 leading-relaxed">Setiap formulir yang diajukan diluar jam operasional akan diproses dikemudian hari pada hari kerja</p>
        </div>
      </section>
    </div>
  </main>
  <!-- Section 3: Footer -->
  <footer id="footer-placeholder" data-include-path="../_includes/_footer.php"></footer>

  <script src="../src/js/loadIncludes.js" defer></script>
</body>
</html>
