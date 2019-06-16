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
    BuscarHistorial()

})



function BuscarHistorial() {
    $.ajax({
        url: '/historiales',
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            let productos = json.historiales
            let productosResultado = []
            $.each(productos, function(i, item) {
                let productosItem = {
                    ordenDeCompra: item.OrdenCompra,
                    DPTO: item.DPTO,
                    Condicion: item.Condicion,
                    Concepto: item.Concepto,
                    Importe: item.Importe,
                    Precio: item.Precio,
                    HoraInicio: item.HoraInicio,
                    HoraFin: item.HoraFin,
                    HoraCreacion: item.HoraCreacion,
                }
                productosResultado.push(productosItem)
            })

            $('#tablaProducto_wrapper').remove()
            $('.productos').append('<table style="width:100%" class="table table-striped table-hover  table-sm" id="tablaProducto"></table>')

            $.fn.dataTable.ext.errMode = 'none';
            let tablaProducto = $('#tablaProducto').DataTable({
                data: productosResultado,
                responsive: {},
                columns: [{
                        data: 'ordenDeCompra',
                        title: 'Nº Orden Compra'
                    },
                    {
                        data: 'DPTO',
                        title: 'DPTO'
                    },
                    {
                        data: 'Condicion',
                        title: 'Condicion',
                    },
                    {
                        data: 'Concepto',
                        title: 'Concepto',
                    },
                    {
                        data: 'Importe',
                        title: 'Importe',
                    },
                    {
                        data: 'Precio',
                        title: 'Precio'
                    },
                    {
                        data: 'HoraInicio',
                        title: 'Fecha Inicio'
                    },
                    {
                        data: 'HoraFin',
                        title: 'Fecha Termino'
                    },
                    {
                        data: 'HoraCreacion',
                        title: 'Fecha Creación'
                    }


                ],
                language: {
                    url: 'json/Spanish.json'
                },
                lengthChange: false,
                pageLength: 3,
                orderable: true,
                "scrollX": true,
                "order": [
                    [0, "asc"]
                ],
                "scrollY": 300,
                "initComplete": function(settings, json) {

                }
            })
            $('#tablaProducto').on('draw.dt', function() {
                $(".Detalle").click(function() {
                    Cookies.set('DetalleOrdenCompra', $(this).text());
                    window.location.href = "DetalleOrden.html";
                })
            })



        }
    })
}