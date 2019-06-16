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
    BuscarProductos()
    var itemCount = 0;

    $('.add').click(function() {
        itemCount++;
        $('#itemCount').html(itemCount).css('display', 'block');
        $(this).siblings('.itemDetails').clone().appendTo("#cartItems").append('<button class="removeItem">Remove Item</button>');
    });

    $('.clear').click(function() {
        itemCount = 0;
        $('#itemCount').html('').css('display', 'none');
        $('#shoppingCart .itemDetails').remove()
    });

    $('i').click(function() {
        $('#shoppingCart').toggle();
    });

    $('#shoppingCart').on('click', '.removeItem', function() {
        $(this).parent().remove();
        itemCount--;
        $('#itemCount').html(itemCount);

        if (itemCount === 0) {
            $('#itemCount').html('').css('display', 'none');
            $('#shoppingCart').css('display', 'none');
        }
    });

})



// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Busca los productos
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
function BuscarProductos() {
    $('#tablaProducto_wrapper').remove()
    $('.productos').append('<table class="table table-striped table-hover  table-sm" id="tablaProducto"></table>')
    let data = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    //Ajax consultando el servicio
    $.ajax({
        data: data,
        url: '/productos',
        type: 'GET',
        dataType: 'JSON',
        success: function(json) {
            let productos = json.productos

            $.fn.dataTable.ext.errMode = 'none';
            let tablaProducto = $('#tablaProducto').DataTable({
                data: productos,
                responsive: {},
                columns: [{
                        data: 'nombre',
                        title: 'Nombre'
                    },
                    {
                        data: 'precioUni',
                        title: 'Precio Unitario',
                    },
                    {
                        data: 'descripcion',
                        title: 'descripción',
                    },
                    {
                        data: 'categoria.descripcion',
                        title: 'Segmentacion de producto',
                    },
                    {
                        data: 'distribucion.nombre',
                        title: 'Distribucion'
                    },
                    {
                        data: 'Umedida',
                        title: 'Unidad de medida'
                    }

                ],
                language: {
                    url: 'json/Spanish.json'
                },
                lengthChange: false,
                pageLength: 10,
                orderable: true,
                "scrollX": true,
                "order": [
                    [0, "asc"]
                ],
                "initComplete": function(settings, json) {}
            })
            $('#tablaProducto').on('draw.dt', function() {
                $("#EditaProducto").unbind().click(function() {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active')
                        $('#tablaProducto_wrapper').show(200)
                        $('.form-group').remove()
                        $('.BuscaEdita').remove()
                    } else {
                        $('.form-group').remove()
                        $('.BuscaEdita').remove()
                        $(this).addClass('active')
                        $('#tablaProducto_wrapper').hide(200)
                        $('.productos').append('<div class="form-group">' +
                            '<label for="nombre">nombre:</label>' +
                            '<input type="text" id="nombre" class="form-control ">' +

                            '<label for="PrecioU">Precio Unitario:</label>' +
                            '<input type="text" id="PrecioU" class="form-control ">' +

                            '<label for="descripcion">Descripcion:</label>' +
                            '<input type="text" id="descripcion" class="form-control ">' +

                            '<label for="Umedida">Unidad de Medida:</label>' +
                            '<input type="text" id="Umedida" class="form-control ">' +

                            '<label for="distribucion">Distribucion:</label>' +
                            '<select id="distribucion" class="form-control "><option value="">-- seleccione Distribucion --</option></select>' +


                            '<label id="insertList" for="ListaCategoria">Proveedor:</label>' +
                            '<br><br><div class="btn-group btn-group-sm"> ' +
                            '<button type="button" id="EditarProductoButton" class="btn btn-success">Editar</button>' +
                            '<button type="button" id="CerrarProducto" class="btn btn-warning">Cerrar</button>' +
                            '</div></div>')
                        InsertarListCategoria()
                        BuscarDistribuciones()
                        $("#CerrarProducto").unbind().click(function() {
                            $("#EditaProducto").click()
                        })
                        EditarProducto()

                    }

                    $("#EditarProductoButton").unbind().click(function() {
                        $('.form-group').find('input ,select').each(function(i, index) {
                            if ($(index).val() == "") {
                                $(this).css('border-color', '#dc3545')
                                Swal.fire({
                                    type: 'warning',
                                    title: 'Tenemos un problema',
                                    text: 'debe rellenar todos los campos!',
                                })
                            }
                            if (i === $('.form-group').find('input ,select').length - 1 && $(index).val() != "") {
                                GuardarEditData($(".BuscaEdita option:selected").val())
                            }
                        })
                    })
                })
                $("#CreaProducto").unbind().click(function() {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active')
                        $('#tablaProducto_wrapper').show(200)
                        $('.form-group').remove()
                        $('.BuscaEdita').remove()
                    } else {
                        $('.form-group').remove()
                        $('.BuscaEdita').remove()
                        $(this).addClass('active')
                        $('#tablaProducto_wrapper').hide(200)
                        $('.productos').append('<div class="form-group">' +
                            '<label for="nombre">nombre:</label>' +
                            '<input type="text" id="nombre" class="form-control ">' +

                            '<label for="PrecioU">Precio Unitario:</label>' +
                            '<input type="text" id="PrecioU" class="form-control ">' +

                            '<label for="descripcion">Descripcion:</label>' +
                            '<input type="text" id="descripcion" class="form-control ">' +

                            '<label for="Umedida">Unidad de Medida:</label>' +
                            '<input type="text" id="Umedida" class="form-control ">' +

                            '<label for="distribucion">Distribucion:</label>' +
                            '<select id="distribucion" class="form-control "><option value="">-- Seleccione Distribucion --</option></select>' +


                            '<label id="insertList" for="ListaCategoria">Proveedor:</label>' +
                            '<br><br><div class="btn-group btn-group-sm"> ' +
                            '<button type="button" id="GuardarNProducto" class="btn btn-success">Guardar</button>' +
                            '<button type="button" id="CerrarProducto" class="btn btn-warning">Cerrar</button>' +
                            '</div></div>')
                        InsertarListCategoria()
                        BuscarDistribuciones()


                        $("#CerrarProducto").unbind().click(function() {
                            $("#CreaProducto").click()
                        })
                        $("#GuardarNProducto").unbind().click(function() {
                            $('.form-group').find('input ,select').each(function(i, index) {
                                if ($(index).val() == "") {
                                    $(this).css('border-color', '#dc3545')
                                    Swal.fire({
                                        type: 'warning',
                                        title: 'Tenemos un problema',
                                        text: 'debe rellenar todos los campos!',
                                    })
                                }
                                if (i === $('.form-group').find('input ,select').length - 1 && $(index).val() != "") {
                                    GuardarData()
                                }
                            })
                        })

                        $('.form-group input').blur(function() {
                            $(this).css('border-color', '')
                        })



                    }

                })

            })


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

function InsertarListCategoria() {
    $.ajax({
        url: '/categoria',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        type: 'GET',
        dataType: 'JSON',
        success: function(json) {
            $("#insertList").append('<select class="form-control insertList" id="ListaCategoria"><option class="" value="">-- Seleccione Categoria --</option><br>')
            console.log("categoria", json.categorias);
            let categorias = json.categorias
            $.each(categorias, function(i, index) {
                $(".insertList").append('<option class="" value="' + index._id + '">' + index.descripcion + '</option>')
            })
            $('.insertList').change(function() {
                $(this).css('border-color', '')
            })
        }
    })
}


function GuardarData() {
    let data = {
        nombre: $("#nombre").val(),
        precioUni: $("#PrecioU").val(),
        descripcion: $("#descripcion").val(),
        Umedida: $("#Umedida").val(),
        categoria: $(".insertList option:selected").val(),
        distribucion: $("#distribucion").val()
    }
    $.ajax({
        data: data,
        url: '/productos',
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        type: 'POST',
        dataType: 'JSON',
        success: function(json) {
            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Producto ingresado correctamente',
            })
            $("#CreaProducto").click()
            BuscarProductos()
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




// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Edita Productos
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
function EditarProducto() {
    let data = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    //Ajax consultando el servicio
    $.ajax({
        data: data,
        url: '/productos',
        type: 'GET',
        dataType: 'JSON',
        success: function(json) {
            let productos = json.productos
            console.log(productos);
            $('.btn-group').next().next().append('<select class="BuscaEdita form-control"><option value="">-- Seleccione Producto --</option></select>')
            $.each(productos, function(i, item) {
                $(".BuscaEdita").prepend('<option value="' + item._id + '">' + item.nombre + '</option>')
            })
            $('.BuscaEdita').change(function() {
                let id = $('.BuscaEdita option:selected').val()
                console.log("BuscaProductoId(id)", BuscaProductoId(id));

            })

        }
    })
}

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Busca Distribuciones
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
function BuscarDistribuciones() {
    //Ajax consultando el servicio
    $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        url: '/distribucion',
        type: 'GET',
        dataType: 'JSON',
        success: function(json) {
            let distribuciones = json.distribuciones
            console.log("distribuciones", distribuciones);
            $.each(distribuciones, function(i, item) {
                $("#distribucion").prepend('<option value="' + item._id + '">' + item.nombre + '</option>')
            })
        },
        error: function(xhr, status) {
            console.log(xhr);
        }
    })

}

// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
// Busca Producto por ID
// =҉====҉==҉=҉=҉==҉=҉=҉====҉==҉=҉=҉==҉=҉
function BuscaProductoId(id) {
    //Ajax consultando el servicio
    $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        url: '/productos/' + id,
        type: 'GET',
        dataType: 'JSON',
        success: function(json) {
            let productos = json.producto
            $("#nombre").val(productos.nombre)
            $("#PrecioU").val(productos.precioUni)
            $("#descripcion").val(productos.descripcion)
            $("#Umedida").val(productos.Umedida)
            $("#ListaCategoria").val(productos.categoria._id)
            $("#distribucion").val(productos.distribucion)
        },
        error: function(xhr, status) {
            console.log(xhr);
        }
    })

}


function GuardarEditData(id) {
    //Ajax consultando el servicio
    let data = {
        nombre: $("#nombre").val(),
        PrecioU: $("#PrecioU").val(),
        descripcion: $("#descripcion").val(),
        Umedida: $("#Umedida").val(),
        categoria: $("#ListaCategoria option:selected").val(),
        distribucion: $("#distribucion").val()
    }
    $.ajax({
        data: data,
        beforeSend: function(request) {
            request.setRequestHeader("token", Cookies.get('token'));
        },
        url: '/productos/' + id,
        type: 'PUT',
        dataType: 'JSON',
        success: function(json) {
            Swal.fire({
                type: 'success',
                title: 'Exito',
                text: 'Producto editado correctamente',
            })
            $("#EditaProducto").click()
            BuscarProductos()
        },
        error: function(xhr, status) {
            console.log(xhr);
        }
    })
}