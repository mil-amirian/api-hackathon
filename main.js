//  ******* DOM Variable Assignments *******
let superheroMenu = document.querySelector('select')
let heroCardContainer = document.getElementById('superhero-card-container')
let heroContainer = document.querySelector('.superhero-card')
let listContainer = document.querySelector('.main-select')
let memeSelectHero = document.querySelector('.meme-select')
let welcomeBlurb = document.querySelector('.welcome-blurb-container')
let randomBtn = document.querySelector('.randomBtn')
//  ********************************************************


// ******* Variable placeholders *******
const superHeroList = []
const joke = {}
let currentlySelectedHero = null
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

function createMeme() {
    for (let i = 0; i < superHeroList.length; i++) {
        if (currentlySelectedHero === superHeroList[i].name) {
            resetCard()
            memeDropDownList()
            let superheroContainer = document.createElement('div')
            superheroContainer.classList.add('superhero-card')
            let heroImage = document.createElement('div')
            heroImage.classList.add('image-container')
            heroImage.style.backgroundImage = "url" + "(" + `${superHeroList[i].image}` + ")"
            let memeCaption = document.createElement('h2')
            memeCaption.textContent = `User Input Text User input user input`
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
// ********************************************************

// ******* APP START FUNCTION CALLS *******
getSuperHeroes()
getRandomJoke()

// ********************************************************