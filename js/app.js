// Initialize quote here
let quote = `Home is behind, the world ahead, and there are many paths to tread through shadows to the edge of night, until the stars are all alight.`;

// Keep track of correct spelling to highlight
let successInd = 0
// Remember where the player went wrong
let wrongInd
let wrong = false

// Variable to display the text
const quoteDiv = document.querySelector('#quote')
const textField = document.querySelector('#type')

// Setup and start new round
function startRound(){
    quoteDiv.innerHTML = quote
    textField.value = ""
    successInd = 0
    wrong = false
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
        if (quote.endsWith(typedText)){
            // Clear the text field
            textField.value = "";
            successInd += typedText.length
        }
    }
    // if typed text doesn't match quote
    else{
        // Only highlight the letter at which first error occurs
        if (!wrong){
            wrongInd = successInd + typedText.length - 1
            wrong = true
        }
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

nd start
// 
startRound()

