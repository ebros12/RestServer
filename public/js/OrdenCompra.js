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
    BuscarProveedor()
    $("#iva").val(19)
    let aumentador = 1
    $("#AgregaProducto").click(function() {
        BuscarProductos()

    })


    $('#FechaInicio').datetimepicker({
        locale: 'es'
    });

    $('#FechaFin').datetimepicker({
        locale: 'es'
    });




    $("#Finalizar").click(function() {
        let errores = 0;
        $("body").find("input").each(function(i, index) {
            if ($(index).val() === "") {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        $(index).click()
                    }
                })


                errores++
            }

        })
        if (errores <= 0) {
            if ($("#Proveedores option:selected").val() != " " && $(".Producto option:selected").val() != " ") {
                GuardarHistorial()
            } else {
                Swal.fire("Debes Seleccionar Producto y Proveedor", "", "info")
            }

        }
    })

})



function BuscarProductos() {

    $(".Producto").children().next().remove()
    $(".Productos").append('<div class="col-md-6">' +
        '<center><select class="Producto form-control"><option value="">-- Seleccione un Producto --</option></select></center>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input class="form-control Cantidad" type="number" />' +
        '</div>' +
        '<div class="col-md-2">' +
        '<input class="form-control Valor" type="text" />' +
        '</div>')
    $(".Valor").change(function() {
        Total()
    })
    $.ajax({
        url: '/productos',
        type: 'GET',
        dataType: 'JSON',
        success: function(json) {
            let productos = json.productos
            $.each(productos, function(i, item) {
                $(".Producto").append('<option data-id="' + item._id + '" value="' + item.precioUni + '">' + item.nombre + '</option>')
            })
            $(".Producto").change(function() {

                let valorProducto = $(this).val()
                $(this).parent().parent().next().children().val(1)
                $(this).parent().parent().next().next().children().val(valorProducto)
                Total()

            })
            $(".Cantidad").change(function() {

                let valor = $(this).parent().prev().children().children()
                let valorCasilla = $(this).parent().next().children()
                console.log($(valor));
                $(valorCasilla).val($(valor).val() * $(this).val())
                Total()
            })



        }
    })
}

function BuscarProveedor() {

    $.ajax({
        url: '/categoria',
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            let categorias = json.categorias
            $.each(categorias, function(i, item) {
                $("#Proveedores").append('<option value="' + item._id + '">' + item.descripcion + '</option>')
            })

        }
    })
}

function Total() {
    let total = 0

    $(".Valor").each(function(i, index) {
        total = parseInt($(index).val()) + total
    })
    $("#Total").val(total)
    $("#TotalIVA").val(parseInt($("#Total").val()) + (parseInt($("#Total").val()) * parseInt($("#iva").val()) / 100))
    $("#iva").change(function() {
        Total()
    })

}


function GuardarHistorial() {
    let Productos = []
    $(".Producto option:selected").each(function(i, index) {
        console.log($(index).parent().parent().next().children().val())


        let ProductosTemp = {
            nombre: $(index).text(),
            valor: $(index).val(),
            cantidad: $(index).parent().parent().parent().next().children().val(),
            id: $(index).attr("data-id")
        }
        Productos.push(ProductosTemp)
    })
    console.log(Productos);

    let data = {
        empresaPadre: $("#empresaPadre").val(),
        DireccionPadre: $("#DireccionPadre").val(),
        HoraInicio: $("#FechaInicio").val(),
        HoraFin: $("#FechaFin").val(),
        HoraCreacion: moment().format("DD/MM/YYYY"),
        proveedor: $("#Proveedores option:selected").val(),
        DPTO: $("#dpto").val(),
        Condicion: $("#CPago").val(),
        Importe: $("#importe").val(),
        Productos: JSON.stringify(Productos),
        Total: $("#Total").val(),
        TotalIVA: $("#TotalIVA").val(),
        IVA: $("#iva").val()
    }
    $.ajax({
        data: data,
        url: '/historiales',
        type: 'POST',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Orden Ingresada con exito',
            })
            $(".form").printArea();
        }
    })
}