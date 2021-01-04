<?php

    include_once("../Conexion.php");

    session_start();

    if(isset($_SESSION['cedula'])){
        if(isset($_POST['busqueda'])){
            $buscar = strtoupper($_POST['busqueda']);
            if(!empty($buscar)){
                $query = "SELECT * FROM productos as p WHERE concat_ws(' ', p.id_producto, p.descripcion) LIKE '%$buscar%'  ORDER BY 1";

                $Resultado = mysqli_query($conect, $query) or die("ERROR EN LA BD :".mysqli_error($conect));

                $tama = mysqli_num_rows($Resultado);

                if($tama>0){
                    while($row = mysqli_fetch_array($Resultado)){
                        $json[] = array(
                            'id_producto'  => $row['id_producto'],
                            'descripcion'  => $row['descripcion'],
                            'existencia'   => $row['existencia'],
                            'presentacion' => $row['presentacion'],
                            'precio'       => $row['precio']
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