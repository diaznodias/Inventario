<?php

    include_once("../Conexion.php");

    session_start();

    if(isset($_SESSION['cedula'])){
        if(isset($_POST['idproducto'])){
            $idproducto = $_POST['idproducto'];

            $query = "SELECT * FROM productos as p WHERE id_producto = '$idproducto'";

            $Resultado = mysqli_query($conect, $query) or die("ERROR EN LA BD : ".mysqli_error($conect));

            $tama = mysqli_num_rows($Resultado);
            $row = mysqli_fetch_array($Resultado);
            if($tama > 0){
                $json[] = array(
                    'idproducto'   => $row['id_producto'],
                    'descripcion'  => $row['descripcion'],
                    'existencia'   => $row['existencia'],
                    'presentacion' => $row['presentacion'],
                    'precio'       => $row['precio']
                );
                $jsonstring = json_encode($json);
                echo $jsonstring;
            }else{
                echo "SR";
            }
        }else{
            die('No se llamo por el metodo POST');
        }
    }else{
        header('Location: ../../../index.html');
    }


?>