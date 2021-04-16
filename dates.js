console.log("Script display loaded")

// Chargement du JSON et des fonctions associées
function callJson() {
    fetch('https://groupietrackers.herokuapp.com/api/dates')
    .then((response) => response.json()) // parse the response from JSON
    .then(loadTab) // .then will call the function with the JSON value
    .then(() => {
        linesInTab = []
        document.querySelectorAll('.line').forEach(tr => {
            linesInTab.push(tr)
        })
    })
    .then(pagination)
}
