let userLogged = false;

let row = document.querySelector('.row');

function createBlockGalleryItem(url, description, price) {
    let col = document.createElement('div');
    let bodyGalleryItem = document.createElement('div');
    let figure = document.createElement('figure');
    let spanDescription = document.createElement('span');
    let textPrice = document.createElement('h4');
    let buttonComprar = document.createElement('button');

    let img = document.createElement('img');
    img.src = url;

    let auxDescription = document.createTextNode(description);
    let auxPrice = document.createTextNode(price);
    let auxButton = document.createTextNode("Comprar")

    col.classList.add("col-sm-3");
    figure.classList.add("gallery-item");
    buttonComprar.classList.add("btn");
    buttonComprar.classList.add("btn-success");
    buttonComprar.classList.add("btn-buy");
    bodyGalleryItem.classList.add("body-gallery-item");

    figure.appendChild(img);
    spanDescription.appendChild(auxDescription);
    textPrice.appendChild(auxPrice);
    buttonComprar.appendChild(auxButton);
    bodyGalleryItem.appendChild(spanDescription);
    bodyGalleryItem.appendChild(textPrice);

    if (localStorage.length != 0 && userLogged != false) {
        bodyGalleryItem.appendChild(buttonComprar);
    }

    col.appendChild(figure);
    col.appendChild(bodyGalleryItem);
    row.appendChild(col);
}

//Carregar imagens em JQuery
function loadImage() {
    $.ajax({
        type: "GET",
        url: "http://rest.learncode.academy/api/eudalio/teste1",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]);                
                createBlockGalleryItem(data[i].url, data[i].description, data[i].price);
            }
        }
    })
}

//Carregar imagens em JS nativo

// function loadImage(){
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function(){
//         if(xhttp.readyState == 4 && xhttp.status == 200){
//             let parsed = JSON.parse(xhttp.responseText);
//             // console.log(parsed[0]);

//             for(let i = 0; i < parsed.length; i++){
//                 // console.log(parsed[i]);                
//                 addImage(parsed[i].url, parsed[i].description, parsed[i].price);
//             }
//         }
//     }
//     xhttp.open('GET', 'http://rest.learncode.academy/api/eudalio/teste1', true);
//     xhttp.send();
// }

loadImage();
localStorage.clear();

function updateLocalStorage() {
    $.ajax({
        type: "GET",
        url: "http://rest.learncode.academy/api/eudalio/usuarios3",
        success: function (data) {
            console.log(data);
            if (localStorage.length != 0) {
                localStorage.clear();
                idUser = localStorage.getItem(data.length - 1);
                localStorage.setItem("id", data[data.length - 1].idUser);
                localStorage.setItem("user", data[data.length - 1].user);
                localStorage.setItem("password", data[data.length - 1].password);
                userLogged = true;
                console.log(localStorage);
                console.log("entrou aqui");
            }
            else {
                localStorage.setItem("id", data[data.length - 1].idUser);
                localStorage.setItem("user", data[data.length - 1].user);
                localStorage.setItem("password", data[data.length - 1].password);
                console.log("entrou no 2");
                console.log(localStorage);
            }
        }
    })
}

function atualizarBotaoSumit() {
    if (error1 == true || error2 == true) {
        $(".btn-register").addClass("disabled");
    } else {
        $(".btn-register").removeClass("disabled");
    }
}

let error1 = true;
console.log($(document));

// $(document).ready(function(){
//     $(".btn-register").addClass("disabled");
// })
$(document).ready(function () {
    $("#input-name-user").change(function () {
        console.dir(this);
        let existe = false;
        for (let i = 0; i < array.length; i++) {
            if (this.value == array[i].user) {
                console.log("já existe");
                existe = true;
            } else {
                existe = false;
            }
        }

        if (existe === true) {
            $(".btn-register").addClass("disabled");
            $(".btn-register").off('click');
        }
        else if (existe === false) {
            $(".btn-register").click(function (e) {
                e.preventDefault();
                let nameUser = $("#input-name-user").val();

                let body = {
                    idUser: idUser.valueOf(),
                    user: $("#input-name-user").val(),
                    password: $("#pwd").val()
                };
                $.ajax({
                    type: "POST",
                    url: "http://rest.learncode.academy/api/eudalio/usuarios3",
                    data: body,
                    success: function () {
                        idUser++;
                        // updateLocalStorage();
                    }
                })
            });
        }
        // 
        // } else {
        //     $(".btn-register").click(function () {
        //         event.preventDefault();
        //         let nameUser = $("#input-name-user").val();

        //         let body = {
        //             idUser: idUser.valueOf(),
        //             user: $("#input-name-user").val(),
        //             password: $("#pwd").val()
        //         };
        //         $.ajax({
        //             type: "POST",
        //             url: "http://rest.learncode.academy/api/eudalio/usuarios3",
        //             data: body,
        //             success: function () {
        //                 idUser++;
        //                 // updateLocalStorage();
        //             }
        //         })
        //     });
        // }
        // if (this.value == "") {
        //     // Inválido
        //     $("#label-name-user").show();
        //     $("#register1").addClass("has-error");
        //     error1 = true;
        // }
        // atualizarBotaoSumit();
    })
})

let idUser = 1;
let array = [];
function recoveryData() {
    $.ajax({
        type: "GET",
        url: "http://rest.learncode.academy/api/eudalio/usuarios3",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                array[i] = data[i];
            }
            console.log(array);
        }
    })
}
recoveryData();