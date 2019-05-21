$(document).ready(function() {
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    // Inicio de Sesion
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    function Login() {
        let data = {
            email: $("#email").val(),
            password: $("#password").val()
        }
        Swal.fire(data)
            //Ajax consultando el servicio
        $.ajax({
            data: data,
            url: 'https://polar-badlands-46963.herokuapp.com/login',
            type: 'POST',
            dataType: 'JSON',
            success: function(json) {
                console.log(json);
            },
            error: function(xhr, status) {
                console.log(xhr, status);
            }
        })
    }


    $('.signup-btn').click(function() {
        $('.register-form').show('slow');
        $('.secure-login').hide('slow');
        $('body').removeClass().addClass('signup-slide');
    });
    //default dispaly
    $('.signup-btn').trigger('click');

    $('.login-btn').click(function() {
        Login()
    });
});