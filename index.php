<?php
  $pageTitle = "Arena";
  $noNavbar = "";
  $noEnd = "";
  include 'init.php' ;
  include $tp1.'/header.php';
?>
  <div class="interface">
    <div class="overlay text-center">
      <div class="text">
        <h1>Arena</h1>
        <p class="nice-font">Social Media Network</p>
      </div>
      <div class="welcome">
        <p>Welcome to Arena</p>
        <p>Please Sign in or Register to Continue</p>
      </div>
      <div class="buttons d-flex">
        <a href="login.php" class="btn">
          Sign in
        </a>
        <a href="register.php" class="btn">
          Sign up
        </a>
      </div>
    </div>
  </div>
<?php include $tp1.'/footer.php';?>
