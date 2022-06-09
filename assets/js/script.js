$(document).ready(function() {
    var currentDate = $("#currentDate");

    //This function updates the current date to 
    //display at the top of the page
    function updateCurrentDate() {
        currentDate.text(moment().format("dddd, MMMM Do YYYY"));
    }
    
    //function calls
    updateCurrentDate();

});