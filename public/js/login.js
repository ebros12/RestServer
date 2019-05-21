$(document).ready(function() {
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
    // Actualiza una nueva categoria
    // =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉

    $.ajax({
        data: { email: "botebros2@gmail.com", password: "asd" },
        url: 'localhost:3000/login',
        type: 'POST',
        dataType: 'JSON',
        success: function(json) {
            console.log(json);
        },
        error: function(xhr, status) {
            console.log(xhr, status);
        }
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