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
    })
    .then(data => displayToast("Shopping Star","Einkaufsliste gespeichert"));

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
    document.querySelector("#listcontainer").innerHTML = '<div id="list" class="w-50"><div>';
    const popup = document.querySelector("#shoppinglistspop");
    popup.classList.remove("d-none");
    const response = await loadAllShoppingLists();
    populatePopup(popup, response);
    const preview = createPreviewWindow(popup);
    document.querySelector("#listcontainer").appendChild(preview);
    addExitBtn(popup);


}

function loadAllShoppingLists() {
    return fetch("/shoppinglists")
    .then(response => response.json());

}

function removeItemsWithId(id) {
    const list = document.querySelector("#list");
    const items = list.querySelectorAll("a[data-id='" + id + "']");
    for(i=0; i < items.length; i++) {
        items[i].remove();
    }
}

function deleteShoppingList(id) {
    const popup = document.querySelector("#shoppinglistspop");
    if(confirm("Einkaufszettel wirklich löschen?")) {
        fetch("/deleteshoppinglist?id=" + id, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(() => removeItemsWithId(id));
    }
}

function populatePopup(container, shoppinglists) {
    const listcontainer = container.querySelector("#list");
    listcontainer.textContent = '';
    for(i=0; i<shoppinglists.length; i++) {
        const list = document.createElement("a");
        const date = new Date(shoppinglists[i].updateDate);
        list.href = "#";
        list.setAttribute("data-items", shoppinglists[i].items);
        list.setAttribute("data-id", shoppinglists[i].id);
        list.onclick = function() {getShoppinglist(this.getAttribute('data-items'), container)}
        list.onmouseover = function() {displayItems(this);}
        list.textContent = date.toLocaleDateString("de-DE");
      
        listcontainer.appendChild(list);

        const deletelink = document.createElement("a");
        deletelink.href = "#";
        deletelink.innerHTML = "&#10006;"
        deletelink.classList.add("ms-2");
        deletelink.setAttribute("title", "löschen");
        deletelink.setAttribute("data-id", shoppinglists[i].id);
        deletelink.onclick = function() {deleteShoppingList(this.dataset.id)};
        listcontainer.appendChild(deletelink);

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
    const listcontainer = document.createElement("div");
    listcontainer.setAttribute("id", "list");
    listcontainer.setAttribute("id", "output");
    listcontainer.classList.add("w-50");

    const outputbox = document.createElement("span");
    listcontainer.appendChild(outputbox);

    return listcontainer;

}

function displayItems(linktag) {
    const output = document.querySelector("#output");
    output.textContent = '';
    let outputitems = linktag.dataset.items.split(",");

    for(i=0; i<outputitems.length; i++) {
        let content = document.createTextNode(outputitems[i]);
        let nline = document.createElement("br");
        output.appendChild(content);
        output.appendChild(nline);
    }
}

function addExitBtn(popupcontainer) {
    const btn = document.createElement("a");
    btn.href = "#";
    btn.onclick = function () {closePop();};
    btn.setAttribute("id", "closebtn");
    btn.innerHTML = "&#10006;";

    popupcontainer.querySelector("#listcontainer").appendChild(btn);
}

function closePop() {
    const popup = document.querySelector("#shoppinglistspop");
    popup.classList.add("d-none");
}

function displayToast(heading, text) {
            const alert = document.querySelector(".toast");
            alert.querySelector(".toast-body").textContent = text;
            alert.querySelector(".me-auto").textContent = heading;
            const toast = new bootstrap.Toast(alert);
            toast.show();
}