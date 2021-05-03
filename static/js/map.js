function map() {
    let ville1 = "https://maps.google.com/maps?q="+ document.getElementById('section_text2')+"&t=k&z=11&ie=UTF8&iwloc=&output=embed";
    document.getElementById('gmap_canvas1').insertAdjacentHTML('beforeEnd',ville1);
    let ville2 = "https://maps.google.com/maps?q="+ document.getElementById('section_text4')+"&t=k&z=11&ie=UTF8&iwloc=&output=embed";
    document.getElementById('gmap_canvas1').insertAdjacentHTML('beforeEnd',ville2);
}

geo(responseRelation)