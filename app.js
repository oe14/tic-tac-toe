

// todo 
// add skeleton to html, start and restar game buttons
// on start game, u generate a grid for the gameboard 
// on restart game, the gameboard gets cleaned 
// 

const gameContainer	= document.getElementById('gameboard')



for (i=0; i<9; i++){
const slots = document.createElement('div')
slots.setAttribute('class', 'slots')
gameContainer.appendChild(slots);
}