// Internal modules
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// External modules
const express = require('express');
const hbs = require('hbs');

// Creating the new server
const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory for serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Naim',
    heading: 'Simple Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Naim',
    heading: 'About me',
    details: "Hey! I'm Naim Islam",
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Naim',
    heading: 'This is help page',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide an address' });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data.address, (error2, forecastData) => {
      if (error2) {
        return res.send({ error2 });
      } else {
        res.send({
          forecast: forecastData,
          location: data.location,
          address: req.query.address,
        });
      }
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    name: 'Naim',
    heading: 'This is help article page',
    errorMessage: 'Opps... Help article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    name: 'Naim',
    heading: 'This is not found page',
    errorMessage: 'Opps... Page not found!',
  });
});

app.listen(port, () => {
  console.log(`listing to http://localhost:${port}`);
});
