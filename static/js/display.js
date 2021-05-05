console.log("Script display loaded")

function geo(artists) {
    artists = JSON.parse(artists)
    for (let artist of artists) {
        let nameSelect = artist['name']
        let id = artist['id']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option value="'+ id + '">' + nameSelect + '</option>');
    }; 
};

function APIRelation(relations) {
    console.log(relations);
    relationsGroupe = JSON.parse(relations)
    var lastDate = ""
    let dates = []
    let lastLocation = ""
    let preLocation = ""
    let i = 0
    let preDate = ""
    
    for (locations in relationsGroupe['datesLocations']){
        relationsGroupe['datesLocations'][locations].forEach(date => {
            dates.push(date)
        });
    }
    dates.sort(function(a, b){
        let dateA = new Date(a.split("-").reverse().join("-"))
        let dateB = new Date(b.split("-").reverse().join("-"))
        return dateA - dateB
    })
    preDate = dates[dates.length - 2]
    lastDate = dates[dates.length - 1]
    for (locations in relationsGroupe['datesLocations']){
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