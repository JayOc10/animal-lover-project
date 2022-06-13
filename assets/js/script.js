var currentDate = $("#currentDate");
var breed = "";

//This function updates the current date to 
//display at the top of the page
function updateCurrentDate() {
    currentDate.text(moment().format("dddd, MMMM Do YYYY"));
}


var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
var modelFavBtn = document.getElementById("savedFavorites");
var errorSpan = document.getElementById("error");
var dogsArray = [];
var dog1 = document.getElementById("dog1");
var dog2 = document.getElementById("dog2");
var dog3 = document.getElementById("dog3");
var dog4 = document.getElementById("dog4");
var dog5 = document.getElementById("dog5");


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.thedogapi.com/v1/breeds?limit=20&page=0';

    fetch(requestUrl, {
        headers: { authentication: "x-api-key ea90132b-c88d-4529-afad-51de89d38cb9" }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            //Loop over the data to generate a table, each table row will have a link to the repo url
            for (var i = 0; i < data.length; i++) {
                // Creating elements, tablerow, tabledata, and anchor
                var createTableRow = document.createElement('tr');
                var tableData = document.createElement('td');
                tableData.className = "breed-name";


                // Setting the text of link and the href of the link
                tableData.textContent = data[i].name;

                // Appending the link to the tabledata and then appending the tabledata to the tablerow
                // The tablerow then gets appended to the tablebody
                // tableData.appendChild(link);
                tableData.addEventListener("click", getBreed);
                createTableRow.appendChild(tableData);
                tableBody.appendChild(createTableRow);
            }

        });
}

function getKey() {
    // fetch request gets a list of all the repos for the node.js organization

    var token = ''

    fetch('https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "grant_type": "client_credentials", "client_id": "qIVT27e1bB7qYrnovBGDoJdA5D2LFOfd2qpQEFc0Kq15i40qFt", "client_secret": "mcP2VgYf89I6msMlkmkjdEadDwJAWbwjpvfjH4OC"
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data)
            token = data.access_token
            getPetBreeds(token)

        })
}


function getPetBreeds(token) {
    var requestUrl = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?breed=${breed}`;
    console.log(requestUrl);
    fetch(requestUrl, {
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            errorSpan.textContent = "";
            modelFavBtn.removeAttribute("disabled");
            if (data.animals === undefined) {           
                console.log(errorSpan);
                modelFavBtn.setAttribute("disabled", "");
                errorSpan.textContent = "Breed not Found. Select different breed.";
                
            } else {
                displayPetInfo(data);
            }           
        });
}
//function calls
updateCurrentDate();

function getBreed(event) {
    // console.log(event.target);
    var clickedBreed = event.target;
    var breedName = clickedBreed.textContent;
    breed = breedName;
    getKey();

}

function displayPetInfo(petBreeds) {
    var randomAnimal;
    console.log(petBreeds.animals);
    var animal = petBreeds.animals;
    randomAnimal = animal[Math.floor(Math.random() * animal.length)];
    console.log(randomAnimal);
    document.getElementsByClassName("modal-title")[0].textContent = randomAnimal.name;
    document.getElementById("savedFavorites").setAttribute("animal", randomAnimal.name);
    document.getElementById("name").textContent = randomAnimal.name;
    if (randomAnimal.photos.length === 0) {
        console.log("no photo");
        document.getElementById("photo").src = "https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available-.jpg?ver=6";
    } else {
        document.getElementById("photo").src = randomAnimal.photos[0].small;
    }
    document.getElementById("primary").textContent = randomAnimal.breeds.primary;
    if (randomAnimal.breeds.secondary === null) {
        document.getElementById("secondary").textContent = "none";
    } else {
        document.getElementById("secondary").textContent = randomAnimal.breeds.secondary;
    } 
    document.getElementById("status").textContent = randomAnimal.status;
    document.getElementById("age").textContent = randomAnimal.age;
    document.getElementById("size").textContent = randomAnimal.size;
}

const favorites = (event) => {
    var dogs = localStorage.getItem("dogs");
    dogsArray = JSON.parse(dogs || "[]");
    dogsArray.push(event.target.getAttribute("animal"));
    localStorage.setItem("dogs", JSON.stringify(dogsArray));
    console.log(dogsArray);
}

const favoriteList = () => {
    var saveFav = localStorage.getItem("dogs")
    console.log(saveFav);
    dogsArray = JSON.parse(saveFav || "[]");
    console.log(dogsArray);    
    dog1.textContent = dogsArray[0];
    dog2.textContent = dogsArray[1];
    dog3.textContent = dogsArray[2];
    dog4.textContent = dogsArray[3];
    dog5.textContent = dogsArray[4];

}
// window.onload = function() {
//     favoriteList();
//   };


modelFavBtn.addEventListener("click", favorites);

//JSON.stringify turns anything in js into a string
//JSON.parse turns any string into js


//TODO:
//need to display dog info better on modal from 2nd API
//create function to get local storage and display

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

fetchButton.addEventListener('click', getApi);

