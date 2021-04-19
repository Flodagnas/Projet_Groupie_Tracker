fetch('https://cors-anywhere.herokuapp.com/https://groupietrackers.herokuapp.com/api/artists')
    .then((response) => response.json()) // parse the response from JSON
    .then(loadData) // .then will call the function with the JSON value

function loadData(artists) {
    for (artist of artists) {
        makeCard(artist)
    }
}

function makeCard(artist) {
    let card = document.createElement('div')
    card.className = 'card'
    let url = "url('" + artist.image + "')"
    card.style.background = url
    card.style.backgroundRepeat = "no-repeat"
    card.style.backgroundSize = "contain"
    card.style.backgroundPosition = "0"
    card.setAttribute("onclick", "this.classList.toggle('expanded'); this.querySelector('.text').classList.toggle('displayed')")
    let text = document.createElement('div')
    text.className = 'text'
    let textContent = document.createElement('div')
    textContent.className = 'text-content'
    let title = document.createElement('h1')
    title.innerText += artist.name
    title.className = 'title'
    let bodyText = document.createElement('div')
    bodyText.className = 'body-text'

    card.appendChild(text)
    text.appendChild(textContent)
    textContent.appendChild(title)
    textContent.appendChild(bodyText)
    card.innerHTML += `<svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 35" width="30"><path d="M5 30L50 5l45 25" fill="none" stroke="#000" stroke-width="5"/></svg>`

    document.querySelector('.cards').appendChild(card)
    
}