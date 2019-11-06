document.addEventListener("DOMContentLoaded", function(){

    let fetchURL = "http://localhost:3000/pups"
    let dogBar = document.getElementById("dog-bar")
    let dogInfo = document.getElementById("dog-info")
    let dogFilter = document.getElementById("good-dog-filter")

    fetch(fetchURL)
    .then(resp => resp.json())
    .then(function(data){
        data.forEach(appendDogs)
    })

    function appendDogs(object){
        //span element
        let span = document.createElement("span")
        span.innerText = object.name
        span.dataset.id = object.id
        dogBar.appendChild(span)

        //dog info div card
        let dogCard = document.createElement("div")
        dogCard.dataset.id = object.id
        dogCard.className = "dog-card"

        //dog name h3 under div
        let dogCardName = document.createElement("h3")
        dogCardName.innerText = object.name

        //dog image
        let dogCardImage = document.createElement("img")
        dogCardImage.src = object.image

        //good or bad button
        let button = document.createElement("button")
        button.dataset.id = "good-bad"
        if (object.isGoodDog){
            button.innerText = "Good dog!"
        } else{
            button.innerText = "Bad dog!"
        }
        
        //appending
        dogCard.appendChild(dogCardName)
        dogCard.appendChild(dogCardImage)
        dogCard.appendChild(button)
        dogCard.style.display = "none"
        dogInfo.appendChild(dogCard)
    }

    dogBar.addEventListener("click", function(event){
        if (event.target.tagName === "SPAN"){
            let dogArray = Array.from(dogInfo.children)
            dogArray.forEach(function(element){element.style.display = "none"})
            let div = document.querySelector(`div[data-id="${event.target.dataset.id}"]`)
            div.style.display = "block"
        }
    })

    dogInfo.addEventListener("click", function(event){
        if (event.target.dataset.id === "good-bad"){
            let id = event.target.parentNode.dataset.id
            let goodDog = true
            if (event.target.innerText === "Good dog!"){
                event.target.innerText = "Bad dog!"
                goodDog = false
            } else {
                event.target.innerText = "Good dog!"
            }
            fetch(`http://localhost:3000/pups/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    accepts: "application/json"
                },
                body: JSON.stringify({isGoodDog: goodDog})
            })//end of fetch/PATCH
        }
    })//end of digInfo event listener

    dogFilter.addEventListener("click", function(event){
        let spans = Array.from(dogBar.children)
        if (event.target.innerText === "Filter good dogs: OFF"){
            event.target.innerText = "Filter good dogs: ON"
            let badDogArray = []
            fetch(fetchURL)
            .then(resp => resp.json())
            .then(function(data){
                data.forEach(function(element){
                    if (element.isGoodDog === false){
                        badDogArray.push(element.id)
                    }//end of if bad dog

                    spans.forEach(function(span){
                        badDogArray.forEach(function(dogId){
                            if (span.dataset.id == dogId){
                                span.style.display = "none"
                            }
                        })
                    })
                })
            })
        } else {
            event.target.innerText = "Filter good dogs: OFF"
            spans.forEach(function(span){
                span.style.display = "inherit"
            })
        }
    }) //end of dog filter listener
    
})//end of DOM Load