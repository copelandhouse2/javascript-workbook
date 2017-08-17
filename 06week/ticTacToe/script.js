'use strict';

document.addEventListener('DOMContentLoaded', () => {
/***************  WHITE BOARD NOTES  ***************************
define player turns: X, O
On Click of a square... addEventListener, onclick
  place playerTurn token into square.  append on the div data-cell
  if (!checkForWin) then
    if (!checkForTie) then
      toggle playerTurn
    else
      message: There is a tie, you idiots;
    end if
  else
    message: Congrats player???, you won!
  end if

  On Click of clear board button
    remove tokens off of board
    initialize any variables
    set player to X

***************************************************************/
});

playerTurn = playerTurn === 'X'? 'O' : 'X'
