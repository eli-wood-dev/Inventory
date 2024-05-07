async function sha256(str){
    let msgUint8 = new TextEncoder().encode(str);
    let hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    let hashArray = Array.from(new Uint8Array(hashBuffer));
    let sha256Str = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return sha256Str;
}

async function addElement(parent, element){
    parent.appendChild(document.createElement(element));
}

async function addTextNode(parent, text){
    parent.appendChild(document.createTextNode(text));
}