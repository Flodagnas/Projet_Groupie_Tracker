console.log("Script display loaded")

function geo(artists) {
    artists = JSON.parse(artists)
    for (let artist of artists) {
        let nameSelect = artist['name']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option>' + nameSelect + '</option>');
    }; 
};

function relation(relations) {
    relations = JSON.parse(relations)
    for (let location in relations['datesLocations']){
        let date = relations['datesLocations'][location]
        date.sort(function (a, b) {
            return a.location - b.location;
        });
        document.getElementById('section_text1').insertAdjacentHTML('beforeEnd',date);
        document.getElementById('section_text2').insertAdjacentHTML('beforeEnd',location);
        console.log(date);
    };
};

geo(responseData)
relation(responseRelation)
