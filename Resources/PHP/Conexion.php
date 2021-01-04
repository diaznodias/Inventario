<?php

    $conect= mysqli_connect("localhost","root","","Inventario");

    if (mysqli_connect_errno()){
        $Mensaje="Error al conectar con la Base de Datos : ".mysqli_connect_error();
        die ($Mensaje);
    }

    $timezone_identifier='America/Caracas';
    date_default_timezone_set($timezone_identifier);

?>