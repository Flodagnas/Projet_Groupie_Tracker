function recupGroupes(artists) {
    group = JSON.parse(artists)
    console.log(group);
    for (let artist of group) {
        let nameSelect = artist['name']
        console.log(nameSelect);
        let id = artist['id']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option value="'+ id + '">' + nameSelect + '</option>');
    }; 
  };

function APIRelation(relations) {
    // console.log(relations);
    relationsGroupe = JSON.parse(relations)
    var lastDate = ""
    let dates = []
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
                preLocation = locations.split(/-|_/).join(" ")
            }
            if (date == lastDate) {
                lastLocation = locations.split(/-|_/).join(" ")
            }
        });
    }
    document.getElementsByClassName('informations').insertAdjacentHTML('beforeEnd','<p>' + nameSelect + '</p>');
};

recupGroupes(responseData)
if (responseRelation) {
    APIRelation(responseRelation)
}