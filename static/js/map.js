console.log("Script map loaded")

// function map() {
//     if (document.getElementById('section_text2').innerText != "" && document.getElementById('section_text4').innerText != "") {
//         let elem1 = document.getElementById('section_text2').innerText.split(/-|_/).join("+")
//         let elem2 = document.getElementById('section_text4').innerText.split(/-|_/).join("+")
//         let ville1 = "https://maps.google.com/maps?q="+ elem1+"&t=k&z=11&ie=UTF8&iwloc=&output=embed";
//         document.getElementById('gmap_canvas1').setAttribute('src', ville1);
//         let ville2 = "https://maps.google.com/maps?q="+elem2+"&t=k&z=11&ie=UTF8&iwloc=&output=embed";
//         document.getElementById('gmap_canvas2').setAttribute('src', ville2);
//         console.log(ville1);
//         console.log(ville2);
//         let newSrc1 = document.querySelector('#gmap_canvas1');
//         newSrc1.src = ville1;
//         let newSrc2 = document.querySelector('#gmap_canvas2');
//         newSrc2.src = ville2;
//     }
// }

// map()