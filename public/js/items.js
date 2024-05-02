let maxPageNumber = 2;//should change on first request

let data = {
    pageNumber: "1",
    amountPerPage: "10"
}

window.addEventListener("load", ()=>{
    getItems(data);

    document.querySelector("#prev").addEventListener("click", ()=>{
        if(data.pageNumber > 1){
            data.pageNumber --;
            getItems(data, displayItems);
        }
    });
    
    document.querySelector("#next").addEventListener("click", ()=>{
        if(data.pageNumber < maxPageNumber){
            data.pageNumber ++;
        }
        getItems(data, displayItems);
    });
});

function getItems(json){
    fetch("../../private/page_display.php", {
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

async function displayItems(data){
    let container = await getContainer();
    // console.log(container);
    //remove all children
    while(container.lastChild){
        container.removeChild(container.lastChild);
    }
    //add new data
    data.forEach((item, index) => {
        let element = document.createElement("li");
        element.appendChild(document.createTextNode((index + 1) + " " + item.name));
        element.addEventListener("click", (e)=>{
            window.location.href = "../html/item.html?id=" + item.id;
        });
        container.appendChild(element);
    });
}

async function getContainer(){
    return document.querySelector(".people");
}

