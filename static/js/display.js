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
    var lastDate = []
    let date = []
    let locations = ""
    let preLocations = ""
    let i = 0
    let preDate = ""
    for (locations in relationsGroupe['datesLocations']){
        date = relationsGroupe['datesLocations'][locations]
        i += 1
        if (i == Object.getOwnPropertyNames(relationsGroupe['datesLocations']).length -1) {
            preDate = date
            preLocations = locations
        }

    };
    lastDate = date[date.length - 1]
    document.getElementById('section_text1').insertAdjacentHTML('beforeEnd',preDate);
    document.getElementById('section_text2').insertAdjacentHTML('beforeEnd',preLocations);
    document.getElementById('section_text3').insertAdjacentHTML('beforeEnd',lastDate);
    document.getElementById('section_text4').insertAdjacentHTML('beforeEnd',locations);
    console.log(lastDate);
};

geo(responseData)
APIRelation(responseRelation)