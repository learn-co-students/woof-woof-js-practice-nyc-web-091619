window.addEventListener('DOMContentLoaded', (event) => {
    
  const dogBar = document.querySelector('#dog-bar');
  const dogInfo = document.querySelector('#dog-info');
  const dogFilter = document.querySelector('#good-dog-filter');
  const dogArray = [];

  dogFilter.addEventListener('click', ()=>{
      // console.log(dogArray);
      if (dogFilter.innerText === "Filter good dogs: OFF") {
          const filtered = dogArray.filter((dog) => dog.isGoodDog === true)
          addPups(filtered);
          dogFilter.innerText = "Filter good dogs: ON";
      } else {
          addPups(dogArray);
          dogFilter.innerText = "Filter good dogs: OFF";
      }
  })

  function addPups(dogs){
      dogBar.innerHTML = "";
      dogs.forEach(dog => {
          dogBar.insertAdjacentHTML("beforeend",
          `
          <span id="pupShow" data-id = ${dog.id}>${dog.name}</span>
          `)
      });
  }

  fetch('http://localhost:3000/pups')
      .then(function (response) {
          return response.json();
      }).then(function (data) {
          // console9.log(json);
          addPups(data);
          dogArray.push(...data)
      }); //End of fetch Data from DB

  displayPupInfo = (pup) => {
      dogInfo.innerHTML = ""
      dogInfo.insertAdjacentHTML('beforeend',
      `<img src = ${pup.image} >
      <h2>${pup.name}</h2> 
      <button id="dogButton" data-id = ${pup.id}> ${pup.isGoodDog ? "Good Dog!":"Bad Dog!"} </button>
      `)
  }

  fetchPup = (id) => {
      fetch(`http://localhost:3000/pups/${id}`)
          .then(function (response) {
              return response.json();
          }).then(function (data) {
              // console.log(json);
              displayPupInfo(data);
          }); //End of fetch Data from DB
  }

  dogBar.addEventListener('click',(event)=>{
      // console.log(event.target.dataset.id);
      if(event.target.id === "pupShow"){
          fetchPup(event.target.dataset.id);
      }
  })

  isGoodDog = (status) => {
      if(status === "Good Dog!")
          return false;
      else 
          return true;
  }

  dogInfo.addEventListener('click', (event)=>{
      event.preventDefault();
      // console.log(event.target.dataset.id);
      if (event.target.id === "dogButton") {
          console.log(isGoodDog(event.target.innerText));
          fetch(`http://localhost:3000/pups/${event.target.dataset.id}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json",
                  "Accepts": "application/json"
              },
              body: JSON.stringify({
                  isGoodDog: isGoodDog(event.target.innerText)
              })
          })//end of fetch

          fetchPup(event.target.dataset.id);
          
          // if(isGoodDog(event.target.innerText))
          //     event.target.innerText = "Bad Dog!";
          // else
          //     event.target.innerText = "Good Dog!";
      }

  })// end of dogInfo listener
});

