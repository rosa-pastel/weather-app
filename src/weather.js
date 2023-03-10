function convertFromJSON(jsonData, units) {
  let unitSign;
  if (units === "metric") {
    unitSign = " °C";
  } else if (units === "imperial") {
    unitSign = " °F";
  } else {
    unitSign = " K";
  }
  const iconId = jsonData.weather[0].icon;
  const weatherObj = {
    city: jsonData.name,
    weather: jsonData.weather[0].main,
    description: jsonData.weather[0].description,
    temp: Math.floor(jsonData.main.temp),
    feels: Math.floor(jsonData.main.feels_like),
    wind: Math.floor(jsonData.wind.speed),
    humidity: jsonData.main.humidity,
    id: jsonData.weather[0].id,
    units: unitSign,
    icon: `https://openweathermap.org/img/wn/${iconId}@2x.png`,
  };
  return weatherObj;
}

export default async function getData(city, unitsArg) {
  let weatherObj;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitsArg}&appid=eac65b0201f1a3ee0d12a38d8eaf8189`,
      { mode: "cors" }
    );
    const weatherJSON = await response.json();
    weatherObj = await convertFromJSON(weatherJSON, unitsArg);
  } catch (err) {
    console.log(`Can't get weather data: ${err}`);
  }
  return weatherObj;
}
