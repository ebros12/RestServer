$(document).ready(function() {
    ConsultarProductos()
    productosHighC()
})

function ConsultarProductos() {
    $.ajax({
        url: '/countBodega',
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            console.log(json);
            $('#tablaProducto_wrapper').remove()
            $('.productos').append('<table style="width:100%" class="table table-striped table-hover  table-sm" id="tablaProducto"></table>')

            $.fn.dataTable.ext.errMode = 'none';
            let tablaProducto = $('#tablaProductos').DataTable({
                data: json.CountBodega,
                responsive: {},
                columns: [{
                        data: 'bodega',
                        title: 'Bodega'
                    },
                    {
                        data: 'nombre',
                        title: 'Producto',
                    },
                    {
                        data: 'cantidad',
                        title: 'cantidad',
                    },
                    {
                        data: 'valor',
                        title: 'valor',
                    }


                ],
                language: {
                    url: 'json/Spanish.json'
                },
                lengthChange: false,
                pageLength: 6,
                "scrollY": 80,
                orderable: true,
                "scrollX": true,
                "order": [
                    [0, "asc"]
                ],
                "initComplete": function(settings, json) {}
            })
            $('#tablaProducto').on('draw.dt', function() {})




        }
    })
}

function productosHighC() {
    let armadoFinal = []
    let bodegas = []

    console.log(bodegas);
    $.ajax({
        url: '/countBodega',
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            console.log(json.CountBodega);
            let nombreAnterior = ""
            let cantidad = []
            let name = ""
            let stack = ""
            json.CountBodega.sort(function(a, b) {
                if (a.nombre > b.nombre) {
                    return 1
                }
                if (a.nombre < b.nombre) {
                    return -1
                }
            })
            $.each(json.CountBodega, function(i, item) {
                console.log(item.nombre);
                if (item.nombre == nombreAnterior || nombreAnterior == "") {
                    console.log("if");
                    cantidad.push(parseInt(item.cantidad))
                    name = item.nombre
                    stack = item.bodega
                    nombreAnterior = item.nombre
                } else {
                    console.log("else");
                    let Temp = {
                        name: name,
                        data: cantidad,
                        stack: stack
                    }
                    armadoFinal.push(Temp)

                    name = item.nombre
                    stack = item.bodega
                    cantidad = []
                    cantidad.push(parseInt(item.cantidad))
                    nombreAnterior = item.nombre
                }
                if (i == json.CountBodega.length - 1) {
                    console.log("length");
                    let Temp = {
                        name: item.nombre,
                        data: cantidad,
                        stack: item.bodega
                    }
                    armadoFinal.push(Temp)
                }
            })
            console.log("armadoFinal", armadoFinal);
            $.ajax({
                url: '/bodega',
                type: 'GET',
                beforeSend: function(request) {
                    request.setRequestHeader("token", Cookies.get('token'));
                },
                dataType: 'JSON',
                success: function(json) {
                    $.each(json.bodegas, function(i, item) {
                        bodegas.push(item.nombre)
                    })
                    $("#container").remove()
                    $(".Grafico").append('<div id="container" style="min-width: 310px; height: 280px; margin: 0 auto"></div>')
                    Highcharts.chart('container', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Bienvenido al sistema de Bodegas'
                        },
                        xAxis: {
                            categories: bodegas,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Productos'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} Unidades</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: armadoFinal
                    });
                }
            })
            console.log(armadoFinal);

        }
    })

}