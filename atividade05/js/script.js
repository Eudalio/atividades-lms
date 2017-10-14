
var titulo = document.querySelectorAll(".titulo");

// let titulo = document.getElementsByClassName("titulo");
// let conteudo = document.getElementsByClassName("conteudo");

// function mostrarEsconder(){
    for(var i = 0; i < titulo.length; i++){
        // conteudo[i].setAttribute("style", "display:none; font-size:20px;");
        titulo[i].onclick = function(){
            this.classList.toggle("mostrar");
            var conteudo = this.nextElementSibling;
            if(conteudo.style.display === block){
                conteudo.style.display = none;
            }
            else{
                conteudo.style.display = block;
            }            
        }

        // if(conteudo[i].classList.contains("mostrar")){
        //     conteudo[i].style.display = block;
        // }
    }
// }


// titulo.item(1).addEventListener("click", mostrarEsconder);