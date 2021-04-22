console.log("Script filter loaded")

let filterSelect = ""
let isreverse = false
let isDate = false
let cards = []
document.querySelectorAll('.card').forEach(card => {
    cards.push(card)
})

// Liste à choix des catégories
document.querySelector('#filterSelect').addEventListener('change', () => {
    filterSelect = document.querySelector('#filterSelect').value
    isReverse = parseInt(filterSelect) % 2 == 0 ? true : false
    isDate = parseInt(filterSelect) >= 5 ? true : false
    filter()
})

function filter(filterSelect, type, isReverse) {

    for (let card of cards) {
        card.remove
    }

    if (isDate) {
        cards.sort(function(a, b) {
            let dateA = new Date(a.querySelector('pathToDate').split('-').reverse().join('-'))
            let dateB = new Date(b.querySelector('pathToDate').split('-').reverse().join('-'))
            return dateA - dateB
        })

    } else {
        cards.sort(function(a, b) {
            return a.querySelector('.text.text-content.title') - b.querySelector('.text.text-content.title')
        })
    }

    if (isReverse) {
        cards.reverse()
    }

}

// let artists = JSON.parse(responseData)
// console.log(artists[0]['firstAlbum'].split('-').reverse().join('-'))