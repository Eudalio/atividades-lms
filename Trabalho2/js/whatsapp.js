// let myContacts = [
//     {
//         usuario: "joao03",
//         mensagens: [
//             { usuario: "joao03", texto: "Tudo bem?" },
//             { usuario: "victor23", texto: "Tudo Tranqs" },
//             { usuario: "joao03", texto: "Que bom" }
//         ]
//     },
//     {
//         usuario: "maria2000",
//         mensagens: [
//             { usuario: "maria2000", texto: "Na paz?" },
//             { usuario: "victor23", texto: "Show" },
//             { usuario: "maria2000", texto: "Que bom" }
//         ]
//     },
//     {
//         usuario: "robson_alves",
//         mensagens: [
//             { usuario: "victor03", texto: "Bom?" },
//             { usuario: "robson_alves", texto: "Bom" },
//             { usuario: "victor03", texto: "Que bom" }
//         ]
//     }
// ];

//Código Ajax apartir daqui

function addNameGroup(groupName) {
    let listFriends = document.querySelector(".list-chat");
    let contact = document.createElement("div");
    let spanIconImg = document.createElement("span");
    let spanName = document.createElement("span");
    let textName = document.createTextNode(groupName);

    contact.classList.add("contact");
    spanIconImg.classList.add("icon-user");
    spanName.classList.add("name-user");

    spanName.appendChild(textName);
    contact.appendChild(spanIconImg);
    contact.appendChild(spanName);

    listFriends.appendChild(contact);
}

function loadJson(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let obj_converted = JSON.parse(xhttp.responseText);
            console.dir(obj_converted);
            for(let i = 0; i < obj_converted[0].length; i++){
                console.dir(obj_converted[0][i].groupName);
                addNameGroup(obj_converted[0][i].groupName);
            }
        }
    };
    xhttp.open('GET', 'http://rest.learncode.academy/api/teste1/groups', 'true');
    xhttp.send();
}

loadJson();

// function listContacts() {
//     for (let i = 0; i < myContacts.length; i++) {
//         showContacts(myContacts[i].usuario);
//     }
//     // for (contact in myContacts){
//     //     showContacts(myContacts[contact].usuario);
//     // }
// }

// listContacts();

// function findPosts(nameUser, postContact) {
//     let text = "";

//     for (let i = 0; i < myContacts.length; i++) {
//         let user = myContacts[i].usuario;
//         if (user == nameUser) {
//             for (let j = 0; i < myContacts[i].mensagens.length; j++) {
//                 text = myContacts[i].mensagens[j].texto;
//                 if (user != myContacts[i].mensagens[j].usuario) {
//                     postContact.appendChild(function (text) {
//                         let spanPostSend = document.createElement("span").classList.add("post-send").appendChild(document.createTextNode(text));
//                         return spanPostSend;
//                     });
//                 }
//                 else {
//                     postContact.appendChild(function (text) {
//                         let spanPostReceive = document.createElement("span").classList.add("post-receive").appendChild(document.createTextNode(text));
//                         return spanPostReceive;
//                     });
//                 }
//             }
//         }
//     }
// }

// function createConversation(name) {
//     let conversation = document.createElement("div");
//     let head = document.createElement("header");
//     let spanIconImg = document.createElement("span");
//     let spanName = document.createElement("span");
//     let posts = document.createElement("div");

//     let textName = document.createTextNode(name);

//     conversation.classList.add("conversations");
//     head.classList.add("head-msg");
//     spanIconImg.classList.add("icon-user");
//     spanName.classList.add("name-user");
//     posts.classList.add("posts");

//     spanName.appendChild(textName);
//     head.appendChild(spanIconImg);
//     head.appendChild(spanName);
//     conversation.appendChild(head);
//     posts = findPosts(textName, posts);
//     conversation.appendChild(posts);

//     return conversation;
// }

// let allConversation = [];

// function loadConversation(){
//     for(let i = 0; i < myContacts.length; i++){
//         allConversation.push({usuario: myContacts[i].usuario, conversa: createConversation(myContacts[i].usuario)});
//     }
// }

// loadConversation();

// function showPost(user){
//     let colRight = document.querySelector(".col-right");
//     let conversation = document.querySelector(".conversations .active");

//     if(conversation.length > 0){
//         colRight.removeChild(conversation);
//     }else{
//         let newConversation;
//         for(let i=0; i < allConversation.length; i++){
//             if(user == allConversation[i].usuario){
//                 newConversation = allConversation[i].conversa;
//             }
//         }
//         newConversation.classList.add("active");
//         colRight.appendChild(newConversation);
//     }
// }

// let startConversation = document.querySelectorAll(".contact");

// function onClick() {
//     for(let i = 0; i < startConversation[i].length; i++){
//         startConversation[i].addEventListener('click', function(){
//             showPost(event.path[0].outerText);
//         });
//     }
// }

// onClick();