<?php
session_start();
include 'db.php';

$username = mysqli_real_escape_string($conn, $_POST['username']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

$query = "SELECT * FROM user WHERE username='$username' AND password='$password' AND status_user='Aktif'";
$result = $conn->query($query);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    $_SESSION['id_user']     = $user['id_user'];
    $_SESSION['username']    = $user['username'];
    $_SESSION['nama_user']   = $user['nama_user'];  
    $_SESSION['role_user']   = $user['role_user'];


    echo json_encode([
        'status' => 'success',
        'role' => $user['role_user']
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Username atau password salah, atau akun tidak aktif.'
    ]);
}
?>
