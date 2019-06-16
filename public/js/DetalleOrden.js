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
    ObtenerOrdenDetalle()

})



function ObtenerOrdenDetalle() {
    let idDetalle = Cookies.get('DetalleOrdenCompra');

    $.ajax({
        url: '/historiales/' + idDetalle,
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        success: function(json) {
            console.log(json.Historial);
            $("#fechaCreacion").text(json.Historial.HoraCreacion)
            $("#fechaInicio").text(json.Historial.HoraInicio)
            $("#fechaFin").text(json.Historial.HoraFin)
            $("#Condicion").text(json.Historial.Condicion)
            $("#DPTO").text(json.Historial.DPTO)
            $("#Concepto").text(json.Historial.Concepto)
            var Productos = JSON.parse(json.Historial.Productos)
            var ProductosTabla = []
            $.each(Productos, function(i, item) {
                $(".ProductosContenido").append('<tr>' +
                    '<td>' + item.nombre + '</td>' +
                    '<td>' + item.valor + '</td>' +
                    '</tr>')


            })

            $(".exportar").click(function() {

                var pdf = new jsPDF('p', 'pt', 'letter'),
                    source = $('#invoiceholder')[0],
                    specialElementHandlers = {
                        '#bypassme': function(element, renderer) {
                            return true
                        }
                    }
                margins = {
                    top: 60,
                    bottom: 60,
                    left: 40,
                    width: 522
                };
                pdf.fromHTML(
                    source, margins.left, margins.top, {
                        'width': margins.width,
                        'elementHandlers': specialElementHandlers
                    },
                    function(dispose) {
                        pdf.save('download_pdf.pdf');
                    },
                    margins
                )



            });

        }
    })
}