// logic 

// initiating variables 
const userInp = document.querySelector('input[name="search"]');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

// results div
const resultsDiv = document.getElementById('results');
// event listeners
searchBtn.addEventListener('click',recommendations);
clearBtn.addEventListener('click',clearInput);

function recommendations(){
    /*
        this functions fetches the data
        based on user input then displays 
        the data after error checking
    */
   const userInput = userInp.value.toLowerCase();
   resultsDiv.innerHTML = ''
   resultsDiv.innerHTML += `<h2 class="destinationHeading">Destinations</h2>`
   
   fetch('./data/travel_recommendation_api.json')
    .then(response => response.json())
    .then((data)=>{
        for(key in data){
            if(key.includes(userInput)){
                if(key === 'countries'){
                    data[key].forEach(city => {
                        city.cities.forEach(destination =>{
                            resultsDiv.innerHTML += createElement(city.id,destination.imageUrl,destination.name,destination.description)
                        })
                    });   
                } else {
                    data[key].forEach(destination =>{
                        resultsDiv.innerHTML += createElement(destination.id,destination.imageUrl,destination.name,destination.description)
                    })
                }
            }
        }
    })
    .catch(error =>{
        console.log(error)
        alert('error in retrieving results try again')
    })
}
function clearInput(){
    /*
        this function clears the user 
        input and results div
    */
   userInp.value = ''
   resultsDiv.innerHTML = ''
}
function createElement(id,src,cityname,p){
    /*
        this function creates the html 
        elements for the data to be inserted
        in 
    */
   return (`<li id='destination${id}'class="recContainer">
                <img class='recPic'src="${src}"alt='${cityname}'>
                <div class='recDescript'>
                    <h3 class='recDescriptHeading'>${cityname}</h3>
                    <p class="recDescripText">${p}</p>
                </div>
            </li>`
        )
}

