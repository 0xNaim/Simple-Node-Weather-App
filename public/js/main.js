const weatherLocation = document.querySelector('form');
let search = document.querySelector('input');
let txt1 = document.getElementById('txt-1');
let txt2 = document.getElementById('txt-2');

weatherLocation.addEventListener('submit', (e) => {
  e.preventDefault();

  txt1.innerText = 'Loading...';
  txt2.innerText = '';

  const location = search.value;

  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        txt1.innerText = data.error;
      } else {
        txt1.innerText = data.location;
        txt2.innerText = data.forecast;
      }
    });

  // fetch(`/weather?address=${location}`).then((response) => {
  //   response.json().then((data) => {
  //     if (data.error) {
  //       txt1.textContent = data.error;
  //     } else {
  //       txt1.textContent = data.location;
  //       txt2.textContent = data.forecast;
  //     }
  //   });
  // });
});
