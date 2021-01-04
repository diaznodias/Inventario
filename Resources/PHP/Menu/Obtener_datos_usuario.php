<?php

    include_once("../Conexion.php");
    session_start();
    if (isset($_SESSION['nombre'])){
        $json[] = array(
            'cedula' => $_SESSION['cedula'],
            'nombre'=> $_SESSION['nombre'],
            'contra'=> $_SESSION['contra'],
            'permisos' => $_SESSION['permisos']
        );
    
        $jsonstring = json_encode($json);
    
        echo $jsonstring;
    }else{
        echo "retornar";
    }


?>