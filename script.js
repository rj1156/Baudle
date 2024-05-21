
// 47a4f79b-9bda-4259-8170-a0f390ee7443

var result = { "title": "DJ Khaled" }
let mysteryNumber = {}
let mysterySong = {}
let choiceSong = {}

let irishSpring = false
let guessedSongs = {}
//let currentSongIndex = 0;
accGuessCount = {}

const maxGuesses = 8
const showShowButton = document.getElementById('results-button')
const guessButton = document.getElementById('guess-button');
const mysteryImg = document.getElementById('mystery-img');
const searchInput = document.getElementById('search-input');
const seedrandom = document.getElementById('seedrandom')
const resultTable = document.getElementById('result-table');
const endCard = document.getElementById('end-card');
const cardBackground = document.getElementById('card-background')
const playAgainButton = document.getElementById('play-again-button')
const shareScoreButton = document.getElementById('share-score-button')
const helpButton = document.getElementById('help-button')
const donoButton = document.getElementById('dono-button')
const startButton = document.getElementById('start-button')
const introCardBack = document.getElementById('intro-card-back')
const donateCardBack = document.getElementById('donate-card-back')
const donateButton = document.getElementById('donate-button')
const introCard = document.getElementById('intro-card')
const clipboardPopupScreen = document.getElementById('clipboard-popup')
const showSil = document.getElementById('show-sil')
const showDivisions = document.getElementById('show-divisions-text')
const dataDiv = document.getElementById('data-div')
const dataStreak = document.getElementById('data-streak')
const dataGames = document.getElementById('data-games')


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// test it
const a = new Date("2022-04-15"),
    b = new Date();
const tzAdj = a.getTimezoneOffset();
const aAdjusted = new Date(a.getTime() + tzAdj * 60000);



yeezleDay = dateDiffInDays(aAdjusted, b) + 1;
console.log(yeezleDay)

searchInput.setAttribute('placeholder', 'Start by typing any Ye song!')
showIntro()
//initLocalStorage()
sideStatistics()
getRandomMysterySong()
loadLocalStorage()

showShowButton.onclick = showShowResult

guessButton.onclick = async function () {
    if (songTitles.includes(searchInput.value)) {
        const total = Number(window.localStorage.getItem('totalGuesses')) || 0

        await compareSong(searchInput.value)
        window.localStorage.setItem('totalGuesses', total + 1)
        sideStatistics()
    }
}

playAgainButton.onclick = playAgain



cardBackground.onclick = function (e) {
    if (e.target.id === cardBackground.id) {
        playAgain()
    }
}

shareScoreButton.onclick = function () {
    copyToClipboard(scoreText())
    clipboardPopup()


    //window.alert("Score copied to clipboard!")
}

helpButton.onclick = function () {
    introCardBack.classList.remove('hide')
}

donoButton.onclick = function () {
    donateCardBack.classList.remove('hide')
}

donateCardBack.onclick = function (e) {
    if (e.target.id === donateCardBack.id) {
        donateCardBack.classList.add('hide')
    }
}



introCardBack.onclick = function (e) {
    if (e.target.id === introCardBack.id) {
        introCardBack.classList.add('hide')
    }
}

startButton.onclick = () => {
    introCardBack.classList.add("hide")
    window.localStorage.setItem('introShown', "false")

}

function clipboardPopup() {

    clipboardPopupScreen.classList.remove('hide')

    setTimeout(function () {
        clipboardPopupScreen.classList.add('fade-out');


    }, 2000);
    setTimeout(function () {
        clipboardPopupScreen.classList.remove('fade-out')
        clipboardPopupScreen.classList.add('hide')
    }, 4000);


}

/* Local Storage Test
//Updates after winning or losing
function updateSongIndex() {
    window.localStorage.setItem('currentSongIndex', currentSongIndex + 1)
}

function initLocalStorage() {
    const storedCurrentSongIndex = window.localStorage.getItem('currentSongIndex');
    if (!storedCurrentSongIndex) {
        window.localStorage.setItem('currentSongIndex', currentSongIndex);
    } else {
        currentSongIndex = Number(storedCurrentSongs);
        currentSong = mysterySong
    }

}

*/

function preserveGameState() {
    window.localStorage.setItem('guessedSongs', JSON.stringify(guessedSongs))

    const gameTable = document.getElementById('result-table')
    window.localStorage.setItem('gameTable', gameTable.innerHTML)


    if (typeof winStatus === 'undefined') {
        //console.log('No win yet.')
    } else {
        const ifWin = winStatus
        if (ifWin) {
            window.localStorage.setItem('winStatus', winStatus)
        }
    }



    window.localStorage.setItem('guessCount', guessCount)

    window.localStorage.setItem('mysterySong', JSON.stringify(mysterySong))

    const sessionDate = window.localStorage.getItem('sessionDate')
    if (sessionDate) {
        //console.log("Session date is already set.")
    } else {
        window.localStorage.setItem('sessionDate', new Date())
    }




}

// tror guess count felet ligger under här vid ++guessCount
function loadLocalStorage() {
    const anyGuesses = window.localStorage.getItem('guessCount')
    if (anyGuesses) {
        guessCount = Number(window.localStorage.getItem('guessCount'))
        searchInput.setAttribute('placeholder', 'Guess ' + guessCount + '/' + maxGuesses)
    } else {
        console.log("No Guesses Yet!")
        guessCount = 1
    }

    mysterySong = JSON.parse(window.localStorage.getItem("mysterySong")) || mysterySong

    const storedGameTableContainer = window.localStorage.getItem('gameTable')
    if (storedGameTableContainer) {
        document.getElementById('result-table').innerHTML = storedGameTableContainer;
    }


    const winStorage = window.localStorage.getItem('winStatus')

    if (winStorage) {
        if (winStorage === "true") {
            showMysterySong(true);

        } else if (winStorage === "false") {
            showMysterySong(false);
        }

    } else { console.log("No Win Yet!") }


    const sessionDate = window.localStorage.getItem('sessionDate')
    if (sessionDate) {
        const deezNuts = new Date(sessionDate)
        const sesDateComp = deezNuts.getDate()
        const neezDuts = new Date(today)
        const curDateComp = neezDuts.getDate()
        console.log("Session key is: " + sesDateComp + ", while game key is: " + curDateComp)

        if (sesDateComp !== curDateComp) {
            console.log('We need to update')
            resetGameState()
            window.location.reload();
        } else {
            console.log("Game is still valid.")
        }


    } else {
        console.log("No session active")
    }


}

function resetGameState() {
    localStorage.removeItem('guessCount');
    localStorage.removeItem('gameTable');
    localStorage.removeItem('sessionDate');
    localStorage.removeItem('guessedSongs');
    localStorage.removeItem('endyCard')
    localStorage.removeItem('winStatus')
    localStorage.removeItem('endyCard')
    localStorage.removeItem('mysterySong')
}


async function getRandomMysterySong() {
    newMysterySong()
//console.log(mysteryNumber)
await fetch('/datasheetNoSkit.json')
    .then(response => response.json())
    .then(data => {
        
        mysteryDouble = data.numbers[mysteryNumber].title
       // console.log(mysteryDouble)
    })
    doubleTrouble()



/*
    await fetch(spreadFunctionCalls() + "/numbers/" + mysteryNumber)
        .then(response => response.json())
        .then(data => {
            mysteryDouble = data.title
        })
    doubleTrouble()
*/
    //console.log(mysteryDouble + " is not doubled!");

    //console.log(mysteryNumber + " is remembered.")

    // console.log(result.album)

}
async function doubleTrouble() {
    await fetch('/datasheetNoSkit.json')
        .then(response => response.json())
        .then(data => {
        mysterySong = data.songs[mysteryDouble]
        
        //console.log(mysterySong)
    })

}

/*
async function doubleTrouble() {
    await fetch(spreadFunctionCalls() + "/songs/" + mysteryDouble)
        .then(response => response.json())
        .then(data => {
            mysterySong = data
        })
    //console.log(mysterySong.title + " is todays song!");
}
*/

// MUST BE SAME NUMBER AS OBJECTS IN JSON FILE. MATH SECTION. math section. Math Section. ÄNDRA
function newMysterySong() {
    Math.seedrandom(today);
    

    if (today === "02/11/2024") {
        console.log("VULTURES RELEASE SPECIAL")
        mysteryNumber = Math.floor(Math.random() * 14) + 176;
    } else if (today === "02/10/2024") {
        mysteryNumber = Math.floor(Math.random() * 175) + 1;
    } else {
        mysteryNumber = Math.floor(Math.random() * 191) + 1;
    }

    console.log(today)
    //console.log(mysteryNumber + " is created.");
}




async function compareSong(choice) {

    if (guessCount <= maxGuesses) {

        //console.log(choice + " is Kanye's best song!!!");
        let choiceData;

        /* förra
        await fetch(spreadFunctionCalls() + "/songs/" + choice)
            .then(response => response.json())
            .then(data => {
                choiceData = data
                //console.log(choiceData.title + ", I got broads in Atlanta") 
                compareFunction(choiceData, mysterySong)
                //console.log(choiceData)
                //console.log(mysterySong)
                //console.log(result)
            })
           */

        const controller = new AbortController()

        // 5 second timeout:
        const timeoutId = setTimeout(() => controller.abort(), 400)
        
        await fetch('/datasheetNoSkit.json', { signal: controller.signal })
        .then(response => response.json())
        .then(data => {
            
            choiceData = data.songs[choice]
            compareFunction(choiceData, mysterySong)
           
        })
        // MAYBE ADD BACK SIGNAL CONTROLELR SIGNAL
/*
        await fetch(spreadFunctionCalls() + "/songs/" + choice,
            { signal: controller.signal })
            .then(response => response.json())
            .then(data => {
                choiceData = data
                //console.log(choiceData.title + ", I got broads in Atlanta") 
                compareFunction(choiceData, mysterySong)
                //console.log(choiceData)
                //console.log(mysterySong)
                //console.log(result)

            })
*/
        addRow(choiceData, result)
        searchInput.setAttribute('placeholder', 'Guess ' + ++guessCount + '/' + maxGuesses)

        searchInput.value = ""




        if (Object.values(result).every(r => r.includes("green"))) {
            irishSpring = true
        }
        else {
            irishSpring = false
        }


        if (Object.values(result).every(r => r.includes("green"))) {
            const correct = Number(window.localStorage.getItem('correctGuesses')) || 0
            window.localStorage.setItem('correctGuesses', correct + 1)



            mainStatisticsW()
            showMysterySong(true)
            winStatus = "true";

            accGuessCount = guessCount - 1
            searchInput.setAttribute('placeholder', 'You solved it in ' + accGuessCount + '!')
        } else { }

    }


    if (guessCount > maxGuesses
        && irishSpring != true) {

        mainStatisticsL()
        showMysterySong(false)
        winStatus = "false";
        searchInput.setAttribute('placeholder', 'Better luck next time!')
        preserveGameState()
    } else { }
    sideStatistics()
    preserveGameState()
    //console.log(result.title + " seggy")
}

function mainStatisticsW() {
    const gamesPlayed = Number(window.localStorage.getItem('gamesPlayed')) || Number(window.localStorage.getItem('winStreak')) - 1
    window.localStorage.setItem('gamesPlayed', gamesPlayed + 1)

    const statCorrect = Number(window.localStorage.getItem('correctGuesses')) || 0

    const winStreak = Number(window.localStorage.getItem('winStreak')) || 0
    window.localStorage.setItem('winStreak', winStreak + 1)




    dataDiv.innerText = `${statCorrect}`
    dataStreak.innerText = `${winStreak}`
    dataGames.innerText = `${gamesPlayed}`
}
function mainStatisticsL() {
    const gamesPlayed = Number(window.localStorage.getItem('gamesPlayed')) || Number(window.localStorage.getItem('winStreak'))
    window.localStorage.setItem('gamesPlayed', gamesPlayed + 1)

    const statCorrect = Number(window.localStorage.getItem('correctGuesses')) || 0

    window.localStorage.setItem('winStreak', 0)
    const winStreak = window.localStorage.getItem('winStreak') || 0



    dataDiv.innerText = `${statCorrect}`
    dataStreak.innerText = `${winStreak}`
    dataGames.innerText = `${gamesPlayed}`
}



function compareFunction(choiceData, mysterySong) {


    // Album Comparison
    if (choiceData.album === mysterySong.album) {
        result.album = "green";
    }

    else if (choiceData.album - mysterySong.album >= -2
        && choiceData.album - mysterySong.album <= 2
        && choiceData.album - mysterySong.album != 0
        && choiceData.album - mysterySong.album < 0) {
        result.album = "yellow up";
    }

    else if (choiceData.album - mysterySong.album >= -2
        && choiceData.album - mysterySong.album <= 2
        && choiceData.album - mysterySong.album != 0
        && choiceData.album - mysterySong.album > 0) {
        result.album = "yellow down";
    }

    else if (choiceData.album - mysterySong.album < 0) {
        result.album = "grey up";
    }

    else if (choiceData.album - mysterySong.album > 0) {
        result.album = "grey down";
    }

    // Title Comparison
    if (choiceData.title === mysterySong.title) {
        result.title = "green"
        //console.log("West Guesser Ever!")
    }
    else {
        result.title = "grey"
        //console.log("u really a bum on fonem")
    }

    // Track Comparison
    if (choiceData.track === mysterySong.track) {
        result.track = "green";
    }

    else if (choiceData.track - mysterySong.track >= -2
        && choiceData.track - mysterySong.track <= 2
        && choiceData.track - mysterySong.track != 0
        && choiceData.track - mysterySong.track < 0) {
        result.track = "yellow up";
    }

    else if (choiceData.track - mysterySong.track >= -2
        && choiceData.track - mysterySong.track <= 2
        && choiceData.track - mysterySong.track != 0
        && choiceData.track - mysterySong.track > 0) {
        result.track = "yellow down";
    }

    else if (choiceData.track - mysterySong.track < 0) {
        result.track = "grey up";
    }

    else if (choiceData.track - mysterySong.track > 0) {
        result.track = "grey down";
    }

    // Lenght Comparison

    if (choiceData.length === mysterySong.length) {
        result.length = "green";
    }

    else if (choiceData.length - mysterySong.length >= -30
        && choiceData.length - mysterySong.length <= 30
        && choiceData.length - mysterySong.length != 0
        && choiceData.length - mysterySong.length < 0) {
        result.length = "yellow up";
    }

    else if (choiceData.length - mysterySong.length >= -30
        && choiceData.length - mysterySong.length <= 30
        && choiceData.length - mysterySong.length != 0
        && choiceData.length - mysterySong.length > 0) {
        result.length = "yellow down";
    }

    else if (choiceData.length - mysterySong.length < 0) {
        result.length = "grey up";
    }

    else if (choiceData.length - mysterySong.length > 0) {
        result.length = "grey down";
    }

    // Features
    const filteredArray = choiceData.features.filter(value => mysterySong.features.includes(value));

    if (areArraysEqualSets(choiceData, mysterySong) === "true") { result.features = "green" }

    //if (choiceData.features[0] === mysterySong.features[0]){result.features = "green"}



    else if (filteredArray != "") {
        result.features = "yellow"
    }



    else { result.features = "grey" }






    return result;
}

/** assumes array elements are primitive types
* check whether 2 arrays are equal sets.
* @param  {} choiceData.features is an array
* @param  {} mysterySong.features is an array
*/
function areArraysEqualSets(choiceData, mysterySong) {
    const superSet = {};
    for (const i of choiceData.features) {
        const e = i + typeof i;
        superSet[e] = 1;
    }

    for (const i of mysterySong.features) {
        const e = i + typeof i;
        if (!superSet[e]) {
            return "false";
        }
        superSet[e] = 2;
    }

    for (let e in superSet) {
        if (superSet[e] === 1) {
            return "false";
        }
    }

    return "true";
}

function addRow(choiceData, result) {
    const newRow = resultTable.insertRow(-1)

    // Song
    const songCell = document.createElement('td')
    songCell.classList.add('song-cell')
    songCell.className += " " + result["title"]


    /*
    const songHeadshot = new Image()
    songHeadshot.src = choiceData.cover
    songHeadshot.className = 'song-headshot'
    */

    const songTitle = document.createElement('p')
    songTitle.className = 'song-title'
    songTitle.innerText = choiceData.title

    //songCell.appendChild(songHeadshot)
    songCell.appendChild(songTitle)

    // Album
    const albumCell = document.createElement('td')
    albumCell.classList.add('album-cell')
    albumCell.className += " " + result["album"]

    const albumCellInner = document.createElement('div')
    albumCellInner.className = 'album-cell-inner'


    const albumLogo = new Image()
    albumLogo.src = "/albums/128_" + choiceData.album + ".jpg"
    albumLogo.className = 'album-logo'

    albumCellInner.appendChild(albumLogo)

    //albumCellInner.innerHTML += choiceData["album"]

    albumCell.appendChild(albumCellInner)


    // Track Number (Tagen från Age)
    const trackCell = document.createElement('td')
    trackCell.classList.add('track-cell')
    trackCell.innerText = choiceData.track
    trackCell.className += " " + result["track"]

    // Track Length
    const lengthCell = document.createElement('td')
    lengthCell.classList.add('length-cell')
    lengthCell.innerText = secondsToMin(choiceData.length)
    lengthCell.className += " " + result["length"]

    // Features
    const featuresCell = document.createElement('td')
    featuresCell.classList.add('features-cell')
    featuresCell.innerText = haveFeatures(choiceData)
    featuresCell.className += " " + result["features"]


    newRow.appendChild(songCell)
    newRow.appendChild(albumCell)
    newRow.appendChild(trackCell)
    newRow.appendChild(lengthCell)
    newRow.appendChild(featuresCell)

}

function secondsToMin(seconds) {
    let min = Math.floor(seconds / 60)
    let secondsRemaining = seconds % 60

    if (secondsRemaining > 9) {
        return min + ":" + secondsRemaining
    }

    else {
        return min + ":0" + secondsRemaining
    }
}

function haveFeatures(choiceData) {
    if (choiceData.features[0] === "") {
        //console.log("No features")
        return "No features"
    }
    else {
        //console.log("Has features")
        return choiceData.features
    }
}

function showMysterySong(correct) {
    cardBackground.querySelector("#end-card-title").innerText = correct ? "Correct!" + " " : "Game" + " Over!"
    cardBackground.querySelector('#mystery-song-title').innerText = mysterySong.title + " "

    if (mysterySong.features[0] === "") {
    }
    else {
        cardBackground.querySelector('#mystery-song-feature').innerText = "ft. [" + mysterySong.features + "]"
    }


    cardBackground.querySelector('#mystery-song-img').src = mysterySong.cover
    cardBackground.classList.remove('hide')
    searchInput.classList.add('greyed')
    playAgainButton.focus()


}

function showShowResult() {
    cardBackground.classList.remove('hide')


    

}

function playAgain() {

    guessButton.classList.add('disable')
    cardBackground.classList.add('hide')
    showShowButton.classList.remove('disable')

}

function sideStatistics() {

    const totalGuesses = window.localStorage.getItem('totalGuesses') || 0
    const gamesPlayed = Number(window.localStorage.getItem('gamesPlayed')) || Number(window.localStorage.getItem('correctGuesses'))

    const correctGuess = Number(window.localStorage.getItem('correctGuesses')) || 0
    const statCorrect = Number(window.localStorage.getItem('correctGuesses')) || 0

    //console.log(gamesPlayed + ", " + statCorrect)


    const winStreak = window.localStorage.getItem('winStreak') || 0

    if (gamesPlayed < correctGuess) {
        window.localStorage.setItem('gamesPlayed', correctGuess)

    }



    dataDiv.innerText = `${statCorrect}`
    dataStreak.innerText = `${winStreak}`
    dataGames.innerText = `${gamesPlayed}`





}


function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)]
}



//copy to clipboard
function copyToClipboard(text) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
}

function scoreText() {
    let resultsArray = []
    for (e of document.querySelector("tbody").children) {
        let subArray = []
        if (e != document.querySelector("tbody").children[0]) {
            for (d of e.children) {
                if (d.classList.contains('green')) {
                    subArray.push("🟢 ")
                } else if (d.classList.contains('yellow')) {
                    subArray.push("🟡 ")
                } else if (d.classList.contains('red')) {
                    subArray.push("🟥 ")
                } else {
                    subArray.push("⚪️ ")
                }
            }
            resultsArray.push(subArray)
        }
    }
    return formatScoreText(resultsArray)
}

function formatScoreText(resultsArray) {
    let formattedScoreText = "YEEZLE #" + yeezleDay + ": " + (Number(guessCount) - 1) + "/" + maxGuesses + "\n"  //+ "\n"
    for (e of resultsArray) {
        formattedScoreText += "\n" + e.join("")
    }
    formattedScoreText += "\n\n🌐 yeezle.xyz 🌐"

    return formattedScoreText
}

function spreadFunctionCalls() {

    return randomSpread();
    //return "https://api.npoint.io/21c105480c786fadc987"
    //return "https://api.npoint.io/d73423cbdb26e5d39167"
    //return "https://api.npoint.io/57f7590196c37d8320f4"

}

function randomSpread() {
    var values = [
        "https://api.npoint.io/57f7590196c37d8320f4",
        "https://api.npoint.io/59b7afd3113c38cff99f",
        "https://api.npoint.io/c9b6436291f2c9bcffb0",
        "https://api.npoint.io/4eb342f5565886620b10"

    ],
        valueToUse = values[Math.floor(Math.random() * values.length)];
    // do something with the selected value
    return valueToUse;
}


function showIntro() {
    const introShown = window.localStorage.getItem('introShown')

    if (introShown === "false") {

        //window.localStorage.setItem('introShown', "false")
    } else {
        introCardBack.classList.remove('hide')
    }
}



function jerseyElement(primary, secondary, number, color) {
    return `<svg viewBox="0,0,42,52" class="jersey">
    <rect fill="${primary}" height="52" width="42" y="0" x="0"></rect>
    <ellipse fill="${color}" stroke-width="2" stroke="${secondary}" ry="18" rx="7" cy="5" cx="0"></ellipse>
    <ellipse fill="${color}" stroke-width="2" stroke="${secondary}" ry="18" rx="7" cy="5" cx="42"></ellipse>
    <ellipse fill="${color}" stroke-width="2" stroke="${secondary}" ry="7" rx="7" cy="0" cx="21"></ellipse>
    <text x="22" y="30" fill="#ffffff">${number}</text>
    </svg>`
}

function hexFromResult(result) {
    const r = 1
    let c;
    switch (r) {
        case "green":
            c = "#3C8725"
            break;
        case "yellow":
            c = "#d0ae0e"
            break;
        case "grey":
            c = "#a6a6a6"
            break;
        default:
            c = "#ffffff"
            break;
    }
    return c
}


function openInNewTab(url) {
    window.open(url, '_blank').focus();
}