console.log("Script display loaded")

function geo(artists) {
    artists = JSON.parse(artists)
    for (let artist of artists) {
        let nameSelect = artist['name']
        let id = artist['id']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option value="'+ id + '">' + nameSelect + '</option>');
    }; 
};

function relation(relations) {
    relations = JSON.parse(relations)
    var lastDate = []
    var preDate = []
    let date = []
    let locations = ""
    preLocations = ""
    let i = 0
    preDate = ""
    for (locations in relations['datesLocations']){
        date = relations['datesLocations'][locations]
        i += 1
        if (i == locations[locations.length - 1] - 1) {
            preDate = date
            preLocations = locations
        }

    };
    lastDate = date[date.length - 1]
    document.getElementById('section_text1').insertAdjacentHTML('beforeEnd',preDate);
    document.getElementById('section_text2').insertAdjacentHTML('beforeEnd',locations);
    document.getElementById('section_text3').insertAdjacentHTML('beforeEnd',lastDate);
    document.getElementById('section_text4').insertAdjacentHTML('beforeEnd',locations);
    console.log(lastDate);
};

geo(responseData)
relation(responseRelation)
