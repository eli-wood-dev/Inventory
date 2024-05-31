let item = {
    "s_id": null,
    "c_id": null,
    "name": null,
    "notes": null,
    "quantity": null,
    "unit": null,
    "billing_type": null,
    "available": 1,
    "image": null,
    "created": null,
    "last_modified": null,
    "value": null,
};

window.addEventListener("load", ()=>{
    item.uid = sessionStorage.getItem("uid");

    document.querySelectorAll(".required").forEach(element=>{
        addStar(element);
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
            document.activeElement.blur();
        }
    });

    document.querySelector("#back-button").addEventListener("click", ()=>{
        document.location.href = "items.html";
    });

});

function save(){
    let container = document.querySelector(".item");

    let required;

    for(let element of container.children){
        if(element.classList.contains("required") && !element.value){//? doesn't work anymore
            required += element.name + " ";
        }

        if(element.tagName == "LABEL"){
            let input = document.querySelector("#" + element.getAttribute("for"));
            if(input){
                console.log(input);
                item[input.name] = input.value;
            }
        }
    }

    if(required !== null){
        return Promise.reject("required elements not filled: " + required);
    }

    return fetch("../../private/create_item.php", {
        method: "POST",
        body: JSON.stringify(item),
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
    .catch(error=>{
        console.error(error);
    });
}