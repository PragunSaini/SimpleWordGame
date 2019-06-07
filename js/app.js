// Quotes object
let quotes = []
let quote = null

// Keep track of correct spelling to highlight
let successInd = 0
// Remember where the player went wrong
let wrongInd
let wrong = false

// Track the time taken
let minutes = 0, seconds = 0
let timer = null

// Variable to display the text
const quoteDiv = document.querySelector('#quote')
const textField = document.querySelector('#textField')
const startBtn = document.querySelector('#start-btn')
const counter = document.querySelector('#counter')

// Setup and start new round
function initializeAndStartRound(){
    quoteDiv.innerHTML = quote
    textField.value = ""
    successInd = 0
    wrong = false

    // Start time tracking
    minutes = seconds = 0
    timer = setInterval(() => {
        seconds += 1
        if (seconds == 60){
            seconds = 0
            minutes += 1
        }
        counter.textContent = minutes < 10 ? "0" + minutes : minutes
        counter.textContent += ":"
        counter.textContent += seconds < 10 ? "0" + seconds : seconds
    }, 1000)

    // Focus and enable textField
    textField.focus()
    activateTextField()
}

// Add event listener to text field add start tracking
function activateTextField(){
    textField.addEventListener("keyup", event => {
        trackChanges()
    })
}

// Function to check if typed text is correct or not and highlight accordingly
// Also check for end of game
function trackChanges(){
    let typedText = textField.value
    // compare the typed text to current position in quote
    // if matched
    if (typedText == quote.slice(successInd, successInd + typedText.length)){
        wrong = false
        quoteDiv.classList.add('green-glow')
        quoteDiv.classList.remove('red-glow')

        // Highlight the corresponding part of the quote
        highlight(successInd + typedText.length)

        // Check if a word complete, indicated by a trailing space at end
        if (typedText[typedText.length - 1] == " "){
            // Clear the text field
            textField.value = "";
            // Change position in quote
            successInd += typedText.length
        }
        // Check if full quote typed
        if (typedText != "" && quote.endsWith(typedText)){
            // Clear the text field
            textField.value = "";
            successInd += typedText.length
            roundFinish()
        }
    }
    // if typed text doesn't match quote
    else{
        // Only highlight the letter at which first error occurs
        if (!wrong){
            wrongInd = successInd + typedText.length - 1
            wrong = true
        }
        quoteDiv.classList.remove('green-glow')
        quoteDiv.classList.add('red-glow')
        // highlight error in the quote
        highlightError()
    }
}

// Function to highlight the quote on success
function highlight(value){
    quoteDiv.innerHTML = "<span id='highlight-success'>" + quote.slice(0, value) +
                    "</span>" + quote.slice(value, )
}

// Function to highlight the eror
function highlightError(){
    quoteDiv.innerHTML = "<span id='highlight-success'>" + quote.slice(0, wrongInd) +
                    "</span>" + "<span id='highlight-failure'>" + quote.slice(wrongInd, wrongInd + 1) +
                    "</span>" + quote.slice(wrongInd + 1, )
}

// Called when a round finished, and activates button to start new round
function roundFinish(){
    clearInterval(timer)
    startBtn.style.visibility = "visible"
    startBtn.textContent = "Start Again!"
}

// Start the round by generating a quote combination
function startGame(){
    generateQuote()
    textField.value = ""
    startBtn.addEventListener('click', event => {
        startBtn.style.visibility = "hidden"
        generateQuote()
        initializeAndStartRound()
    })
}

// Utility function to generate a combination off three quotes
function  generateQuote(){
    let indexes = []
    while(indexes.length < 3){
        let i = Math.floor(Math.random() * 25)
        if (!indexes.includes(i)){
            indexes.push(i)
        }
    }
    quote = quotes[indexes[0]] + " " +
            quotes[indexes[1]] + " " +
            quotes[indexes[2]] + " ";
    quote = quote.trim()
}

// Fetches quotes from a REST API and stores them
fetch('https://api.myjson.com/bins/1ce425')
        .then((response) => {
            return response.json()
        })
        .then((myJson) => {
            quotes = myJson
            startGame()
        })
