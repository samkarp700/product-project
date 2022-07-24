# Global Variables

## textFormEl
Object that links to the input element where users will enter the video game's name.

## rawgDataObj
Object returned from rawg's API. if returned as an array possibly use array items past 0 for a "did you mean" section?

## bestBuyDataObj
Object returned from Best Buy's API.

# Global Functions
## getUserData()
Takes the data entered into textFormEl and passes it to the function that will make the api call. needs preventDefault();

## getApiData()
Makes an api call with the string supplied by the user to get data on the video game searched for.

## displayResults()
Takes the data stored in the object and displays it to the page. Maybe in the future display other results if multiple results are displayed?

## saveSearch(userData)
Saves the string stored in userData to localStorage.

## loadHistory()
Loads the search history from localStorage and displays it in a list under the search bar, up to a certain number of searches