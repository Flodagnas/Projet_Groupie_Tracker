const searchBar = document.getElementById('searchBar');
let cards = document.querySelectorAll('.card');

for (const card of cards) {
    card.remove();
}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCards = cards.filter((card) => {
        return (
            card.querySelector('.text .text-content .title').innerText.toLowerCase().includes(searchString)
        );
    });
    displayCards(filteredCards);
});

const displayCards = (cards) => {
    let divCards = document.querySelector('.cards');
    for (const card of cards) {
        divCards.appendChild(card)
    }
};
