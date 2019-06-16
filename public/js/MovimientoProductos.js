$(document).ready(function() {
    ConsultarStock()
    $(".MovimientoSeleccionado").change(function() {
        switch ($(".MovimientoSeleccionado option:selected").val()) {
            case "1":
                $(".form").children().next().remove()
                $(".form").append('<div class="row paso1">' +
                    '<div class="col-md-6">' +
                    '<label for="FechaInicio">Motivo</label>' +
                    '<input type="text" class="Motivo form-control">' +

                    '</div>' +
                    '<div class="col-md-6">' +
                    '<label for="PResponsable">Persona Responsable</label>' +
                    '<input type="text" class="PResponsable form-control">' +

                    '</div>' +
                    '</div>' +

                    '<div class="row paso1">' +
                    '<div class="col-md-6">' +
                    '<label for="FechaInicio">Fecha Suceso</label>' +
                    '<input type="text" class="FechaInicio form-control">' +

                    '</div>' +
                    '<div class="col-md-6">' +
                    '<label for="FActual">Fecha Actual</label>' +
                    '<input type="text" class="FActual form-control">' +

                    '</div>' +
                    '</div>' +


                    '<div class="row paso1">' +
                    '<div class="col-md-12">' +
                    '<label for="FechaInicio">Seleccione movimientos</label>' +
                    '<br>' +
                    '<select class="Bodega form-control">' +
                    '<option>-- Seleccione una Opción --</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>')
                BuscarBodega()
                $(".PResponsable").val(Cookies.get('Usuario'))
                $(".FActual").val(moment().format("DD/MM/YYYY H:mm:ss"))
                $('.FechaInicio').datetimepicker({
                    locale: 'es'
                });

                break;


            case "2":
                $(".form").children().next().remove()
                $(".form").append('<div class="row paso1">' +
                    '<div class="col-md-12">' +
                    '<label for="FechaInicio">Seleccione movimientos</label>' +
                    '<br>' +
                    '<select class="Bodega form-control">' +
                    '<option>-- Seleccione una Opción --</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>')
                BuscarBodega()
                break;

            case "3":
                $(".form").children().next().remove()
                $(".form").append('<div class="row paso1">' +
                    '<div class="col-md-12">' +
                    '<label for="FechaInicio">Seleccione movimientos</label>' +
                    '<br>' +
                    '<select class="Bodega form-control">' +
                    '<option>-- Seleccione una Opción --</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +

                    '<div class="row paso1">' +
                    '<div class="col-md-6">' +
                    '<label for="nombreFactura">Nombre Empresa</label>' +
                    '<input type="text" class="obli NombreEmpresa">' +
                    '</div>' +


                    '<div class="col-md-6">' +
                    '<label for="DireccionFactura">RUT de Empresa</label>' +
                    '<input type="text" class="obli RutEmpresa">' +
                    '</div>' +
                    '</div>' +

                    '<div class="row paso1">' +
                    '<div class="col-md-6">' +
                    '<label for="NumeroFactura">Telefono Empresa</label>' +
                    '<input type="text" class="obli TelEmpresa">' +
                    '</div>' +



                    '<div class="col-md-6">' +
                    '<label for="CorreoFactura">Correo de Empresa</label>' +
                    '<input type="text" class="obli CorremEmpresa">' +
                    '</div>' +
                    '</div>' +

                    '<div class="row paso1">' +
                    '<div class="col-md-12">' +
                    '<label for="RolEmpresa">Rol de Empresa</label>' +
                    '<input type="text" class="obli RolEmpresa">' +
                    '</div>' +
                    '</div>')
                BuscarBodega()
                break;

            case "4":
                $(".form").children().next().remove()
                $(".form").append('<div class="row paso1">' +
                    '<div class="col-md-12">' +
                    '<label for="FechaInicio">Seleccione movimientos</label>' +
                    '<br>' +
                    '<select class="Bodega form-control">' +
                    '<option>-- Seleccione una Opción --</option>' +
                    '</select>' +
                    '</div></div>' +
                    '<div class="row paso1"><div class="col-md-12">' +
                    '<label for="FechaInicio">Seleccione movimientos</label>' +
                    '<br>' +
                    '<select class="Bodega2 form-control">' +
                    '<option>-- Seleccione una Opción --</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>')

                BuscarBodega()
                break;
        }

    })

})

function ConsultarStock() {
    $.ajax({
        url: '/ProductosBodega',
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            console.log(json.ProductosBodega);
            let Productos = []
            $.each(json.ProductosBodega, function(i, item) {
                let cantidad = 0
                let bodega = ""
                let nombre = ""
                let bodegaAnterior = ""
                let valor = ""
                item.sort(function(a, b) {
                    if (a.bodega.nombre > b.bodega.nombre) {
                        return 1
                    }
                    if (a.bodega.nombre < b.bodega.nombre) {
                        return -1
                    }
                    if (a.bodega.nombre == b.bodega.nombre) {
                        return 0
                    }
                })
                $.each(item, function(i2, item2) {

                    if (item2.bodega.nombre == bodegaAnterior || bodegaAnterior == "") {
                        nombre = item2.nombre
                        bodega = item2.bodega.nombre
                        cantidad = parseInt(cantidad) + parseInt(item2.cantidad)
                        bodegaAnterior = item2.bodega.nombre
                        valor = item2.ValorUnidad
                    } else {
                        let config = {
                            nombre: nombre,
                            bodega: bodega,
                            cantidad: cantidad,
                            valor: valor,
                        }
                        Productos.push(config)
                        bodegaAnterior = bodega.nombre
                        cantidad = 0
                        nombre = item2.nombre
                        bodega = item2.bodega.nombre
                        cantidad = parseInt(cantidad) + parseInt(item2.cantidad)

                    }
                    if (i2 == item.length - 1) {

                        let config = {
                            nombre: item2.nombre,
                            bodega: item2.bodega.nombre,
                            cantidad: cantidad,
                            valor: item2.ValorUnidad,
                        }
                        Productos.push(config)
                    }

                })

            })
            console.log(Productos);
            $.each(Productos, function(i, item) {
                let data = {
                    nombre: item.nombre,
                    bodega: item.bodega
                }
                $.ajax({
                    data: data,
                    url: '/countBodega/buscar/b',
                    type: 'POST',
                    beforeSend: function(request) {
                        request.setRequestHeader("token", Cookies.get('token'));
                    },
                    dataType: 'JSON',
                    success: function(json) {
                        console.log(json.countBodega.length);
                        if (json.countBodega.length > 0) {

                            if (json.countBodega[0].cantidad == item.cantidad) {
                                console.log("Base de datos Syncronizada");
                            } else {
                                let data = {
                                    cantidad: item.cantidad
                                }
                                $.ajax({
                                    data: data,
                                    url: '/countBodega/' + item._id,
                                    type: 'PUT',
                                    beforeSend: function(request) {
                                        request.setRequestHeader("token", Cookies.get('token'));
                                    },
                                    dataType: 'JSON',
                                    success: function(json) {
                                        console.log("Base de datos Actualizada y Syncronizada");
                                    }
                                })
                            }
                        }
                        if (json.countBodega.length === 0) {
                            let data = {
                                nombre: item.nombre,
                                bodega: item.bodega,
                                cantidad: item.cantidad,
                                valor: item.valor
                            }
                            $.ajax({
                                data: data,
                                url: '/countBodega',
                                type: 'POST',
                                beforeSend: function(request) {
                                    request.setRequestHeader("token", Cookies.get('token'));
                                },
                                dataType: 'JSON',
                                success: function(json) {
                                    console.log("no existia producto, Creado Correctamente");
                                }
                            })
                        }
                    }
                })
            })

        }
    })
}

function BuscarBodega() {
    $.ajax({
        url: '/bodega',
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            $.each(json.bodegas, function(i, item) {
                $(".Bodega").append('<option value="' + item._id + '">' + item.nombre + '</option>')
                $(".Bodega2").append('<option value="' + item._id + '">' + item.nombre + '</option>')
            })
            $(".Bodega").change(function() {
                ProductosBodega()
            })
        }
    })
}

function ProductosBodega() {
    $(".productosBodegas").remove()
    $.ajax({
        url: '/countBodega',
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            let bodegaSelect = $(".Bodega option:selected").text()


            $.each(json.CountBodega, function(i, item) {
                if (bodegaSelect == item.bodega) {
                    $(".noRep").remove()
                    $(".form").append('<div class="productosBodegas row paso1">' +
                        '<div class="col-md-4">' +
                        '<input type="text" style="font-size:16px" disabled class="Motivo form-control" value="' + item.nombre + '">' +
                        '</div>' +
                        '<div class="col-md-4">' +
                        '<label for="Cantidad">Cantidad</label>' +
                        '<br>' +
                        '<input data-precio="' + item.valor + '" type="number" min="0" max="' + item.cantidad + '" class="cantidad form-control value="">' +
                        '</div><div class="col-md-4">' +
                        '<label for="Cantidad">Precio</label>' +
                        '<br>' +
                        '<input type="text" style="font-size:16px" disabled class="Precio form-control" value="' + item.valor + '">' +
                        '</div></div>' +

                        '<div class="row paso1 noRep">' +
                        '<div class="col-md-4">' +
                        '<label for="Iva">Iva</label>' +
                        '<input type="text" style="font-size:16px" disabled class="IVA form-control" value="19">' +
                        '</div>' +
                        '<div class="col-md-4">' +
                        '<label for="Iva">Total</label>' +
                        '<input type="text" style="font-size:16px" disabled class="TotalNIVA form-control" value="">' +
                        '</div>' +
                        '<div class="col-md-4">' +
                        '<label for="Cantidad">Total + IVA</label>' +
                        '<input type="text" style="font-size:16px" disabled class="TotalIVA form-control value="">' +
                        '</div></div>')
                }


            })




            $(".cantidad").change(function() {
                let precio = $(this).closest(".col-md-4").next().find(".Precio")
                $(precio).val($(this).val() * $(this).attr("data-precio"))
                let total = 0
                $(".Precio").each(function(i, index) {
                    total = total + parseInt($(index).val())
                })
                $(".TotalNIVA").val(total)
                $(".TotalIVA").val(parseInt($(".TotalNIVA").val()) + (parseInt($(".TotalNIVA").val()) * parseInt($(".IVA").val())) / 100)
            })
            $(".form").after('<br><button class="botonAccion' + $(".MovimientoSeleccionado  option:selected").val() + ' h1titulo  productosBodegas btn btn-info">Realizar ' + $(".MovimientoSeleccionado  option:selected").text() + '</button>')


            $(".botonAccion1").click(function() {
                let contador = 0
                $(".obli").each(function(i, index) {
                    if ($(index).val() == "") {
                        Swal.fire("Campos Obligatorios", "", "warning")
                        contador++
                    }
                })
                if (contador <= 0) {
                    let ProductosAProcesar = []
                    $(".productosBodegas").find(".Motivo").each(function(i, index) {
                        if ($(index).closest('.productosBodegas').find('.cantidad').val() != "" && $(index).closest('.productosBodegas').find('.cantidad').val() != 0) {
                            let CantidadDeDrop = {
                                nombre: $(index).val(),
                                cantidad: $(index).closest('.productosBodegas').find('.cantidad').val()
                            }
                            ProductosAProcesar.push(CantidadDeDrop)
                        }


                    })
                    console.log("=================INICIAMOS====================");
                    console.log(json.ProductosBodega);
                    $.each(ProductosAProcesar, function(i, item) {
                        console.log(item);
                        buscarStock(item.nombre, item.cantidad)
                    })
                    AgregarBitacora2($(".Bodega option:selected").text())
                }
            })
            $(".botonAccion2").click(function() {
                let contador = 0
                $(".obli").each(function(i, index) {
                    if ($(index).val() == "") {
                        Swal.fire("Campos Obligatorios", "", "warning")
                        contador++
                    }
                })
                if (contador <= 0) {
                    let ProductosAProcesar = []
                    $(".productosBodegas").find(".Motivo").each(function(i, index) {
                        if ($(index).closest('.productosBodegas').find('.cantidad').val() != "" && $(index).closest('.productosBodegas').find('.cantidad').val() != 0) {
                            let CantidadDeDrop = {
                                nombre: $(index).val(),
                                cantidad: $(index).closest('.productosBodegas').find('.cantidad').val()
                            }
                            ProductosAProcesar.push(CantidadDeDrop)
                        }


                    })
                    console.log("=================INICIAMOS====================");
                    console.log(json.ProductosBodega);
                    $.each(ProductosAProcesar, function(i, item) {
                        console.log(item);
                        buscarStock(item.nombre, item.cantidad)
                    })
                    AgregarBitacora2($(".Bodega option:selected").text())
                }
            })
            $(".botonAccion3").click(function() {

                let contador = 0
                $(".obli").each(function(i, index) {
                    if ($(index).val() == "") {
                        Swal.fire("Campos Obligatorios", "", "warning")
                        contador++
                    }
                })
                if (contador <= 0) {
                    let ProductosAProcesar = []
                    $(".productosBodegas").find(".Motivo").each(function(i, index) {
                        if ($(index).closest('.productosBodegas').find('.cantidad').val() != "" && $(index).closest('.productosBodegas').find('.cantidad').val() != 0) {
                            let CantidadDeDrop = {
                                nombre: $(index).val(),
                                cantidad: $(index).closest('.productosBodegas').find('.cantidad').val()
                            }
                            ProductosAProcesar.push(CantidadDeDrop)
                        }


                    })
                    console.log("=================INICIAMOS====================");
                    console.log(json.ProductosBodega);
                    $.each(ProductosAProcesar, function(i, item) {
                        console.log(item);
                        buscarStock(item.nombre, item.cantidad)
                    })
                    AgregarBitacora($(".Bodega option:selected").text())
                }
            })
            $(".botonAccion4").click(function() {
                if ($(".Bodega2 option:selected").val() != "-- Seleccione una Opción --") {
                    if ($(".Bodega2 option:selected").text() != $(".Bodega option:selected").text()) {
                        let ProductosAProcesar = []
                        $(".productosBodegas").find(".Motivo").each(function(i, index) {
                            if ($(index).closest('.productosBodegas').find('.cantidad').val() != "" && $(index).closest('.productosBodegas').find('.cantidad').val() != 0) {
                                let CantidadDeDrop = {
                                    nombre: $(index).val(),
                                    cantidad: $(index).closest('.productosBodegas').find('.cantidad').val()
                                }
                                ProductosAProcesar.push(CantidadDeDrop)
                            }


                        })
                        console.log("=================INICIAMOS====================");
                        console.log(json.ProductosBodega);
                        $.each(ProductosAProcesar, function(i, item) {
                            console.log(item);
                            buscarStock(item.nombre, item.cantidad)
                            agregaStock(item.nombre, item.cantidad)
                        })
                        AgregarBitacora($(".Bodega option:selected").text())
                    } else {
                        Swal.fire("no puede ser a la misma Bodega", "", "info")
                    }
                } else {
                    Swal.fire("Debes Seleccionar la bodega de destino", "", "info")
                }


            })
        }
    })
}

function buscarStock(idProducto, cantidad) {
    data = {
        nombre: idProducto,
        bodega: $(".Bodega option:selected").text()
    }
    $.ajax({
        data: data,
        url: '/countBodega/buscar/b',
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            console.log(json);
            let data2 = {
                cantidad: parseInt(json.countBodega[0].cantidad) - parseInt(cantidad)
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

function agregaStock(idProducto, cantidad) {
    data = {
        nombre: idProducto,
        bodega: $(".Bodega2 option:selected").text()
    }
    $.ajax({
        data: data,
        url: '/countBodega/buscar/b',
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            console.log(json);
            let data2 = {
                cantidad: parseInt(json.countBodega[0].cantidad) + parseInt(cantidad)
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

function EliminarProducto(idProducto) {
    $.ajax({
        url: '/ProductosBodega/' + idProducto,
        type: 'DELETE',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Accion Realizada',
            })
        }
    })
}

function ActualizaProducto(idProducto, CantidadModificada) {
    let data = {
        cantidad: CantidadModificada
    }
    $.ajax({
        data: data,
        url: '/ProductosBodega/' + idProducto,
        type: 'PUT',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Accion Realizada',
            })
            $(".form").printArea();
        }
    })
}

function AgregarBitacora2(Motivo) {
    let TotalProductos = []
    $(".Motivo").each(function(i, item) {
        let Formato = {
            nombre: $(item).val(),
            cantidad: $(item).closest(".col-md-4").next().find(".cantidad").val(),
            precio: $(item).closest(".col-md-4").next().next().find(".Precio").val()
        }
        TotalProductos.push(Formato)

    })
    let data = {
        FechaInicio: moment($(".fechaini").val()).format("DD/MM/YYYY H:mm:ss"),
        FechaFin: moment().format("DD/MM/YYYY H:mm:ss"),
        FechaCreacion: moment().format("DD/MM/YYYY H:mm:ss"),
        Productos: JSON.stringify(TotalProductos),
        Comentarios: $(".MovimientoSeleccionado option:selected").text() + " - " + $(".Motivo").val() + "=-=" + Motivo,
    }
    $.ajax({
        data: data,
        url: '/historialMovimiento',
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            $(".form").printArea();
        }
    })
}

function AgregarBitacora(Motivo) {
    let TotalProductos = []
    $(".Motivo").each(function(i, item) {
        let Formato = {
            nombre: $(item).val(),
            cantidad: $(item).closest(".col-md-4").next().find(".cantidad").val(),
            precio: $(item).closest(".col-md-4").next().next().find(".Precio").val()
        }
        TotalProductos.push(Formato)

    })
    let data = {
        FechaInicio: moment($(".fechaini").val()).format("DD/MM/YYYY H:mm:ss"),
        FechaFin: moment().format("DD/MM/YYYY H:mm:ss"),
        FechaCreacion: moment().format("DD/MM/YYYY H:mm:ss"),
        Productos: JSON.stringify(TotalProductos),
        Comentarios: $(".MovimientoSeleccionado option:selected").text() + "=-=" + Motivo,
        NombreEmpresa: $(".NombreEmpresa").val(),
        RutEmpresa: $(".RutEmpresa").val(),
        TelEmpresa: $(".TelEmpresa").val(),
        CorremEmpresa: $(".CorremEmpresa").val(),
        RolEmpresa: $(".RolEmpresa").val()
    }
    $.ajax({
        data: data,
        url: '/historialMovimiento',
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            $(".form").printArea();
        }
    })
}



function NuevoProducto(nombre, Cantidad, OrdenCompra, idproducto) {
    let data = {
        IVA: $(".IVA").val(),
        nombre: nombre,
        ValorTotal: $(".TotalIVA").val(),
        ValorIVA: $(".IVA").val(),
        ValorUnidad: $(".Precio").val(),
        cantidad: Cantidad,
        concepto: "Cambio",
        producto: idproducto,
        bodega: $(".Bodega2 option:selected").val(),
        OrdenCompra: OrdenCompra,
        NivelStock: "20"
    }
    $.ajax({
        data: data,
        url: '/ProductosBodega',
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Accion Realizada',
            })
        }
    })
}