console.log("Script display loaded")

function geo(artists) {
    artists = JSON.parse(artists)
    for (let artist of artists) {
        let name = artist['name']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option>' + name + '</option>');
    }; 
};
function relations(artists) {
    artists = JSON.parse(artists)
    for (let artist of artists) {
        let relation = artist['relation']
        document.getElementById('section_text1').insertAdjacentHTML('beforeEnd',relation);
    };
};
geo(responseData)
relations(responseData)
