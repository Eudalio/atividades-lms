console.log(localStorage);

$(".sair").show();
$(".carrinho").show();

if (localStorage.length != 0) {
    $(".esconder").hide();
}
else {
    $(".sair").hide();
    $(".carrinho").hide();
    $(".esconder").show();
}

function addLinha(){
    let tr = $("<tr></tr>");
    let tdNome = $("<td></td>").text(localStorage.getItem("descricao"));
    let tdQtd = $("<td></td>").text(localStorage.getItem("qtd"));
    let tdPreco = $("<td></td>").text(localStorage.getItem("preco"));

    tr.append(tdNome, tdQtd, tdPreco);
    $("tbody").append(tr);
}

$(document).ready(function(){
    addLinha();
});