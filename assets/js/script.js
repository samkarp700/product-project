//variables

var submitButtonEl = document.getElementById("search");
var submitInputEl = document.getElementById("gamesrch");
var btnList1El = document.getElementById("btn-list-1");
var btnList2El = document.getElementById("btn-list-2");
var prevSearchEl = document.getElementById("prev-search");
var rawgKey = "c43811ca668944d58cb70bb7abcca226";
var giantBombkey = "3496224df3ed2783377ca6cbf00daeb3fb6b7b69";
var rawgObjArr = [];
var arrIndex = 0;
var searchHistory = [];

   

var getUserData = function() {
    if(document.getElementById("gamesrch").value) {
        //gathers data entered into textFormEl
        var gameSearchData = document.getElementById("gamesrch").value;
        console.log(gameSearchData);
        saveSearch();
        //reset form fields for next task to be entered
        document.getElementById("gamesrch").value="";
        removeChildren();

        //format the search to work with the api url
        gameSearchData = gameSearchData.replaceAll(" ", "+");
        getApiData(gameSearchData);
    }
};

var getBtnData = function(event) {
    var gameSearchData = event.target.textContent;
    removeChildren();

    //format the search to work with the api url
    gameSearchData = gameSearchData.replaceAll(" ", "+");
    getApiData(gameSearchData);
};

//api data call 
var getApiData = function(gameSearchData) {
    //format the api url 
    var gameApi = "https://api.rawg.io/api/games?search=" + gameSearchData + "&key=" + rawgKey;
    arrIndex = 0;

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
            var gameNameContainer = document.getElementById("result-name");
            gameNameContainer.textContent = "Nothing found";
        }
    })
    .catch(function(error) {
        var gameNameContainer = document.getElementById("result-name");
        gameNameContainer.textContent = "Couldn't reach RAWG servers";
    });
};

//displays the name genre and system of the game currently set to the main index
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
};

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


//creates the buttons to select other games
var displayOtherGames = function() {
    

    for (var i = 1; i < rawgObjArr.length; i++) {
        var gameBtn = document.createElement("button");
        gameBtn.textContent = rawgObjArr[i].name;
        gameBtn.setAttribute("type", "button");
        gameBtn.setAttribute("data-index", i);
        gameBtn.className = "button";

        if (i % 2 === 1) {
            btnList1El.appendChild(gameBtn);
        }
        else {
            btnList2El.appendChild(gameBtn);
        }
    }
};

//adds the data of the game tied to the button to the main game area and updates the button to correspond to the original game
var switchGameData = function(event) {
    if(event.target.classList.contains("button")) {
        var targetBtn = event.target;

        var temp = targetBtn.getAttribute("data-index");
        targetBtn.setAttribute("data-index", arrIndex);
        arrIndex = temp;

        mainGameDisplay();
        updateButton(targetBtn);
    }
};

//updates the name of the button used
var updateButton = function(targetBtn) {
    var index = targetBtn.getAttribute("data-index");
    targetBtn.textContent = rawgObjArr[index].name;
};

//saves search data to local storage
var saveSearch = function() {
    if(searchHistory.length >= 3) {
        searchHistory.shift();
    }

    searchHistory.push(document.getElementById("gamesrch").value);
    localStorage.setItem("search", JSON.stringify(searchHistory)); 

};

var loadHistory = function() {
    //get search history from localStorage
    searchHistory = JSON.parse(localStorage.getItem("search"));
    if(!searchHistory) {
        searchHistory = [];
    }
    while(searchHistory.length > 3) {
        searchHistory.shift();
    }
    //display value in container - max 3 previous searches
    console.log(searchHistory);
    
    for(var i = 0; i < searchHistory.length; i++) {
        historyBtn = document.createElement("button");
        historyBtn.textContent = searchHistory[i];
        historyBtn.setAttribute("type", "button");
        historyBtn.className = "button history-btn";

        prevSearchEl.append(historyBtn);
    }

};

//removes all children of the button lists
var removeChildren = function() {
    while(btnList1El.firstChild) {
        btnList1El.removeChild(btnList1El.firstChild);
    }

    while(btnList2El.firstChild) {
        btnList2El.removeChild(btnList2El.firstChild);
    }
};

loadHistory();
   
submitButtonEl.addEventListener("click", getUserData);
btnList1El.addEventListener("click", switchGameData);
btnList2El.addEventListener("click", switchGameData);
prevSearchEl.addEventListener("click", getBtnData);