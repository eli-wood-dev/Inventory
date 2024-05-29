window.addEventListener("load", ()=>{
    let button = document.querySelector("#confirm_login");
    button.addEventListener("click", ()=>{
        let data = {};
        data.email = document.querySelector("#emailInput").value;

        sha256(document.querySelector("#passwordInput").value).then((pass)=>{
            data.password = pass;
            fetch("../../private/login.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=>{
                if (!response.ok) {
                    return response.json()
                    .then(error => { 
                        throw new Error(error.message);
                    });
                }
                return response.json();
            })
            .then(data=>{
                sessionStorage.setItem("uid", data.uid);

                let lastPage = sessionStorage.getItem("last page");
                // console.log(lastPage);
                if(lastPage){
                    // console.log("hey");
                    window.location.href = lastPage;
                } else{
                    window.location.href = "../html/main.html";
                }
            })
            .catch(error=>{
                if(error == "user not found"){
                    //TODO alert that sign up is required
                } else{
                    console.error(error);
                }
            });
        });
    });
});