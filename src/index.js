const URL = "http://localhost:3000/pups"


document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar")
    const infoDiv = document.getElementById("dog-info")
    const filterButton = document.getElementById("good-dog-filter")


    function fetchDoggos(id = ""){
        fetch(`${URL}/${id}`)
        .then(resp => resp.json())
        .then(json => {
            if(id === ""){
                json.forEach(addDoggo)
            }else {
                infoDiv.innerText = ""
                showDoggo(json)
            }
        })
    }
    function addDoggo(doggo){
        const span = document.createElement("span")
        span.innerText = `${doggo.name}`
        span.dataset.id = `${doggo.id}`

        dogBar.appendChild(span)
    }

    function showDoggo(doggo){
        const img = document.createElement("img")
        img.src = `${doggo.image}`
        const h2 = document.createElement("h2")
        h2.innerText = `${doggo.name}`
        const button = document.createElement("button")
        button.dataset.id = `${doggo.id}`
        if(doggo.isGoodDog === true){
            button.innerText = "Good Dog!"
        }else{
            button.innerText = "Bad Dog!"
        }
        infoDiv.appendChild(img)
        infoDiv.appendChild(h2)
        infoDiv.appendChild(button)
    }

    dogBar.addEventListener("click", handleBarClick)

    function handleBarClick(e){
        e.stopPropagation()
        if(e.target.dataset.id){
            fetchDoggos(e.target.dataset.id)
        }
    }

    infoDiv.addEventListener("click", handleStatusChange)

    function handleStatusChange(e){
        e.stopPropagation()
        if(e.target.dataset.id){
            const id = e.target.dataset.id
            let newState = false
            if(e.target.innerText === "Good Dog!"){
                newState = false
                e.target.innerText = "Bad Dog!"
            }else{
                newState = true
                e.target.innerText = "Good Dog!"
            }
            changeStatus(id, newState)
        }
    }

    function changeStatus(id, newStatus){
        fetch(`${URL}/${id}`,{
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: newStatus
            })
        })
    }

    filterButton.addEventListener("click", filterHandler)

    function filterHandler(e){
        fetch(URL)
        .then(resp => resp.json())
        .then(json => {filterDoggos(e, json)})
    }

    function filterDoggos(e, doggos){
        let dogSwitch =  e.target.innerText.split(": ")[1]
        if(dogSwitch === "OFF"){
            e.target.innerText = "Filter good dogs: ON"
            let newDoggos = doggos.filter(dog => dog.isGoodDog === true)
            infoDiv.innerText = ""
            dogBar.innerText = ""
            newDoggos.forEach(addDoggo)
        }else{
            e.target.innerText = "Filter good dogs: OFF"
            infoDiv.innerText = ""
            dogBar.innerText = ""
            fetchDoggos()
        }
    }

    fetchDoggos()
})

