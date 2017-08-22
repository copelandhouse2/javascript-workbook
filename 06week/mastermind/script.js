'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Your code here
  const MAXGUESSES = 10;
  const boardColors = ['red', 'blue', 'green', 'white', 'yellow', 'purple', 'orange', 'black'];
  let turn = 0;
  // let guess = 0;

  function guess() {
    this.pegs = [];
    this.hint = '';
  }

  let board = {
    code: [],
    guesses: [],
    createCode: function() {
      for (let i = 0; i < 4; i++) {
        const randomIndex = getRandomInt(0, boardColors.length);
        this.code.push(randomIndex);
      }
      return true;

      function getRandomInt(min, max)  {
        return Math.floor(Math.random() * (max - min)) + min;
      }
    },  // createCode() method

    showAnswer: function() {
      let ansPegs = document.getElementById('answerRow').childNodes;
      console.log(ansPegs);
      for (let i=0; i<ansPegs.length-1; i++) {
        ansPegs[i].className = `peg ${boardColors[this.code[i]]}`;
      }
    },  // showAnswer() method

    populateChoice: function(selectedColor) {
      // console.log(selectedColor);
      if (this['guesses'].length) {  // length of guesses array.
        const currentGuess = this['guesses'][this['guesses'].length - 1];  // find the last (active) one
        if (currentGuess.pegs.length === 4) {  // if current guess alreay has 4 pegs...
          console.log('Please submit your answer or clear to re-enter');
        } else {  // push the peg into current guess.
          currentGuess.pegs.push(selectedColor);
        }
      } else {  // guesses array was 0, this is a new game, create our guess object.
        const currentGuess = new guess();
        currentGuess.pegs.push(selectedColor);  // push our peg onto current guess
        this['guesses'].push(currentGuess);  // push our new current guess object onto guesses array.
      }
      console.log(this['guesses']);
      // Calling viewBoard.  Pass, row, col, and color.
      this.viewBoard(this['guesses'].length-1,
      this['guesses'][this['guesses'].length - 1].pegs.length-1, selectedColor);
    },  // populateChoice()

    // viewBoard handles 2 functions a) it populates a peg.  Using row, column, color,
    // it will append a color class onto the td cell with same matching row, col.
    // b) viewBoard also handles clearing out a row.  If col, pegColor is null,
    // viewBoard, will clear the pegs from the row.  We accomplish this by removing
    // the color class.
    viewBoard: function(row, col = null, pegColor = null) {
      console.log(row, col, pegColor);
      let guessRows = document.getElementById('boardTbl').childNodes;
      console.log(guessRows[row]);
      const guessCols = guessRows[row].childNodes;
      console.log(guessCols);
      if (pegColor) {  // When we pass col, pegColor, we are setting a peg
        guessCols[col].className = `peg ${boardColors[pegColor]}`;
      } else {  // here no pegColor was found.  We will clear the row.
        for (let i=0; i<4; i++) {
          guessCols[i].className = `peg`;
        }
      }
    },  // viewBoard()
    generateHint: function() {
      // Initializing...
      let exactMatch = 0;
      let correctPeg = 0;
      let matchIndex = -1;
      // creating arrays out of the strings.
      let solutionArr = this['code'];
      let myGuessArr = this['guesses'][this['guesses'].length-1].pegs;
      console.log(solutionArr);
      console.log(myGuessArr);
      // This piece of code tests for exact match
      myGuessArr.forEach((peg, index) => {
        if (peg == solutionArr[index]) {
          exactMatch++;
          // clear out value.  This sets us up to look for correct peg test later.  These won't be considered.
          solutionArr[index] = null;
          myGuessArr[index] = null;
        }
      });

      // This piece of code tests for correct peg only
      myGuessArr.forEach((peg) => {
        if (peg) {  // peg could be null from previous forEach statement.
          matchIndex = solutionArr.indexOf(parseInt(peg));  // Let's find a matching peg in the solution!
          if (matchIndex !== -1) {  // We found a peg match in the string.
            correctPeg++
            solutionArr[matchIndex] = null;  // clear out value so value won't be considered with next peg tests.
          }
        }  // closing brace for if (peg)
      });
      console.log(`${exactMatch}-${correctPeg}`);
      this['guesses'][this['guesses'].length-1].hint = `${exactMatch}-${correctPeg}`;
    } // generateHint
  }    // board object

  createPegCanvas();
  addListenersToButtons();
  // console.log(board.code);
  board.createCode();
  generateBoard();
  board.showAnswer();
  // viewBoard();

  function createPegCanvas() {
    const colorsCanvas = document.getElementById('boardColors');
    for(let i = 0; i < boardColors.length; i++){
      const pegColor = document.createElement('div');
      pegColor.id = i;
      pegColor.className = `${boardColors[i]} box`;
      // chooseSection.textContent = boardColors[i];
      pegColor.addEventListener('click', (color) => {
        // console.log(color.target.textContent, color.target.id);
        board.populateChoice(color.target.id);
        // console.log('you clicked me');
      });
      colorsCanvas.appendChild(pegColor);
      // let theBody = document.getElementsByTagName('body')[0];
      // theBody.appendChild(boardColorsCanvas);
    }
  }

  function addListenersToButtons() {
    const checkBtn = document.getElementsByName('submit');
    checkBtn[0].addEventListener('click', () => {
      board.generateHint();
      // const currentGuess = new guess();
      board['guesses'].push(new guess());  // Adding a new guess row.

    });

    // We want the ability to clear the current prior prior to submitting.
    // This will be the user the ability to change their answer.
    const clearBtn = document.getElementsByName('clear');
    clearBtn[0].addEventListener('click', () => {
      // generateHint();
      board['guesses'].pop();  // removing the current guess.
      board['guesses'].push(new guess())  // Adding an empty guess.
      board.viewBoard(board['guesses'].length-1);

    });

  }
  function generateBoard() {
    // This section creates the code breaker's guess.
    const boardTable = document.createElement("table");
    boardTable.id = 'boardTbl';
    document.getElementById('board').appendChild(boardTable);
    for(let i = 0; i < MAXGUESSES ; i++) {
      const guessRow = document.createElement("tr");
      guessRow.className = 'guessRow';
      boardTable.appendChild(guessRow);
      for (let j = 0; j < 5; j++) {
        const guessCol = document.createElement("td");
        j < 4? guessCol.className = `peg` : guessCol.className =  `hint`;
        guessRow.appendChild(guessCol);
      }
    }
    // Displays the Codemaker's Code.
    const ansTable = document.createElement("table");
    ansTable.id = 'answer';
    document.getElementById('board').appendChild(ansTable);
    const ansRow = document.createElement("tr");
    // document.cre
    ansRow.id = 'answerRow';
    ansTable.appendChild(ansRow);
    for (let j = 0; j < 5; j++) {
      const ansCol = document.createElement("td");
      j < 4? ansCol.className = `peg` : null;
      ansRow.appendChild(ansCol);
    }

  }  // ending to generateBoard


  // Submit guess
  //   make sure all pegs are assigned.
  //   if guess = code then
  //     Congrats, you win.
  //   else
  //     Return supplyHint().

  // Clear button
  //   clear current row.

});
