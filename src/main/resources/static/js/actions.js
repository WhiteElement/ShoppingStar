function searchForMeal(inputField) {
    const meals = document.querySelector("#meals");
    let searchString = inputField.value;
    const options = meals.options;

    for(i=0; i<options.length; i++) {
        searchString  = ".*" + searchString + ".*";
        if(options[i].value.match(searchString)) {
            meals.selectedIndex = i;
        };
    };
}

function getSelectedItem() {
    const meals = document.querySelector("#meals");
    return meals;
}

function removeSaveButton() {
    const button = document.querySelector("#savebutton");
    if(button != null) {
        button.remove();
    }
}

function show(cssSelector) {
    document.querySelector(cssSelector).style.display = "";
}

function removeEditingTags(ingredientList, ingredients) {
    document.querySelector("#alreadymealedit").innerText = "Gericht bearbeiten";
    ingredientList.setAttribute("data-edit","0");
    ingredientList.style.backgroundColor = "";

    for(i=0; i<ingredients.length; i++) {
        ingredients[i].querySelector("a").remove();
    }
    document.querySelector("#deletebutton").remove();
    document.querySelector("#updatebutton").remove();
    document.querySelector("#newingredientbutton").remove();
}

function resetIngredientsPageButtons() {
    document.querySelector("#alreadymealedit").classList.remove("d-none");
    document.querySelector("#toShoppingList").classList.remove("d-none");

    const ingredientList = getIngredients();
    const ingredients = ingredientList.querySelectorAll("li");

    if(isMealEditingMode()) {
        removeEditingTags(ingredientList, ingredients);

    }
}

function newItemSelected() {
    removeSaveButton();
    resetIngredientsPageButtons();
    const item = getSelectedItem();
    let heading = getHeading();
    const MealId = item.selectedOptions[0].dataset.id;
    heading.innerHTML = item.value + ' <a href="#" onclick="openMealNameEdit()">&#9998;</a>';
    heading.setAttribute("data-id", MealId);

    const listOfIngredients = getIngredients();
    listOfIngredients.textContent = '';

    fetch("/meal?id=" + MealId)
    .then((response) => response.json())
    .then((data) =>
        data.ingredients.forEach((ingredient) => {
            let node = document.createElement("li");
            node.classList.add("list-group-item", "align-items-center", "d-flex");
            let subnode1 = document.createElement("input");
            subnode1.type = "text";
            subnode1.classList.add("measure", "form-control", "me-2");
            subnode1.style.width = "33%";
            subnode1.value = ingredient.measure;
            let subnode2 = document.createElement("span");
            subnode2.innerHTML = ingredient.name;
            subnode2.classList.add("name", "fst-italic");
            node.appendChild(subnode1);
            node.appendChild(subnode2);
            listOfIngredients.appendChild(node);
        })
    );
}

function transferToShoppingList() {
    const ingredientList = document.querySelector("#ingredients").querySelectorAll("li");
    const shoppinglist = document.querySelector("#shoppinglist");
    document.querySelector("#saveshoppingbtn").classList.remove("d-none");
    document.querySelector("#allmailsbtn").classList.remove("d-none");
    for(i=0; i<ingredientList.length; i++) {
        let listitem = document.createElement("li");

        if(ingredientList[0].querySelectorAll("input").length == 2) {
            listitem.innerHTML = '<span>' + ingredientList[i].querySelector(".measure").value + ' ' +
                                 ingredientList[i].querySelector(".name").value +
                                 '</span>' +
                                 '<a onclick="remove(this)" href="#">&#10006;</a>';
        } else {
            listitem.innerHTML = '<span>' + ingredientList[i].querySelector("input").value + ' ' +
                                 ingredientList[i].querySelector("span").textContent +
                                 '</span>' +
                                 '<a onclick="remove(this)" href="#">&#10006;</a>';
        }

        shoppinglist.appendChild(listitem);
    };
}

function remove(linktag) {
    linktag.parentElement.remove();
}

function isInEditMode(elem) {
    if(elem.querySelector("input") != null) {
        return true;
    }
    else {
        return false;
    }
}

function openNewMealDialog() {

    const heading = document.querySelector("#selectedMeal");
    if(!isInEditMode(heading)) {
        document.querySelector("#alreadymealedit").style.display = "none";
        heading.innerHTML='<input type="text" class="form-control" placeholder="Wie heißt das Gericht?">';

        const ingredientList = document.querySelector("#ingredients");
        ingredientList.textContent = '';

        let button = document.createElement("button");
        button.textContent = "+ neue Zutat";
        button.onclick = function() {newIngredient()};
        button.classList.add("btn", "btn-outline-success");
        ingredientList.appendChild(button);

        let savebutton = document.createElement("button");
        savebutton.setAttribute("id", "savebutton");
        savebutton.textContent = "Gericht speichern";
        savebutton.classList.add("btn", "btn-success");
        savebutton.onclick = function() {saveMeal()};
        document.querySelector("#center").appendChild(savebutton);
    } else {
    }
}

function deleteMeal() {

    const heading = getHeading();
    const deleteid = heading.dataset.id;

    if(confirm("Sicher, dass du " + heading.firstChild.textContent + " unwiederruflich löschen willst?")){
            fetch("/meal/" + deleteid, {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : ""
            })
            .then(respone => window.location.reload());
    }
}

function isMealEditingMode() {
    const IngredientList = getIngredients();
    if(IngredientList.dataset.edit == 1) {return true;}
    else {return false;}
}

function openMealEdit() {

    const ingredientList = getIngredients();
    const ingredients = ingredientList.querySelectorAll("li");

    if(isMealEditingMode()) {
        removeEditingTags(ingredientList, ingredients);
    } else {
        document.querySelector("#alreadymealedit").innerText = "zurück";
        ingredientList.setAttribute("data-edit","1");
        
        let deletebutton = document.createElement("button");
        deletebutton.innerText = "Gericht löschen";
        deletebutton.setAttribute("id", "deletebutton");
        deletebutton.classList.add("btn","btn-outline-danger");
        deletebutton.onclick = function() {deleteMeal()};

        let newingredientbutton = document.createElement("button");
        newingredientbutton.textContent = "+ neue Zutat";
        newingredientbutton.setAttribute("id","newingredientbutton");
        newingredientbutton.onclick = function() {newIngredient()};
        newingredientbutton.classList.add("btn", "btn-sm", "btn-outline-secondary", "ms-1");
        document.querySelector("#alreadymealedit").after(newingredientbutton);
        

        let updatebutton = document.createElement("button");
        updatebutton.innerText = "Änderungen speichern";
        updatebutton.setAttribute("id", "updatebutton")
        updatebutton.classList.add("btn", "btn-outline-success", "ms-1");
        updatebutton.onclick = function() {updateMeal()};

        document.querySelector("#itemcontainer").appendChild(deletebutton);
        document.querySelector("#itemcontainer").appendChild(updatebutton);

        for(i=0; i<ingredients.length; i++) {
            let button = document.createElement("a");
            button.innerHTML = "&#10006";
            button.href="#";
            button.onclick = function () {deleteIngredient(this)};
            ingredients[i].appendChild(button);
        }
    }
}

function newIngredient(){
    const ingredientList = getIngredients();

    let node = document.createElement("li");
    node.classList.add("list-group-item", "align-items-center", "d-flex");
    let input1 = document.createElement("input");
    input1.classList.add("measure", "form-control", "me-2");
    input1.style.width = "33%";
    let input2 = document.createElement("input");
    input2.classList.add("name", "form-control");
    let deletebutton = document.createElement("a");
    deletebutton.href = "#";
    deletebutton.onclick = function() {deleteIngredient(this)};
    deletebutton.innerHTML = "&#10006;";
    node.appendChild(input1);
    node.appendChild(input2);
    node.appendChild(deletebutton);
    ingredientList.appendChild(node);
}

async function updateMeal() {
    const IngredientList = getIngredients().querySelectorAll("li");
    let ingredients = [];
    for(i=0; i<IngredientList.length; i++) {
        let ingredient = {
            measure : IngredientList[i].querySelector(".measure").value,
            name : ""
        };
        if(IngredientList[i].querySelector(".name").tagName == "INPUT") {
            ingredient.name = IngredientList[i].querySelector(".name").value;
        } else {
            ingredient.name = IngredientList[i].querySelector(".name").textContent;
        }
        ingredients[i] = ingredient;
    }
    
    meal = {
        id : getHeading().dataset.id,
        name : document.querySelector("h2#selectedMeal").firstChild.textContent,
        ingredients : ingredients
    }

    fetch("/updatemeal", {
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(meal)
    })
    .then(response => window.location.reload())
    .then(show("#alreadymealedit"));
}

async function saveMeal() {
    const IngredientList = getIngredients().querySelectorAll("li");
    let ingredients = [];
    for(i=0; i<IngredientList.length; i++) {
        let ingredient = {
            measure : IngredientList[i].querySelector(".measure").value,
            name : ""
        };
        if(isMealEditingMode()){
            console.log(IngredientList[i].querySelector(".name").tagName);
            if(IngredientList[i].querySelector(".name").tagName == "INPUT") {
                ingredient.name = IngredientList[i].querySelector(".name").value;
            } else {
                ingredient.name = IngredientList[i].querySelector(".name").textContent;
            }
            
        } else {
            ingredient.name = IngredientList[i].querySelector(".name").value
        };
        ingredients[i] = ingredient;
    }

    let meal = {
            name : document.querySelector("h2#selectedMeal > input").value,
            ingredients : ingredients
        }

        fetch("/savemeal", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(meal)
        })
        .then(response => window.location.reload());
}

function deleteIngredient(deletebutton) {
    deletebutton.parentElement.remove();
}

function getIngredients() {
    return ingredientList = document.querySelector("#ingredients");
}

function openMealNameEdit() {
    convertToInputField(getHeading());
}

function getHeading() {
    return heading = document.querySelector("#selectedMeal");
}

function convertToInputField(elemToConvert) {
    document.querySelector("h3#selectedMeal > a").style.display = 'none';
    const inputString = '<input class="form-control" type="text" onfocusout="changeMealName(this)" onchange="changeMealName(this)">';
    const text = elemToConvert.innerText;
    elemToConvert.innerHTML = inputString;
    
    focusAndCursorToEnd(elemToConvert, text);
}

function focusAndCursorToEnd(inpuElem, text) {
    inpuElem.firstChild.focus();
    inpuElem.firstChild.firstvalue = '';
    inpuElem.firstChild.value = text;
}

async function changeMealName(h2input) {
    const newInput = h2input.value;
    h2input.remove();
    getHeading().innerHTML = newInput + ' <a href="#" onclick="openMealNameEdit()">&#9998;</a>';

    const meal = {
        id : parseInt(getHeading().dataset.id),
        name : newInput
    }

    fetch("/updatemealname", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(meal)
    });

    const selectedItem = document.querySelector('option[data-id="' + meal.id + '"]');
    selectedItem.text = meal.name;
}