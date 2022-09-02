const request = require("request");

forecast = (api, lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${api}&query=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { weather_descriptions, feelslike, temperature, precip } =
        body.current;
      callback(
        undefined,
        `${weather_descriptions}. It is currently ${temperature} degrees out, but it feels like ${feelslike} degrees. There is ${
          parseFloat(precip) * 100
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
