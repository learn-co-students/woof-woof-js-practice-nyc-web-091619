const URL = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", (event)=>{

    fetch(URL)
        .then(resp=>resp.json())
        .then(dogs=>showDogs(dogs))

    let dogBar = document.getElementById("dog-bar")
    let dogInfo = document.getElementById("dog-info")
    // let dogInfo = document.getElementById("dog-info")
    // let goodDog = document.getElementById("good-dog")
     
    function showDogs(dogs){
        dogs.forEach(dog => {
            dogBar.insertAdjacentHTML('beforeend',
             `<span id=${dog.id}> ${dog.name}</span>`)
        });
    }
    
    dogBar.addEventListener('click', function(event){
        const dog = event.target.closest("span")
        console.log(dog) 

        fetch( `http://localhost:3000/pups/${dog.id}`)
            .then(resp=>resp.json())
            .then(dog=>dogDetails(dog))
        })
    
        
        function dogDetails(dog){
            // let dogInfo = document.getElementById("dog-info")
            dogInfo.innerHTML = `<div>
                <img src=${dog.image}>
                <h2>${dog.name}</h2>
                <button onclick="${() => onClick(dog)}">${dog.isGoodDog ? "Good dog" : "Bad dog"}</button>
                </div>`
        }

        function isGoodDogCheck(dog){
            dog.isGoodDog? true : false 
        }

    
           function onClick(dog){
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                        method: "PATCH", 
                        headers: {
                        "Content-type": "application/json",
                        "Accept": 'application/json'
                },
               body: JSON.stringify({
                    isGoodDog: isGoodDogCheck(dog)
               })
            })
     
       }}
)    
        
        
// // end of DOM

