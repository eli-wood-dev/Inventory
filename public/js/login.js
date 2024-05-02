window.addEventListener("load", ()=>{
    let button = document.querySelector("#confirm_login");
    button.addEventListener("click", ()=>{
        sessionStorage.setItem("logged in", true);
        window.location.href = "../html/main.html";
    });
});