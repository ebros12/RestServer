$(document).ready(function() {
    $(".Imprimir").click(function() {
        $(".form").printArea();
    })
    let ndetalle = Cookies.get('DetalleOrdenCompra')
    $.ajax({
        url: '/historialMovimiento/' + ndetalle,
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {

            $.each(json.historialMovimiento, function(i, item) {
                console.log(i, item);
                if (i != "_id" && i != "Productos" && i != "__v" && i != "usuario") {
                    if (i == "NMovimiento") {
                        $(".paso1").append('<div style="border:3px solid red;" class=" col-md-3">' +
                            '<label style="color:red; padding-left: 30px;" class="ml-3" for="CorrelativoOrden">Nº Factura</label>' +
                            '<input style="color:red; padding-left: 45px;" class="ml-3" disabled id="CorrelativoOrden" type="text" value="' + item + '" />' +
                            '</div>')
                    } else {
                        $(".paso1").append('<div class=" col-md-6">' +
                            '<label class="ml-3" for="CorrelativoOrden">' + i + '</label>' +
                            '<input class="ml-3" disabled id="CorrelativoOrden" type="text" value="' + item + '" />' +
                            '</div>')
                    }

                }
                if (i == "Productos") {
                    let TodoslosProductos = JSON.parse(item)
                    $.each(TodoslosProductos, function(i, item) {
                        console.log(item);
                        if (item.precio > 0) {
                            $(".form").append('<div class="row ">' +
                                '<div class=" col-md-4">' +
                                '<label class="ml-3" for="CorrelativoOrden">cantidad</label>' +
                                '<input class="ml-3" disabled id="CorrelativoOrden" type="text" value="' + item.cantidad + '" />' +
                                '</div>' +

                                '<div class=" col-md-4">' +
                                '<label class="ml-3" for="CorrelativoOrden">nombre</label>' +
                                '<input class="ml-3" disabled id="CorrelativoOrden" type="text" value="' + item.nombre + '" />' +
                                '</div>' +

                                '<div class=" col-md-4">' +
                                '<label class="ml-3" for="CorrelativoOrden">precio</label>' +
                                '<input class="ml-3" disabled id="CorrelativoOrden" type="text" value="' + item.precio + '" />' +
                                '</div>' +




                                '</div>')
                        }

                    })
                }

            })
        }
    })
})