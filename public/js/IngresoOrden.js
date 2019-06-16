$(document).ready(function() {

    if (Cookies.get('Usuario')) {
        $('.usuario').text(Cookies.get('Usuario'))
    } else {
        Swal.fire({
            title: 'Tenemos un problema',
            text: "Debe estar logeado para ingresar al sistema!",
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ok'
        }).then((result) => {
            if (result.value) {
                window.location.href = "index.html";
            }
        })

    }


    $("#buscar").click(function() {
        $.ajax({
            url: '/ProductosBodega',
            type: 'GET',
            dataType: 'JSON',
            beforeSend: function(request) {
                request.setRequestHeader("token", Cookies.get('token'));
            },
            success: function(json) {
                let numeroFallos = 0
                console.log(json);
                $.each(json.ProductosBodega, function(i, item) {
                    $.each(item, function(i, item2) {
                        console.log(item2.OrdenCompra, "vs", $("#orden").val(), "rlt", item2.OrdenCompra == $("#orden").val());
                        if (item2.OrdenCompra == $("#orden").val()) {
                            Swal.fire(
                                'Tenemos un problema',
                                "La orden de compra " + $("#orden").val() + " ya a sido ingresada",
                                'warning'
                            )
                            numeroFallos++
                            return false
                        }
                    })
                })
                if (numeroFallos <= 0) {
                    let orden = $("#orden").val()
                    Historial(orden)
                }
            }
        })
        $("#buscar").unbind()

    })
    $(".guardar").unbind().click(function() {
        if ($("#Concepto").val() != "" && $("#CorrelativoOrden").val() != "" && $("#Bodegas").val() != "") {
            IngresarProductos($("#orden").val())
            $(".form").find(".empresaPadre").each(function(i, index) {
                var cantidad = $(index).closest('.col-4').next().find('input').val()
                var bodega = $("#Bodegas option:selected").text()
                var nombre = $(index).val()
                agregaStock(nombre, bodega, cantidad)
            })

        } else {
            Swal.fire("Debe completar todos los campos", "", "info")
        }

    })
})

function Historial(orden) {
    $.ajax({
        url: '/historiales/' + orden,
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            let productosObj = JSON.parse(json.Historial.Productos)
            $("#empresaPadre").val(json.Historial.proveedor.descripcion)
            $("#DPTO").val(json.Historial.DPTO)

            $("#DPTO").val(json.Historial.DPTO)
            $("#DPTO").val(json.Historial.DPTO)
            $("#DPTO").val(json.Historial.DPTO)
            console.log(productosObj);
            $("#nOrden").val(orden)
            $.each(productosObj, function(i, item) {
                $(".form").append('<div class="row paso1">' +
                    '<div class="col-4">' +
                    '<label for="FechaInicio">Producto</label>' +
                    '<input class="empresaPadre" disabled type="text" value="' + item.nombre + '" />' +
                    '</div>' +

                    '<div class="col-4">' +
                    '<label for="FechaInicio">Cantidad</label>' +
                    '<input class="cantidad" disabled type="text" value="' + item.cantidad + '" />' +
                    '</div>' +


                    '<div class="col-4">' +
                    '<label for="FechaInicio">Valor</label>' +
                    '<input class="valor" disabled type="text" value="' + item.valor + '" />' +
                    '</div>' +
                    '</div>')
            })
            $(".form").append('<div class="row paso1">' +
                '<div class="col-4">' +
                '<label for="Total">Total</label>' +
                '<input class="Total" disabled type="text" value="' + json.Historial.Total + '" />' +
                '</div>' +

                '<div class="col-4">' +
                '<label for="FechaInicio">IVA</label>' +
                '<input class="IVA" disabled type="text" value="' + json.Historial.IVA + '" />' +
                '</div>' +


                '<div class="col-4">' +
                '<label for="FechaInicio">TotalIVA</label>' +
                '<input class="TotalIVA" disabled type="text" value="' + json.Historial.TotalIVA + '" />' +
                '</div>' +
                '</div>')


            Bodegas()


        }
    })

}



function Bodegas() {
    $("#Bodegas").remove()
    $('.form').append('<div class="row paso1"><div class="col-12"><label for="Bodega">Bodega</label><br><select id="Bodegas" class="col-12 form-control"><option value="">-- Seleccione Bodega --</option></select></div></div>')
    $.ajax({
        url: '/bodega',
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            console.log(json.bodegas);
            $.each(json.bodegas, function(i, item) {
                $(".texto").remove()
                $("#Bodegas").append('<option value="' + item._id + '">' + item.nombre + '</option>')
                $("#Bodegas").unbind().change(function() {
                    $(".form").append('<div class="texto row paso1">' +
                        '<div class="col-6">' +
                        '<label for="Total">Telefono</label>' +
                        '<input class="Telefono" disabled type="text" value="' + item.telefono + '" />' +
                        '</div>' +

                        '<div class="col-6">' +
                        '<label for="FechaInicio">Direccion</label>' +
                        '<input class="Direccion" disabled type="text" value="' + item.direccion + '" />' +
                        '</div></div>' +
                        '')

                })
            })




        }
    })

}


function IngresarProductos(orden) {
    $.ajax({
        url: '/historiales/' + orden,
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            let productosObj = JSON.parse(json.Historial.Productos)
            console.log(json);
            $.each(productosObj, function(i, item) {
                let CargandoDatos = {
                    nombre: item.nombre,
                    IVA: json.Historial.IVA,
                    ValorTotal: json.Historial.TotalIVA,
                    ValorIVA: json.Historial.Total,
                    ValorUnidad: item.valor,
                    concepto: $("#Concepto").val(),
                    cantidad: item.cantidad,
                    producto: item.id,
                    bodega: $("#Bodegas option:selected").val(),
                    OrdenCompra: orden,
                    NumeroCorrelativo: $("#CorrelativoOrden").val()

                }
                $.ajax({
                    data: CargandoDatos,
                    url: '/ProductosBodega',
                    type: 'POST',
                    dataType: 'JSON',
                    beforeSend: function(request) {
                        request.setRequestHeader("token", Cookies.get('token'));
                    },
                    success: function(json) {

                    }
                })
            })
            $(".form").printArea();

        }
    })
}



function agregaStock(nombree, bodegaa, cantidaad) {
    let data = {
        nombre: nombree,
        bodega: bodegaa
    }
    $.ajax({
        data: data,
        url: '/countBodega/buscar/b',
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            console.log(json.countBodega[0]._id);
            let data2 = {
                cantidad: parseInt(json.countBodega[0].cantidad) + parseInt(cantidaad)
            }
            $.ajax({
                data: data2,
                url: '/countBodega/' + json.countBodega[0]._id,
                type: 'PUT',
                beforeSend: function(request) {
                    request.setRequestHeader("token", Cookies.get('token'));
                },
                dataType: 'JSON',
                success: function(json) {
                    console.log(json);
                }
            })
        }
    })



}