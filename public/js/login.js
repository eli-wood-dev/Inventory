window.addEventListener("load", ()=>{
    let button = document.querySelector("#confirm_login");
    button.addEventListener("click", ()=>{
        sessionStorage.setItem("logged in", true);
        let lastPage = sessionStorage.getItem("last page");
        console.log(lastPage);
        if(lastPage){
            window.location.href = lastPage;
        } else{
            window.location.href = "../html/main.html";
        }
    });
});