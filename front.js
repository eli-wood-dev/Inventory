let currentPage = 1;
let maxPageNumber = 2;//should change on first request

let data = {
    pageNumber: currentPage,
    amountPerPage: "10"
}

function getItems(json){
    fetch("test.php", {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then((response)=>response.json())
    .then((data)=>{
        displayItems(data.items);
        maxPageNumber = data.maxPageNumber;
    });
}

getItems(data);

async function displayItems(data){
    let container = await getContainer();
    // console.log(container);
    //remove all children
    while(container.lastChild){
        container.removeChild(container.lastChild);
    }
    //add new data
    data.forEach((hero, index) => {
        let element = document.createElement("li");
        element.appendChild(document.createTextNode((index + 1) + " " + hero.name));
        container.appendChild(element);
    });
}

async function getContainer(){
    return document.querySelector(".people");
}

document.getElementById("prev").addEventListener("click", ()=>{
    if(data.pageNumber > 1){
        data.pageNumber --;
        getItems(data, displayItems);
    }
});

document.getElementById("next").addEventListener("click", ()=>{
    if(data.pageNumber < maxPageNumber){
        data.pageNumber ++;
    }
    getItems(data, displayItems);
});