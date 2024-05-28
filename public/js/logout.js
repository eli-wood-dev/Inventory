window.addEventListener("load", ()=>{
    let buttons = document.querySelectorAll(".logout");
    buttons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            sessionStorage.removeItem("uid");
            window.location.href = "../../index.html";
        });
    });
});