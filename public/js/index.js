window.addEventListener("load", ()=>{
    document.querySelector("#login").addEventListener("click", ()=>{
        window.location.href = "public/html/login.html";
    });

    document.querySelector("#signup").addEventListener("click", ()=>{
        window.location.href = "public/html/signup.html";
    });
})