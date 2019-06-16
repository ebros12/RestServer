$(document).ready(function() {

    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    // Inicio de Sesion
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    Cookies.remove('Usuario')
    Cookies.remove('role')
    Cookies.remove('token')

    $(".g-signin2").click(function() {
        Cookies.set('noLog', true)
    })


    $("#Logear").click(function() {
        Login()
    })




    $(".Registrate").click(function() {
        if ($(".inic").css("display") == "none") {
            $(".inic").show()
            $(".Register").hide()
            $("body").css("background-color", "#d6e9cc")
        } else {
            $("body").css("background-color", "#ffc10726")

            $(".inic").hide()
            $(".Register").show()
            $("#Registrar").click(function() {
                if ($("#role").val() == "") {
                    Swal.fire("Debe elegir un rol", "", "warning")
                } else {
                    if ($("#Nombre").val() != "" && $("#Apellidos").val() != "" && $("#Correo").val() != "" && $("#password1").val() != "" && $("#password2").val() != "") {
                        if ($("#Correo").val().indexOf("@") != -1) {
                            if ($("#Correo").val().indexOf(".") != -1) {
                                if ($("#password1").val() == $("#password2").val()) {
                                    if ($("#password1").val().length >= 6) {
                                        Registrar()
                                    } else {
                                        Swal.fire("Error", "La contraseña debe tener mas de 6 caracteres", "error")
                                    }

                                } else {
                                    Swal.fire("Error", "Las contraseñas no coinciden", "error")
                                }
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: "Debe ser un correo Valido",
                                    type: 'error',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Gracias'
                                }).then((result) => {
                                    if (result.value) {
                                        $("#Correo").focus()
                                    }
                                })
                            }
                        } else {
                            Swal.fire({
                                title: 'Error',
                                text: "Debe ser un correo Valido",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Gracias'
                            }).then((result) => {
                                if (result.value) {
                                    $("#Correo").focus()
                                }
                            })
                        }

                    } else {
                        Swal.fire("atencion", "Complete los campos faltantes", "info")
                    }

                }
            })

        }

    })



});


function Login() {

    let data = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    //Ajax consultando el servicio
    $.ajax({
        data: data,
        url: '/login',
        type: 'POST',
        dataType: 'JSON',
        success: function(json) {
            Cookies.set('token', json.token);
            Cookies.set('Usuario', json.usuario.nombre);
            Cookies.set('role', json.usuario.role);
            window.location.href = "PanelBodegas.html";
        },
        error: function(xhr, status) {
            Swal.fire({
                type: 'error',
                title: 'ups...',
                text: 'Usuario o Contraseña Incorrectos!',
            })
            console.log(xhr);
        }
    })
}



function Registrar() {
    let data = {
        nombre: $("#Nombre").val(),
        apellido: $("#Apellidos").val(),
        email: $("#Correo").val(),
        password: $("#password1").val(),
        role: $("#role").val()
    }

    //Ajax consultando el servicio
    $.ajax({
        data: data,
        url: '/usuario',
        type: 'POST',
        dataType: 'JSON',
        success: function(json) {
            Swal.fire("Exito", "Usuario Creado Correctamente", "success")
            $(".inic").show()
            $(".Register").hide()
        },
        error: function(xhr, status) {

            if (xhr.responseJSON.err.code === 11000) {
                Swal.fire("Usuario Existente", "Existe el correo de usuario en la base", "info")
            } else {
                Swal.fire("Tenemos un error", "Estamos trabajando para arreglarlo", "info")
            }

        }
    })
}