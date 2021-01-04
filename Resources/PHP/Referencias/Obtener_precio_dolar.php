<?php

    include_once("../Conexion.php");

    $query="SELECT * FROM referencia";

    $resultado = mysqli_query($conect,$query) or die("Error en BD : ".mysqli_error($conect));
    $Arregloquery = mysqli_fetch_array($resultado);
    $dolar_price=$Arregloquery['precio_dolar'];
    echo $dolar_price;
?>