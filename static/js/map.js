console.log("Script map loaded")

function map() {
    if (document.getElementById('section_text2').innerText != "" && document.getElementById('section_text4').innerText != "") {
        let ville1 = "https://maps.google.com/maps?q="+ document.getElementById('section_text2').innerText+"&t=k&z=11&ie=UTF8&iwloc=&output=embed";
        document.getElementById('gmap_canvas1').setAttribute('src', ville1);
        let ville2 = "https://maps.google.com/maps?q="+ document.getElementById('section_text4').innerText+"&t=k&z=11&ie=UTF8&iwloc=&output=embed";
        document.getElementById('gmap_canvas2').setAttribute('src', ville2);
    }
}

map()