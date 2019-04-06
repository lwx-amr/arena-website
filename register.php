<?php
  session_start();
  if(isset($_SESSION['username'])){
    header ('Location: home.php');
    exit();
  }else{

  }
  $noNavbar = "";
  $noEnd = "";
  $pageTitle = "Arena - Register";
  $lock = true;
  include 'init.php';

  // Check if come from Request not normal reload
  if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $name = $_POST['name'];
    $location = $_POST['location'];
    $email = $_POST['email'];
    $hashedPass = sha1($password);
    $path=$_POST['image'];
    $tele=$_POST['tele'];

    // Send Date to DataBase
    $q1=$con->prepare("INSERT INTO account (username, password, email)  values ('$username','$hashedPass','$email')");
    $q2 = $con->prepare("INSERT INTO user (username, name, location, photoPath, tele, email) values ('$username','$name','$location','$path','$tele','$email')");

    try{
      $q2->execute();
      $q1->execute();
    }catch(PDOException $e){
      $lock = false;
      echo "Erro: ".$e;
    }
    if($lock){
      $_SESSION['username'] = $username;
      header ('Location: home.php'); // Redirect To Home after Register
      exit();
    }
  }
  include $tp1.'header.php';
?>
    <section class="register access">
      <div class="container">
        <div class="content-acc">
          <div class="row">
            <div class="col-md-5">
              <div class="overlay text-center">
                <div class="text">
                  <p>Welcome To</p>
                  <h2 class="h1 logo">Arena</h2>
                  <p>We Hope that you enjoy your experience with us</p>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="form">
                <div class="text">
                  <h5>Register now to join our family</h5>
                </div>
                <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
                  <div class="form-group d-flex">
                    <input type="text" name="name" id="name" placeholder="Name" required>
                  </div>
                  <div class="form-group d-flex">
                    <input type="text" name="username" id="username" placeholder="Username" required>
                  </div>
                  <div class="form-group d-flex">
                    <input type="text" name="email" id="email" placeholder="Email" required>
                  </div>
                  <div class="form-group d-flex">
                    <input type="password" name="password" id="password" placeholder="Password" required>
                  </div>
                  <div class="form-group d-flex file">
                    <input type="file" name="image" id="image" required>
                  </div>
                  <div class="form-group d-flex">
                    <input type="text" name="location" id="location" placeholder="Location" required>
                  </div>
                  <div class="form-group d-flex">
                    <input type="text" name="tele" id="tele" placeholder="Telephone" required>
                  </div>
                  <div class="foot d-flex">
                    <input type="submit" name="" value="Register" class="btn">
                    <h6>Already have acount? <a href="login.php">Login Now</a> </h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<?php include $tp1.'footer.php'; ?>
