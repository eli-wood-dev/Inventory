window.addEventListener("load", ()=>{
    let buttons = document.querySelectorAll(".logout");
    buttons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            sessionStorage.removeItem("logged in");
            window.location.href = "../../index.php";
        });
    });
});