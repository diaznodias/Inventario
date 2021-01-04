<?php

    include_once("../Conexion.php");

    session_start();

    if(isset($_SESSION['cedula'])){
        if(isset($_POST['CPass'])){
            $cedula = $_SESSION['cedula'];
            $Pass = md5($_POST['CPass']);
            
            $query = "UPDATE usuarios set contra = '$Pass' where cedula = '$cedula'";

            $Resultado = mysqli_query($conect, $query) or die(mysqli_error($conect));

            $_SESSION['contra'] = $Pass;

            echo "SI";


        }else{
            die('No se llamo por el metodo POST');
        }
    }else{
        header('Location: ../../../index.html');
    }

?>