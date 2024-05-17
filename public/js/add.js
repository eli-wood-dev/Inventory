let item = {};

window.addEventListener("load", ()=>{
    document.querySelectorAll(".required").forEach(element=>{
        addStar(element);
    });

    fetch("../../private/get_generic_item.php")
    .then((response)=>{
        if (!response.ok) {
            return response.json()
            .then(error => { 
                throw new Error(error.message);
            });
        }
        return response.json();
    })
    .then(data=>{
        item = data;
    })
    .catch(error=>{
        console.error(error);
    });

    document.querySelector("#save-button").addEventListener("click", ()=>{
        save().then(data=>{
            if(data.id){
                // console.log("item.html?" + new URLSearchParams("id=" + data.id).toString);
                // let id = new URLSearchParams("id=" + data.id).toString();
                // document.location.href = "item.html?" + id;
                document.location.href = "item.html?id=" + data.id;
            }
        }, reason=>{
            alert(reason);
        });
    });

    window.addEventListener("keypress", (event)=>{
        if(event.key == "Enter"){
            save().then(data=>{
                if(data.id){
                    document.location.href = "item.html?id=" + data.id;
                }
            }, reason=>{
                alert(reason);
                document.activeElement.blur();
            });
        }
    });

    document.querySelector("#back-button").addEventListener("click", ()=>{
        document.location.href = "items.html";
    });

});

function save(){
    let container = document.querySelector(".item");

    for(let element of container.children){
        if(element.classList.contains("required") && !element.value){
            return Promise.reject("required elements not filled");
        }

        if(element.tagName == "LABEL"){
            let input = document.querySelector("#" + element.getAttribute("for"));
            if(input){
                item[input.name] = input.value;
            }
        }
    }

    return fetch("../../private/create_item.php", {
        method: "POST",
        body: JSON.stringify(item),
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
    .catch(error=>{
        console.error(error);
    });
}