window.addEventListener("load", ()=>{
    document.querySelectorAll(".required").forEach(element=>{
        addStar(element);
    });

    let form = document.querySelector("#signupForm");
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        let data = {};

        sha256(document.querySelector("#passwordInput").value).then(pass=>{
            data.password = pass;

            for(let element of form.children){
                if(element.tagName == "LABEL"){
                    let input = document.querySelector("#" + element.getAttribute("for"));
                    if(input && input.name != "password"){
                        data[input.name] = input.value;
                    }
                }
            }
            
            fetch("../../private/signup.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=>{
                return response.json();
            })
            .then(value=>{
                if (value.code && value.code != 200) {
                    return Promise.resolve(value)
                    .then(error => { 
                        throw new Error(error.message);
                    });
                }
                return Promise.resolve(value);
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
                if(error == "Error: user already exists"){
                    alert("user already exists");
                } else{
                    console.error(error);
                }
            });
        });
    });
});