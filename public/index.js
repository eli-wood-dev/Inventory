window.addEventListener("load", ()=>{
    let button = document.querySelector("#login");
    button.addEventListener("click", ()=>{
        window.location.href = "./public/login.html";
        console.log("hello");
    });
})