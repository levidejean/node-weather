const request = require("request");

const forecast = function(latitude, longitude, callback) {
  const url = `https://api.darksky.net/forecast/9af2ff4fb57387ac4c4d442048a42ae6/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary}It is currently ${
          body.currently.temperature
        } degrees out. The high today is ${body.daily.data[0].temperatureHigh}. With a low of${body.daily.data[0].temperatureLow} There is a ${
          body.currently.precipProbability
        }% chance of rain.
        ${body.daily.data[0].icon}`
      );
    }
  });
};

module.exports = forecast;
