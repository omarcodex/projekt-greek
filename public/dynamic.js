// Code for searching crowd-sourced Ancient Greek dictionary list.
// Made in 2017 by @omarcodex. Contact: oam@cal.berkeley.edu

let newWord1 = document.getElementById('new-word-1');
let newWord2 = document.getElementById('new-word-2');
let newWordForm = document.getElementById('new-word-form');
let newWordSubmit = document.getElementById('new-word-submit');

newWordSubmit.addEventListener('click', submitNewEntry);

function submitNewEntry(e) {
  e.preventDefault();
  let entries = firebase.database().ref('entries');
  let data = {};
  data[newWord1.value] = newWord2.value;
  entries.push(data);
  window.alert('Thanks for adding a new entry!');
  newWordForm.reset();
}

let userInput = document.getElementById('user-typed-input');
let userOutput = document.getElementById('results-output');
document.getElementById('user-typed-input-btn').addEventListener('click', translateText);

function translateText(e) {
  userOutput.innerHTML = '';
  e.preventDefault();
  let userSearchedForText = userInput.value;
  let finalResults = null;

  var myRe = new RegExp(userSearchedForText);

  let db = firebase.database().ref('entries');
  db
    .orderByKey()
    .once('value')
    .then(function(snapshot) {
      var results = [];
      snapshot.forEach(item => {
        item.forEach(subitem => {
          if (subitem.val().match(myRe)) {
            results.push(subitem.key);
          }
        });
      });
      finalResults = results; // DEV.

      finalResults.map(function(i) {
        let glyf = document.createElement('div');
        glyf.innerHTML = "<div class=''>" + i + '</div>';
        userOutput.append(glyf);
      });
    });
}
