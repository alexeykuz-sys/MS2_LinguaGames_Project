/*-----------Constants--------*/
const clickSound = new Audio("assets/sounds/mouse-click.wav");
const cardSound = new Audio("assets/sounds/quiet-page-turn.wav");
const soundSound = new Audio("assets/sounds/table-lamp-flip-switch-off.wav");
const failSound = new Audio("assets/sounds/game-fail.wav");
const cards = document.querySelectorAll(".cards-inner");
const resetBtn = document.getElementById("reset");
const startBtn = document.getElementById("start");
const dummyTranslation = { "code": 200, "data": { "translation": "niño, casa, ausencia, droga, comer, ojo", "pronunciation": "", "pairs": [{ "s": "boy,house,absence,drug,eat,eye", "t": "niño, casa, ausencia, droga, comer, ojo" }], "source": { "language": { "didYouMean": false, "iso": "en" }, "text": { "autoCorrected": false, "value": "boy,house,absence,drug,[east],eye", "didYouMean": true } } }, "message": "" };
var resultModal;

/*-----------Sound Effect--------*/
function playClickbtn() {
    if (soundBtn.classList.contains(`sound-icon-red`)) {
        clickSound.pause();
        clickSound.currentTime = 0;
    } else {
        clickSound.play();
    }
}

function playCardSound() {
    if (soundBtn.classList.contains(`sound-icon-red`)) {
        cardSound.pause();
        cardSound.currentTime = 0;
    } else {
        cardSound.play();
    }
}
function playSoundSound() {
    if (soundBtn.classList.contains(`sound-icon-red`)) {
        soundSound.pause();
        soundSound.currentTime = 0;
    } else {
        soundSound.play();
    }
}

function playFailSound() {
    if (soundBtn.classList.contains(`sound-icon-red`)) {
        failSound.pause();
        failSound.currentTime = 0;
    } else {
        failSound.play();
    }
}

/*-----------Language Button-----Translator-------*/

randomEngWords = () => {
    let engCards = ['boy', 'house', 'absence', 'drug', 'eat', 'eye']
    /* [
      "boy",
      "girl",
      "house",
      "pen",
      "pencil",
      "sun",
      "absence",
      "access",
      "beach",
      "basket",
      "black",
      "bottle",
      "bus",
      "camera",
      "card",
      "chicken",
      "clean",
      "common",
      "device",
      "dish",
      "dog",
      "drug",
      "easy",
      "eat",
      "emotion",
      "energy",
      "error",
      "eye",
      "family",
      "flat",
      "flower",
      "friend",
      "game",
      "goal",
      "garden",
      "happy",
      "head",
      "horse",
      "ice",
    ];*/
    /*----Shuffles the words in array engCards-----*/
    /*while (engCards.length > 6) {
      engCards.splice(Math.floor(Math.random() * engCards.length), 1);
    }*/
    /*----assigns shuffled words to each card----------------*/
    let txtToTranslate = document.querySelectorAll("div.english");
    for (let i = 0; i < txtToTranslate.length; i++) {
        txtToTranslate[i].innerHTML = engCards[i];
        
    }

    cardsToTranslate = [];
    for (let i = 0; i < txtToTranslate.length; i++) {
        cardsToTranslate[i] = txtToTranslate[i].textContent;

    }

    let google_url;
    const DEFAULT_LOCALE = 'es';
    const GOOGLE_URL = "https://google-translate20.p.rapidapi.com/translate text="

    function generateGoogleUrl(locale){
        return `${GOOGLE_URL}${cardsToTranslate}&tl=${locale}&sl=en`


    }
    /*---------------selects language to translate-------------*/
    cardsToTranslate.forEach((cardToTranslate) => {
        const x = document.getElementById('langSelect');
        x.addEventListener('change', event => {
            const langTo = event.target.value;

            /*----------------Translation API-------*/

            
            /*const translate_url =
              "https://just-translated.p.rapidapi.com/?text=" +
              cardsToTranslate +
              "&lang_from=en&lang_to=" +
              langTo;*/

            /*const nlp_url =
            "https://nlp-translation.p.rapidapi.com/v1/translate?to="+langTo+"&text=" +
            cardToTranslate +
            "&from=en";*/
            getTranslation(generateGoogleUrl(langTo));
        });
        getTranslation(generateGoogleUrl(DEFAULT_LOCALE));
    });
    async function getTranslation(url) {
        const translatedData = dummyTranslation.data.translation;
        let result = translatedData.split(",");

        translatedText = document.querySelectorAll("div.txtTo");

        for (let i = 0; i < result.length; i++) {
            translatedText[i].innerHTML = result[i];
            
        }
    }
    //   async function getTranslation(url) {
    //     const response = await fetch(url, {
    //       method: "GET",
    //       headers: {
    //         "x-rapidapi-key": "e019a7a6e9mshc800b72ecf1a5e1p1f3597jsn00fad202704a",
    //         "x-rapidapi-host": "google-translate20.p.rapidapi.com"
    //         /*"x-rapidapi-host": "just-translated.p.rapidapi.com"*/
    //       },
    //     });
    //     let translatedData;
    //     const data = await response.json();
    //     console.log(data);
    //     let translatedData = data.data.translation;
    //     /*let translatedData = data.text; just translated*/
    //     console.log(translatedData)
    //     let result = translatedData.split(",");

    //     translatedText = document.querySelectorAll("div.txtTo");

    //     for (let i = 0; i < result.length; i++) {
    //       translatedText[i].innerHTML = result[i];
    //         console.log(translatedText)
    //     }
    //   }
    //   getTranslation().catch((err) => {
    //     console.error(err);
    //   });
};
randomEngWords();

/*-------Timer----------*/

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("time").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

/*startTimer();*/

function onTimesUp() {
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        $('.modal-lost').css("display", "block");

        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);



}


/*-----------Instruction Button--------*/

const infoText = document.getElementById("info-text");
const infoIcon = document.getElementById("info-icon");
const modal = document.getElementById("modal_text");
const closeBtn = document.getElementById("close-button");
function modalHandler() {
    if ((modal.classList.display = "none")) {
        modal.classList.toggle("show");
        playClickbtn();
    }
    return
}

infoIcon.addEventListener("click", modalHandler);
infoText.addEventListener("click", modalHandler);
closeBtn.addEventListener("click", modalHandler);

/*-----------Contact Button--------*/


const contactBtn = document.getElementById("contact-icon");
const form = document.getElementById("form");
const contactTxt = document.getElementById("contact-text");
function contactHandler() {
    if ((form.classList.display = "none")) {
        form.classList.toggle("show");
        playClickbtn();
        return;
    }
}
contactBtn.addEventListener("click", contactHandler);
contactTxt.addEventListener("click", contactHandler);

const closeButton = document.getElementById("closeButton")
closeButton.addEventListener("click", ()=>{
   if ((form.classList.display = "show")) {
        form.classList.remove("show");
         form.classList.add("none");
        playClickbtn();
   }
});

window.onclick = function(event) {
  if (event.target == form) {
    form.classList.remove("show");
    form.classList.add("none");
  }
};

/*-----------Sound Button--------*/

const soundBtn = document.getElementById("sound");

function soundHandler() {
    if (soundBtn.classList.contains("sound-icon")) {
        soundBtn.classList.add(`sound-icon-red`);
        soundBtn.classList.remove(`sound-icon`);
        playSoundSound();
    } else {
        soundBtn.classList.add(`sound-icon`);
        soundBtn.classList.remove(`sound-icon-red`);
        playSoundSound();
    }
}
soundBtn.addEventListener("click", soundHandler);



/*-----------Flip Cards Effect--------*/

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard =false;
let matchCounter = 0;
let gameStart = false;

/*-----------Start Timer--------*/

        startBtn.addEventListener('click', () => {
            gameStart = true;
            startTimer();
            if ((startBtn.classList.contains = "show")) {
                startBtn.classList.remove("show");
                resetBtn.classList.add('show');
                playClickbtn();
                
            }
            
        });
         
function flipCard() {
    if (lockBoard == true || gameStart == false) return;
    if(this === firstCard) return;
        this.classList.add("flip");
    playCardSound();
    
    

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    } else {
        secondCard = this;
        checkForMatch();

    }
}



function checkForMatch() {
    let isMatch = firstCard.dataset.language === secondCard.dataset.language;
    if (isMatch) {
        matchCounter += 1;
        disabledCards();
        setTimeout(() => {
            if (matchCounter == (cards.length / 2)) {
                $('.modal-win').css("display", "block");
                onTimesUp()
                return;
                }
        }, 2000);
    }
    else { unflipCards(); }
}

function disabledCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();

}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
        playFailSound();
    }, 1500);
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));


resetBtn.addEventListener('click', resetBtnHandler)

function resetBtnHandler() {
    location.reload()

}
