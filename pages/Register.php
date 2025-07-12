<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SIGARA Register</title>
    <link href="../dist/output.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-100 font-sans p-4 sm:p-6">

    <!-- Register Container -->
    <div class="relative bg-white px-8 py-6 rounded-xl shadow-lg text-center w-full max-w-md sm:w-[22.5rem] border border-purple-300">
        <!-- Container: relative untuk positioning tombol close, bg-white, padding, shadow, lebar, border -->

        <!-- Close Button (Consistent with Login Page) -->
        <button onclick="window.location.href='../index.php'"
                class="absolute top-3 right-3 text-red-600 hover:bg-red-700 text-white text-xl font-bold
                       focus:outline-none p-1 rounded-full transition duration-200 z-10
                       w-6 h-6 flex items-center justify-center bg-red-600">
            <i class="fas fa-times"></i> 
        </button>

        <!-- Logo -->
        <div class="mb-4 mt-4"> 
            <img src="../src/img/LOGO WEB.png" alt="SIGARA Logo" class="mx-auto w-36"> 
        </div>

        <!-- Register Form -->
        <div class="mt-4 text-left"> 
            <h2 class="text-lg font-bold text-gray-800 mb-4">Register</h2> 

            <form>
                <label for="nama" class="block text-sm text-gray-700 mb-1">Nama</label>
                <input type="text" id="nama" name="nama"
                       class="w-full px-3 py-2 mb-4 border border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">

                <label for="username" class="block text-sm text-gray-700 mb-1">Username</label>
                <input type="text" id="username" name="username"
                       class="w-full px-3 py-2 mb-4 border border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">

                <label for="password" class="block text-sm text-gray-700 mb-1">Password</label>
                <input type="password" id="password" name="password"
                       class="w-full px-3 py-2 mb-4 border border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">

                <label for="no_telp" class="block text-sm text-gray-700 mb-1">No Telp</label>
                <input type="text" id="no_telp" name="no_telp"
                       class="w-full px-3 py-2 mb-6 border border-gray-300 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                
                <div class="flex justify-start items-center gap-5 mb-6"> 
                    <input type="radio" id="dosen" name="user_type" value="dosen"
                           class="form-radio h-4 w-4 text-purple-600 border-purple-600 focus:ring-purple-500">
                    <label for="dosen" class="text-sm text-gray-700 cursor-pointer">Dosen</label>

                    <input type="radio" id="mahasiswa" name="user_type" value="mahasiswa"
                           class="form-radio h-4 w-4 text-purple-600 border-purple-600 focus:ring-purple-500">
                    <label for="mahasiswa" class="text-sm text-gray-700 cursor-pointer">Mahasiswa</label>
                </div>

                <button type="submit"
                        class="w-full bg-purple-700 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition mb-2">
                    Register
                </button>
            </form>
            <p class="mt-4 text-sm text-gray-600">Sudah punya akun? 
                <a href="login.php" class="text-purple-700 hover:underline font-semibold">Login di sini</a>
            </p>
        </div>
    </div>
    <script>
    document.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        const response = await fetch('/SIGARA/php/register.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert(result.message);
            window.location.href = 'login.php';
        } else {
            alert(result.message);
        }
    });
    </script>

</body>
</html>