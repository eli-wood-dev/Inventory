//basically re-uses items.js
let searchParams = new URLSearchParams(window.location.search);

let idJSON = {
    id: searchParams.get("id"),
}

let item = {};
let editing = false;

window.addEventListener("load", ()=>{
    fetch("../../private/get_item.php", {
        method: "POST",
        body: JSON.stringify(idJSON),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response)=>{
        if (!response.ok) {
            return response.json()
            .then(error => { 
                throw new Error(error.message);
            });
        }
        return response.json();
    })
    .then((data)=>{
        item = data;
        displayItems(data);
    })
    .catch(error=>{
        console.error(error);
    });
 
    document.querySelector("#edit-button").addEventListener("click", ()=>{
        let editButton = document.querySelector("#edit-button");
        document.querySelector("#save-button").classList.toggle("hidden");
        document.querySelector("#delete-button").classList.toggle("hidden");
        // saveButton.classList.toggle("hidden");
        if(editButton.innerHTML == "edit"){//if not editing
            editButton.innerHTML = "edit_off";
            editing = true;
            displayItemsEdit(item);
        } else{
            editButton.innerHTML = "edit";
            editing = false;
            displayItems(item);
        }
    });

    document.querySelector("#save-button").addEventListener("click", ()=>{
        if(editing){
            save().then(response=>{

            }, reason=>{
                alert(reason);
            });
        }
    });

    document.querySelector("#delete-button").addEventListener("click", ()=>{
        if(editing && window.confirm("Are you sure you want to delete? This can not be reversed.")){
            fetch("../../private/remove_item.php", {
                method: "POST",
                body: JSON.stringify(idJSON),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=>{
                if (!response.ok) {
                    return response.json().then(error => { 
                        throw new Error(error.message);
                    });
                }
                return response.json();
            }).then(data=>{
                window.location.href="items.html";
            })
            .catch(error=>{
                console.error(error);
            });
        }
    });

    document.querySelector("#back-button").addEventListener("click", ()=>{
        document.location.href = "items.html";
    });

});

window.addEventListener("keypress", (event)=>{
    if(editing && event.key == "Enter"){
        document.activeElement.blur();
        save().then(response=>{

        }, reason=>{
            alert(reason);
        });
    }
});

function save(){
    let container = document.querySelector(".item");
    let data = cloneJSON(item);

    for(let element of container.children){
        if(element.classList.contains("required") && !element.value){
            return Promise.reject("required elements not filled");
        }

        if(element.tagName == "LABEL"){
            let input = document.querySelector("#" + element.getAttribute("for"));
            if(input){
                data[input.name] = input.value;
            }
        }
    }

    // console.log(data);

    //request to save
    return fetch("../../private/modify_item.php", {
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
    .catch(error=>{
        console.error(error);
    });
}

async function displayItems(data){
    // console.log(data);
    // for(let key in data){
    //     let value = data[key];
    //     console.log(key + ": " + value);
    // }

    // console.log(item);
    let container = document.querySelector(".item");

    await removeChildren(container);
    // let nameL = await addElement(container, "label");
    // await addTextNode(nameL, "Name: ");
    // let nameV = await addElement(container, "input");
    // nameV.setAttribute("id", "nameInput");
    // nameV.setAttribute("placeholder", data.name);
    // nameL.setAttribute("for", nameV.id);

    await addTextNode(container, "Name: " + data.name);
    await addElement(container, "br");
    let available = await itemAsInput(container, "Available", "available", data.available, "checkbox");
    available.setAttribute("disabled", "false");
    // available.setAttribute("onclick", "return false;");
    if(available.value != 0){
        available.checked = true;
    }
    // await addTextNode(container, "Location: " + data.l_name);
    // await addElement(container, "br");
    // await addTextNode(container, "Shelf: " + data.address);
    
}

async function displayItemsEdit(data){
    let container = document.querySelector(".item");

    await removeChildren(container);

    // await addTextNode(container, "Name: " + data.name);
    let name = await itemAsInput(container, "Name", "name", data.name);
    name.classList.add("required");
    addStar(name);
    await addElement(container, "br");
    let available = await itemAsInput(container, "Available", "available", data.available, "checkbox");
    if(available.value != 0){
        available.checked = true;
    }
    available.addEventListener("change", ()=>{
        toggleCheckbox(available);
    });
    // await addElement(container, "br");
    // await itemAsInput(container, "Location", "l_name", data.l_name);
    // await addElement(container, "br");
    // await itemAsInput(container, "Shelf", "address", data.address);
}

/**
 * 
 * @param {*} parent the parent container
 * @param {*} label then name of the label, i.e. "name"
 * @param {*} value the placeholder value in the input field
 */
async function itemAsInput(parent, label, key, value){
    return itemAsInput(parent, label, key, value, "text");
}

/**
 * 
 * @param {*} parent the parent container
 * @param {*} label then name of the label, i.e. "name"
 * @param {*} value the placeholder value in the input field
 */
async function itemAsInput(parent, label, key, value, type){
    let l = await addElement(parent, "label");
    await addTextNode(l, label + ": ");
    let v = await addElement(parent, "input");
    v.setAttribute("id", key + "Input");
    v.setAttribute("type", type);
    v.setAttribute("value", value);
    v.setAttribute("name", key);
    l.setAttribute("for", v.id);
    return v;
}