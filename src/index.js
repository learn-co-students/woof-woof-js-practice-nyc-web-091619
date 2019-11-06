document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const dogContainer = document.querySelector('div#dog-summary-container');
    const goodDogButton = document.querySelector('button#good-dog-filter');

    let data; // all dog data

    // fetch dogs
    getDogs();
    async function getDogs(){
        const response = await fetch('http://localhost:3000/pups');
        data = await response.json();
        appendAllDogs(data);
    }

    // append dogs to dog bar
    function appendDog(dog){
        let span = document.createElement('span');
        span.innerText = dog['name'];
        span.dataset.id = dog['id'];
        dogBar.appendChild(span);
    }

    function appendAllDogs(data, filter = false){
        dogBar.innerHTML = ''; // clears out all existing dogs

        if (filter) {
            let goodDogs = data.filter(dog => dog['isGoodDog'] == true);
            goodDogs.forEach(dog => appendDog(dog)); // only append good dogs
        } else {
            data.forEach(dog => appendDog(dog)); // appends all dogs
        }
    }

    function showDog(e){
        dogInfo.innerHTML = ''; // empty div

        let dog = data.filter(dog => dog['id'] == e.target.dataset.id)[0]; // filters the fetched data for a dog with a matching ID

        let img = document.createElement('img');
        img.src = dog['image'];

        let h2 = document.createElement('h2');
        h2.innerText = dog['name'];

        let button = document.createElement('button');

        if (dog['isGoodDog']) {
            button.innerText = 'Good Dog!';
        } else {
            button.innerText = 'Bad Dog!';
        }
                   
        dogInfo.appendChild(img);
        dogInfo.appendChild(h2);
        dogInfo.appendChild(button);
        dogInfo.dataset.id = dog['id'];

        dogContainer.appendChild(dogInfo);
    }

    async function changeDogStatus(id, message) {
        const response = fetch(`http://localhost:3000/pups/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', accepts: 'application/json'},
            body: JSON.stringify(message)
        })
    }

    function changeDogButton(e, good_dog) {
        let dogId = e.target.parentNode.dataset.id

        if (good_dog == true) {
            e.target.innerText = 'Good Dog!'; 

            changeDogStatus(dogId, {"isGoodDog": false});
        } else {
            e.target.innerText = 'Bad Dog!';
            changeDogStatus(dogId, {"isGoodDog": true});
        }
    }

    // Event Delegation
    document.addEventListener('click', function(e){
        e.stopPropagation;

        if (e.target.nodeName === 'SPAN') {     // clicks on dog name
            showDog(e);
        } else if (e.target.innerText === 'Filter good dogs: OFF') {      // turning on the good dog filter
            e.target.innerText = 'Filter good dogs: ON'
            appendAllDogs(data, true);
        } else if (e.target.innerText === 'Filter good dogs: ON') {     // turning off the good dog filter
            e.target.innerText = 'Filter good dogs: OFF';
            appendAllDogs(data);
        } else if (e.target.innerText === 'Good Dog!') {      // click good dog button
            changeDogButton(e, false);
        } else if (e.target.innerText === 'Bad Dog!') {     // click bad dog button
            changeDogButton(e, true);
        }
    })

});