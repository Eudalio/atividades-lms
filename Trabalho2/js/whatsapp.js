function addNameGroup(groupName, indice, id) {
    let listGroups = document.querySelector(".list-grupos");
    let contact = document.createElement("div");
    let spanIconImg = document.createElement("span");
    let spanName = document.createElement("span");
    let textName = document.createTextNode(groupName);

    contact.classList.add("contact");
    spanIconImg.classList.add("icon-group");
    spanName.classList.add("name-group");

    spanName.appendChild(textName);
    contact.appendChild(spanIconImg);
    contact.appendChild(spanName);

    listGroups.appendChild(contact);

    contact.addEventListener('click', function(){ updateHeadChatGroup(indice)});
    contact.addEventListener('click', loadPosts(id));
}

function loadGroups() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let obj_converted = JSON.parse(xhttp.responseText);
            // console.dir(obj_converted);
            for (let i = 0; i < obj_converted.length; i++) {
                console.dir(obj_converted[i]);
                // groupID[i] = obj_converted[i].groupID;
                addNameGroup(obj_converted[i].groupName, i, obj_converted[i].groupID);
            }
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/teste3/groups', 'true');
    xhttp.send();
    // return list;
}

loadGroups();

let listGroups = document.getElementsByClassName('contact');
let chatNameGroup = document.querySelector('.chat-name-group');

function updateHeadChatGroup(i){
    document.getElementById("chat-name-group").innerHTML = "";
    document.getElementById("chat-icon-group").style.display = "block";
    document.getElementById("chat-name-group").appendChild(document.createTextNode(listGroups[i].textContent));
}

function loadPosts(id){
    document.getElementById("conversations").innerHTML = "";
    let conversation = document.querySelector(".conversations");
    let xhttp  = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            let obj_converted = JSON.parse(xhttp.responseText);
            console.dir(obj_converted);
            for(let i = 0; i < obj_converted.length; i++){
                let post = document.createElement('div').classList.add("posts");
                let paragrafoUser = document.createElement('p').appendChild(document.createTextNode(obj_converted[i].mensagens[i].userName)); 
            }
        }            
    };
    let address = 'http://rest.learncode.academy/api/teste4/' + id;
    xhttp.open('GET', address, true);
    xhttp.send();
}

// function loadPosts(id){
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function(){
//         if (this.readyState == 4 && this.status == 200) {
//             let obj_converted = xhttp.responseText;
//             for (var i = 0; i < obj_converted.length; i++) {
                
                
//             }
//         }            
//     };
//     let url = 'http://rest.learncode.academy/api/teste3/' + id;
//     xhttp.open('GET', url, true);
//     xhttp.send();
// }

// for(let i = 0; i < listGroups.length; i++){
//     listGroups[i].addEventListener('click', function(){
//         updateHeadChatGroup(listGroups.item(current).children.item(1).textContent);
//         // setTimeout(function () {
//         //     if (!listGroups.item(current).classList.contains("active")) {
//         //         conversation[current].classList.add('active');        
//         //     }
//         //             // conversation[current].classList.add('active');        
//         //     // document.querySelector('.conversations').style.display="block";            
//         // }, 1000);
//     });
// }