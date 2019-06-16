$(document).ready(function() {
    switch (Cookies.get('role')) {
        case "ADMIN_ROLE":
            $("body").append('<nav id="primary_nav"> ' +

                '<a href="#" id="mobile_nav">&#9776;</a>' +
                '<img class="logoNav" src="../img/logo.jpg"/>' +
                '<ul>' +
                '<li class="row"><a class="col-5" href="home.html">Administrar Productos</a><i class="col-4 iconosNav fas fa-truck-loading"></i></li>' +
                '<li class="row"><a  class="col-5" href="OrdenCompra.html">Creación Orden de compra</a><i class="col-4 iconosNav fas fa-file-alt"></i></li>' +
                '<li class="row"><a  class="col-5" href="HistorialOrden.html">Historial Orden de Compra</a><i class="col-4 iconosNav far fa-calendar"></i></li>' +
                '<li class="row"><a class="col-5" href="IngresoOrden.html">Recepción de Artículos</a><i class="col-4 iconosNav far fa-check-square"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialIngresoOrden.html">Historial de Recepciones</a><i class="col-4 iconosNav fas fa-book-open"></i></li>' +
                '<li class="row"><a class="col-5" href="PanelBodegas.html">Panel de Bodegas</a><i class="col-4 iconosNav fas fa-cubes"></i></li>' +
                '<li class="row"><a class="col-5" href="MovimientoProductos.html">Movimiento Bodega</a><i class="col-4 iconosNav fas fa-car-side"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialMovimientos.html">Historial Movimiento Bodega</a><i class="col-4 iconosNav fas fa-atlas"></i></li>' +
                '</ul>' +
                '</nav>')
            break;
        case "USER_ROLE":
            $("body").append('<nav id="primary_nav"> ' +
                '<a href="#" id="mobile_nav">&#9776;</a>' +
                '<img class="logoNav" src="../img/logo.jpg"/>' +
                '<ul>' +
                '<li class="row"><a class="col-5" href="PanelBodegas.html">Panel de Bodegas</a><i class="col-4 iconosNav fas fa-cubes"></i></li>' +
                '<li class="row"><a  class="col-5" href="OrdenCompra.html">Creación Orden de compra</a><i class="col-4 iconosNav fas fa-file-alt"></i></li>' +
                '<li class="row"><a  class="col-5" href="HistorialOrden.html">Historial Orden de Compra</a><i class="col-4 iconosNav far fa-calendar"></i></li>' +
                '<li class="row"><a class="col-5" href="IngresoOrden.html">Recepción de Artículos</a><i class="col-4 iconosNav far fa-check-square"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialIngresoOrden.html">Historial de Recepciones</a><i class="col-4 iconosNav fas fa-book-open"></i></li>' +
                '</ul>' +
                '</nav>')
            break;
        case "MASTER_ROLE":
            $("body").append('<nav id="primary_nav"> ' +
                '<a href="#" id="mobile_nav">&#9776;</a>' +
                '<img class="logoNav" src="../img/logo.jpg"/>' +
                '<ul>' +
                '<li class="row"><a class="col-5" href="administrarUsuarios.html">Administrar Usuarios</a><i class="col-4 iconosNav fas fa-user"></i></li>' +
                '<li class="row"><a class="col-5" href="home.html">Administrar Productos</a><i class="col-4 iconosNav fas fa-truck-loading"></i></li>' +
                '<li class="row"><a  class="col-5" href="OrdenCompra.html">Creación Orden de compra</a><i class="col-4 iconosNav fas fa-file-alt"></i></li>' +
                '<li class="row"><a  class="col-5" href="HistorialOrden.html">Historial Orden de Compra</a><i class="col-4 iconosNav far fa-calendar"></i></li>' +
                '<li class="row"><a class="col-5" href="IngresoOrden.html">Recepción de Artículos</a><i class="col-4 iconosNav far fa-check-square"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialIngresoOrden.html">Historial de Recepciones</a><i class="col-4 iconosNav fas fa-book-open"></i></li>' +
                '<li class="row"><a class="col-5" href="PanelBodegas.html">Panel de Bodegas</a><i class="col-4 iconosNav fas fa-cubes"></i></li>' +
                '<li class="row"><a class="col-5" href="MovimientoProductos.html">Movimiento Bodega</a><i class="col-4 iconosNav fas fa-car-side"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialMovimientos.html">Historial Movimiento Bodega</a><i class="col-4 iconosNav fas fa-atlas"></i></li>' +
                '</ul>' +
                '</nav>')
            break;
        case "VIEW_ROL":
            $("body").append('<nav id="primary_nav"> ' +
                '<a href="#" id="mobile_nav">&#9776;</a>' +
                '<img class="logoNav" src="../img/logo.jpg"/>' +
                '<ul>' +
                '<li class="row"><a class="col-5" href="PanelBodegas.html">Panel de Bodegas</a><i class="col-4 iconosNav fas fa-cubes"></i></li>' +
                '<li class="row"><a  class="col-5" href="HistorialOrden.html">Historial Orden de Compra</a><i class="col-4 iconosNav far fa-calendar"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialIngresoOrden.html">Historial de Recepciones</a><i class="col-4 iconosNav fas fa-book-open"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialMovimientos.html">Historial Movimiento Bodega</a><i class="col-4 iconosNav fas fa-atlas"></i></li>' +
                '</ul>' +
                '</nav>')
            break;
        case "WORK_ROLE":
            $("body").append('<nav id="primary_nav"> ' +
                '<a href="#" id="mobile_nav">&#9776;</a>' +
                '<img class="logoNav" src="../img/logo.jpg"/>' +
                '<ul>' +
                '<li class="row"><a  class="col-5" href="OrdenCompra.html">Creación Orden de compra</a><i class="col-4 iconosNav fas fa-file-alt"></i></li>' +
                '<li class="row"><a  class="col-5" href="HistorialOrden.html">Historial Orden de Compra</a><i class="col-4 iconosNav far fa-calendar"></i></li>' +
                '<li class="row"><a class="col-5" href="IngresoOrden.html">Recepción de Artículos</a><i class="col-4 iconosNav far fa-check-square"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialIngresoOrden.html">Historial de Recepciones</a><i class="col-4 iconosNav fas fa-book-open"></i></li>' +
                '<li class="row"><a class="col-5" href="PanelBodegas.html">Panel de Bodegas</a><i class="col-4 iconosNav fas fa-cubes"></i></li>' +
                '<li class="row"><a class="col-5" href="MovimientoProductos.html">Movimiento Bodega</a><i class="col-4 iconosNav fas fa-car-side"></i></li>' +
                '<li class="row"><a class="col-5" href="HistorialMovimientos.html">Historial Movimiento Bodega</a><i class="col-4 iconosNav fas fa-atlas"></i></li>' +
                '</ul>' +
                '</nav>')
            break;
    }
    $("body").prepend('<p class="saliendo pt-3 iconosNav float-right">Salir<i style="color:red;font-size:42px;"class=" iconosNav float-right fas fa-sign-out-alt"></i></p>')
    $(".saliendo").click(function() {
        Cookies.remove('noLog')
        if (Cookies.get('noLog') == undefined) {
            window.location.href = "index.html";
        }


    })
    $("li").click(function() {
        console.log($(this).children()[0].click())
    })
    $("nav a").each(function(i, index) {
        if ($(index).attr("href") === window.location.pathname.replace("/", "")) {
            $(index).next().css("border-right", "#ff5a00 solid 3px")
        }
    })

    $("#mobile_nav").click(function() {

        //toggles nav and ensures other elements play nice too
        if ($("#primary_nav").css('left') < "0px") {

            $("#primary_nav").animate({ left: "0px" }, 200);
            $("#wrapper_main_content").animate({ left: "150px" }, 200);
            $("#wrapper_main_content").css("overflow-y", "hidden");
            $("body").css("overflow-x", "hidden");
            $("#primary_nav").css("overflow-y", "hidden");
        } else {


            $("#primary_nav").animate({ left: "-115px" }, 200);
            $("#wrapper_main_content").animate({ left: "0px" }, 200);
            $("#wrapper_main_content").css("overflow-y", "hidden");
            $("body").css("overflow-x", "hidden");

        }

    });

}); //end