// Array of hangman words
const wordArr = [
  "apple",
  "banana",
  "carrot",
  "dog",
  "elephant",
  "flower",
  "guitar",
  "house",
  "internet",
  "jungle",
  "kangaroo",
  "lemon",
  "mountain",
  "notebook",
  "ocean",
  "piano",
  "queen",
  "river",
  "sun",
  "tree",
  "umbrella",
  "violin",
  "water",
  "xylophone",
  "yellow",
  "zebra"
];

 // Variables
 const userInput = document.querySelector('.input');
 const enterBtn = document.querySelector('.enterButton');
 let guessedWord = document.querySelector('.word');
 let incorrectGuesses = 0;
 let guess = '';

 // Picking the random word
 let randomNum = Math.floor(Math.random() * wordArr.length);
 let word = wordArr[randomNum];
 console.log(word);

 let letters = word.split('');
 let wordLength = word.length;
 let underscore = '';

 let guessedLetters = []; // Array to store correctly guessed letters
 let guessed = [];

 for (let i = 0; i < wordLength; i++) {
   underscore += '_ ';
 }

 guessedWord.appendChild(document.createTextNode(underscore));

 // Function to check if all unique letters of the word have been guessed
 function checkWinCondition() {
   const uniqueWordLetters = new Set(word.split(''));
   const uniqueGuessedLetters = new Set(guessedLetters);
   return [...uniqueWordLetters].every(letter => uniqueGuessedLetters.has(letter));
 }

 // Detecting what the user entered and validating it
 enterBtn.addEventListener('click', () => {
   guess = userInput.value.toLowerCase(); // Convert the guess to lowercase for consistency

   // Check if the guess is not empty and not already guessed
   if (guess !== '' && !guessedLetters.includes(guess)) {
     guessedLetters.push(guess);
     guessed.push(' ' + guess);
   }

   if (word.includes(guess) && guess !== '') {
     document.body.style.backgroundColor = 'lightgreen';
     setTimeout(() => {
       document.body.style.backgroundColor = 'white';
     }, 300)
   } else {
     incorrectGuesses++
     document.body.style.backgroundColor = 'lightcoral';
     setTimeout(() => {
       document.body.style.backgroundColor = 'white';
     }, 300)
   }

   switch (incorrectGuesses) {
     case 1:
       drawHead();
       break;
     case 2:
       drawBody();
       break;
     case 3:
       drawRightArm();
       break;
     case 4:
       drawLeftArm();
       break;
     case 5:
       drawRightLeg();
       break;
     case 6:
       drawLeftLeg();
       break;
     default:
       alert('Game Over! The word was: ' + word);
       location.reload();
       break;
   }

   let newUnderscore = '';

   for (let i = 0; i < wordLength; i++) {
     if (word[i] === guess || guessedLetters.includes(word[i])) {
       newUnderscore += word[i] + ' ';
     } else {
       newUnderscore += underscore[i * 2] + ' ';
     }
   }

   if (checkWinCondition()) {
     guessedWord.classList.add('celebration');
     alert("YOU DID IT!");
     setTimeout(() => {
       location.reload();
       alert('New Game!');
     }, 3000);
   }

   guessedWord.textContent = newUnderscore;
   userInput.value = '';

   // displays what the user already guessed
   const alrGuessed = document.querySelector('.guesses');
   alrGuessed.textContent = guessed;
 });

 // Limiting the user to one letter
 addEventListener('input', () => {
   if (userInput.value.length > 1) {
     userInput.value = userInput.value.slice(0, 1);
   }
 });

 //canvas
 const canvas = document.querySelector('.hangmanBox');
 const context = canvas.getContext('2d');

 //head
 function drawHead() {
   context.beginPath();
   context.arc(200, 100, 40, 0, Math.PI * 2);
   context.stroke();
 }

 //body
 function drawBody() {
   context.beginPath();
   context.moveTo(200, 140);
   context.lineTo(200, 260);
   context.stroke();
 }

 //arm
 //right arm
 function drawRightArm() {
   context.beginPath();
   context.moveTo(200, 160);
   context.lineTo(160, 220);
   context.stroke();
 }

 //left arm
 function drawLeftArm() {
   context.beginPath();
   context.moveTo(200, 160);
   context.lineTo(240, 220);
   context.stroke();
 }

 //legs
 //right leg
 function drawRightLeg() {
   context.beginPath();
   context.moveTo(200, 260);
   context.lineTo(160, 320);
   context.stroke();
 }

 //left leg
 function drawLeftLeg() {
   context.beginPath();
   context.moveTo(200, 260);
   context.lineTo(240, 320);
   context.stroke();
 }