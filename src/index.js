// API endpoints
const BASE_URL = 'http://localhost:3000';
const PUP_URL = `${BASE_URL}/pups`;

// Object storage
let dogs = [];

// containers
const dogContainer = document.getElementById('dog-bar');
const dogInfoContainer = document.getElementById('dog-info');
const dogFilterButton = document.getElementById('good-dog-filter');

// append functions
const appendDog = pupObj => {
  let span = document.createElement('span');
  span.innerText = pupObj.name;
  dogContainer.appendChild(span);
};

const showDog = pupObj => {
  dogInfoContainer.innerHTML = '';
  let imgTag = document.createElement('img');
  let dogName = document.createElement('h2');
  let button = document.createElement('button');

  imgTag.src = pupObj.image;
  dogName.innerText = pupObj.name;
  button.dataset.action = 'toggle-good';
  button.dataset.dogId = pupObj.id;
  if (pupObj.isGoodDog) {
    button.innerText = 'Bad Dog!';
  } else {
    button.innerText = 'Good Dog!';
  }

  dogInfoContainer.appendChild(imgTag);
  dogInfoContainer.appendChild(dogName);
  dogInfoContainer.appendChild(button);
};

fetch(PUP_URL)
  .then(resp => resp.json())
  .then(pupObjs =>
    pupObjs.forEach(pup => {
      dogs.push(pup);
      appendDog(pup);
    }),
  );

// event handlers

const dogSummaryHandler = event => {
  const dogName = event.target.innerText;
  const theDog = dogs.find(dog => dog.name === dogName);
  showDog(theDog);
};

const goodHandler = pupObj => {
  fetch(`${PUP_URL}/${pupObj.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ isGoodDog: !pupObj.isGoodDog }),
  })
    .then(resp => resp.json())
    .then(resp => showDog(resp));
};

const filterHandler = () => {
  dogContainer.innerHTML = '';
  console.log(dogs);
  dogs.filter(dog => dog.isGoodDog).forEach(dog => appendDog(dog));
  console.log(dogs.filter(dog => dog.isGoodDog));
};

// event listeners

dogContainer.addEventListener('click', event => {
  if (event.target.tagName === 'SPAN') dogSummaryHandler(event);
});
dogInfoContainer.addEventListener('click', event => {
  if (event.target.dataset.action === 'toggle-good') {
    let pupObj = dogs.find(dog => `${dog.id}` === event.target.dataset.dogId);
    goodHandler(pupObj);
    console.log(pupObj);
    console.log(pupObj.isGoodDog);
    pupObj.isGoodDog = !pupObj.isGoodDog;
    console.log(pupObj.isGoodDog);
  }
});

dogFilterButton.addEventListener('click', event => {
  if (event.target.dataset.id !== 'on') {
    filterHandler();
    event.target.dataset.id = 'on';
    event.target.innerText = 'Filter good dogs: ON';
  } else {
    dogContainer.innerHTML = '';
    dogs.forEach(dog => appendDog(dog));
    event.target.dataset.id = '';
    event.target.innerText = 'Filter good dogs: OFF';
  }
});
