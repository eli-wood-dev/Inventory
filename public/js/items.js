let maxPageNumber = 2;//should change on first request

let data = {
    pageNumber: "1",
    amountPerPage: "10"
}

window.addEventListener("load", ()=>{
    data.uid = sessionStorage.getItem("uid");
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

    document.querySelector("#last").addEventListener("click", ()=>{
        data.pageNumber = data.maxPageNumber;
        getItems(data, displayItems);
    });

    document.querySelector("#first").addEventListener("click", ()=>{
        data.pageNumber = 1;
        getItems(data, displayItems);
    });

    document.querySelector("#add-button").addEventListener("click", ()=>{
        window.location.href = "new.html";
    });
});

function getItems(json){
    fetch("../../private/page_display.php", {
        method: "POST",
        body: JSON.stringify(json),
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
    .then((data)=>{
        displayItems(data.items);
        maxPageNumber = data.maxPageNumber;
    }).catch(error=>{
        console.error(error);
    });
}

async function displayItems(data){
    let container = document.querySelector(".items");
    // console.log(container);
    //remove all children
    await removeChildren(container);
    //add new data

    for(let item of data){
        let element = await addElement(container, "li");
        addTextNode(element, item.name);
        element.classList.add("pointer");
        element.addEventListener("click", (e)=>{
            window.location.href = "../html/item.html?id=" + item.id;
        });
    }
}

