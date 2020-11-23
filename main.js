
let field = document.createElement('div');
document.getElementById('playField').appendChild(field);
field.classList.add('field');

let arrExel = [];
let score = 0;
let points = document.getElementById('points');
let classes = ['red', 'green', 'blue', 'orange', 'pink', 'yellow'];


getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    //Максимум и минимум включаются
}

function createNewExel(quantity) {
    for (let i = 0; i < quantity; i++) {
        let exel = document.createElement('div');
        field.appendChild(exel);
        exel.classList.add('exel');
        exel.classList.add(arrayRandElement(classes));
        exel.style.backgroundColor = `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(0, 255)})`;
        arrExel.push(exel);

    }

    let isExel = arrExel.every((elem) => {
        return elem.classList.contains('hide')
    });

    console.log('[isExel]', isExel);

    if (isExel) createNewExel(3);
}

createNewExel(getRandomIntInclusive(1, 17));




function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

console.log('[arrayRandElement(a8)]', arrayRandElement(classes));



function clickExel(e) {
    
    let elem = e.target;

    if (elem.classList.contains('field')) return false
    else if (elem.classList.contains('pink')) score = score * 2;
    else if (elem.classList.contains('orange')) score = score - 2;
    else score++;

    elem.classList.add('hide');
    points.value = score;

    createNewExel(getRandomIntInclusive(0, 3));
    console.log('[arrayRandElement(a8)]', arrayRandElement(classes));
    
}


// Timer

let startingMinutes = 0.2;  // Устанавливаем время игры
let time = startingMinutes * 60;

const countdownEl = document.getElementById('time');

function updateCountdown() {
    if (time < 0) {
        btnStartStop.removeEventListener('click', startStop);
        resetTimer();
        // alert('Time is Out');
        writeToLocalStorage();
        return
    }

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.value = `${minutes}:${seconds}`;
    time--;

    
   
}

let btnStartStop = document.getElementById('startStop');
let status = 'stopped';
let timeId = null;



function startStop() {
    if (status === 'stopped') {

        //Paused the timer (by calling thr setInterval() function)
        timeId = setInterval(updateCountdown, 1000);
        btnStartStop.textContent = 'Stop';
        status = 'started';
        field.addEventListener('click', clickExel)
    }
    else {
        clearInterval(timeId);
        btnStartStop.textContent = 'Start';
        status = 'stopped';
        field.removeEventListener('click', clickExel);
    }
}

let btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

function reset() {
    score = 0;
    btnStartStop.addEventListener('click', startStop);
    resetTimer();
}

function resetTimer() {
    console.log('[startingMinutes]', startingMinutes);

    clearInterval(timeId);
    time = startingMinutes * 60;
    countdownEl.value = '';
    btnStartStop.textContent = 'Start';
    status = 'stopped';
    field.removeEventListener('click', clickExel);
    
    
    console.log('[work]', 'work');
    console.log('[time]', time);
    console.log('[startingMinutes]', startingMinutes);
}

// LocalStorage

let winers = [];

function saveUser() {

    let winerName = document.getElementById('inputText3').value;   
     // prompt('Enter Your Name');
     let winer = {};
     winer[winerName] = points.value;
     winers.push(winer);
 
     localStorage.setItem('winers', JSON.stringify(winers));

    updateResults();
  
}

function writeToLocalStorage() {
    
    $('#staticBackdrop').modal('show');

    document.getElementById('score').textContent = points.value;
    
    document.getElementById('saveUserName').addEventListener('click', saveUser);
}

function updateResults() {
    let result = document.querySelector('.tbody');

    let b = JSON.parse(localStorage.getItem('winers')) ;


    let a = b.map((elem) => {
    for (const key in elem) {
        if (elem.hasOwnProperty(key)) {
            const element = elem[key];
            return `<tr><td>${key}</td><td>${element}</td></tr>`
        }
    }
    
    });

    console.log('[a]', a);

    result.innerHTML = a;
}

updateResults();





    







