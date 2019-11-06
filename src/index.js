const URL = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", ()=>{

    let dogBar = document.getElementById("dog-bar")
    let filterButton = document.getElementById("good-dog-filter")
    let dogInfo = document.getElementById("dog-info")
    
    let dogs = []
    // =============== FUNCTIONS ===============
    
    function goodButtonClickHandler(e){
        let matchID = e.target.dataset.id
        let index = dogs.findIndex(dog => dog.id === parseInt(matchID))
        let doggo = dogs[index] 
        
        let newText = doggo.isGoodDog? "Bad Dog!" : "Good Dog!"

        let obj = {
            isGoodDog : !doggo.isGoodDog
        }

        //make fetch
        fetch(`${URL}/${matchID}`, {
            method: "PATCH",
            headers:{
                "content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
            .then(data => {

                //update DOM button text
                e.target.innerText = newText

                //update dogs array
                dogs[index].isGoodDog = !(dogs[index].isGoodDog)
                
            })

        
       
    
    }

    function clickDoggoHandler(e){
        dogInfo.innerHTML = ""

        let matchID = e.target.dataset.id
        let doggo = dogs.find(dog => dog.id === parseInt(matchID))
        
        let name = document.createElement("h2")
        name.innerText = doggo.name

        let img = document.createElement("img")
        img.src = doggo.image

        let goodButton = document.createElement("button")
        goodButton.innerText = doggo.isGoodDog? "Good Dog!" : "Bad Dog!"
        goodButton.dataset.id = doggo.id
        goodButton.addEventListener("click", goodButtonClickHandler)

        dogInfo.appendChild(name)
        dogInfo.appendChild(img)
        dogInfo.appendChild(goodButton)

    }
    
    function appendDoggo(dog){
       let span = document.createElement("span")
       span.innerText = dog.name
       span.dataset.good = dog.isGoodDog
       span.dataset.id = dog.id
    
       span.addEventListener("click", clickDoggoHandler)
       dogBar.appendChild(span)
    }

    
    function fetchDogs(){
        fetch(URL)
            .then(resp => resp.json())
            .then(data => {
                data.forEach(appendDoggo)
                dogs = data
               
            })

    }

    function filterClickHandler(e){

        //clear the dog bar
        dogBar.innerHTML = ""


        if(e.target.innerText === "Filter good dogs: OFF"){
            //change the text to on
            e.target.innerText = "Filter good dogs: ON"
            
            //turn the filter on
            // only append good dogs
            dogs.forEach(dog =>{
                if(dog.isGoodDog){
                    appendDoggo(dog)
                }
            })
            
        }else{
            //change button text
            e.target.innerText = "Filter good dogs: OFF"

            //display all dogs
            dogs.forEach(appendDoggo)
        }
    }


    // =============== END FUNCTIONS ===============


    // =============== EXECUTION ===============
    fetchDogs()

    filterButton.addEventListener("click", filterClickHandler)

    // =============== END EXECUTION ===============

}) // End DOM loaded listener