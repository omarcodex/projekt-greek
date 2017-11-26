// Code for simulating translation into Indus script.
// By O.A.M. 2017 @ omarcodex

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
  // console.log(data); // Debugging.
  window.alert('Thanks for adding a new entry!');
  newWordForm.reset();
}

let userInput = document.getElementById('user-typed-input');
let userOutput = document.getElementById('results-output');
document.getElementById('user-typed-input-btn').addEventListener('click', translateText);

function translateText(e) {
  userOutput.innerHTML = ''; // Resetting the field.
  e.preventDefault();
  let userSearchedForText = userInput.value;
  let finalResults = null;

  var myRe = new RegExp(userSearchedForText);

  let db = firebase.database().ref('entries');
  db
    .orderByKey()
    .once('value')
    .then(function(snapshot) {
      // console.log(snapshot);
      var results = [];

      snapshot.forEach(item => {
        // console.log(item.val());

        item.forEach(subitem => {
          // console.log(subitem.val());
          // console.log(subitem.val().match(myRe));
          // let found = false;
          if (subitem.val().match(myRe)) {
            results.push(subitem.key);
          }
        });
      });
      console.log(results);
      finalResults = results;

      finalResults.map(function(i) {
        let glyf = document.createElement('div');
        glyf.innerHTML = "<div class=''>" + i + '</div>';
        userOutput.append(glyf);
      });
    });
  // Appending the glyphs one-by-one for user readability:
  // finalResults.map(function(i) {
  //   let glyf = document.createElement('div');
  //   glyf.innerHTML = "<div class=''>" + i + '</div>';
  //   userOutput.append(glyf);
  // });
}
