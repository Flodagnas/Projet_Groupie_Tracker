console.log("Script display loaded")

function loadData(artists) {
    artists = JSON.parse(artists)

    for (artist of artists) {
        makeCard(artist)
    }
}

function location(artists) {
    var items = [];
    for (var valeur in artists['name']) {
        var variable = artists['name'][valeur];

        if (valeur == 0){
            $('body div#reglage').prepend('<form><select name="adresse" size="1"><option>' + variable);
        } else {
            $('body div#reglage').prepend('<option>' + variable + '</select></form>');
        }

    };
};

loadData(responseData)