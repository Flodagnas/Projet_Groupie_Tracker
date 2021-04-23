console.log("Script display loaded")

function loadData(artists) {
    artists = JSON.parse(artists)

    for (artist of artists) {
        makeCard(artist)
    }
}

function makeCard(artist) {
    let members
    if (artist.members.length == 1) {
        let p = document.createElement('p')
        p.innerText += artist.members[0]
        members = p
    } else {
        let list = document.createElement('ul')
        for (member of artist.members) {
            let line = document.createElement('li')
            line.innerText += member
            list.appendChild(line)
        }
        members = list
    }
    members.classList.add('members')

    let card = document.createElement('div')
    card.className = 'card'
    let url = "url('" + artist.image + "')"
    card.style.background = url
    card.style.backgroundRepeat = "no-repeat"
    card.style.backgroundSize = "contain"
    card.style.backgroundPosition = "0 20%"
    card.setAttribute("onclick", "cardOnClick(this)")
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

    let svg = document.querySelectorAll('.chevron')[document.querySelectorAll('.chevron').length - 1]
    document.querySelectorAll('.card')[document.querySelectorAll('.card').length - 1].insertBefore(members, svg)
    
}

function cardOnClick(el) {
    el.classList.toggle('expanded')
    el.querySelector('.text').classList.toggle('displayed')
    el.querySelector('.members').classList.toggle('displayed')
}

loadData(responseData) 