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