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
  console.log(data); // Debugging.
  newWordForm.reset();
}

// let userInput = document.getElementById('user-typed-input');
// let userOutput = document.getElementById('user-typed-output');
// document.getElementById('user-typed-input-btn').addEventListener('click', translateText);
//
// function translateText(e) {
//   userOutput.innerHTML = ''; // Resetting the field.
//   e.preventDefault();
//   let userTranslatedText = userInput.value;
//   let alteredText = userTranslatedText.split('');
//
//   // Appending the glyphs one-by-one for user readability:
//   alteredText.map(function(i) {
//     let glyf = document.createElement('div');
//     glyf.innerHTML = "<div class='glyph'>" + i + '</div>';
//     userOutput.append(glyf);
//   });
// }
