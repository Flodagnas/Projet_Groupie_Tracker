console.log("Script search loaded")

const searchBar = document.querySelector('#searchInput');

searchBar.addEventListener('keyup', (e) => {
    filterCards(cards)
})

// Fonction de filtrage des cartes en fonction de la recherche
function filterCards(cards) {
    for (const card of cards) {
        card.remove();
    }

    let searchString = searchBar.value.toLowerCase()
    const filteredCards = cards.filter((card) => {
        return (
            card.querySelector('.text .text-content .title').innerText.toLowerCase().includes(searchString)
        );
    });
    displayCards(filteredCards);
}

// Affichage des cartes
const displayCards = (cards) => {
    let divCards = document.querySelector('.cards');
    for (const card of cards) {
        divCards.appendChild(card)
    }
}