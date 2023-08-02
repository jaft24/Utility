import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-3bc1a-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopingListInDB = ref(database, "shoppingList")
let shoppingArray = [[]];
let itemName = [];
let itemId = [];

const addInput = document.getElementById("add-input")
const addButton = document.getElementById("add-btn")
const itemsList = document.getElementById("items-list")

onValue(shopingListInDB, (snapshot) => {
   if (snapshot.exists()){
        itemsList.innerHTML = "";
        shoppingArray = Object.entries(snapshot.val())
        console.log(shoppingArray);
        shoppingArray.map(item => {
            itemId.push(item[0])
            itemName.push(item[1])
            appendInput(item);
        })
    } else {
        itemsList.innerHTML = "No items here yet..."
    }  
})

addButton.addEventListener("click", () => {
    let inputValue = addInput.value
    if (inputValue) {
        push(shopingListInDB, inputValue)
        clearInput();
    }
})

function clearInput() {
    addInput.value = ""
}
function appendInput(inputValue) {
    let newEl = document.createElement("li")
    newEl.textContent = inputValue[1];

    newEl.addEventListener("dblclick", () => {
       let extactLocationOfList = ref (database, `shoppingList/${inputValue[0]}`)
       remove(extactLocationOfList);
    })
    itemsList.append(newEl);
}


/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
