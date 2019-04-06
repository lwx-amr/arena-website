<?php

  $options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',  // To Allow add Arabic
  );
  // To Handle any error happened
  try{
    $con = new PDO('mysql:host=localhost;dbname=nil', 'root', '',$options); //Start a New Connect by DPO Class
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Set attribute to my connection
  } catch (PDOException $e){
    echo "Faild " . $e->getMessage();
  }


 ?>
