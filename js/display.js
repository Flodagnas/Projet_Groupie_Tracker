fetch('https://cors-anywhere.herokuapp.com/https://groupietrackers.herokuapp.com/api/artists')
    .then((response) => response.json()) // parse the response from JSON
    .then(loadData) // .then will call the function with the JSON value

function loadData(artists) {
    for (artist of artists) {
        makeCard(artist)
    }
}

function makeCard(artist) {
    let div = document.createElement('div')
    div.className = "card"
    let p = document.createElement('p')
    p.innerText += artist.name
    div.appendChild(p)
    document.querySelector('.cards').appendChild(div)
}