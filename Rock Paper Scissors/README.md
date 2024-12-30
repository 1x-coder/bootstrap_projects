# rock-paper-scissors

An emoji-based Rock Paper Scissors game made with Bootstrap 5 and Vanilla JavaScript.

<a href="https://pmentropy.github.io/rock-paper-scissors/index.html" target="_blank">
<img src="https://raw.githubusercontent.com/pmentropy/rock-paper-scissors/main/screenshot.png" width="450" alt="rock-paper-scissors screenshot"></a>

## Play a round:

https://justinduplain.github.io/rock-paper-scissors/index.html

## About

This project is part of <a href="https://www.theodinproject.com/paths/foundations/courses/foundations" target="_blank">The Odin Project's Foundations curriculum</a>.

### The Details

#### index.html

A very basic (39 lines of code) HTML file to implement bootstrap and the basic page structure.

#### Components

The `components` folder has two files, each of which are used as `module` and export components for use bye `game.js`.

| Filename       | Purpose                                                                                                                                                                                                                                                          |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uiObjects.js   | GUI elements to be loaded as needed.                                                                                                                                                                                                                             |
| gameObjects.js | Defines objects used to track gameplay. This includes the list of available avatars, counting rounds, the player counts, current score, methods to update and initialize the score and to count the number of rock/paper/scissor plays by the user and computer. |

#### img

The `img` folder contains all of the emoji icons used in the game.

#### game.js

Runs the game:

1. Imports the components above and then goes about definiting the constants and variabled to be used in play and initiates the UI.
2. The user selects an avatar and the Computer is assigned one at random.
3. The user selects their next "shoot" by clicking the icon and shoot buttons. The computer's play is chosen at random.
4. Plays are compared and scores are updated and tracked; the UI provides a list of previous plays and overall count for each rock/paper/scissor.
5. When either the player or Computer reach 5 points, the game ends: The winner is announced and the user is prompted to play again.
