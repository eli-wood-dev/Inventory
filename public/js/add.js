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
    item.c_id = sessionStorage.getItem("c_id");

    document.querySelectorAll(".required").forEach(element=>{
        addStar(element);
    });

    document.querySelector("#save-button").addEventListener("click", ()=>{
        save().then(data=>{
            if(data.id){
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
    
    let required = "";
    
    // Iterate over all children with the class 'required'
    for(let element of container.querySelectorAll(".required")) {
        if(!element.value) {
            required += element.name + " ";
        }
    }
    
    // Iterate over all children to find labels and match inputs
    for(let element of container.children) {
        if(element.tagName === "LABEL") {
            let input = document.querySelector("#" + element.getAttribute("for"));
            if(input) {
                item[input.name] = input.value;
            }
        }
    }
    
    // Check if required fields are not filled
    if(required.length > 0) {
        return Promise.reject("required elements not filled: " + required.trim());
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