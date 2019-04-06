<?php
    include 'init.php';

  class loginClass
  {
    var $username;
    var $password;
  }
  function login(){

    // Search with prepare for more security
    $stmt = $con->prepare("SELECT username, password FROM account WHERE username = ? AND password = ? ");
    $stmt ->execute(array($username,$password));

    // Number of elements found
    $count = $stmt ->rowCount();

    if ($count>0){
      $session_start();
      $_SESSION['username'] = $username; // Register SESSION Name
      header('Location: home.php'); // Redirect to home
      exit();
    }

  }

?>
