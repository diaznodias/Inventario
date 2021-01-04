<?php


    include_once("../Conexion.php");
    if (!isset($_POST['cedula']) || !isset($_POST['contra'])){
       die("No se Recibio por el metodo POST!");
    }
    $cedula = $_POST['cedula'];
    if (is_null($_POST['contra']) || $_POST['contra'] == ""){
        $contra = "";
    }else{
        $contra = md5($_POST['contra']);
    }

    $query = "Select * from usuarios where cedula='$cedula' and contra='$contra'";

    $resultado = mysqli_query($conect,$query) or die ("Error en BD : ".mysqli_error($conect));
    $Arregloquery = mysqli_fetch_array($resultado);
    $Numreg = mysqli_num_rows($resultado);

    if ($Numreg > 0){
        if ($Arregloquery['estatus']=="A"){
            session_start();
            $_SESSION['cedula'] = $Arregloquery['cedula'];
            $_SESSION['nombre'] = $Arregloquery['nombre'];
            if (is_null($_POST['contra']) || $_POST['contra'] == ""){
                $_SESSION['contra'] = '';
            }else{
                $_SESSION['contra'] = $Arregloquery['contra'];
            }
            $_SESSION['permisos']= $Arregloquery['permisos'];
            echo $_SESSION['contra'];
        }else{
            echo "I";
        }
    }else{
        if ($Numreg <= 0){
            echo "N";
        }

    }

?>