const request = require("request");

const geocode = (api, address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=${api}&query=${encodeURIComponent(
    address
  )}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the geocoder service!", undefined);
    } else if (body.error || body.data.length === 0) {
      callback("Unable to find coordinates, Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
        // data: response.body.data,
      });
    }
  });
};

module.exports = geocode;
