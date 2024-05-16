//basically re-uses items.js
let searchParams = new URLSearchParams(window.location.search);

let idJSON = {
    id: searchParams.get("id"),
}

let item;

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
            return response.json().then(error => { 
                throw new Error(error.error);
            });
        }
        return response.json();
    })
    .then((data)=>{
        displayItems(data);
    })
    .catch(error=>{
        console.error(error.message);
    });
 
    document.querySelector("#edit-button").addEventListener("click", ()=>{
        let editButton = document.querySelector("#edit-button");
        document.querySelector("#save-button").classList.toggle("hidden");
        document.querySelector("#delete-button").classList.toggle("hidden");
        // saveButton.classList.toggle("hidden");
        if(editButton.innerHTML == "edit"){//if not editing
            editButton.innerHTML = "edit_off";
        } else{
            editButton.innerHTML = "edit";
        }
    });

    document.querySelector("#save-button").addEventListener("click", ()=>{
        if(window.confirm("Are you sure you want to save?")){
            fetch("../../private/modify_item.php", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=>{
                if (!response.ok) {
                    return response.json().then(error => { 
                        throw new Error(error.error);
                    });
                }
                return response.json();
            })
            .catch(error=>{
                console.error(error.message);
            });
        }
    });

    document.querySelector("#delete-button").addEventListener("click", ()=>{
        if(window.confirm("Are you sure you want to delete? This can not be reversed.")){
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
                        throw new Error(error.error);
                    });
                }
                return response.json();
            }).then(data=>{
                window.location.href="items.html";
            })
            .catch(error=>{
                console.error(error.message);
            });
        }
    });

    document.querySelector("#back-button").addEventListener("click", ()=>{
        document.location.href = "items.html";
    });

});

async function displayItems(data){
    item = data;
    // console.log(item);
    let container = document.querySelector(".item");
    await addTextNode(container, "Name: " + data.name);
    await addElement(container, "br");
    await addTextNode(container, "Location: " + data.l_name);
    await addElement(container, "br");
    await addTextNode(container, "Shelf: " + data.address);
    
}