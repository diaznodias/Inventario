<?php

    include_once("../Conexion.php");

    if(isset($_POST['idusuario'])){
        $idusuario = $_POST['idusuario'];

        $query = "SELECT u.id_usuario, u.cedula, u.nombre, u.permisos, u.estatus FROM usuarios as u WHERE u.id_usuario = '$idusuario' ORDER BY 1";

        $Resultado = mysqli_query($conect, $query);

        $tama = mysqli_num_rows($Resultado);
        if ($tama > 0){
            while($row = mysqli_fetch_array($Resultado)){
                $json[] = array(
                    'id_usuario' => $row['id_usuario'],
                    'cedula'     => $row['cedula'],
                    'nombre'     => $row['nombre'],
                    'permisos'   => $row['permisos'],
                    'estatus'    => $row['estatus']
                );
            }
            $jsonstring = json_encode($json);
            echo $jsonstring;
        }else{
            echo "SR";
        }

    }else{
        die("NO SE LLAMO POR EL METODO POST");
    }

?>