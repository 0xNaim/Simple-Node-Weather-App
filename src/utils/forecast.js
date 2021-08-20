const request = require('request');

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=08962204ffb8ea50d55547a2b23365c9&query=${address}&units=f`;

  request({ url, json: true }, (err, data) => {
    if (err) {
      callback('Error: Unable to connect weather services!', null);
    } else if (data.body.error) {
      callback('Error: Unable to find location!', null);
    } else {
      callback(
        null,
        `${data.body.current.weather_descriptions}. It is currently ${data.body.current.temperature}(F) degrees out. There is a ${data.body.current.feelslike}(F) chance of rain. The humidity is ${data.body.current.humidity}%`
      );
    }
  });
};

module.exports = forecast;
