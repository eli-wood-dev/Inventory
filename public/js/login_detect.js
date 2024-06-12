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
    .then(async (res) => {
        if (!res.ok) {
            const text = await res.text();
            return Promise.reject(text);
        } else {
            return res.json();
        }
    })
    .then(data=>{
        //don't need the uid again
    },
    (reason) => {
        //TODO handle error
        console.error(reason);
        // alert(reason);
    });
}

function redirect(){
    sessionStorage.removeItem("uid");
    sessionStorage.setItem("last page", window.location.href);
    window.location.href = "../html/login.html";
}