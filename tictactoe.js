'use strict'

// variables
let currentPlayer = 'X';
let numberOfClicks = 0;

// Get all the views that will be manipulated
let player = document.getElementById('player');
let boxex = document.querySelectorAll('.box');
let container = document.querySelector('#container');
let winner = document.getElementById('winner');
let reset = document.getElementById('reset');
let resetcontainer = document.querySelector('.reset-container');
let cover = document.querySelector('.cover');

// hide the reset button
resetcontainer.classList.add('hidden');

// function to block players from playing
function blockAccessToPlay()
{
    cover.style.display = 'block';
}

boxex.forEach(box => box.addEventListener('click', playerClick));

function playerClick(event)
{
    // check if the box is not empty
    if(event.target.textContent !== ""){
        return;
    }
    
    // boxes are still empty
    numberOfClicks += 1;
    console.warn(numberOfClicks);
    event.target.innerText = currentPlayer;
    // check if current player wins
    let win = checkWinner();
    if(win)
    {
        winner.textContent = '😍 Player ' + currentPlayer + ' wins!';
        player.textContent = "";
        resetcontainer.classList.remove('hidden');
        blockAccessToPlay();
    }else 
    {
        if(numberOfClicks === 9)
        {
            player.textContent = "";
            winner.textContent = '😪 Draw. No Winner';
            resetcontainer.classList.remove('hidden');
            blockAccessToPlay();
        }else
        {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            player.textContent = 'Current Player: ' + currentPlayer;
        }
    }
}

reset.addEventListener(
    'click',
    function()
    {
        currentPlayer = 'X'
        player.textContent = 'Current Player: ' + currentPlayer;
        winner.textContent = "";
        resetcontainer.classList.add('hidden');
        boxex.forEach(box => box.textContent = "");
        numberOfClicks = 0;
        cover.style.display = 'none';
    }
);

// winning positions: 012,345, 678, 036, 147, 258, 048, 246
function checkWinner()
{
    if(boxex[0].textContent === currentPlayer && boxex[1].textContent === currentPlayer && boxex[2].textContent === currentPlayer)
    {
        return true;
    }else if(boxex[3].textContent === currentPlayer && boxex[4].textContent === currentPlayer && boxex[5].textContent === currentPlayer)
    {
        return true;
    }else if(boxex[6].textContent === currentPlayer && boxex[7].textContent === currentPlayer && boxex[8].textContent === currentPlayer)
    {
        return true;
    }else if(boxex[0].textContent === currentPlayer && boxex[3].textContent === currentPlayer && boxex[6].textContent === currentPlayer)
    {
        return true;
    }else if(boxex[1].textContent === currentPlayer && boxex[4].textContent === currentPlayer && boxex[7].textContent === currentPlayer)
    {
        return true;
    }else if(boxex[2].textContent === currentPlayer && boxex[5].textContent === currentPlayer && boxex[8].textContent === currentPlayer)
    {
        return true;
    }else if(boxex[0].textContent === currentPlayer && boxex[4].textContent === currentPlayer && boxex[8].textContent === currentPlayer)
    {
        return true;
    }else if(boxex[2].textContent === currentPlayer && boxex[4].textContent === currentPlayer && boxex[6].textContent === currentPlayer)
    {
        return true;
    }else {
        return false;
    }
}

