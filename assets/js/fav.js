//intialized variables
var dogsArray = [];
var dog1 = document.getElementById("dog1");
var dog2 = document.getElementById("dog2");
var dog3 = document.getElementById("dog3");
var dog4 = document.getElementById("dog4");
var dog5 = document.getElementById("dog5");



//This function allows the dogs to be displayed onto the favorites
//list on the favorites page by grabbing from local storage and setting 
//the textContent to the page
const favoriteList = (event) => {
    var saveFav = localStorage.getItem("dogs")
    console.log(saveFav);
    dogsArray = JSON.parse(saveFav || "[]");
    
    if (saveFav) {
        dogsArray = JSON.parse(saveFav);
    } else {
        dogsArray = []
    }

    dog1.textContent = dogsArray[0];
    dog2.textContent = dogsArray[1];
    dog3.textContent = dogsArray[2];
    dog4.textContent = dogsArray[3];
    dog5.textContent = dogsArray[4];

}
//function call
favoriteList()
