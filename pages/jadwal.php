<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SIGARA - Jadwal</title>
  <link href="../dist/output.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body class="bg-gray-50 flex flex-col min-h-screen">
  <!-- Header -->
  <?php include __DIR__ . '/../_includes/_header.php'; ?>

  <!-- Main Content -->
  <main class="flex-grow flex justify-center px-4 py-10">
    <div class="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8 self-start">
      <!-- Title -->
      <div class="flex items-center justify-between mb-10">
        <h1 class="text-4xl font-bold text-gray-800">Jadwal Kuliah</h1>
      </div>

      <!-- Search Row -->
<!-- Search Row -->
    <div class="flex justify-center mb-8">
      <div class="flex items-center space-x-3">
        <label for="schedule-search-input" class="text-base font-medium text-gray-700">
          Cari Jadwal:
        </label>
        <input
          type="text"
          id="schedule-search-input"
          placeholder="Kelas, Ruang, Dosen, dll..."
          class="p-2 border border-gray-300 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
    </div>


      <!-- Table (fit 10 rows) -->
    <div class="overflow-x-auto border border-gray-200 rounded-lg">
    <div class="min-h-[560px] w-full table">
        <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-purple-700 text-white uppercase text-xs sticky top-0 z-10">
            <tr>
            <th class="px-4 py-3 text-left font-semibold">Kelas</th>
            <th class="px-4 py-3 text-left font-semibold">Hari</th>
            <th class="px-4 py-3 text-left font-semibold">Mata Kuliah</th>
            <th class="px-4 py-3 text-left font-semibold">Waktu</th>
            <th class="px-4 py-3 text-left font-semibold">Ruang</th>
            <th class="px-4 py-3 text-left font-semibold">Dosen</th>
            </tr>
        </thead>
        <tbody id="course-schedule-body" class="bg-white divide-y divide-gray-200">
            <!-- Dynamic content will go here -->
        </tbody>
        </table>
    </div>
    </div>

      <!-- Pagination -->
      <div class="mt-4 text-xs text-gray-500 text-right">
        <span id="course-schedule-pagination-info">1-10 of 87</span>
        <span class="ml-4">
          <a href="#" class="text-purple-600 hover:text-purple-800" id="course-schedule-prev">Previous</a>
          <span class="mx-2" id="course-schedule-current-page">1</span>
          <a href="#" class="text-purple-600 hover:text-purple-800" id="course-schedule-next">Next</a>
        </span>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer id="footer-placeholder" data-include-path="../_includes/_footer.php" class="mt-auto"></footer>

  <!-- Scripts -->
  <script src="/SIGARA/dist/js/loadIncludes.js" defer></script>
  <script src="/SIGARA/src/js/Jadwal.js" defer></script>
</body>
</html>
