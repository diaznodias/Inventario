<?php

    include_once("../Conexion.php");

    session_start();

    if (isset($_SESSION['nombre'])){
        if(isset($_POST['busqueda'])){
            $buscar = strtoupper($_POST['busqueda']);
            if(!empty($buscar)){
                $query = "SELECT u.id_usuario, u.cedula, u.nombre, if(u.estatus = 'A', 'ACTIVO', 'INACTIVO') as estatus FROM usuarios as u WHERE concat_ws(' ', u.cedula, u.nombre) LIKE '%$buscar%'  ORDER BY 1";
                $Resultado = mysqli_query($conect, $query);
                if(!$Resultado){
                    die("ERROR DE CONSULTA : ".mysqli_error($conect));
                }
                $tama = mysqli_num_rows($Resultado);
                if($tama > 0 ){
                    while($row = mysqli_fetch_array($Resultado)){
                        $json[] = array(
                            'id_usuario' => $row['id_usuario'],
                            'cedula'     => $row['cedula'],
                            'nombre'     => $row['nombre'],
                            'estatus'    => $row['estatus']
                        );
                    }
                    $jsonstring = json_encode($json);
                    echo $jsonstring;
                }else{
                    echo "SR";
                }
            }
        }else{
            die('No se llamo por el metodo POST');
        }
    }else{
        header('Location: ../../../index.html');
    }

?>