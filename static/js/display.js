console.log("Script display loaded")

function geo(artists) {
    artists = JSON.parse(artists)
    for (let artist of artists) {
        let name = artist['name']
        document.getElementById('name').insertAdjacentHTML('beforeEnd','<option>' + name + '</option>');
    }; 
};

geo(responseData)
