$.getJSON("Config.json", function (data) {
    var items = [];
    for (var valeur in data['Config']['adresse']) {
        var variable = data['Config']['adresse'][valeur];

        if (valeur == 0){
            $('body div#reglage').prepend('<form><select name="adresse" size="1"><option>' + variable);
        } else {
            $('body div#reglage').prepend('<option>' + variable + '</select></form>');
        }

    };
});