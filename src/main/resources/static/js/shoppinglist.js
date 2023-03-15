async function saveShoppingList() {
    
    const shoppinglist = {
        items : getItems(),
    }

    await fetch("/newlist", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(shoppinglist)
    });
}

function getItems() {
    const listitem = document.querySelector("#shoppinglist").children;

    const items = [];
    for(i=0; i<listitem.length; i++) {
        items[i] = listitem[i].querySelector("span").textContent;
    }
    return items;
}

function clearShoppingList() {
    document.querySelector("#shoppinglist").textContent = '';
}

async function openShoppingListsPop() {
    const popup = document.querySelector("#shoppinglistspop");
    popup.classList.remove("d-none");
    const response = await loadAllShoppingLists();
    populatePopup(popup, response);
    createPreviewWindow(popup);
    addExitBtn(popup);

}

function loadAllShoppingLists() {
    return fetch("/shoppinglists")
    .then(response => response.json());

}

function populatePopup(container, shoppinglists) {
    const listcontainer = container.querySelector("#listcontainer");
    listcontainer.textContent = '';
    for(i=0; i<shoppinglists.length; i++) {
        const list = document.createElement("a");
        list.href = "#";
        list.setAttribute("data-items", shoppinglists[i].items);
        list.onclick = function() {getShoppinglist(this.getAttribute('data-items'), container)}
        list.onmouseover = function() {displayItems(this);}
        list.textContent = shoppinglists[i].updateDate;
      
        listcontainer.appendChild(list);
        listcontainer.appendChild(document.createElement("br"));
    }
}

function getShoppinglist(shoppinglistitems, container) {
    container.classList.add("d-none");
    const items =  shoppinglistitems.split(",");

    const shoppinglist = document.querySelector("#shoppinglist");
    shoppinglist.textContent = '';
    for(i=0; i<items.length; i++) {
        const item = document.createElement("li");
        item.innerHTML = '<span>' 
                        + items[i]
                        +'</span>'
                        +'<a onclick="remove(this)" href="#">&#10006;</a>';

        shoppinglist.appendChild(item);
    }
}

function createPreviewWindow(popupContainer) {
    const listcontainer = popupContainer.querySelector("#listcontainer");

    const outputbox = document.createElement("span");
    outputbox.setAttribute("id", "output");
    listcontainer.appendChild(outputbox);
}

function displayItems(linktag) {
    const output = document.querySelector("#output");
    output.textContent = linktag.dataset.items;
}

function addExitBtn(popupcontainer) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.onclick = function () {closePop();};
    btn.innerHTML = "&#10006;";

    popupcontainer.querySelector("#listcontainer").appendChild(btn);
}

function closePop() {
    const popup = document.querySelector("#shoppinglistspop");
    popup.classList.add("d-none");
}