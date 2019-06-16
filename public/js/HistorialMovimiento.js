$(document).ready(function() {
    BuscarHistorial()
})


function BuscarHistorial() {
    $.ajax({
        url: '/historialMovimiento',
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            console.log(json.historialMovimientoDB);
            let ProductosTabla = []
            $.each(json.historialMovimientoDB, function(i, item) {
                let Formato = {
                    NMovimiento: '<p class="Detalle">' + item.NMovimiento + '</p>',
                    FechaCreacion: item.FechaCreacion,
                    FechaInicio: item.FechaInicio,
                    Comentarios: item.Comentarios,
                }
                ProductosTabla.push(Formato)
            })
            $('#tablaProducto_wrapper').remove()
            $('.productos').append('<table class="table table-striped table-hover  table-sm" id="tablaProducto"></table>')
            $.fn.dataTable.ext.errMode = 'none';
            let tablaProducto = $('#tablaProducto').DataTable({
                data: ProductosTabla,
                responsive: {},
                columns: [{
                        data: 'NMovimiento',
                        title: 'ID Movimiento'
                    }, {
                        data: 'Comentarios',
                        title: 'Razon - Movimiento'
                    },
                    {
                        data: 'FechaCreacion',
                        title: 'Fecha Creacion'
                    },
                    {
                        data: 'FechaInicio',
                        title: 'Fecha Inicio'
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
                    [2, "desc"]
                ],
                "scrollY": 300,
                "initComplete": function(settings, json) {

                }
            })
            $('#tablaProducto').on('draw.dt', function() {
                $(".Detalle").click(function() {
                    Cookies.set('DetalleOrdenCompra', $(this).text());
                    window.location.href = "visor.html";
                })
            })
        }
    })
}