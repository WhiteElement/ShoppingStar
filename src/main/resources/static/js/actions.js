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

function newItemSelected() {
    const item = getSelectedItem();
    let heading = document.querySelector("#selectedMeal");
    heading.innerHTML = item.value;

    const MealId = item.selectedOptions[0].dataset.id;
    const listOfIngredients = document.querySelector("#ingredients");
    listOfIngredients.textContent = '';

    fetch("/meal?id=" + MealId)
    .then((response) => response.json())
    .then((data) =>
        data.ingredients.forEach((ingredient) => {
            let node = document.createElement("li");
            let subnode1 = document.createElement("input");
            subnode1.type = "text";
            subnode1.value = ingredient.measure;
            let subnode2 = document.createElement("span");
            subnode2.innerHTML = ingredient.name;
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
        listitem.innerHTML = ingredientList[i].querySelector("input").value + ' ' +
                             ingredientList[i].querySelector("span").textContent +
                             '<a href="#">&#9998;</a>';
        shoppinglist.appendChild(listitem);
    };
}

function openNewMealDialog() {
    const heading = document.querySelector("#selectedMeal");
    heading.innerHTML='<input type="text" placeholder="Wie heißt das Gericht?">';

    const ingredientList = document.querySelector("#ingredients");
    ingredientList.textContent = '';

    let button = document.createElement("button");
    button.textContent = "+ neue Zutat";
    button.onclick = function() {newIngredient()};
    ingredientList.appendChild(button);

    let savebutton = document.createElement("button");
    savebutton.textContent = "Gericht speichern";
    savebutton.onclick = function() {saveMeal()};
    document.querySelector("#center").appendChild(savebutton);
}

function newIngredient(){
    const ingredientList = document.querySelector("#ingredients");

    let node = document.createElement("li");
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    let deletebutton = document.createElement("button");
    deletebutton.onclick = function() {deleteIngredient(this)};
    deletebutton.innerText = "- Löschen";
    node.appendChild(input1);
    node.appendChild(input2);
    node.appendChild(deletebutton);
    ingredientList.appendChild(node);
}

function saveMeal() {
    alert("nocht nicht belegt");
}

function deleteIngredient(deletebutton) {
    deletebutton.parentElement.remove();
}