# Javascript Project

## Background

Javascript Project is a side-scrolling fighting game where the player can battle against various difficulties of ai or another person on the same keyboard. The game features platforms to jump around and the winner is determined when one of the players health bars is empty.

## Functionality & MVPs

In Javascript Project, users will be able to:
* Move around platforms with a character
* Attack other characters
* Select the difficulty of ai to fight
* Fight another player on the same keyboard

In addition, this project will include:
* An instructions section describing controls and rules of the game
* A production README

## Wireframes

![wireframe](/src/assets/wireframe.png "Wireframe")

* Nav links include links to this project's Github repo and my LinkedIn

* Instructions and rules will list all of the keys and have rules for the game.

## Technologies, Libraries, and APIs

This project will be implemented with the following technologies:
* The `Canvas API` to render the game board
* `Webpack` and `Babel` to bundle and transpiile the source Javascript code
* `npm` to manage project dependencies

## Implementation Timeline

* **Thursday:** Setup project and get webpack working. Experiment with canvas api to render sprite sheets.
* **Friday Afternoon & Weekend:** Create `Game`, `GameView`, `Character`, `Player`, `Map`, and `Obstacle` classes. Have a map render with a character able to walk around and jump on obstacles and platforms.
* **Monday:** Implement attacking logic and hit boxes for attacks. Make animation priorities to ensure action animations have precedence over idle and walking animations.
* **Tuesday:** Create a start screen that allows picking between 2 players or 1 player vs ai. Create basic ai to control another character. Allow multiple characters to be played on the same keyboard.
* **Wednesday:** Style the page to include instructions on how to play the game, add a nav bar with link to github.
* **Thursday:** Deploy to GitHub pages and rewrite this proposal as a production README.
