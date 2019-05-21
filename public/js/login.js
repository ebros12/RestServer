$(document).ready(function() {
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    // Inicio de Sesion
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
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
                window.location.href = "home.html";
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
    $('.signup-btn').click(function() {
        $('.register-form').show('slow');
        $('.secure-login').hide('slow');
        $('body').removeClass().addClass('signup-slide');
    });
    //default dispaly
    $('.signup-btn').trigger('click');

    $('.login-btn').click(function() {
        $('.secure-login').show('slow');
        $('.register-form').hide('slow');
        $('body').removeClass().addClass('login-slide');
    });
});
0