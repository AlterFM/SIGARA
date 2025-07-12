<?php
session_start();
session_destroy();
header("Location: /SIGARA/index.php");
exit;
?>
