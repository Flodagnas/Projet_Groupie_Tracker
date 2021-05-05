console.log("Script display loaded")

function recupGroupes(artists) {
  artists = JSON.parse(artists)
  for (let artist of artists) {
      let nameSelect = artist['name']
      console.log(nameSelect);
      let id = artist['id']
      document.getElementById('name').insertAdjacentHTML('beforeEnd','<option value="'+ id + '">' + nameSelect + '</option>');
  }; 
};

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Jullet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  if (firstDayIndex != 0) {

    for (let x = firstDayIndex - 1; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

  } else {
    for (let x = 6; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }
  }

  for (let i = 1; i <= lastDay; i++) {

    if ( i === new Date().getDate() && date.getMonth() === new Date().getMonth() ) {
      days += `<div class="today">${i}</div>`;

    } else {
      days += `<div>${i}</div>`;

    }
  }

  for (let j = 1; j <= nextDays + 1; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.querySelector(".informations").addEventListener("click", () => {
  date.getInformation();
  information();
});

recupGroupes(responseData)
renderCalendar();

console.log(date);
