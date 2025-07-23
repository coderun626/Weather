
function getWeather() {
  const city = document.getElementById('cityInput').value.trim();

  if (city === '') {
    alert("Iltimos, shahar nomini kiriting.");
    return;
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        document.getElementById('weatherResult').innerHTML = "Shahar topilmadi.";
        return;
      }

      const { latitude, longitude, name, country } = data.results[0];

      return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    })
    .then(res => res.json())
    .then(weatherData => {
      if (!weatherData) return;

      const weather = weatherData.current_weather;
      document.getElementById('weatherResult').innerHTML = `
        <h3>Hawa-rayı (${city})</h3>
        <p>🌡️ Temperatura: ${weather.temperature}°C</p>
        <p>💨 Samal: ${weather.windspeed} km/saat</p>
        <p>🕒 Waqıt: ${weather.time}</p>
      `;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('weatherResult').innerHTML = "Qa'telik ju'z berdi :(";
    });
}
