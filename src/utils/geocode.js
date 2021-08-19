const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiMHhuYWltIiwiYSI6ImNrc2VybXNtbjEzNnYydnAzNTh4N2djNnAifQ.kzCwnac8n1i-ZdrjkouKEg&limit=1`;

  request({ url, json: true }, (error, data) => {
    if (error) {
      callback('Error: Unable to connect weather services!', null);
    } else if (data.body.features.length === 0) {
      callback('Error: Unable to find location!', null);
    } else {
      callback(null, {
        latitude: data.body.features[0].center[1],
        longitude: data.body.features[0].center[0],
        address: data.body.features[0].text,
        location: data.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
