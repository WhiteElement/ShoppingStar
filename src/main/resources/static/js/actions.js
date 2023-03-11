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

function newItemSelected() {
    removeSaveButton();
    const item = getSelectedItem();
    let heading = document.querySelector("#selectedMeal");
    const MealId = item.selectedOptions[0].dataset.id;
    heading.innerHTML = item.value + ' <a href="#" onclick="openMealNameEdit()">&#9998;</a>';
    heading.setAttribute("data-id", MealId);

    const listOfIngredients = document.querySelector("#ingredients");
    listOfIngredients.textContent = '';

    fetch("/meal?id=" + MealId)
    .then((response) => response.json())
    .then((data) =>
        data.ingredients.forEach((ingredient) => {
            let node = document.createElement("li");
            let subnode1 = document.createElement("input");
            subnode1.type = "text";
            subnode1.classList.add("measure");
            subnode1.value = ingredient.measure;
            let subnode2 = document.createElement("span");
            subnode2.innerHTML = ingredient.name;
            subnode2.classList.add("name");
            node.appendChild(subnode1);
            node.appendChild(subnode2);
            listOfIngredients.appendChild(node);
        })
    );
}

function transferToShoppingList() {
    const ingredientList = document.querySelector("#ingredients").querySelectorAll("li");
    const shoppinglist = document.querySelector("#shoppinglist");
    for(i=0; i<ingredientList.length; i++) {
        let listitem = document.createElement("li");

        if(ingredientList[0].querySelectorAll("input").length == 2) {
            listitem.innerHTML = ingredientList[i].querySelector(".measure").value + ' ' +
                                 ingredientList[i].querySelector(".name").value +
                                 '<a href="#">&#9998;</a>';
        } else {
            listitem.innerHTML = ingredientList[i].querySelector("input").value + ' ' +
                                 ingredientList[i].querySelector("span").textContent +
                                 '<a href="#">&#9998;</a>';
        }

        shoppinglist.appendChild(listitem);
    };
}

function isInEditMode(elem) {
    if(elem.querySelector("input") != null) {
        console.log("edit mode")
        return true;
    }
    else {
        console.log("not in edit mode");
        return false;
    }
}

function openNewMealDialog() {
    const heading = document.querySelector("#selectedMeal");
    if(!isInEditMode(heading)) {
        heading.innerHTML='<input type="text" placeholder="Wie heißt das Gericht?">';

        const ingredientList = document.querySelector("#ingredients");
        ingredientList.textContent = '';

        let button = document.createElement("button");
        button.textContent = "+ neue Zutat";
        button.onclick = function() {newIngredient()};
        ingredientList.appendChild(button);

        let savebutton = document.createElement("button");
        savebutton.setAttribute("id", "savebutton");
        savebutton.textContent = "Gericht speichern";
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
        ingredientList.setAttribute("data-edit","0");
        ingredientList.style.backgroundColor = "";

        for(i=0; i<ingredients.length; i++) {
            ingredients[i].querySelector("button").remove();
        }
        document.querySelector("#deletebutton").remove();

    } else {
        ingredientList.setAttribute("data-edit","1");
        let deletebutton = document.createElement("button");
        deletebutton.innerText = "löschen";
        deletebutton.setAttribute("id", "deletebutton")
        deletebutton.onclick = function() {deleteMeal()};

        let savebutton = document.createElement("button");
        savebutton.innerText = "speichern";
        savebutton.setAttribute("id", "savebutton")
        savebutton.onclick = function() {saveMeal()};

        document.querySelector("#center").appendChild(deletebutton);
        document.querySelector("#center").appendChild(savebutton);

        ingredientList.style.backgroundColor = "lightblue";

        for(i=0; i<ingredients.length; i++) {
            let button = document.createElement("button");
            button.innerText = "löschen";
            button.onclick = function () {deleteIngredient(this)};
            ingredients[i].appendChild(button);
        }
    }
}

function newIngredient(){
    const ingredientList = getIngredients();

    let node = document.createElement("li");
    let input1 = document.createElement("input");
    input1.classList.add("measure");
    let input2 = document.createElement("input");
    input2.classList.add("name");
    let deletebutton = document.createElement("button");
    deletebutton.onclick = function() {deleteIngredient(this)};
    deletebutton.innerText = "- Löschen";
    node.appendChild(input1);
    node.appendChild(input2);
    node.appendChild(deletebutton);
    ingredientList.appendChild(node);
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
            ingredient.name = IngredientList[i].querySelector(".name").textContent
        } else {
            ingredient.name = IngredientList[i].querySelector(".name").value
        };
        ingredients[i] = ingredient;
    }

    let meal;
    if(isMealEditingMode()) {
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
        .then(response => window.location.reload());

    } else {
        meal = {
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



}

function deleteIngredient(deletebutton) {
    deletebutton.parentElement.remove();
}

function getIngredients() {
    const ingredientList = document.querySelector("#ingredients");
    return ingredientList;
}

function openMealNameEdit() {
    const heading = getHeading();
    convertToInputField(heading);
}

function getHeading() {
    const heading = document.querySelector("#selectedMeal");
    return heading;
}

function convertToInputField(elemToConvert) {
    document.querySelector("h2#selectedMeal > a").style.display = 'none';
    const inputString = '<input type="text" onfocusout="changeMealName(this)" onchange="changeMealName(this)">';
    const text = elemToConvert.innerText;
    console.log(text);
    elemToConvert.innerHTML = inputString;
    elemToConvert.firstChild.focus();
    elemToConvert.firstChild.firstvalue = '';
    elemToConvert.firstChild.value = text;
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