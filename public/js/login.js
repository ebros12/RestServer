$(document).ready(function() {
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    // Inicio de Sesion
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    res.render('about');

    function Login() {
        let data = {
            email: $("#email").val(),
            password: $("#password").val()
        }

        //Ajax consultando el servicio
        $.ajax({
            data: data,
            url: 'https://polar-badlands-46963.herokuapp.com/login',
            type: 'POST',
            dataType: 'JSON',
            success: function(json) {
                window.location.href = "home.hbs";
            },
            error: function(xhr, status) {
                Swal.fire({
                    type: 'error',
                    title: 'ups...',
                    text: 'Usuario o Contraseña Incorrectos!',
                })
            }
        })
    }

    $("#Logear").click(function() {
        Login()
    })


});