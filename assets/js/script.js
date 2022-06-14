//initial created variables 
var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
var modelFavBtn = document.getElementById("savedFavorites");
var errorSpan = document.getElementById("error");
var dogsArray = [];

//This function updates the current date to 
//display at the top of each page
function updateCurrentDate() {
    currentDate.text(moment().format("dddd, MMMM Do YYYY"));
}
//This function requests an api from the 1st API.
//you see this function deployed when the breed search is active
//this API uses a fetch request
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
//This function requests a token for the second API
//Once again it uses a fetch request
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

//This function is a helper function to getKey()
//This function uses a fetch request as well as a Bearer token to 
//send a request to the API in order to get the available dogs up for adoption
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
//function call to update current day
updateCurrentDate();

//This function's purpose is to get the pet breed that 
//the user has clicked on. It also calls on the getKey() function
function getBreed(event) {
    var clickedBreed = event.target;
    var breedName = clickedBreed.textContent;
    breed = breedName;
    getKey();
}

//This function's purpose is to display the available dog's info for adoption 
//it randomizes the dogs so that the user always gets a different dog when clicked again
//this function also has some error handling 
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

//This function alows the user to save their favorite dogs
//into local storage by using .JSON parse and stringify
const favorites = (event) => {
    var dogs = localStorage.getItem("dogs");
    dogsArray = JSON.parse(dogs || "[]");
    dogsArray.push(event.target.getAttribute("animal"));
    localStorage.setItem("dogs", JSON.stringify(dogsArray));
}

modelFavBtn.addEventListener("click", favorites);

//----notes----
//JSON.stringify turns anything in js into a string
//JSON.parse turns any string into js

//bootstrap modal
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

fetchButton.addEventListener('click', getApi);

