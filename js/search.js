console.log("Script search loaded")

let search = ""
let searchSelect = document.getElementById('searchSelect').value
let tabLines = []

// Input actualisant en temps réel les données
document.getElementById('searchInput').addEventListener('keyup', () => {
    tabLines = []
    search = document.getElementById('searchInput').value
    callJson()
})

// Liste à choix des catégories
document.getElementById('searchSelect').addEventListener('change', () => {
    tabLines = []
    searchSelect = document.getElementById('searchSelect').value
    callJson()
})

// Fonction de suppression des lignes du tableau
function deleteLines() {
    let lines = document.getElementsByClassName('line')
    for (let line of Array.from(lines)) {
        line.remove()
    }
}