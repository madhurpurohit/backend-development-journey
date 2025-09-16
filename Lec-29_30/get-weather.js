const weatherData = async (data) => {
  try {
    const weatherInfo = [];

    if (data.length > 0) {
      for (let { city, date } of data) {
        if (date.toLowerCase() === "today") {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=yes`
          );
          const rawData = await response.json();
          weatherInfo.push(rawData);
        } else {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&dt=${date}`
          );
          const rawData = await response.json();
          weatherInfo.push(rawData);
        }
      }
    }

    return weatherInfo;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = weatherData;
