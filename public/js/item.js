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
        displayItems(data);
    });
});

async function displayItems(data){
    console.log(data);
    let container = document.querySelector(".item");
    container.appendChild(document.createTextNode(data.name));
}