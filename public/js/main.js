console.log('Client side javascript file loaded!');
console.log('Current year:', new Date().getFullYear());

const weatherLocation = document.querySelector('form');
let search = document.querySelector('input');
let txt1 = document.getElementById('txt-1');
let txt2 = document.getElementById('txt-2');
let txt3 = document.getElementById('txt-3');

weatherLocation.addEventListener('submit', (e) => {
  e.preventDefault();

  txt1.innerText = 'Loading...';
  txt2.innerText = '';

  if (search.value.length === 0) {
    alert('Please provide a valid location');
    return;
  } else {
    fetch(`/weather?address=${search.value}`)
      .then((res) => res.json())
      .then((data) => {
        txt1.innerText = `Address: ${data.location}`;
        txt2.innerText = `Forecast: ${data.forecast}`;
        search.value = '';
      })
      .catch((err) => {
        txt1.innerText = err.message;
      });
  }
});
