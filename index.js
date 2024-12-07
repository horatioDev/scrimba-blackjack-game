// Start Game button
const startBtn = document.getElementById('new-game-btn')
// Hit button
const hitBtn = document.getElementById('hit-btn');
// Stand button
const standBtn = document.getElementById('stand-btn');
// Message element
let messageEl = document.querySelector('#message-el')
// Dealer and Player scores
let dealerSumEl = document.getElementById('dealer-score')
let playerSumEl = document.getElementById('player-score')
// Dealer and Player cards
let dealerHand = document.getElementById('dealer-cards')
let playerHand = document.getElementById('player-cards')

let hasBlackJack = false
let isAlive = true
let playerTurnActive = true
let message = ''

// 1. Create two variables, firstCard and secondCard.
// Set their values to a random number between 2-11
function getCard() {
  return Math.floor(Math.random()*10)+2
}

let playerCards = [] 
let dealerCards = [] 

// 2. Create a variable, sum, and set it to the sum of the two cards
const calculateSum = (cards) => {
  return cards.reduce((sum, card) => sum + card, 0)
}

// Display dealer and player hands
function displayHands() {
  // Dealer and Player scores
  dealerSumEl.textContent = `Score: ${calculateSum(dealerCards)}`
  playerSumEl.textContent = `Score: ${calculateSum(playerCards)}`
  showCard(dealerHand, dealerCards)
  console.log('Dealer hand:', dealerHand, dealerCards, 'Player hand:', playerHand, playerCards)
}

// Display Message
// Write the conditional according to these rules:
// if less than or equal to 20 -> "Do you want to draw a new card?"
// else if exactly 21 -> "Wohoo! You've got Blackjack!"
// else -> "You're out of the game!"
function displayMessage(){
  const score = calculateSum(playerCards)
  if(score <= 20) {
    message = "Do you want to draw a new card?"
  } else if (score === 21) {
    message = "You've got Blackjack!"
    hasBlackJack = true
    dealerTurn()
    gameWinner()
  } else {
    message = "You're out of the game!"
    isAlive = false
    gameWinner()
  }
  messageEl.textContent = message
}

// Player Hit
hitBtn.addEventListener('click', () => {
  if(!isAlive || hasBlackJack) return

  // Get another card
  playerCards.push(getCard())
  displayHands()
  displayMessage()
})

// Player Stand
standBtn.addEventListener('click', () => {
  if(!isAlive) return
   isAlive = false
   dealerTurn()
   gameWinner()
})

// Dealer Turn
function dealerTurn() {
  let dealerSum = calculateSum(dealerCards)
  while(dealerSum < 17) {
    dealerCards.push(getCard())
    dealerSum = calculateSum(dealerCards)
  }
  displayHands()
}

// Display Cards in cobtainer
function showCard() {
  dealerHand.innerHTML = dealerCards.map(card => `<div class='card'>${card}</div>`).join('')
  playerHand.innerHTML = playerCards.map(card => `<div class='card'>${card}</div>`).join('')
}
// Determine winner
function gameWinner() {
  let playerSum = calculateSum(playerCards)
  let dealerSum = calculateSum(dealerCards)
  
  if(playerSum > 21) {
    message = 'Player Busts! Dealer Wins.'
  }else if (dealerSum > 21) {
    message = 'Dealer Busts! Player Wins.'
  }else if (playerSum > dealerSum){
    message = 'Player Wins!'
  }else if (playerSum < dealerSum) {
    message = 'Dealer Wins!'
  } else {
    message = "It's a Tie!"
  }
  messageEl.textContent = message
}

// Start game function
startBtn.addEventListener('click', () => {
  playerCards = [getCard(), getCard()]
  dealerCards = [getCard(), getCard()]
  isAlive = true
  hasBlackJack = false
  // Display dealer and player hand
  displayHands()
  // Display game message
  displayMessage()
})

