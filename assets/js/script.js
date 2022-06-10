$(document).ready(function() {
    var currentDate = $("#currentDate");
    var breed = "";

    //This function updates the current date to 
    //display at the top of the page
    function updateCurrentDate() {
        currentDate.text(moment().format("dddd, MMMM Do YYYY"));
    }
    
 
    // form.js
    var tableBody = document.getElementById('repo-table');
    var fetchButton = document.getElementById('fetch-button');
    
function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://api.thedogapi.com/v1/breeds?limit=20&page=0';

  fetch(requestUrl, {
    headers: {authentication: "x-api-key ea90132b-c88d-4529-afad-51de89d38cb9"}
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
        body:JSON.stringify({
          "grant_type":"client_credentials","client_id":"qIVT27e1bB7qYrnovBGDoJdA5D2LFOfd2qpQEFc0Kq15i40qFt","client_secret":"mcP2VgYf89I6msMlkmkjdEadDwJAWbwjpvfjH4OC"
      })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        token = data.access_token
        getPetBreeds(token)
      })
    }


function getPetBreeds(token) {
  console.log(token)
  var requestUrl = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/animals?breed=${breed}` ;
  fetch(requestUrl, {
    headers: {"Authorization": `Bearer ${token}`}
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
      // for (var i = 0; i < data.length; i++) {
      //   // Creating elements, tablerow, tabledata, and anchor
      //   var createTableRow = document.createElement('tr');
      //   var tableData = document.createElement('td');
      //   var link = document.createElement('a');
      //   // tableBody.addEventListener("click", randomFunc());

      //   // Setting the text of link and the href of the link
      //   link.textContent = data[i].name;

      //   // Appending the link to the tabledata and then appending the tabledata to the tablerow
      //   // The tablerow then gets appended to the tablebody
      //   tableData.appendChild(link);
      //   createTableRow.appendChild(tableData);
      //   tableBody.appendChild(createTableRow);
      // }
});
}
   //function calls
    updateCurrentDate();
    fetchButton.addEventListener('click', getApi);
    tableBody.addEventListener("click", getBreed);








fetchButton.addEventListener('click', getKey);
});