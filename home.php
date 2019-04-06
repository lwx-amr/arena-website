<?php
  $pageTitle = "Arena - Home";
  include 'init.php' ;
  session_start();
  if(!isset($_SESSION['username'])){
    header('Location: login.php');
    exit();
  }
  include $tp1.'header.php';
?>
  <!-- Start Home -->
  <div class="home">
    <div class="container">
      <!-- Start Body -->
      <div class="content">
        
      </div>
    </div>
    <!-- End Body -->
  </div>
  <!-- End Home -->
<?php include $tp1.'/footer.php'; ?>
