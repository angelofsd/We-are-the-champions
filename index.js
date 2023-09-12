// javascript https://we-are-the-champions-2c4c5-default-rtdb.firebaseio.com/

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-2c4c5-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");
const inputFieldEl = document.getElementById("text-input");
const addButtonEl = document.getElementById("publish-btn");
const endorsementsListEl = document.getElementById("endorsement-list");

addButtonEl.addEventListener("click", ()=> {
  let inputValue = inputFieldEl.value;
  push(endorsementsInDB, inputValue);

  clearInputFieldEl();

})

onValue(endorsementsInDB, (snapshot)=> {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

    clearEndorsementListEl();
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]
      
      appendItemToEndorsementListEl(currentItem)
  } 


  } else {
    endorsementsListEl.innerHTML = "No items here... yet"
  }
})

function clearEndorsementListEl() {
  endorsementsListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = ""
}

function appendItemToEndorsementListEl(item) {
  
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", ()=> {
    let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`);

    remove(exactLocationOfItemInDB);
  })

  endorsementsListEl.append(newEl);
}