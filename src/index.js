document.addEventListener('DOMContentLoaded', () => {
    const doggoUrl = "http://localhost:3000/pups"

    const fetchCall = function (){
        fetch(doggoUrl)
        .then(function(response){return response.json()})
        .then(function(data){data.forEach(appendDog)})
    }
    fetchCall();

    function appendDog(dog){
        const dogBar = document.getElementById("dog-bar")
        const dogInfo = document.getElementById("dog-info")
        const dogSpan = document.createElement("span")

        dogSpan.innerText = dog.name
        dogBar.appendChild(dogSpan)

        dogSpan.addEventListener("click", function(){
            hideDoggo()
            showDoggo()

        })

        function showDoggo(){
            const dogContainer = document.getElementById("dog-summary-container")
            const dogName = document.createElement("h2")
            const dogImg = document.createElement("img")
            const isGoodDogButton = document.createElement("button")
            dogName.innerText = dog.name
            dogImg.src = dog.image
            const goodOrBad = dog.isGoodDog ? "Good Dog!" : "Bad Dog!" //ternary operator
            isGoodDogButton.innerText = goodOrBad

            dogInfo.appendChild(dogName)
            dogInfo.appendChild(dogImg)
            dogInfo.appendChild(isGoodDogButton)
            dogContainer.appendChild(dogInfo)

            isGoodDogButton.addEventListener("click", function(event) {
                let gB = false
                if (event.target.innerText === "Good Dog!"){
                    event.target.innerText = "Bad Dog!"
                } else { 
                    event.target.innerText = "Good Dog!"
                    gB = true
                }
                
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ isGoodDog: gB }) 
                })
            }) 
        }

        function hideDoggo(){ //setting it to be blank
            dogInfo.innerHTML = ""
        }


        
        
    }//end of append dogs JANKY!!!!!
    
    const goodDogFilter = document.getElementById("good-dog-filter")
    goodDogFilter.addEventListener("click", function(event){
        if (event.target.innerText === "Filter good dogs: OFF"){
            event.target.innerText = "Filter good dogs: ON"
        }else{
            event.target.innerText = "Filter good dogs: OFF"
        }
    })

})// end of domcontentloaded