<?php
  include 'init.php';
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="<?php echo $design?>/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo $design?>/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="<?php echo $design?>/css/master.css">
    <link rel="stylesheet" href="<?php echo $design?>/css/media.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Laila:700|Roboto:400,500,900">
  </head>
  <body>
  <?php
  if(!isset($noNavbar)){
    include $tp1.'/navbar.php';
  }
  ?>
