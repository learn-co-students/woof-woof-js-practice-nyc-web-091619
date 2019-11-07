const SITE      = "http://localhost:3000/pups"

const HEADERS   = {
    "content-type": "application/json",
    "accept"      : "application/json"
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    const filterButton = document.getElementById("good-dog-filter")
    filterButton.dataset.status = "OFF"

    filterButton.addEventListener("click", function (e) { 
        if (filterButton.dataset.status == "OFF") {
            filterButton.dataset.status = "ON"
        }
        else {
            filterButton.dataset.status = "OFF"
        }
        filterButton.innerHTML = `Filter good dogs: ${filterButton.dataset.status}`
        if (filterButton.dataset.status = "ON") {
        }
    })
});

function dogInfoCard(dogObj) {
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerHTML = ""

    const dogDiv = document.createElement("div");
    const dogImg = document.createElement("img")
    const dogH2 = document.createElement("h2")
    const dogButton = document.createElement("button");

    dogImg.src = dogObj.image
    dogH2.innerHTML = dogObj.name
    dogButton.innerHTML = dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"

    dogDiv.appendChild(dogImg)
    dogDiv.appendChild(dogH2)
    dogDiv.appendChild(dogButton)
    dogInfo.appendChild(dogDiv)

    dogButton.addEventListener("click", function(e) {
        flipDog(dogObj);
    })

    function flipDog(dogObj) {
        patchDog(dogObj, dogObj.id)
        dogObj.isGoodDog = !dogObj.isGoodDog
        dogButton.innerHTML = dogObj.isGoodDog ? "Good Dog!" : "Bad Dog"
    }
}

function appendDog (dogObj) {
    dogBar = document.getElementById("dog-bar")
    dogSpan = document.createElement("span");
    dogSpan.dataset.id = dogObj.id
    dogSpan.innerHTML = dogObj.name
    dogBar.appendChild(dogSpan)
    dogSpan.addEventListener("click", function(e) {
        dogInfoCard(dogObj);
    });
}

//============================================================================
// fetch calls
//============================================================================

function fetchDogs(){
    fetch(SITE)
    .then (resp => resp.json())
    .then (data => data.forEach(appendDog))
}

function patchDog(dogObj, id) {
    let status = !dogObj.isGoodDog;
    fetch(`${SITE}/${id}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({
          isGoodDog: status
        })
    })
}
