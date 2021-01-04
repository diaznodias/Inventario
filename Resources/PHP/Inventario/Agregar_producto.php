<?php

    include_once("../Conexion.php");
    session_start();
    if (isset($_SESSION['cedula'])){
        if(isset($_POST['descripcion'])){
            $descripcion = $_POST['descripcion'];
            $existencia = $_POST['existencia'];
            $presentacion = $_POST['presentacion'];
            $precio = $_POST['precio'];

            $query = "INSERT INTO productos(descripcion,existencia,presentacion,precio) VALUES ('$descripcion','$existencia','$presentacion','$precio')";

            $resultado = mysqli_query($conect,$query) or die("Error en BD : ".mysqli_error($conect));

            echo "SI";

        }else{
            die("NO SE HA LLAMADO POR EL METODO POST");
        }
    }else{
        header('Location: ../../../index.html');
    }

?>