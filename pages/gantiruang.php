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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"> 
</head>
<body class="bg-gray-100 min-h-screen flex flex-col">
  <header id="header-placeholder" data-include-path="../_includes/_header.php"></header>

  <main class="flex-grow p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Ganti Ruang - Kampus E</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Kolom Gambar -->
      <section class="flex justify-center items-start pt-4">
        <img src="../src/img/adminpic.png" alt="Illustration" class="max-w-full h-auto w-450 lg:w-450">
      </section>

      <!-- Formulir Ganti Ruang -->
      <section class="w-full max-w-md mx-auto">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-5 text-center">Formulir Ganti Ruang</h2>
          <form action="../php/submit_gantiruang.php" method="POST" class="flex flex-col gap-4">
            <?php
              function inputField($label, $name, $type = 'text') {
                echo '<div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-1">' . $label . ':</label>
                  <input name="' . $name . '" type="' . $type . '" class="p-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-purple-200 focus:border-purple-600" required>
                </div>';
              }
              inputField('Tanggal', 'tanggal', 'date');
              inputField('Nama', 'nama');
              inputField('Nama Dosen Pengampu', 'dosen');
              inputField('MataKuliah', 'matakuliah');
              inputField('Kelas', 'kelas');
              inputField('Ruang', 'ruang');
              inputField('Waktu', 'waktu');
            ?>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-1">Alasan:</label>
              <textarea name="alasan" class="p-2 border border-gray-300 rounded-md bg-gray-50 min-h-[80px] resize-y focus:ring-2 focus:ring-purple-200 focus:border-purple-600" required></textarea>
            </div>
            <button type="submit" class="bg-purple-700 text-white py-3 px-7 rounded-md font-semibold text-base self-end hover:bg-purple-800 transition">Kirim</button>
          </form>
        </div>
      </section>

      <!-- Status dan Info -->
      <section class="flex flex-col gap-5 w-full max-w-sm mx-auto">
        <!-- Status Formulir -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-5">Status Formulir Ganti Ruang</h2>
          <div class="flex flex-col">
            <?php
            include '../php/db.php';
            $result = $conn->query("SELECT * FROM form_ganti_ruang ORDER BY id DESC LIMIT 5");
            while ($row = $result->fetch_assoc()) {
                $badgeColor = 'bg-yellow-500';
                if ($row['status'] === 'Disetujui') $badgeColor = 'bg-green-500';
                elseif ($row['status'] === 'Ditolak') $badgeColor = 'bg-red-500';
                echo '<div class="flex items-center justify-between py-3 border-b border-gray-100">
                        <span class="text-sm text-gray-600 w-[110px]">Form: ' . date('d/m/Y', strtotime($row['tanggal'])) . '</span>
                        <span class="text-base text-gray-700 flex-grow mx-3">' . htmlspecialchars($row['alasan']) . '</span>
                        <span class="px-3 py-1 ' . $badgeColor . ' text-white rounded-full text-xs font-semibold">' . $row['status'] . '</span>
                      </div>';
            }
            ?>
          </div>
        </div>

        <!-- Info Penting -->
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

  <footer id="footer-placeholder" data-include-path="../_includes/_footer.php"></footer>
  <script src="../src/js/loadIncludes.js" defer></script>
</body>
</html>
