let datas = {
  Tehran: ["lavasan", "Meygon", "Oshan", "Shahriyar"],
  Tabriz: ["Ahar", "Maraghe", "Deris", "Tabriz"],
  Shiraz: ["Darab", "Jahrom", "Shiraz", "Lar"],
};
// Origin div select option tags and elements
let originDiv = document.getElementById("originDiv");
let citiesDiv = document.getElementById("citiesDiv");
let stateSelectTag = document.createElement("select");
let citySelectTag = document.createElement("select");
citiesDiv.appendChild(citySelectTag);
originDiv.appendChild(stateSelectTag);

// destination div select option tags and elements
let desStateDiv = document.getElementById("desStateDiv");
let citiesStateDiv = document.getElementById("citiesStateDiv");
let desStateSelectTag = document.createElement("select");
let desCitySelectTag = document.createElement("select");
desStateDiv.appendChild(desStateSelectTag);
citiesStateDiv.appendChild(desCitySelectTag);

// descriptions
let rout = document.getElementById("rout");
let descriptions = document.getElementById("descriptions");

originStateSelection();
destinationSelectTag();

// generating state origin select tag
function originStateSelection() {
  stateSelectTag.id = "selectTag";
  for (let state in datas) {
    stateSelectTag.insertAdjacentHTML(
      "afterbegin",
      `<option value=${state} >${state}</option>`
    );
  }
}

// state origin select tag

let selectedState = document.getElementById("selectTag");
selectedState.onchange = stateSelection;

function stateSelection() {
  citySelectTag.innerHTML = "";
  switch (selectedState.value) {
    case "Shiraz":
      originCitySelection("Shiraz");
      break;
    case "Tehran":
      originCitySelection("Tehran");
      break;
    case "Tabriz":
      originCitySelection("Tabriz");
      break;
  }
}

// city origin select tag
citySelectTag.id = "citySelectTag";
let selectedOriginCity = document.getElementById("citySelectTag");

function originCitySelection(city) {
  for (let cities of datas[city]) {
    citySelectTag.insertAdjacentHTML(
      "afterbegin",
      `<option value=${cities} >${cities}</option>`
    );
  }
}
selectedOriginCity.onchange = originCitySelected;

let finalOrigin = null;

function originCitySelected() {
  finalOrigin = selectedOriginCity.value;

  console.log("finalOrigin");
  console.log(finalOrigin);
}
// -----------------------------------------

// generating state destination select tag
function destinationSelectTag() {
  desStateSelectTag.id = "desSelectTag";
  for (let state in datas) {
    desStateSelectTag.insertAdjacentHTML(
      "afterbegin",
      `<option value=${state}>${state}</option>`
    );
  }
}

// state destination tag
let selectedDestState = document.getElementById("desSelectTag");
selectedDestState.onchange = desStateSelection;

function desStateSelection() {
  desCitySelectTag.innerHTML = "";
  switch (selectedDestState.value) {
    case "Tehran":
      destinationCitySelection("Tehran");
      break;
    case "Shiraz":
      destinationCitySelection("Shiraz");
      break;
    case "Tabriz":
      destinationCitySelection("Tabriz");
      break;
  }
}

// destination city tag
desCitySelectTag.id = "desCitySelectTag";
let selectedDestCity = document.getElementById("desCitySelectTag");

function destinationCitySelection(city) {
  for (let cities of datas[city]) {
    desCitySelectTag.insertAdjacentHTML(
      "afterbegin",
      `<option value=${cities} >${cities}</option>`
    );
  }
  disableOptions();
}

selectedDestCity.onchange = destiCitySelected;

let finalDestination = null;
function destiCitySelected() {
  finalDestination = selectedDestCity.value;
  console.log("Final destination ");
  console.log(finalDestination);
}

// disabling destinations option
function disableOptions() {
  let disableDestCity = selectedDestCity.getElementsByTagName("option");
  for (var i = 0; i < disableDestCity.length; i++) {
    if (disableDestCity[i].value == finalOrigin) {
      disableDestCity[i].disabled = true;
    }
  }
}
//----------------------------------

rout.addEventListener("click", displyResult);

function displyResult() {
  if (finalDestination !== null && finalOrigin !== null) {
    descriptions.insertAdjacentHTML(
      "afterbegin",
      `<h5> You have successfully choose your day trip from <span class="span">${finalOrigin}</span> to <span class="span">${finalDestination}</span></h5>    `
    );
  } else {
    setTimeout(() => alert("Please select your rout first"), 500);
  }
}

//---------- calender ---------------

// render the calender
let monthDiv = document.getElementById("monthDiv");
let yearDiv = document.getElementById("yearDiv");
let monthSelectTag = document.createElement("select");
let yearSelectTag = document.createElement("select");
let curent = document.getElementById("curent");

monthDiv.appendChild(monthSelectTag);
yearDiv.appendChild(yearSelectTag);
monthSelectTag.className = "options";
yearSelectTag.className = "options";

//----- data-----
let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
let years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

curent.innerText = "curent date : " + currentMonth + " " + currentYear;

let table = document.getElementById("calender-body");

//---- month dropdown
monthSelectTag.id = "monthSelectTagId";
let selectMonth = document.getElementById("monthSelectTagId");

function monthSelection() {
  for (let eachMonth of months) {
    monthSelectTag.insertAdjacentHTML(
      "afterbegin",
      ` <option value=${eachMonth}>${eachMonth}</option>`
    );
  }
}
monthSelection();
selectMonth.onchange = choosingMonth;

//------- year dropdown
yearSelectTag.id = "yearSelectTagId";
let selectYear = document.getElementById("yearSelectTagId");

function yearSelection() {
  for (let eachYear of years) {
    yearSelectTag.insertAdjacentHTML(
      "afterbegin",
      ` <option value=${eachYear}>${eachYear}</option>`
    );
  }
}
yearSelection();
selectYear.onchange = choosingYear;

function showCalender(month, year) {
  table.innerHTML = "";

  let firstDay = new Date(year, month).getDay();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.id = date;
        cell.addEventListener("click", choose(cell.id));
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        cell = document.createElement("td");
        cellText = document.createTextNode(date);
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-secondary");
        }
        cell.id = date;
        cell.addEventListener("click", choose(cell.id));
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }
    table.appendChild(row);
  }
}

function choose(id) {
  day = document.getElementsByTagName("td");
  console.log(day.id);
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

showCalender(currentMonth, currentYear);

function choosingMonth() {
  table.innerHTML = "";
  showCalender(months.indexOf(selectMonth.value), selectYear.value);
  console.log("mont");
}

function choosingYear() {
  table.innerHTML = "";
  showCalender(months.indexOf(selectMonth.value), selectYear.value);
  console.log("year");
}
// todo
// ----------  add onclick attrebiute to all calender cell
