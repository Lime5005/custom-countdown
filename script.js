const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const title = document.getElementById('title')
const datePicker = document.getElementById('date-picker')

const countdownShow = document.getElementById('countdown')
const countdownShowTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span') // An array

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date // Date is also a data type like String

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
    const now = new Date().getTime() // How far from 1970/01/01
    const distance = countdownValue - now
        //console.log('distance', distance);

    const days = Math.floor(distance / day)
    const hours = Math.floor(distance % day / hour) // % is reminder operator
    const minutes = Math.floor(distance % hour / minute)
    const seconds = Math.floor(distance % minute / second)
    console.log(days, hours, minutes, seconds);

    // Show:
    countdownShowTitle.textContent = `${countdownTitle}`

    timeElements[0].textContent = `${days}`
    timeElements[1].textContent = `${hours}`
    timeElements[2].textContent = `${minutes}`
    timeElements[3].textContent = `${seconds}`

    // Hide the input and show the countdown:
    inputContainer.hidden = true
    countdownShow.hidden = false
}

// Take values from the form:
function updateCountdown(e) {
    e.preventDefault() // Stop sending request to a server or refresh the page
        //console.log(e); // see srcElement-> 0:input#title -> validity -> value
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    countdownValue = new Date(countdownDate).getTime() // transform to milliseconds
        //console.log(countdownValue)
    updateDOM()
}

// Event listeners:
countdownForm.addEventListener('submit', updateCountdown)