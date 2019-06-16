$(document).ready(function() {

    Cargar()
})

function Cargar() {
    $.ajax({
        url: '/usuario',
        type: 'GET',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            console.log(json.usuarios);
            let Producto = []
            $.each(json.usuarios, function(i, item) {
                let format = {
                    nombre: '<p data-id="' + item._id + '" class="ModificarUsuario">' + item.nombre + '</p>',
                    email: item.email,
                    estado: item.estado,
                    role: item.role
                }
                Producto.push(format)
            })
            $('#tablaProducto_wrapper').remove()
            $('.productos').append('<table class="table table-striped table-hover  table-sm" id="tablaProducto"></table>')

            $.fn.dataTable.ext.errMode = 'none';
            let tablaProducto = $('#tablaProducto').DataTable({
                data: Producto,
                columns: [{
                        data: 'nombre',
                        title: 'nombre'
                    },
                    {
                        data: 'email',
                        title: 'email',
                    },
                    {
                        data: 'estado',
                        title: 'estado',
                    },
                    {
                        data: 'role',
                        title: 'role',
                    }


                ],
                language: {
                    url: 'json/Spanish.json'
                },
                lengthChange: false,
                pageLength: 6,

                "scrollY": 300,
                orderable: true,
                "order": [
                    [0, "asc"]
                ],
                "initComplete": function(settings, json) {}
            })
            $('#tablaProducto').on('draw.dt', function() {

                $(".ModificarUsuario").unbind().click(function() {
                    let id = $(this).attr("data-id")
                    $("#myModal").modal()
                    $.ajax({
                        url: '/usuario/' + id,
                        type: 'GET',
                        beforeSend: function(request) {
                            request.setRequestHeader("token", Cookies.get('token'));
                        },
                        dataType: 'JSON',
                        success: function(json) {
                            console.log("modal", json.usuario.email);
                            $("#correo").val(json.usuario.email)
                            $("#pass").val("")
                            $("#pass2").val("")
                            $("#editarUsuario").click(function() {
                                if ($("#pass").val() != "" || $("#pass2").val() != "") {
                                    if ($("#pass").val() == $("#pass2").val()) {
                                        modificarPass(json.usuario._id)
                                    } else {
                                        Swal.fire("Las contraseñas no coinciden", "", "warning")
                                    }
                                }
                                if ($("#correo").val() != json.usuario.email) {
                                    if ($("#correo").val() == "") {
                                        Swal.fire("correo debe ser rellenado", "", "warning")
                                    } else {
                                        modificarCorreo(json.usuario._id)
                                    }
                                }
                                if ($("#role option:selected").val() != "") {
                                    modificarRol(json.usuario._id)
                                }

                            })
                        }
                    })
                })
            })
        }
    })
}

function modificarCorreo(id) {
    let data = {
        email: $("#correo").val()
    }
    $.ajax({
        data: data,
        url: '/usuario/' + id,
        type: 'PUT',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            Swal.fire("Correo Modificado", "", "success")
            Cargar()
        }
    })
}

function modificarPass(id) {
    let data = {
        password: $("#pass").val()
    }
    $.ajax({
        data: data,
        url: '/usuario/' + id,
        type: 'PUT',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            Swal.fire("Correo Modificado", "", "success")
            Cargar()
        }
    })
}

function modificarRol(id) {
    let data = {
        role: $("#role option:selected").val()
    }
    $.ajax({
        data: data,
        url: '/usuario/' + id,
        type: 'PUT',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        dataType: 'JSON',
        success: function(json) {
            Swal.fire("Rol Modificado", "", "success")
            Cargar()
        }
    })
}