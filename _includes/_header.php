<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start(); // Pastikan session dimulai
}
$isLoggedIn = isset($_SESSION['username']);
$namauser = $isLoggedIn ? $_SESSION['nama_user'] : '';
$role     = $isLoggedIn ? $_SESSION['role_user'] : '';
?>

<header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">

        <!-- Logo -->
        <a href="/SIGARA/index.php">
            <img src="/SIGARA/src/img/LOGO WEB.png" alt="SIGARA Logo" class="w-24 h-auto">
        </a>

        <!-- Menu Navigasi -->
        <ul class="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <li><a href="/SIGARA/index.php" class="hover:text-purple-700 transition">Beranda</a></li>
            <li><a href="/SIGARA/pages/jadwal.php" class="hover:text-purple-700 transition">Jadwal</a></li>
            <li><a href="/SIGARA/pages/ruangan.php" class="hover:text-purple-700 transition">Ruangan</a></li>
            <li><a href="/SIGARA/pages/gantiruang.php" class="hover:text-purple-700 transition">Ganti Ruang</a></li>

            <!-- Admin Only -->
            <?php if ($role === 'Admin'): ?>
            <li><a href="/SIGARA/pages/DashboardAdmin.php" class="hover:text-purple-700 transition">Administrasi</a></li>
            <?php endif; ?>
        </ul>

        <!-- User Info -->
        <?php if ($isLoggedIn): ?>
        <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                    <i class="fas fa-user text-purple-700"></i>
                </div>
                <span class="font-semibold text-gray-700"><?= htmlspecialchars($namauser) ?></span>
            </div>
            <a href="/SIGARA/php/logout.php"
               class="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition">
                Logout
            </a>
        </div>
        <?php else: ?>
        <a href="/SIGARA/pages/login.php"
           class="bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-800 transition">
            Login
        </a>
        <?php endif; ?>
    </nav>
</header>
