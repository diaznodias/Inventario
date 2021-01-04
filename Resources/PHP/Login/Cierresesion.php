<?php

    include_once("../Conexion.php");

    session_start();

    if(session_id()){
      session_destroy();
    }else{
        session_start();
        session_destroy(); 
    }

    die("return");
?>