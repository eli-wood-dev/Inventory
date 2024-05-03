if(!sessionStorage.getItem("logged in")){
    sessionStorage.setItem("last page", window.location.href);
    window.location.href = "../html/login.html";
}