//  ******* DOM Variable Assignments *******
let superheroMenu = document.querySelector('.main-select')
let memeSuperheroMenu = document.querySelector('.meme-select')
let heroCardContainer = document.getElementById('superhero-card-container')
let heroContainer = document.querySelector('.superhero-card')
let listContainer = document.querySelector('.main-select')
let memeSelectHero = document.querySelector('.meme-select')
let welcomeBlurb = document.querySelector('.welcome-blurb-container')
let randomBtn = document.querySelector('.randomBtn')
let memeBtn = document.querySelector('.memeBtn')
let memeModal = document.querySelector('.meme-modal')
let memeModalContent = document.querySelector('.meme-modal-content')
let memeTextArea = document.getElementById('meme-input')
let memeSubmit = document.querySelector('.meme-input')
let cancelBtn = document.querySelector('.close-modal')
//  ********************************************************


// ******* Variable placeholders *******
const superHeroList = []
const joke = {}
let currentlySelectedHero = null
let userMemeInputText = null
let memeCharacterSelected = null
//  ********************************************************


 // ******* AJAX CALLS *******
function getSuperHeroes() {
    $.ajax({
        // headers: {
        //     "X-Access-Token": "4182605258481258"
        // },
        url: "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json",
        method: "GET",
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                superHeroList.push({name: result[i].name, image: result[i].images.md, id: result[i].id})
            }
            generateDropDownList()
            superheroGenerateJoke()
            generateRandomHero()
            memeCreator()
        },
        error: function(result) {
            console.log(`Error getting data`)
        }
    })
}
function getRandomJoke() {
    $.ajax({
        url: "https://official-joke-api.appspot.com/jokes/programming/random",
        method: "GET",
        success: function (result) {
            joke.setup = result[0].setup
            joke.punchline = result[0].punchline
        },
        error: function(result) {
            console.log(`Error getting data`)
        }
    })
}
// *******************************************


// ******* FUNCTION DEFINITIONS *******

function resetCard() {
    hideWelcomeBlurb()
    removeExistingCard()
    getRandomJoke()
}

function generateDropDownList() {
    for (let i = 0; i < superHeroList.length; i++) {
        let dropDownItem = document.createElement('option')
        dropDownItem.textContent = superHeroList[i].name
        listContainer.append(dropDownItem)
    }
    return superHeroList
}

function hideWelcomeBlurb() {
    welcomeBlurb.className = 'hidden welcome-blurb-container'
}

function removeExistingCard() {
    let currentDisplayedCard = document.querySelector('.superhero-card')
    if (currentDisplayedCard) {
        currentDisplayedCard.remove()
    }
}

function superheroGenerateJoke() {
    superheroMenu.addEventListener('change', function () {
        currentlySelectedHero = event.path[1].firstElementChild.value
        createHeroDomElements()
    })
}

function generateRandomHero() {
    randomBtn.addEventListener('click', function () {
        let randomNumber = Math.floor(Math.random() * superHeroList.length)
        currentlySelectedHero = superHeroList[randomNumber].name
        createHeroDomElements()
        superheroMenu.value = 'Select your hero'
    })
    
}

function createHeroDomElements() {
    for (let i = 0; i < superHeroList.length; i++) {
        if (currentlySelectedHero === superHeroList[i].name) {
            resetCard()
            let superheroContainer = document.createElement('div')
            superheroContainer.classList.add('superhero-card')
            let heroTitle = document.createElement('h3')
            heroTitle.classList.add('superhero-name')
            heroTitle.textContent = currentlySelectedHero
            let heroImage = document.createElement('div')
            heroImage.classList.add('image-container')
            heroImage.style.backgroundImage = "url" + "(" + `${superHeroList[i].image}` + ")"
            let jokeContainer = document.createElement('div')
            jokeContainer.className = 'joke-container'
            let jokeSetup = document.createElement('h4')
            jokeSetup.setAttribute('id', 'question')
            jokeSetup.textContent = joke.setup
            let jokePunchline = document.createElement('h4')
            jokePunchline.setAttribute('id', 'answer')
            jokePunchline.textContent = joke.punchline
            jokeContainer.append(jokeSetup)
            superheroContainer.append(heroTitle, heroImage, jokeContainer)
            
            heroCardContainer.append(superheroContainer)
            setInterval(function () {
                jokeContainer.append(jokePunchline)
            }, 0)

        }
    }
}

function createMeme(userInput, selectedHero) {
    for (let i = 0; i < superHeroList.length; i++) {
        if (selectedHero === superHeroList[i].name) {
            resetCard()
            let superheroContainer = document.createElement('div')
            superheroContainer.classList.add('superhero-card')
            let heroImage = document.createElement('div')
            heroImage.classList.add('image-container')
            heroImage.style.backgroundImage = "url" + "(" + `${superHeroList[i].image}` + ")"
            let memeCaption = document.createElement('h2')
            memeCaption.textContent = userInput
            memeCaption.className = 'meme-caption'
            heroImage.append(memeCaption)
            superheroContainer.append(heroImage)
            heroCardContainer.append(superheroContainer)
            
        }
    }
}

function memeDropDownList() {
    for (let i = 0; i < superHeroList.length; i++) {
        let dropDownItem = document.createElement('option')
        dropDownItem.textContent = superHeroList[i].name
        memeSelectHero.append(dropDownItem)
    }
}

function memeCreator() {
    memeBtn.addEventListener('click', function () {
        console.log('hello')
        memeModal.classList.remove('hidden')
        memeDropDownList()
        cancel()        
    })
    memeSubmit.addEventListener('click', function () {
        if (memeTextArea.value && memeSuperheroMenu.value !== 'Select your hero') {
            memeCharacterSelected = memeSuperheroMenu.value
            userMemeInputText = memeTextArea.value
            console.log(userMemeInputText, memeCharacterSelected)
            createMeme(userMemeInputText, memeCharacterSelected)
            memeModal.classList.add('hidden')
            

        } else {
            memeSuperheroMenu.style.border = 'solid 3px red'
            memeTextArea.style.border = 'solid 3px red'
            memeModalContent.style.border = 'none'
        }
    })
    
}

function cancel() {
    cancelBtn.addEventListener('click', function () {
        memeModal.classList.add('hidden')
    })
}

// ********************************************************

// ******* APP START FUNCTION CALLS *******
getSuperHeroes()
getRandomJoke()

// ********************************************************