console.log("Script display loaded")

function loadData(dates) {
    dates = JSON.parse(dates)

    for (dates of dates) {
        makeCard(dates)
    }
}

loadData(responseData)