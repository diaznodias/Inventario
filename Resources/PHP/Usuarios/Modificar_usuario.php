<?php

    include_once("../Conexion.php");
    session_start();
    

    if(isset($_SESSION['nombre'])){
        if (isset($_POST['id_usuario'])){
            $id_usuario = $_POST['id_usuario'];
            $permisos   = $_POST['permisos'];
            $estatus    = $_POST['estatus'];
            $cambiopass = $_POST['cambiar_contra'];
            if($cambiopass == "SI"){
                $query = "UPDATE usuarios SET contra = '' , permisos= '$permisos', estatus = '$estatus' WHERE id_usuario = '$id_usuario' ";
            }else{
                $query = "UPDATE usuarios SET permisos = '$permisos', estatus = '$estatus' WHERE id_usuario = '$id_usuario' ";
            }

            $Resultado = mysqli_query($conect, $query) or die(mysqli_error($conect));
            echo "SI";
        }else{
            die("NO SE HA LLAMADO POR EL METODO POST");
        }
    }else{
        header('Location: ../../../index.html');
    }

?>