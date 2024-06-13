let customers = {
    "1": "admin"
}

window.addEventListener("load", ()=>{
    document.querySelectorAll(".required").forEach(element=>{
        addStar(element);
    });

    let form = document.querySelector("#signupForm");
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
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

            sessionStorage.setItem("c_id", data.c_id);
            sessionStorage.setItem("company", customers[data.c_id]);
            
            fetch("../../private/signup.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    return Promise.reject(text);
                } else {
                    return res.json();
                }
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
            },
            (reason) => {
                //TODO handle error
                console.error(reason);
                // alert(reason);
            });
        });
    });
});