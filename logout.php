<?php
  session_start(); // Start session

  session_unset(); // Unset the Data

  session_destroy(); // Destroy my session

  header ('Location: index.php');

  exit();

 ?>
