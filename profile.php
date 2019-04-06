<?php

  $profile="";
  $pageTitle = "Arena - Profile";
  include 'init.php' ;
  session_start();
  if(!isset($_SESSION['username'])){
    header('Location: login.php');
    exit();
  }
  include $tp1.'header.php';
?>

  <!-- Start Home -->
  <div class="profile">
    <div class="container">
      <!-- Start Body -->
      <div class="content">
        <div class="head text-center">
          <h2 class="h1">Your Profile</h2>
        </div>
      </div>
    </div>
    <!-- End Body -->
  </div>
  <!-- End Home -->

<?php include $tp1.'/footer.php'; ?>
