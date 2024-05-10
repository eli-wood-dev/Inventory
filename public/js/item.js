//basically re-uses items.js
let searchParams = new URLSearchParams(window.location.search);

let data = {
    id: searchParams.get("id"),
}

window.addEventListener("load", ()=>{
    fetch("../../private/get_item.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
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
});

async function displayItems(data){
    console.log(data);
    let container = document.querySelector(".item");
    await addTextNode(container, "Name: " + data.name);
    await addElement(container, "br");
    await addTextNode(container, "Location: " + data.l_name);
    await addElement(container, "br");
    await addTextNode(container, "Shelf: " + data.address);
    
}