const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

const word = ['application', 'programming', 'interface', 'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]

const correctLetters = []
const wrongLetters = []

function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>
    `).join('')}
`
    const innerWord = wordEl.innerText.replace(/\n/g, '')
    if(innerWord == selectedWord){
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex'
    }
}


//update wrong letters
function updateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong<p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length

        if (index < errors) {
            part.style.display = 'block'
        } else{
            part.style.display = 'none'
        }
    })

    // Check if lost
    if (wrongLetters.length == figureParts.length) {
        finalMessage.innerText = 'You suck'
        popup.style.display = 'flex'
    }
}


//show notification
function showNotification(){
    notification.classList.add('show')

    setTimeout(() => {
        notifciation.classList.remove('show')
    }, 2000)
}


//keydown letter press
window.addEventListener('keydown', e =>{
if(e.keyCode >= 65 && e.keyCode <=90){
    const letter = e.key

    if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter)
            displayWord()
        } else{
            showNotification()
        }
    } else{
        if(!wrongLetters.include(letter)){
            wrongLetters.push(letter)

            updateWrongLettersEl()
        } else {
            showNotification()
        }
    }
}
})


playAgainBtn.addEventListener('click', () => {
    correctLetters.length = 0
    wrongLetters.length = 0

    let selectedIndex = Math.floor(word.length * Math.random())
    let selectedWord = word[selectedIndex]

    displayWord()

    updateWrongLettersEl(

    popup.style.display = 'none'
    )
})


displayWord()