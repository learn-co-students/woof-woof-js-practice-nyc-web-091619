const pupsUrl = 'http://localhost:3000/pups';
let pups = [];

document.addEventListener("DOMContentLoaded", function() {

    fetchPups();

    document.addEventListener('click', (event) => {
        if (event.target.dataset.action === 'show') {
            let targetPup = pups.find(pup => pup.id == event.target.dataset.id);
            appendPup(targetPup);
        } else if (event.target.dataset.action === 'switch-dog') {
            let targetPup = pups.find(pup => pup.id == event.target.dataset.id);
            targetPup.isGoodDog = !targetPup.isGoodDog;
            if (event.target.innerText === 'Bad Dog!') {
                event.target.innerText = 'Good Dog!';
            } else {
                event.target.innerText = 'Bad Dog!';
            }
            let dogUpdate = targetPup;
            updateDog(event.target.dataset.id, dogUpdate);
        } else if (event.target.id === 'good-dog-filter') {
            if (event.target.innerText === 'Filter good dogs: OFF') {
                let filteredPups = pups.filter(pup => pup.isGoodDog);
                readPups(filteredPups);
                event.target.innerText = 'Filter good dogs: ON';
            } else {
                readPups(pups);
                event.target.innerText = 'Filter good dogs: OFF';
            }
        }
    })
})


const fetchPups = () => {
    fetch(pupsUrl).then(resp => resp.json()).then(json => {
        pups = [...json];
        readPups(pups);
    })
}

const readPups = (arr) => {
    const dogBar = document.getElementById('dog-bar');
    dogBar.innerHTML = '';
    arr.forEach(pup => addPupToBar(pup));
}

const addPupToBar = (pup) => {
    
    const dogBar = document.getElementById('dog-bar');

    let pupSpan = document.createElement('span');
    pupSpan.innerText = `${pup.name}`;
    pupSpan.dataset.id = `${pup.id}`;
    pupSpan.dataset.action = `show`;

    dogBar.appendChild(pupSpan);
}

const appendPup = (pup) => {

    const dogInfoDiv = document.querySelector('#dog-info');

    dogInfoDiv.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>`;
    if (pup.isGoodDog) {
        console.log(pup.isGoodDog);
        dogInfoDiv.innerHTML += `<button id='good-dog-button' data-id='${pup.id}' data-action='switch-dog'>Good Dog!</button>`;
    } else {
        dogInfoDiv.innerHTML += `<button id='good-dog-button' data-id='${pup.id}' data-action='switch-dog'>Bad Dog!</button>`;
    }

}

const updateDog = (id, updatedDog) => {
    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(updatedDog)
    }).then(resp => resp.json());
}