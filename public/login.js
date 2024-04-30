window.addEventListener("load", ()=>{
    let button = document.querySelector("#confirm_login");
    button.addEventListener("click", ()=>{
        window.location.href = "./items.html";
        console.log("hello");
    });
})