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
        url: '/ProductosBodega',
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            console.log(json.ProductosBodega);
            let formateo = []
            $.each(json.ProductosBodega, function(i, item) {
                $.each(item, function(i2, item2) {
                    let format = {
                        OrdenCompra: item2.OrdenCompra,
                        producto: item2.nombre,
                        bodega: item2.bodega.nombre,
                        IVA: item2.IVA,
                        ValorTotal: item2.ValorTotal,
                        ValorIVA: item2.ValorIVA,
                        ValorUnidad: item2.ValorUnidad,
                        cantidad: item2.cantidad
                    }
                    formateo.push(format)
                })
            })
            $('#tablaProducto_wrapper').remove()
            $('.productos').append('<table class="table table-striped table-hover  table-sm" id="tablaProducto"></table>')
            $.fn.dataTable.ext.errMode = 'none';
            let tablaProducto = $('#tablaProducto').DataTable({
                data: formateo,
                responsive: {},
                columns: [{
                        data: 'OrdenCompra',
                        title: 'Nº Orden Compra'
                    },
                    {
                        data: 'producto',
                        title: 'Producto'
                    },
                    {
                        data: 'bodega',
                        title: 'Bodega'
                    }, {
                        data: 'IVA',
                        title: 'IVA'
                    },
                    {
                        data: 'ValorTotal',
                        title: 'Valor Total'
                    },
                    {
                        data: 'ValorIVA',
                        title: 'Valor IVA',
                    },
                    {
                        data: 'ValorUnidad',
                        title: 'Valor Unidad',
                    },
                    {
                        data: 'cantidad',
                        title: 'Cantidad Almacenada',
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