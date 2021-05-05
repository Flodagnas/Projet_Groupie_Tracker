console.log("Script display loaded")

function loadData(dates) {
    dates = JSON.parse(dates)

    for (date of dates) {
        makeInfo(date)
    }
}

function APIDate(dates) {
    let id = []
    
}

function dateOnClick(el) {
    el.classList.toggle('expanded')
    el.querySelector('.text').classList.toggle('displayed')
    el.querySelector('.members').classList.toggle('displayed')
    el.querySelector('.locationButton').classList.toggle('displayed')
}

loadData(responseData)