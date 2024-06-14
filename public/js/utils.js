async function sha256(str){
    let msgUint8 = new TextEncoder().encode(str);
    let hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    let sha256Str = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return sha256Str;
}

async function addElement(parent, element){
    let newE = document.createElement(element);
    parent.appendChild(newE);
    return newE;
}

async function addTextNode(parent, text){
    let newT = document.createTextNode(text);
    parent.appendChild(newT);
    return newT;
}

async function addStar(parent){
    let star = document.createElement("span");
    star.innerHTML = "*";
    star.classList.add("required-star");
    parent.parentNode.insertBefore(star, parent.nextSibling);
}

async function removeChildren(container){
    while(container.lastChild){
        container.removeChild(container.lastChild);
    }
}

function toggleCheckbox(element){
    if(element.checked){
        element.value = 1;
    } else{
        element.value = 0;
    }
}

function cloneJSON(obj) {
    // basic type deep copy
    if (obj === null || obj === undefined || typeof obj !== 'object')  {
        return obj
    }
    // array deep copy
    if (obj instanceof Array) {
        var cloneA = [];
        for (var i = 0; i < obj.length; ++i) {
            cloneA[i] = cloneJSON(obj[i]);
        }              
        return cloneA;
    }                  
    // object deep copy
    var cloneO = {};   
    for (var i in obj) {
        cloneO[i] = cloneJSON(obj[i]);
    }                  
    return cloneO;
}

// const formatter = new Intl.NumberFormat(undefined, {
//     minimumFractionDigits: 2, 
//     maximumFractionDigits: 2
// });

function formatNumber(num){
    num = num.toString();
    num = num.replace(/[^0-9.]/g, '');

    // if(num.endsWith(".") && (num.match(/\./g)).length === 1){//if has a . at the end
        
    // }

    let parts = (num.includes(".") ? num.split('.') : [num]);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts.length > 1) {
        parts = [parts[0], parts[1]];
        parts[1] = parts[1].substring(0, 2);
        num = parts.join('.');
    } else{
        num = parts[0];
    }

    // let number = parseFloat(num);
    
    // if (!isNaN(number)) {
    //     formatter.format(number);
    // }

    return num.toString();
}

function addTrailingZeroes(num, numZeros=2){
    if(num.length == 0){
        return num;
    }
    let toAdd = "";
    for(let i = 0; i < numZeros; i++){
        toAdd += "0";
    }
    if(num.endsWith("." + toAdd)){
        return num;
    }
    if(num.endsWith(".")){
        num += toAdd;
        return num;
    } else if(num.includes(".")){
        let parts = num.split(".");

        let zerosToAdd = numZeros - parts[parts.length-1].length;
        if(zerosToAdd != 0){
            toAdd = "";
            for(let i = 1; i < numZeros; i++){
                toAdd += "0";
            }
            parts[parts.length-1] += toAdd;
        }

        return parts.join(".");
    }
    num += "." + toAdd;
    return num;
}

async function makeFetch(url, data, callback){
    try{
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
        }

        const jsonData = await res.json();
        return callback(jsonData);
    } catch (error) {
        return Promise.reject(error);
    }
}