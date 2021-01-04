<?php

    include_once("../Conexion.php");
    session_start();

    if(isset($_SESSION['nombre'])){
        if(isset($_POST['cedula'])){
            $cedula = $_POST['cedula'];
            $nombre = $_POST['nombre'];
            $permisos = $_POST['permisos'];
            $estatus = $_POST['estatus'];

            $query = "INSERT INTO usuarios(cedula,nombre,contra,permisos,estatus) VALUES ('$cedula','$nombre','','$permisos','$estatus')";

            $Resultado = mysqli_query($conect, $query) or die(mysqli_error($conect));
            
            echo "SI";
        }else{
            die("NO SE HA LLAMADO POR EL METODO POST");
        }
    }else{
        header('Location: ../../../index.html');
    }

?>