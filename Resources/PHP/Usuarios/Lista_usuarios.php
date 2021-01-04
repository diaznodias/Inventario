<?php

    include_once("../Conexion.php");
    session_start();

    if(isset($_SESSION['nombre'])){
    
        $query = "SELECT u.id_usuario, u.cedula, u.nombre, if(u.estatus = 'A', 'ACTIVO', 'INACTIVO') as estatus FROM USUARIOS as u ORDER BY 1";
    
        $Resultado = mysqli_query($conect,$query);
        if(!$Resultado){
            die("CONSULTA FALLIDA... ERROR: ".mysqli_error($Resultado));
        }
    
        while($row = mysqli_fetch_array($Resultado)){
            $json[] = array(
                'id_usuario' => $row['id_usuario'],
                'cedula'     => $row['cedula'],
                'nombre'     => $row['nombre'],
                'estatus'    => $row['estatus']
            );
        }
        $jsonString = json_encode($json);
        echo $jsonString;
    }else{
        header('Location: ../../../index.html');
    }

?>