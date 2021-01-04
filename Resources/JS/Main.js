$(function(){


    
    //------------------------- MODULO GENERAL Y FUNCIONES GENERALES ------------------------------
    // CERRAR PRELOADER DESPUES DE CARGAR
        $(document).ready(function(){
            setTimeout(function(){cerrar_loader()},2000);
        });
    // CERRAR PRELOADER DESPUES DE CARGAR
    console.log("HOLA");
    actualizar_dolar();

    new WOW().init();

    var bsxdolar = 0;
    
    let datosuser ={
        cedula : '',
        nombre : '',
        contra : '',
        permisos: ''
    }
    
    function cerrar_loader(){
        $("#preloader").addClass("preloader-cierre");
    }
    
    function mostrar_loader(){
        $("#preloader").removeClass("preloader-cierre");
    }

    /// OBTENER DATOS DEL USUARIO
        $.ajax({
            url: "./Resources/PHP/Menu/Obtener_datos_usuario.php",
            type: "GET",
            success: function(Respuesta){
                if(Respuesta!="retornar"){
                    let template = '';
                    let arreglorespuesta= JSON.parse(Respuesta);
                    datosuser.cedula= arreglorespuesta[0].cedula;
                    datosuser.nombre = arreglorespuesta[0].nombre;
                    datosuser.contra = arreglorespuesta[0].contra;
                    datosuser.permisos = arreglorespuesta[0].permisos;
                    
                    // COLOCAR LOS ITEMS EN EL MENÚ
                    let arraypermisos = arreglorespuesta[0].permisos.split("-");
                    if(arraypermisos.includes("INV") == true){
                        template+= `
                        <li class="nav-item">
                            <a class="nav-link" href="#Inventario">Inventario</a>
                        </li>
                        `;
                    }
                    if(arraypermisos.includes("REF") == true){
                        template+= `
                        <li class="nav-item">
                            <a class="nav-link" href="#Referencias">Referencias</a>
                        </li>
                        `;
                    }
                    if(arraypermisos.includes("USU") == true){
                        template+= `
                        <li class="nav-item">
                            <a class="nav-link" href="#Usuarios">Usuarios</a>
                        </li>
                        `;
                    }
                    template+= `
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="username" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        name
                        </a>
                        <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
                            <li><a class="dropdown-item" href="#" id="logout">Cerrar Sesion</a></li>
                        </ul>
                    </li>
                    `;

                    $("#nav-menu").html(template);
                    // COLOCAR LOS ITEMS EN EL MENÚ
                    $("#username").html('<i class="fas fa-user me-2"></i>'+datosuser.nombre);
                }else{
                    $(location).attr("href","index.html");
                }
            }
        });
    /// OBTENER DATOS DEL USUARIO
    
    // FUNCIONES PARA LA TASA DE CAMBIO

        // FUNCION PARA ACTUALIZAR EL PRECIO DEL DOLAR
            function actualizar_dolar(){
                $.ajax({
                    url: "./Resources/PHP/Referencias/Obtener_precio_dolar.php",
                    type: "GET",
                    success: function(Respuesta){
                        bsxdolar = Respuesta;
                        Respuesta = Respuesta.toString()
                        while (true) {
                        var n2 = Respuesta.replace(/(\d)(\d{3})($|,|\.)/g, '$1,$2$3')
                        if (Respuesta == n2) break
                        Respuesta = n2
                        }  
                        $("#preciod-actual").html(Respuesta);

                    }
                })
            }
        // FUNCION PARA ACTUALIZAR EL PRECIO DEL DOLAR

        // COLOCAR EL PERCIO DEL DOLAR EN EL BOTON
            $(document).on("click","#dolar-price",function(){
                mostrar_loader();
                actualizar_dolar();
                setTimeout(function(){cerrar_loader()},2000);
            });
        // COLOCAR EL PERCIO DEL DOLAR EN EL BOTON


    // FUNCIONES PARA LA TASA DE CAMBIO
    
    // CERRAR SESION
        $(document).on("click","#logout",function(e){

            $.ajax({
                url:"./Resources/PHP/Login/cierresesion.php",
                type: "GET",
                success: function(Respuesta){
                    if(Respuesta=="return"){
                        $(location).attr("href","index.html");
                    }
                }
            });
        });
    // CERRAR SESION

    // BLOQUEAR TECLA ENTER
    $(document).on("keypress",".block-enter",function(e){
        if (e.which == 13){
                Swal.fire({
                    title: "ERROR",
                    text: "¡TECLA [ENTER] BLOQUEADA!",
                    icon: "error",
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
                e.preventDefault();
                return false;
        }
    });   

    // BLOQUEAR TECLA ENTER

    
    

    // INPUT DE SOLO NUMEROS
    $(document).on("keypress",".Solonumeros",function(e){
        var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        Numeros = "1234567890",
        especiales = "8-37-38-46",
        tecla_especial = false;

        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (Numeros.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
        }

    });
    // INPUT DE SOLO NUMEROS

    // INPUT DE SOLO LETRAS
    $(document).on("keypress",".Sololetras",function(e){
        var key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
        especiales = [8, 37, 39, 46],
        tecla_especial = false;

        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
        }
    
    });
    // INPUT DE SOLO LETRAS



    // FUNCION PARA EL CAMBIO DE MODULOS

    $(window).on("hashchange",function(){
        let modulo = window.location.hash;
        let template= '';
        mostrar_loader();
        switch(modulo){
            case '#Referencias':
                template = `
                
                <div id="Referencias" class="text-center container">
                    <h4 class="mb-4">Referencias</h4>
                    <form action="#" id="ref-form">
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="PDolar" placeholder="Precio del Dolar" step="any">
                        <label for="PDolar">Precio del Dolar</label>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Guardar</button>
                    </form>
                </div>
                
                `;
                $("#contenido").html(template);
                $("#PDolar").val(bsxdolar);
            break;

            case '#Usuarios':
                template = `
                
                <!-- Button trigger modal -->
                <button type="button" id="btn-reg" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal-usuarios">
                    <i class="fas fa-user-plus"></i> Nuevo usuario
                </button>
                <div class="input-group my-4 w-25 input-buscar">
                    <span class="input-group-text bg-primary text-light" id="basic-addon1"><i class="fas fa-search"></i></span>
                    <input type="text" id="buscar-usuario" class="form-control block-enter" placeholder="Datos del Usuario" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <h4>Lista de Usuarios:</h4>
                <div class="tabla-datos table-responsive-sm rounded border">
                    <table class="table">
                    <thead class="bg-primary text-light sticky-top">
                        <tr>
                        <th>ID</th>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Estatus</th>
                        <th class="text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody id="datos-usuarios">
                        
                    </tbody>
                    </table>
                </div>
                <h6 class="text-muted mt-2">NUMERO DE USUARIOS : <span id="nreg">0</span></h6>
       



                <!-- Modal -->
                <div class="modal fade" id="Modal-usuarios" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Nuevo Usuario</h5>
                                <button type="button" class="btn-close cierre_modal_usu" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form action="#" id="Users-form">
                                <div class="modal-body">
                                    <input type="hidden" name="idusuario" id="IDusuario">
                                    <div class="form-floating mb-4">
                                        <input type="text" id="Cedula-usuario" class="form-control Solonumeros block-enter" id="floatingInput" placeholder="Cedula" maxlength="10">
                                        <label for="floatingInput">Cédula</label>
                                    </div>
                                    <div class="form-floating mb-4">
                                        <input type="text" id="Nombre-usuario" class="form-control Sololetras block-enter" id="floatingInput" placeholder="Nombre" maxlength="60">
                                        <label for="floatingInput">Nombre</label>
                                    </div>
                                    <div class="permisos mb-4">
                                        <h5>Permisos:</h5>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="INV-" id="OPC-inventario">
                                            <label class="form-check-label" for="OPC-inventario">
                                            Inventario
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="USU-" id="OPC-usuario">
                                            <label class="form-check-label" for="OPC-usuario">
                                            Usuarios
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="REF-" id="OPC-referencia">
                                            <label class="form-check-label" for="OPC-referencia">
                                            Referencia
                                            </label>
                                        </div>
                                    </div>
                                    <div class="estatus mb-4">
                                        <h5>Estatus</h5>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" id="Estatus-usuario" checked>
                                            <label class="form-check-label" for="Estatus-usuario" id="Texto-estatus">Habilitado</label>
                                        </div>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Solicitar-contra">
                                        <label class="form-check-label" for="Solicitar-contra">
                                            Solicitar contraseña al iniciar nuevamente
                                        </label>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary cierre_modal_usu" data-bs-dismiss="modal" id="C_modal_usu">Cerrar</button>
                                    <button type="submit" class="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <!-- Modal -->
                `;
            $("#contenido").html(template);
            Mostrar_lista_usu();
        break;

        case '#Inventario':
            template=`
            
        <!-- Button trigger modal -->
        <button type="button" id="btn-reg-prod" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal-inventario">
          <i class="fas fa-plus"></i> Nuevo Producto
        </button>
        <div class="input-group my-4 w-25 input-buscar">
            <span class="input-group-text bg-primary text-light" id="basic-addon1"><i class="fas fa-search"></i></span>
            <input type="text" id="buscar-producto" class="form-control block-enter" placeholder="Datos del Producto" aria-label="Productname" aria-describedby="basic-addon1">
        </div>
        <h4>Lista de Productos:</h4>
        <div class="tabla-datos table-responsive-sm rounded border">
            <table class="table">
            <thead class="bg-primary text-light sticky-top">
                <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Existencia</th>
                <th>Presentación</th>
                <th>Precio</th>
                <th class="text-center">Acción</th>
                </tr>
            </thead>
            <tbody id="datos-inventario">
                
            </tbody>
            </table>
        </div>
        <h6 class="text-muted mt-2">NUMERO DE PRODUCTOS : <span id="nreg">0</span></h6>

        <!-- Modal -->
            <div class="modal fade" id="Modal-inventario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">Nuevo Producto</h5>
                      <button type="button" class="btn-close cierre_modal" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form action="#" id="Inventario-form">
                      <div class="modal-body">
                          <input type="hidden" name="idproducto" id="IDproducto">
                          <div class="form-floating mb-4">
                              <input type="text" id="Descripcion-producto" class="form-control block-enter" id="floatingInput" placeholder="Descripcion del producto" maxlength="60">
                              <label for="floatingInput">Descripción</label>
                          </div>
                          <div class="form-floating mb-4">
                            <input type="number" id="Existencia-producto" class="form-control block-enter" id="floatingInput" placeholder="Existencia" min="0" step="any">
                            <label for="floatingInput">Existencia</label>
                          </div>
                          <div class="form-floating mb-4">
                            <select class="form-select block-enter" id="Presentacion-producto" aria-label="Floating label select example">
                              <option value="UNID">Unidad (UNID)</option>
                              <option value="Ml">Mililitros (Ml)</option>
                              <option value="Kg">Kilogramos (Kg)</option>
                              <option value="gr">gramos (gr)</option>
                            </select>
                            <label for="floatingSelect">Presentacion</label>
                          </div>
                          <div class="form-floating mb-4">
                            <input type="number" id="Precio-producto" class="form-control block-enter" id="floatingInput" placeholder="Existencia" min="0" step="any">
                            <label for="floatingInput">Precio</label>
                          </div>          
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary cierre_modal" data-bs-dismiss="modal" id="C_modal_prod">Cerrar</button>
                          <button type="submit" class="btn btn-primary">Guardar</button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
        <!-- Modal -->

            `;
            $("#contenido").html(template);
            Mostrar_lista_prod();
        break;
            default:
                $("#contenido").html("");
        }

        setTimeout(function(){cerrar_loader()},1000);
    });

    // FUNCION PARA EL CAMBIO DE MODULOSs






    //------------------------- MODULO GENERAL Y FUNCIONES GENERALES ------------------------------


    //------------------------- MODULO USUARIOS -----------------------------

    let editar_usuario = false;
   
    // MOSTRAR ESTATUS EN EL SLIDER DEL MODAL
        $(document).on("click","#Estatus-usuario",function(){
            if( $('#Estatus-usuario').prop('checked') ) {
                $("#Texto-estatus").html("Habilitado");
            }else{
                $("#Texto-estatus").html("Inhabilitado");
            }

        });
    // MOSTRAR ESTATUS EN EL SLIDER DEL MODAL
    function Mostrar_lista_usu(){
        $.ajax({
            url: './Resources/PHP/Usuarios/Lista_usuarios.php',
            type : 'GET',
            success: function(Respuesta){
                let template = '';
                let list_usu = JSON.parse(Respuesta);
                list_usu.forEach(Usuarios => {
                    template+=`
                    <tr idusuario="${Usuarios.id_usuario}">
                        <td class="fw-bold">${Usuarios.id_usuario}</td>
                        <td>${Usuarios.cedula}</td>
                        <td>${Usuarios.nombre}</td>
                        <td>${Usuarios.estatus}</td>
                        <td class="text-center">
                                <button class="btn btn-primary btn-sm col-sm-4 usuario-update boton-accion" title="Modificar">
                                <i class="fas fa-edit"></i>
                                </button>
                        </td>
                    </tr>
                    `;
                });
                $("#datos-usuarios").html(template);
                $("#nreg").html(list_usu.length);
            }
        })
    };


    $(document).on("submit","#Users-form",function(e){
        let regresa = false;
        let ruta ="";
        let mensaje= "";
        let id_usuario = $("#IDusuario").val();
        let cedula_usuario = $("#Cedula-usuario").val();
        let nombre_usuario = $("#Nombre-usuario").val().toUpperCase();
        let permisos_usuario = '';
        let estatus_usuario = '';
        let resetear  = '';

        if ($("#Cedula-usuario").val().length==0){
            $("#Cedula-usuario").removeClass("is-valid");
            $("#Cedula-usuario").addClass("is-invalid");
            regresa = true;
        }else{
            $("#Cedula-usuario").removeClass("is-invalid");
            $("#Cedula-usuario").addClass("is-valid");
        }
        if($("#Nombre-usuario").val().length==0){
            $("#Nombre-usuario").removeClass("is-valid");
            $("#Nombre-usuario").addClass("is-invalid");
            regresa = true;
        }else{
            $("#Nombre-usuario").removeClass("is-invalid");
            $("#Nombre-usuario").addClass("is-valid");
        }

        if (regresa==true){
            return false;
        }
        if($("#OPC-inventario").is(":checked")){
            permisos_usuario+=$("#OPC-inventario").val();
        }
        if($("#OPC-usuario").is(":checked")){
            permisos_usuario+=$("#OPC-usuario").val();
        }
        if($("#OPC-referencia").is(":checked")){
            permisos_usuario+=$("#OPC-referencia").val();
        }
        if($("#Estatus-usuario").is(":checked")){
            estatus_usuario="A";
        }else{
            estatus_usuario="I";
        }

        if($("#Solicitar-contra").is(":checked")){
            resetear = 'SI';
        }else{
            resetear = 'NO';
        }

        let datasend = {
            id_usuario : id_usuario,
            cedula   : cedula_usuario,
            nombre   : nombre_usuario,
            permisos : permisos_usuario,
            estatus  : estatus_usuario,
            cambiar_contra : resetear
        }

        if(editar_usuario == false ){
            ruta = "./Resources/PHP/Usuarios/Nuevo_usuario.php";
        }else{
            ruta = "./Resources/PHP/Usuarios/Modificar_usuario.php";
        }

        $.post(ruta,datasend,function(Resultado){
            if(Resultado=="SI"){
                if (editar_usuario == false){
                    mensaje = "USUARIO REGISTRADO EXITOSAMENTE";
                }else{
                    mensaje = "USUARIO MODIFICADO EXITOSAMENTE";
                    editar_usuario= false;
                }
                Swal.fire({
                    title: "¡EXITO!",
                    text: mensaje,
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
                Mostrar_lista_usu();
                $("#Cedula-usuario").removeClass("is-valid");
                $("#Nombre-usuario").removeClass("is-valid");
                $("#C_modal_usu").click();
            }else{
                Swal.fire({
                    title: "ERROR",
                    text: Resultado,
                    icon: "error",
                    timer: 7000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
            }
        })

        e.preventDefault();
    });

     $(document).on("keyup","#buscar-usuario",function(e){
        let busqueda = $("#buscar-usuario").val();
        if(busqueda.length > 0){
            $.post('./Resources/PHP/Usuarios/Buscar_usuario.php',{busqueda},function(Respuesta){
                let template = '';
                if (Respuesta != "SR"){
                    let list_usu = JSON.parse(Respuesta);
                    list_usu.forEach(Usuarios => {
                        template+=`
                        <tr idusuario="${Usuarios.id_usuario}">
                            <td class="fw-bold">${Usuarios.id_usuario}</td>
                            <td>${Usuarios.cedula}</td>
                            <td>${Usuarios.nombre}</td>
                            <td>${Usuarios.estatus}</td>
                            <td class="text-center">
                                    <button class="btn btn-primary btn-sm col-sm-4 usuario-update boton-accion" title="Modificar">
                                    <i class="fas fa-edit"></i>
                                    </button>
                            </td>
                        </tr>
                        `;
                    });
                    $("#datos-usuarios").html(template);
                    $("#nreg").html(list_usu.length);
                }
            });
        }else{
            Mostrar_lista_usu();
        }
        e.preventDefault();
     });

     // LIMPIAR MODAL AL CERRAR

     $(document).on("click",".cierre_modal_usu",function(e){
        limpiarModalUsuario();
     });

     // LIMPIAR MODAL AL CERRAR

     $(document).on("click","#btn-reg",function(){
        editar_usuario = false;
        limpiarModalUsuario();
     });


     $(document).on("click",".usuario-update",function(e){
        let elemento = $(this)[0].parentElement.parentElement;
        let idusuario = $(elemento).attr("idusuario");
        $.post('./Resources/PHP/Usuarios/obtener_datos_usuario.php',{idusuario},function(Respuesta){
            if(Respuesta != "SR"){
                editar_usuario = true;
                let datosusuario = JSON.parse(Respuesta);
                let arraypermisos = datosusuario[0].permisos.split("-");

                $("#IDusuario").val(datosusuario[0].id_usuario);

                $("#Cedula-usuario").val(datosusuario[0].cedula);
                $("#Cedula-usuario").attr("disabled",true);
                
                
                $("#Nombre-usuario").val(datosusuario[0].nombre);
                $("#Nombre-usuario").attr("disabled",true);

                // PERMISOS

                if(arraypermisos.includes("INV") == true){
                    $("#OPC-inventario").attr("checked",true);
                }else{
                    $("#OPC-inventario").attr("checked",false);
                }

                if(arraypermisos.includes("USU") == true){
                    $("#OPC-usuario").attr("checked",true);
                }else{
                    $("#OPC-usuario").attr("checked",false);
                }

                if(arraypermisos.includes("REF") == true){
                    $("#OPC-referencia").attr("checked",true);
                }else{
                    $("#OPC-referencia").attr("checked",false);
                }
                if (datosusuario[0].estatus=="A"){
                    $("#Estatus-usuario").attr("checked",true);
                    $("#Texto-estatus").html("Habilitado");
                }else{
                    $("#Estatus-usuario").attr("checked",false);
                    $("#Texto-estatus").html("Inhabilitado");
                }

                
                // PERMISOS
                $("#Modal-usuarios").modal('show');
            }else{
                Swal.fire({
                    title: "ERROR",
                    text: "PROBLEMAS A OBTENER LOS DATOS DEL USUARIOS",
                    icon: "error",
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
            }
        });
     });


     function limpiarModalUsuario(){
        $("#Users-form").trigger("reset");
        $("#Cedula-usuario").attr("disabled",false);
        $("#Nombre-usuario").attr("disabled",false);
        $("#OPC-inventario").attr("checked",false);
        $("#OPC-usuario").attr("checked",false);
        $("#OPC-referencia").attr("checked",false);
        $("#Estatus-usuario").attr("checked",true);
        $("#Texto-estatus").html("Habilitado");
     }

    


    


    //------------------------- MODULO USUARIOS -----------------------------
























    //------------------------- MODULO REFERENCIAS -----------------------------


    $(document).on("submit","#ref-form",function(e){
        let PDolar = $("#PDolar").val();



        $.post("./Resources/PHP/Referencias/Modificar_referencia.php",{PDolar},function(Respuesta){
            if (Respuesta=="SI"){
                Swal.fire({
                    title: "¡EXITO!",
                    text: "REFERENCIAS MODIFICADAS EXITOSAMENTE",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
                $("#dolar-price").click();
            }else{
                Swal.fire({
                    title: "ERROR",
                    text: Respuesta,
                    icon: "error",
                    timer: 7000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
            }
        });
        e.preventDefault();
    });
    
    //------------------------- MODULO REFERENCIAS -----------------------------

    
































    //------------------------- MODULO INVENTARIO -----------------------------
    let editar_producto=false;


    $(document).on("click","#btn-reg-prod",function(e){
        editar_producto=false;
        LimpiarModalProductos();
    });

    $(document).on("submit","#Inventario-form",function(e){
        let ruta = "";
        let idproducto = $("#IDproducto").val();
        let descripcion = $("#Descripcion-producto").val().toUpperCase(); 
        let existencia  = $("#Existencia-producto").val();
        let presentacion = $("#Presentacion-producto").val();
        let precio = $("#Precio-producto").val();
        let regresa = false;
        if (descripcion.length==0){
            regresa=true;
            $("#Descripcion-producto").removeClass("is-valid");
            $("#Descripcion-producto").addClass("is-invalid");
        }else{
            $("#Descripcion-producto").removeClass("is-invalid");
            $("#Descripcion-producto").addClass("is-valid");
        }

        if(existencia<=0){
            regresa=true;
            $("#Existencia-producto").removeClass("is-valid");
            $("#Existencia-producto").addClass("is-invalid");
        }else{
            $("#Existencia-producto").removeClass("is-invalid");
            $("#Existencia-producto").addClass("is-valid");
        }

        if (presentacion.length==0){
            regresa=true;
            $("#Presentacion-producto").removeClass("is-valid");
            $("#Presentacion-producto").addClass("is-invalid");
        }else{
            $("#Presentacion-producto").removeClass("is-invalid");
            $("#Presentacion-producto").addClass("is-valid");
        }

        if(existencia<=0){
            regresa=true;
            $("#Existencia-producto").removeClass("is-valid");
            $("#Existencia-producto").addClass("is-invalid");
        }else{
            $("#Existencia-producto").removeClass("is-invalid");
            $("#Existencia-producto").addClass("is-valid");
        }

        if(precio<=0){
            regresa=true;
            $("#Precio-producto").removeClass("is-valid");
            $("#Precio-producto").addClass("is-invalid");
        }else{
            $("#Precio-producto").removeClass("is-invalid");
            $("#Precio-producto").addClass("is-valid");
        }

        if(regresa==true){
            return false;
        }

        let datasend = {
            idproducto : idproducto,
            descripcion : descripcion,
            existencia : existencia,
            presentacion : presentacion,
            precio : precio
        };

        if (editar_producto==false){
            ruta="./Resources/PHP/Inventario/Agregar_Producto.php";
        }else{
            ruta="./Resources/PHP/Inventario/Modificar_producto.php";
        }



        $.post(ruta,datasend,function(Respuesta){
            
            if(Respuesta=="SI"){
                if (editar_producto==false){
                    mensaje = "PRODUCTO REGISTRADO EXITOSAMENTE";
                }else{
                    mensaje = "PRODUCTO MODIFICADO EXITOSAMENTE";
                    editar_producto=false;
                }
                Swal.fire({
                    title: "¡EXITO!",
                    text: mensaje,
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
                Mostrar_lista_prod();
                $("#Descripcion-producto").removeClass("is-valid");
                $("#Existencia-producto").removeClass("is-valid");
                $("#Presentacion-producto").removeClass("is-valid");
                $("#Precio-producto").removeClass("is-valid");
                $("#C_modal_prod").click();
            }else{
                Swal.fire({
                    title: "ERROR",
                    text: Respuesta,
                    icon: "error",
                    timer: 7000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
            }
            
        });
        e.preventDefault();
    });

    $(document).on("keyup","#buscar-producto",function(e){
        let busqueda = $("#buscar-producto").val();
        if (busqueda.length > 0){
            $.post("./Resources/PHP/Inventario/Buscar_producto.php",{busqueda},function(Respuesta){
                let template = '';
                if (Respuesta !="SR"){
                    let list_prod = JSON.parse(Respuesta);
                    list_prod.forEach(Producto => {
                        template+=`
                        <tr idproducto="${Producto.id_producto}">
                            <td class="fw-bold">${Producto.id_producto}</td>
                            <td>${Producto.descripcion}</td>
                            <td>${Producto.existencia}</td>
                            <td>${Producto.presentacion}</td>
                            <td>${Producto.precio}</td>
                            <td class="text-center">
                                    <button class="btn btn-primary btn-sm col-sm-4 producto-update boton-accion" title="Modificar">
                                    <i class="fas fa-edit"></i>
                                    </button>
                            </td>
                        </tr>
                        `;
                    });
                    $("#datos-inventario").html(template);
                    $("#nreg").html(list_prod.length);
                }
            });
        }else{
            Mostrar_lista_prod();
        }
        e.preventDefault();
    });

    $(document).on("click",".producto-update",function(e){
        let elemento = $(this)[0].parentElement.parentElement;
        let idproducto = $(elemento).attr("idproducto");
        $.post("./Resources/PHP/Inventario/Obtener_datos_producto.php",{idproducto},function(Respuesta){
            if (Respuesta!="SR"){
                editar_producto=true;
                let Datosprod = JSON.parse(Respuesta);
                $("#IDproducto").val(Datosprod[0].idproducto);
                $("#Descripcion-producto").val(Datosprod[0].descripcion);
                $("#Existencia-producto").val(Datosprod[0].existencia);
                $("#Presentacion-producto").val(Datosprod[0].presentacion);
                $("#Precio-producto").val(Datosprod[0].precio);
                $("#Modal-inventario").modal("show");
            }else{
                Swal.fire({
                    title: "ERROR",
                    text: "PROBLEMAS AL OBTENER LOS DATOS DEL PRODUCTO",
                    icon: "error",
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false
                });
            }
        });
        e.preventDefault();
    })


    function Mostrar_lista_prod(){
        $.ajax({
            url:"./Resources/PHP/Inventario/Lista_productos.php",
            type: "GET",
            success: function(Respuesta){
                let template = '';
                if(Respuesta != "SR"){
                    let list_prod = JSON.parse(Respuesta);
                    list_prod.forEach(Producto => {
                        template+=`
                        <tr idproducto="${Producto.id_producto}">
                            <td class="fw-bold">${Producto.id_producto}</td>
                            <td>${Producto.descripcion}</td>
                            <td>${Producto.existencia}</td>
                            <td>${Producto.presentacion}</td>
                            <td>${Producto.precio}</td>
                            <td class="text-center">
                                    <button class="btn btn-primary btn-sm col-sm-4 producto-update boton-accion" title="Modificar">
                                    <i class="fas fa-edit"></i>
                                    </button>
                            </td>
                        </tr>
                        `;
                    });
                    $("#datos-inventario").html(template);
                    $("#nreg").html(list_prod.length);
                }
            }
        })
    }



    function LimpiarModalProductos(){
        $("#Inventario-form").trigger("reset");
        $("#Descripcion-producto").removeClass("is-valid");
        $("#Existencia-producto").removeClass("is-valid");
        $("#Presentacion-producto").removeClass("is-valid");
        $("#Precio-producto").removeClass("is-valid");
        $("#Descripcion-producto").removeClass("is-invalid");
        $("#Existencia-producto").removeClass("is-invalid");
        $("#Presentacion-producto").removeClass("is-invalid");
        $("#Precio-producto").removeClass("is-invalid");
    }

    //------------------------- MODULO INVENTARIO -----------------------------
















    
    /*Swal.fire({
        title: "ERROR",
        text: "Bienvenido",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
        showConfirmButton: false
    });*/

    /*Swal.fire({
        title: "ERROR",
        text: "Usuario o Contraseña Incorrecta",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
        showConfirmButton: false
    });*/
    
});