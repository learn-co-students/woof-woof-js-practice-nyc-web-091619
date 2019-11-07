document.addEventListener('DOMContentLoaded', () => {
 
    const beerUrl = "http://localhost:3000/beers"
    const beerDivCard = document.getElementById("beer-detail")
     
    const fetchCall = function(){
        fetch(beerUrl)
        .then (resp => resp.json())
        .then (json => json.forEach(appendBeer))
    } //end of fetchCall
     
    fetchCall()
     
    function appendBeer(beer){
        const parentUl = document.getElementById("list-group")
        const beerListItem = document.createElement("li")
     
        beerListItem.innerText = beer.name
        parentUl.appendChild(beerListItem)
        beerListItem.className = "list-group-item"
     
        beerListItem.addEventListener("click", function(){
            hideBeerInfo()
            showBeerInfo(beer)
        })
     
        function showBeerInfo(beer){
            const beerName = document.createElement("h1")
            const beerImg = document.createElement("img")
            const beerTagline = document.createElement("h3")
            const beerDescription = document.createElement("textarea")
            const beerButton = document.createElement("button")
            
            beerName.innerText = beer.name
            beerImg.src = beer.image_url
            beerTagline.innerText = beer.tagline
            beerDescription.value = beer.description
            beerButton.className = "btn btn-info"
            beerButton.id = "edit-beer"
            beerButton.innerText = "Save"
            
            beerDivCard.appendChild(beerName)
            beerDivCard.appendChild(beerImg)
            beerDivCard.appendChild(beerTagline)
            beerDivCard.appendChild(beerDescription)
            beerDivCard.appendChild(beerButton)
     
     
                beerButton.addEventListener("click", function (){
                    fetch(`http://localhost:3000/beers/${beer.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({ description: beerDescription.value })
                    })
                })//end of beerbutton eventlistener
     
        }// end of showbeerinfo
     
        function hideBeerInfo(){
            beerDivCard.innerHTML = ""
        }//end of hidebeerinfo
     
     
     
     
    }//end of appendBeer
     
    }); //end of DOMContentLoaded
    
    