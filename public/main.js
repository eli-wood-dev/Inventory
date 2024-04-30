window.addEventListener("load", ()=>{
    let button = document.querySelector("#logout");
    button.addEventListener("click", ()=>{
        sessionStorage.removeItem("logged in");
        window.location.href = "../index.php";
    });
})