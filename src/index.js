import getData from "./weather";
import "./style.css";
import feelsIcon from "./icons/thermometer.png";
import humIcon from "./icons/drop.png";
import windIcon from "./icons/wind.png";

function setBackground(weatherID) {
  const body = document.querySelector("body");
  switch (weatherID.charAt(0)) {
    case "2":
      body.className = "thunderstorm";
      break;
    case "3" || "5":
      body.className = "rain";
      break;
    case "6":
      body.className = "snow";
      break;
    case "7":
      body.className = "mist";
      break;
    default:
      if (weatherID === "800") {
        body.className = "clear";
      } else {
        body.className = "clouds";
      }
  }
}

function displayData(data) {
  const leftDiv = document.getElementById("left");
  leftDiv.children.item(0).textContent = data.city;
  leftDiv.children.item(1).src = data.icon;
  leftDiv.children.item(2).textContent = data.description;
  leftDiv.children.item(3).textContent = data.temp;
  leftDiv.children.item(3).appendChild(document.createElement("span"));
  leftDiv.children.item(3).children.item(0).textContent = data.units;

  const rightDiv = document.getElementById("right");
  rightDiv.children
    .item(0)
    .getElementsByTagName("div")[0].children[1].textContent = data.feels;
  rightDiv.children.item(0).getElementsByTagName("img")[0].src = feelsIcon;

  rightDiv.children
    .item(1)
    .getElementsByTagName(
      "div"
    )[0].children[1].textContent = `${data.humidity}%`;
  rightDiv.children.item(1).getElementsByTagName("img")[0].src = humIcon;

  rightDiv.children
    .item(2)
    .getElementsByTagName("div")[0].children[1].textContent = data.wind;
  rightDiv.children.item(2).getElementsByTagName("img")[0].src = windIcon;

  const weatherID = `${data.id}`;
  setBackground(weatherID);
}

async function updatePage(cityInput, unitsInput) {
  const data = await getData(cityInput, unitsInput);
  displayData(data);
}

function initPage() {
  const units = document.querySelector("select#units");
  const city = document.getElementById("city-field");

  city.addEventListener("change", () => updatePage(city.value, units.value));
  units.addEventListener("change", () => updatePage(city.value, units.value));

  updatePage(city.value, units.value);
}

initPage();
