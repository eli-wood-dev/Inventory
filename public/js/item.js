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
    .then((response)=>response.json())
    .then((data)=>{
        if(data.error){
            throw new Error(data.error);
        }
        displayItems(data);
    }).catch(error=>{
        console.log(error);
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
            });
        }
    });

    document.querySelector("#delete-button").addEventListener("click", ()=>{
        if(window.confirm("Are you sure you want to delete? This can not be reversed.")){
            fetch("../../private/modify_item.php", {
                method: "POST",
                body: JSON.stringify(idJSON),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
    });

});

async function displayItems(data){
    item = data;
    console.log(item);
    let container = document.querySelector(".item");
    await addTextNode(container, "Name: " + data.name);
    await addElement(container, "br");
    await addTextNode(container, "Location: " + data.l_name);
    await addElement(container, "br");
    await addTextNode(container, "Shelf: " + data.address);
    
}