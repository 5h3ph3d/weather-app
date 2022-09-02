const request = require("request");

forecast = (api, lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${api}&query=${lat},${lon}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { request, location, current } = body;
      const {
        weather_descriptions,
        feelslike,
        temperature,
        precip,
        humidity,
        wind_speed,
        uv_index,
      } = current;
      // console.log(body);
      callback(
        undefined,
        `${weather_descriptions}. It is currently ${temperature} degrees out, it feels like ${feelslike} degrees. There is ${
          parseFloat(precip) * 100
        }% chance of rain. The humidity is ${humidity}%. Also the wind speed is ${wind_speed} knots.`
      );
    }
  });
};

module.exports = forecast;
