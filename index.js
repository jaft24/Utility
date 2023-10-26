import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://utility-fa153-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopingListInDB = ref(database, "shoppingList")
let shoppingArray = [[]];
let itemName = [];
let itemId = [];

const addInput = document.getElementById("add-input")
const amount = document.getElementById("amount")
const incAmount = document.getElementById("increase-amount")
const decAmount = document.getElementById("decrease-amount") 

const addButton = document.getElementById("add-btn")
const itemsList = document.getElementById("items-list")

const menu = document.getElementById("menu")

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
    if (amount.value == ""){
        amount.value = 1
    }
    let inputValue = addInput.value + " x" + amount.value
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


menu.addEventListener("click", () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
})