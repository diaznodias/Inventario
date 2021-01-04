<?php

    include_once("../Conexion.php");

    session_start();
    if(isset($_SESSION['cedula'])){
        if(isset($_POST['idproducto'])){
            $idproducto = $_POST['idproducto'];
            $descripcion = $_POST['descripcion'];
            $existencia = $_POST['existencia'];
            $presentacion = $_POST['presentacion'];
            $precio = $_POST['precio'];

            $query = "UPDATE productos SET descripcion = '$descripcion', existencia = '$existencia', presentacion = '$presentacion', precio = '$precio' WHERE id_producto = '$idproducto'";
            
            $Resultado = mysqli_query($conect, $query) or die("ERROR EN LA BD :".mysqli_error($conect));

            echo "SI";
        }else{
            die('No se llamo por el metodo POST');
        }
    }else{
        header('Location: ../../../index.html');
    }

?>