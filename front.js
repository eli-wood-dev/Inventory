let currentPage = 1;

let data = {
    pageNumber: currentPage,
    amountPerPage: "10"
}

function getPeople(json){
    fetch("test.php", {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then((response)=>response.json())
    .then((data)=>displayPeople(data));
}

getPeople(data);

async function displayPeople(data){
    let container = await getContainer();
    console.log(container);
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
        getPeople(data, displayPeople);
    }
});

document.getElementById("next").addEventListener("click", ()=>{
    data.pageNumber ++;
    getPeople(data, displayPeople);
});