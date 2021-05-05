console.log("Script display loaded")

function loadData(dates) {
    dates = JSON.parse(dates)

    for (date of dates) {
        makeInfo(date)
    }
}

function APIDate(dates) {
    console.log(dates);
    relationsGroupe = JSON.parse(dates)
    var lastDate = ""
    let dates = []
    let lastLocation = ""
    let i = 0
    let preDate = ""

    dates.sort(function(a, b){
        let dateA = new Date(a.split("-").reverse().join("-"))
        let dateB = new Date(b.split("-").reverse().join("-"))
        return dateA - dateB
    })
    preDate = dates[dates.length - 2]
    lastDate = dates[dates.length - 1]
    for (locations in datesGroupe['datesLocations']){
        relationsGroupe['datesLocations'][locations].forEach(date => {
            if (date == preDate) {
                preLocation = locations
            }
            if (date == lastDate) {
                lastLocation = locations
            }
        });
    }
    document.getElementById('section_text1').insertAdjacentHTML('beforeEnd',preDate);
    document.getElementById('section_text2').insertAdjacentHTML('beforeEnd',preLocation);
    document.getElementById('section_text3').insertAdjacentHTML('beforeEnd',lastDate);
    document.getElementById('section_text4').insertAdjacentHTML('beforeEnd',lastLocation);
    console.log(lastDate);
};

geo(responseData)
APIRelation(responseRelation)

function dateOnClick(el) {
    el.classList.toggle('expanded')
    el.querySelector('.text').classList.toggle('displayed')
    el.querySelector('.members').classList.toggle('displayed')
    el.querySelector('.locationButton').classList.toggle('displayed')

}

loadData(responseData)