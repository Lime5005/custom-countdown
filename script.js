const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const title = document.getElementById('title')
const datePicker = document.getElementById('date-picker')

const countdownShow = document.getElementById('countdown')
const countdownShowTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span') // An array

const completeShow = document.getElementById('complete')
const completeShowInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = new Date() // Date is also a data type like String

let countdownActive

// localStorage:
let savedCountdown // an object

const second = 1000 // 1 second is 1000 milliseconds
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set the date input min to today:
const today = new Date().toISOString().split('T')[0]
    //console.log(today);
datePicker.setAttribute('min', today)

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime() // How far from 1970/01/01
        const distance = countdownValue - now
            //console.log('distance', distance);

        const days = Math.floor(distance / day)
        const hours = Math.floor(distance % day / hour) // % is reminder operator
        const minutes = Math.floor(distance % hour / minute)
        const seconds = Math.floor(distance % minute / second)
            //console.log(days, hours, minutes, seconds);

        // Hide the input and show the countdown:
        inputContainer.hidden = true

        // If countdown finished, show complete:
        if (distance < 0) {
            countdownShow.hidden = true
            clearInterval(countdownActive)
            completeShowInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeShow.hidden = false
        } else {
            // Show:
            countdownShowTitle.textContent = `${countdownTitle}`

            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeShow.hidden = true
            countdownShow.hidden = false
        }
    }, second)
}

// Take values from the form:
function updateCountdown(e) {
    e.preventDefault() // Stop sending request to a server or refresh the page
        //console.log(e); // see srcElement-> 0:input#title -> validity -> value
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }

    localStorage.setItem('countdown', JSON.stringify(savedCountdown))

    // check for valid input:
    if (countdownDate === '') {
        alert('Please select a date for countdown.')
    } else {
        countdownValue = new Date(countdownDate).getTime() // transform to milliseconds
            //console.log(countdownValue)
        updateDOM()
    }
}

function reset() {
    // Hide countdown, show input:
    countdownShow.hidden = true
    completeShow.hidden = true
    inputContainer.hidden = false

    // Stop the countdown:
    clearInterval(countdownActive)

    // Reset the original values:
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')
}

function restorePreviousCountdown() {
    // If there is a localStorage data:
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Event listeners:
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

// On load, check the localStorage:
restorePreviousCountdown()