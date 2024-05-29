if(!sessionStorage.getItem("uid")){
    redirect();
} else{
    fetch("../../private/authenticate.php", {
        method: "POST",
        body: JSON.stringify({//hardcoded for now
            "uid": sessionStorage.getItem("uid")
        }),
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
        //don't need the uid again
    })
    .catch(error=>{
        if(error == "invalid uid"){
            redirect();
        } else{
            console.error(error);
        }
    });
}

function redirect(){
    sessionStorage.removeItem("uid");
    sessionStorage.setItem("last page", window.location.href);
    window.location.href = "../html/login.html";
}