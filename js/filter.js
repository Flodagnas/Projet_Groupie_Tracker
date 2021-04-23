console.log("Script filter loaded")

let isreverse = false
let type = ""
let cards = []
document.querySelectorAll('.card').forEach(card => {
    cards.push(card)
})

// Liste à choix des catégories
document.querySelector('#filterSelect').addEventListener('change', () => {
    filter(document.querySelector('#filterSelect').value)
})

// Fonction de filtrage des cartes
function filter(filterSelect) {

    if (filterSelect == '0') {
        document.location.reload()
        return;
    }

    for (let card of cards) {
        card.remove()
    }

    isReverse = parseInt(filterSelect) % 2 == 0 ? true : false
    type = parseInt(filterSelect) == (5 || 6) ? "date" : parseInt(filterSelect) == (7 || 8) ? "int" : "string"

    if (type == "date") {
        cards.sort(function(a, b) {
            let dateA = new Date(a.querySelector('p.firstAlbum').innerText.split('-').reverse().join('-'))
            let dateB = new Date(b.querySelector('p.firstAlbum').innerText.split('-').reverse().join('-'))
            return dateA - dateB
        })

    } else if (type == "string") {
        cards.sort(function(a, b) {
            return a.querySelector('div.text div.text-content h1.title').innerText.localeCompare(b.querySelector('div.text div.text-content h1.title').innerText)
        })
    } else {
        cards.sort(function(a, b) {
            return parseInt(a.querySelector('p.creationDate').innerText) - parseInt(b.querySelector('p.creationDate').innerText)
        })
    }

    if (isReverse) {
        cards.reverse()
    }

    for (let card of cards) {
        document.querySelector('.cards').appendChild(card)
    }
}
