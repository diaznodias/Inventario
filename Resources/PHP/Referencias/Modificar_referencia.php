<?php

    include_once("../Conexion.php");

    session_start();

    if (isset($_SESSION['cedula'])){
        if(isset($_POST['PDolar'])){
            $PDolar = $_POST['PDolar'];

            $query = "UPDATE referencia set precio_dolar = '$PDolar'";

            $resultado = mysqli_query($conect,$query) or die("Error en BD : ".mysqli_error($conect));

            echo "SI";
        }else{
            die("NO SE HA LLAMADO POR EL METODO POST");
        }
    }else{
        header('Location: ../../../index.html');
    }

?>