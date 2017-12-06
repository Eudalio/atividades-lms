//Variáveis Globais
let existe = false;
let isloged = false;
let isPassCheck = false;
let idUser = 1;
let usuarioLogado = "";
let senhaUsuarioLogado = "";

let error1 = true;
let error2 = true;
let error3 = true;
let error4 = true;

$(".sair").hide();    
$(".carrinho").hide();

function atualizarBotaoCadastrar() {
    if (error1 == false || error2 == false) {
        $(".btn-register").removeClass("disabled");
    }
}

function atualizarBotaoLogar() {
    if (error3 == false || error4 == false) {
        $(".btn-login").removeClass("disabled");
    }
}

$("#name-user").change(function () {
    if (this.value == "") {
        // Inválido
        $("#group1").addClass("has-error");
        error1 = true;
    } else {
        // Válido

        console.log($("#name-user").val());
        let url = "http://rest.learncode.academy/api/eudalio/usuarios4";
        $.get(url, function (data) {
            $.each(data, function (i, item) {
                console.log("O usuário que estou iterando é: " + item.user);
                $("#pwd").attr("disabled", false);
                $("#pwd").attr("required");
                if ($("#name-user").val() == item.user) {
                    console.log("ja existe");
                    existe = true;
                    $("#pwd").attr("disabled", true);
                    return false;
                }
                else {
                    existe = false;
                    console.log("Não existe");
                }
            });

            console.log("No final das contas:" + existe);
        });
        $("#group1").removeClass("has-error");
        error1 = false;
    }
    atualizarBotaoCadastrar();
})

$("#pwd").change(function () {
    if (this.value == "") {
        // Inválido
        $("#group2").addClass("has-error");
        error2 = true;
    } else {
        // Válido
        $("#group2").removeClass("has-error");
        error2 = false;
    }
    atualizarBotaoCadastrar();
});

$("#name-user-login").change(function () {
    if (this.value == "") {
        // Inválido
        $("#group3").addClass("has-error");
        error3 = true;
    } else {
        // Válido

        console.log($("#name-user-login").val());
        let url = "http://rest.learncode.academy/api/eudalio/usuarios4";
        $.get(url, function (data) {
            $.each(data, function (i, item) {
                console.log("O usuário que estou iterando é: " + item.user);
                // $("#pwd2").attr("disabled", true);
                // $("#pwd2").attr("required");
                if ($("#name-user-login").val() == item.user) {
                    console.log("Usuário encontrado");
                    isloged = true;
                    usuarioLogado = item.user;
                    $("#pwd2").attr("disabled", false);
                    console.log("Usuário que estara logado: " + usuarioLogado);
                    return false;
                }
                else {
                    isloged = false;
                    console.log("Diferente");
                }
            });

            console.log("No final das contas:" + isloged);
        });

        $("#group3").removeClass("has-error");
        error3 = false;
    }
    atualizarBotaoLogar();
})

$("#pwd2").change(function () {
    if (this.value == "") {
        // Inválido
        $("#group4").addClass("has-error");
        error4 = true;
    } else {
        // Válido

        console.log($("#pwd2").val());
        let url = "http://rest.learncode.academy/api/eudalio/usuarios4";
        $.get(url, function (data) {
            $.each(data, function (i, item) {
                console.log("O usuario da vez é: " + item.user + " A senha da vez é: " + item.password);
                console.log("usuario salvo como logado: " + usuarioLogado);
                if (usuarioLogado == item.user && $("#pwd2").val() == item.password) {
                    console.log("Senha e usuario batem");
                    isPassCheck = true;
                    senhaUsuarioLogado = item.password;
                    console.log("Usuário que estara logado: " + usuarioLogado);
                    console.log("Senha de usuário que estara logado: " + senhaUsuarioLogado);
                    $(".btn-login").attr("disabled", false);
                    return false;
                }
                else {
                    isPassCheck = false;
                    console.log("Senhas não batem!");
                    $(".btn-login").attr("disabled", true);
                }
            });

            console.log("No final das contas:" + isPassCheck);
        });

        $("#group4").removeClass("has-error");
        error4 = false;
    }
    atualizarBotaoLogar();
});

$(".btn-register").click(function () {
    event.preventDefault();
    let url = "http://rest.learncode.academy/api/eudalio/usuarios4";

    $.post(url, { iduser: idUser.valueOf(), user: $("#name-user").val(), password: $("#pwd").val() },
        function (data, status) {
            $("#name-user").val("");
            $("#pwd").val("");
            $(".btn-register").addClass("disabled");
            $("#group1").addClass("has-error");
            $("#group2").addClass("has-error");
            console.log(data);
            console.log("Deu certo: " + status);
            $(".result").css({ "display": "block" });
            console.log(status);
            idUser++;
            if (status == "success") {
                $(".result").addClass("sucess");
                $(".result").fadeOut(3000);
            }
            else {
                $(".result").text("Usuário não foi criado");
                $(".result").addClass("erro");
                $(".result").fadeOut(3000);
            }
        });
});

$(".sair").click(function(){
    localStorage.clear();
    console.log(localStorage);
});

$(".btn-login").click(function () {
    event.preventDefault();

    if (localStorage.length != 0) {
        console.log("ja tem alguém aqui");
        localStorage.clear();
        console.log("removi quem tava aqui");
        localStorage.setItem("iduser", idUser.valueOf());
        localStorage.setItem("user", usuarioLogado);
        localStorage.setItem("senha", senhaUsuarioLogado);
        $(".btn-buy").show();
        $(".input-qtd-default").show();
        $(".carrinho").show();
        $(".esconder").hide();
        $(".sair").show();

        console.log("Novas configurações");
        console.log(localStorage);
    }
    else {
        console.log("Não tinha ninguém");
        localStorage.setItem("iduser", idUser.valueOf());
        localStorage.setItem("user", usuarioLogado);
        localStorage.setItem("senha", senhaUsuarioLogado);
        console.log("Então setei um");
        console.log(localStorage);
    }
});

$(document).ready(function () {
    let url = "http://rest.learncode.academy/api/eudalio/teste1";
    let price;
    let description;
    let ind;
    $.get(url, function (data) {
        $.each(data, function (i, item) {
            ind = i;
            price = item.price;
            description = item.description;
            tasksRepetitive(item.url, item.description, item.price, i);
            // Ação do botão Comprar
            $(".btn-buy").click(function () {
                event.preventDefault();
                localStorage.setItem("descricao", item.description);
                localStorage.setItem("preco", item.price);
                localStorage.setItem("qtd", $(".input-qtd-default").val());
                console.log(localStorage);
                console.log($(".input-qtd-default").val());
                taskCreateCarrinho(item.url, item.description, item.price, i, $(".input-qtd-default").val());
            });
        });
        taskDefaultCreateCarrinho(description, price, $(".input-qtd-default").val(), ind);      
    });
});

function taskDefaultCreateCarrinho(description, price, qtd, i) {
    //Criando todos os elementos da estrutura   
    let finalizarPedido = $("<div></div>");
    let valorTotal = $("<span></span>");
    let btnFinalizar = $("<button></button>");

    //Adicionando as classes de todos os componentes    
    finalizarPedido.addClass("finalizar-pedido");
    valorTotal.addClass("soma-total");
    btnFinalizar.addClass("btn-finalizar-compras btn btn-success");

    //Atribuindo propriedades aos elementos
    valorTotal.text("Total: " + price * qtd);
    btnFinalizar.text("Finalizar Carrinho");

    //Atribuindo propriedades aos elementos
    btnFinalizar.attr("type", "submit");

    //Adicionando ação ao botão
    btnFinalizar.click(function(){
        window.open("minhas-compras.html");
    });

    //Juntando tudo    
    finalizarPedido.append(valorTotal, btnFinalizar);
    $("#cesta").append(finalizarPedido);
}

function taskCreateCarrinho(url, description, price, indice, qtd) {
    $(".aviso-carrinho").hide();
    
    //Criando todos os elementos da estrutura   
    let infos = $("<div></div>");
    let icone = $("<div></div>");
    let img = $("<img />")
    let desc = $("<div></div>");
    let span1 = $("<span></span>");
    let span2 = $("<span></span>");
    let preco = $("<div></div>");
    let spanPreco = $("<span></span>");

    //Adicionando as classes de todos os componentes
    infos.addClass("infos");
    icone.addClass("icone");
    desc.addClass("desc");
    span1.addClass("span-desc");
    span2.addClass("span-qtd");
    preco.addClass("preco");
    spanPreco.addClass("span-preco");

    //Atribuindo propriedades aos elementos
    img.attr("src", url);

    //Preenchendo o carrinho
    span1.text(description);
    console.log(qtd.valueOf());
    span2.text("Quantidade: " + qtd.valueOf());
    spanPreco.text(price.valueOf());
console.log(qtd);
    //Juntando tudo
    icone.append(img);
    desc.append(span1, $("<br />"), span2);
    preco.append(spanPreco);
    infos.append(icone, desc, preco);
    $("#cesta").prepend(infos);
}

function tasksRepetitive(url, description, price, indice) {
    //Criando todos os elementos da estrutura   
    let col = $("<div></div>");
    let figure = $("<figure></figure>");
    let img = $("<img></img>")
    let bodyGalleryItem = $("<div></div>");
    let span = $("<span></span>").text(description);
    let textPrice = $("<h4></h4>").text(price);
    let send = $("<div></div>");
    let buttonComprar = $("<button></button>").text("Comprar");
    let inputQtd = $("<input />");
    let spanInforme = $("<span></span>");

    //Adicionando as classes de todos os componentes
    col.addClass("col-sm-3");
    figure.addClass("gallery-item");
    bodyGalleryItem.addClass("body-gallery-item");
    send.addClass("send");
    buttonComprar.addClass("btn btn-success btn-buy");
    inputQtd.addClass("input-qtd");
    inputQtd.addClass("input-qtd-default");
    spanInforme.addClass("span-informe");

console.log(inputQtd);

    //Atribuindo propriedades aos elementos
    img.attr("src", url);
    buttonComprar.attr("type", "button");
    inputQtd.attr("type", "number");
    inputQtd.attr("min", "1");
    inputQtd.attr("max", "10");
    inputQtd.attr("value", "1");
    inputQtd.attr("step", "1");

    //Escondendo temporariamente
    buttonComprar.hide();
    inputQtd.hide();

    //Executando função Append
    figure.append(img);
    send.append(buttonComprar, inputQtd);
    bodyGalleryItem.append(span, textPrice, send);
    col.append(figure, bodyGalleryItem, spanInforme);

    $(".row").append(col);

    let input = $(".input-qtd" + indice.valueOf());

    $("input").change(function () {
        if (input.val() < 1 || input.val() > 10) {
            spanInforme.text("Quantidade não permitida");
            spanInforme.addClass("erro");
            spanInforme.fadeOut(3000);
            buttonComprar.attr("disabled", true);
        }
    });
}