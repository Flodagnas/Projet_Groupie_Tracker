function map() {
    let ville = "https://maps.google.com/maps?q="+select+"&t=k&z=11&ie=UTF8&iwloc=&output=embed";
    document.getElementById('gmap_canvas').setAttribute('src', ville)
    console.log(ville);
}

// Liste à choix des villes
document.getElementById('ville-elem').addEventListener('change', () => {
    select = document.getElementById('ville-elem').value
    console.log(select)
    map()
})
