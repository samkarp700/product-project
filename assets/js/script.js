//variables

var textFormEl = document.querySelector("#input-group");
//var rawgDataObj = //rawg api
//var bestBuyDataObj = //best buy api
var submitButtonEl = document.querySelector("#input-group-button");
var rawgKey = "c43811ca668944d58cb70bb7abcca226";
var rawgObjArr = [];


//Search Function

var getUserData = function(event) {
    event.preventDefault();
    //gathers data entered into textFormEl
    var gameSearch = textFormEl
};

//api data call 

var getApiData = function() {
    //format the api url 
    var gameApi = "https://api.rawg.io/api/games?search=super+mario+64&key=" + rawgKey;

    //make a request to URL
    fetch (gameApi).then(function(response) {
        console.log("check1");
        //request successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for(var i = 0; i < 6; i++) {
                    console.log(data.results[i]);
                    if(data.results[i]) {
                        rawgObjArr[i] = data.results[i];
                    }
                }
                // displayResults(data);
            }); 
        }
        else {
            //possibly pull "similar games or related games from api"
        }
    })
    .catch(function(error) {
        //throw 404 page 
    });
}

//best buy data call 
var getBestBuyData = function() {
    //format api url
    var bestApi = "#";

    //make a request to the url
    fetch (bestApi).then(function(response) {
    //request successful
    if (response.ok) {
    response.json().then(function(data) {
    displayPrice(data);
    });
    }
     else {
                // display list item element saying "not available"
            }
        })
        .catch(function(error) {
            //throw 404 page
        });
    }

    //saves search data to local storage
    var saveSearch = function(userData) {

    }

    var loadHistory = function() {
        //get search history from localStorage
        //display value in container - max 3 previous searches

    }

getApiData();
// submitButtonEl.addEventListener("submit", getUserData);