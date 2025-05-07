/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// chatgpt added code

// Find out how many properties each game has by inspecting one game
const game = GAMES_JSON[0]; // Get the first game object
const numberOfProperties = Object.keys(game).length; // Count the number of properties
console.log("Number of properties in each game:", numberOfProperties); // Logs the result to the console

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    // create a new div element, which will become the game card
    const gameCard = document.createElement("div");

    // add the class game-card to the list
    gameCard.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    gameCard.innerHTML = `
      <img src="${game.img}" alt="${game.name}" class="game-img" />
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
      <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
    `;
    // append the game to the games-container
    gamesContainer.appendChild(gameCard);
  }
}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce(
  (acc, game) => acc + game.backers,
  0
);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

  console.log("Unfunded Games:", unfundedGames.length);

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  console.log("Funded Games:", fundedGames.length);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(
  (game) => game.pledged < game.goal
).length;

// Sum of money raised for all games
const totalFundsRaised = GAMES_JSON.reduce((total, game) => {
  if (typeof game.pledged === "number" && !isNaN(game.pledged)) {
    return total + game.pledged;
  }
  return total; // If pledged is invalid, just skip it
}, 0);
// Calculate total number of funded games
const fundedGamesCount = GAMES_JSON.length - unfundedGamesCount;
// Create a template string to display the results
const message = `
  Welcome to our company! We are committed to supporting amazing projects. 
  A total of $${totalRaised.toLocaleString()} has been raised across ${fundedGamesCount} ${
  fundedGamesCount === 1 ? "funded game" : "funded games"
}.
  Currently, ${unfundedGamesCount} ${
  unfundedGamesCount === 1 ? "game remains unfunded" : "games remain unfunded"
}.
`;
// Create a new paragraph element
const paragraph = document.createElement("p");

// Set the content of the paragraph to the message
paragraph.textContent = message;

// Append the paragraph to the description container
descriptionContainer.appendChild(paragraph);

// create a string that explains the number of unfunded games using the ternary operator

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// Step 1: Use destructuring to grab the top two funded games
const [firstGame, secondGame, ...rest] = sortedGames;

// Secret Key Component 1: The first word of the most funded game
const firstWordOfFirstGame = firstGame.name.split(" ")[0];

// Secret Key Component 2: The first word of the second most funded game
const firstWordOfSecondGame = secondGame.name.split(" ")[0];
// create a new element to hold the name of the top pledge game, then append it to the correct element
// Step 2: Create a new element for the top funded game and append it to the firstGameContainer
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second most funded game and append it to the secondGameContainer
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
// do the same for the runner up item
console.log(
  "Secret Key Component 1: First word of the most funded game:",
  firstWordOfFirstGame
);
console.log(
  "Secret Key Component 2: First word of the second most funded game:",
  firstWordOfSecondGame
);
