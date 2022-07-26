//variables

// var textFormEl = document.getElementById("gamesrch").value;
//var rawgDataObj = //rawg api
//var bestBuyDataObj = //best buy api
var submitButtonEl = document.querySelector("#input-group-button");
var rawgKey = "c43811ca668944d58cb70bb7abcca226";
var rawgObjArr = [];
arrIndex = 0;



//Search Function
/* submitButtonEl.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("button clicked!");
    getUserData();
    
});*/
    

var getUserData = function() {
    //gathers data entered into textFormEl
  var gameSearchData = document.getElementById("gamesrch").value;
  console.log(gameSearchData);
  saveSearch();
  //reset form fields for next task to be entered
  document.getElementById("gamesrch").value="";
};

//api data call 

var getApiData = function() {
    //format the api url 
    var gameApi = "https://api.rawg.io/api/games?search=super+mario+64&key=" + rawgKey;
    arrIndex = 1;

    //make a request to URL
    fetch (gameApi).then(function(response) {
        console.log("check1");
        //request successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for(var i = 0; i < 5; i++) {
                    console.log(data.results[i]);
                    if(data.results[i]) {
                        rawgObjArr[i] = data.results[i];
                    }
                }
                mainGameDisplay();
                displayOtherGames();
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

var mainGameDisplay = function() {
    mainGameName();
    mainGameGenre();
    mainGameSystem();
};

var mainGameName = function() {
    var gameNameContainer = document.getElementById("result-name");
    gameNameContainer.textContent = rawgObjArr[arrIndex].name;
};

var mainGameGenre = function() {
    var gameGenreContainer = document.getElementById("result-genre");
    var genreStr = "";

    for (var i = 0; i < rawgObjArr[arrIndex].genres.length; i++) {
        genreStr += rawgObjArr[arrIndex].genres[i].name;

        if(i != rawgObjArr[arrIndex].genres.length - 1) {
            genreStr += "/";
        }
    }

    gameGenreContainer.textContent = genreStr;
}

var mainGameSystem = function() {
    var gameSystemContainer = document.getElementById("result-sys");
    var systemStr = "";

    for (var i = 0; i < rawgObjArr[arrIndex].platforms.length; i++) {
        systemStr += rawgObjArr[arrIndex].platforms[i].platform.name;

        if(i != rawgObjArr[arrIndex].platforms.length - 1) {
            systemStr += "/";
        }
    }

    gameSystemContainer.textContent = systemStr;
};

var displayOtherGames = function() {
    var btnList1 = document.getElementById("btn-list-1");
    var btnList2 = document.getElementById("btn-list-2");

    for (var i = 1; i < rawgObjArr.length; i++) {
        var gameBtn = document.createElement("button");
        gameBtn.textContent = rawgObjArr[i].name;
        gameBtn.setAttribute("type", "button");
        gameBtn.className = "button";

        if (i % 2 === 1) {
            btnList1.appendChild(gameBtn);
        }
        else {
            btnList2.appendChild(gameBtn);
        }
    }
};

//saves search data to local storage
var saveSearch = function() {
    var gameName = document.getElementById("gamesrch").value;
    localStorage.setItem("search", JSON.stringify(gameName)); 

}

var loadHistory = function() {
    //get search history from localStorage
    var loadGame = document.getElementById("gamesrch").value;
    window.localStorage.getItem('loadGame');
    JSON.parse(window.localStorage.getItem(loadGame));
    //display value in container - max 3 previous searches
    console.log(loadGame);
    var prevSearchEl = document.getElementById("prev-search");
        

};

loadHistory();
   

getApiData();
// submitButtonEl.addEventListener("submit", getUserData);
