<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login - SIGARA</title>
  <link href="../dist/output.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4 sm:p-6">
  <!-- Container -->
  <div class="relative w-full max-w-md sm:w-[22.5rem] border border-purple-300 rounded-xl shadow-lg px-8 py-6 bg-white"> 

    <!-- Close Button -->
    <button onclick="window.location.href='../index.php'"
            class="absolute top-3 right-3 text-red-600 hover:bg-red-700 text-white text-xl font-bold
                   focus:outline-none p-1 rounded-full transition duration-200 z-10
                   w-6 h-6 flex items-center justify-center bg-red-600">
        <i class="fas fa-times"></i> 
    </button>

    <!-- Logo -->
    <div class="mb-4 mt-4 text-center"> 
      <img src="../src/img/LOGO WEB.png" alt="SIGARA Logo" class="mx-auto w-36" />
    </div>

    <!-- Form -->
    <div class="text-left mt-2">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Login</h2> 

      <form id="loginForm">
        <label for="username" class="text-sm text-gray-700 block mb-1">Username</label>
        <input type="text" id="username" name="username" required
               class="w-full px-3 py-2 mb-4 border border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>

        <label for="password" class="text-sm text-gray-700 block mb-1">Password</label>
        <input type="password" id="password" name="password" required
               class="w-full px-3 py-2 mb-6 border border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/>

        <button type="submit"
                class="w-full bg-purple-700 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition mb-2">
          Login
        </button>

        <button type="button"
                onclick="window.location.href='register.php'"
                class="w-full border-2 border-purple-700 text-purple-700 py-2 rounded-md text-sm font-medium hover:bg-purple-100 transition">
          Register
        </button>
      </form>
    </div>
  </div>

  <!-- Login JS Script -->
<script>
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("/SIGARA/php/auth_login.php", {
    method: "POST",
    body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(result => {
        if (result.status === "success") {
            alert("Login berhasil sebagai " + result.role);
            if (result.role === "Dosen") {
                window.location.href = "../pages/gantiruang.php";
            } else {
                window.location.href = "../pages/jadwal.php";
            }
        } else {
            alert(result.message);
        }
    })
    .catch(error => {
        console.error("Login Error:", error);
        alert("Terjadi kesalahan saat login.");
    });
});
</script>

</body>
</html>
