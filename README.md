GridGame is a simple 2D game where players navigate a grid using WASD or arrow keys to move their character.</br>
The game is built with a combination of Vue.js on the frontend and PHP on the backend, allowing for dynamic </br>
interaction between the player, monsters, and the environment.</br>

<h2>Features</h2>
2D Grid Movement: Players can move their character around a grid using the keyboard.</br>
Dynamic Rendering: Vue.js components handle the rendering of the player, monsters, and </br>
blocks on the grid. Movement and interactions are reflected in real-time.</br>
Backend Logic: The PHP backend manages game logic, including player and monster positioning, </br>
interactions, and future expansions.</br>
API Communication: Axios is used to facilitate communication between the frontend and backend via api.js.</br>
Custom Graphics: The game features custom-made blocks and royalty-free images sourced from freepik.com.</br></br>
<h2>How It Works</h2>
Game Grid: The grid is initialized with blocks, each having a type that can affect gameplay. The player and </br>
monsters are placed on the grid based on predefined or randomly chosen positions.</br>
Movement: Player movement is handled by Vue.js and updates the player’s position on the grid.</br>
Interactions: The environment can affect gameplay, with plans to add hazards and interactive blocks that </br>
impact the player's health or trigger events.</br>
<h2>Future Plans</h2>
<ul>
<li>Show HP somewhere</li>
<li>Add menu screens</li>
<li>Dynamic zooming, screen drag with mouse</li>
<li>Fog of war?</li>
<li>Hazards: Introduce hazards that will cause players and monsters to lose or gain HP.</li>
<li>Interactive Environment: Enhance gameplay by making certain blocks affect the player or monster when stepped on, such as traps or power-ups.</li>
<li>New Rooms: Add doors that players can walk through to enter new rooms or areas, dynamically rendering a new grid.</li>
<li>Multiplayer Mode: Consider expanding the game to support multiple players on the same grid.</li>
<li>AI Improvements: Enhance monster AI for more dynamic interactions, including chasing the player or avoiding hazards.</li>
</ul>
<h2>Installation</h2>
You will need to download and install <strong>Docker</strong> to build the PHP image and containers.</br>
Download Docker: https://www.docker.com/products/docker-desktop/ </br>
There is currently a mySQL container that is not being used but could be used for save state persistence.</br>
Install <strong>Git</strong> and Git clone the repo.</br>
HTTPS:</br> <code>git clone https://github.com/ggavigan/GridGame.git</code>
Download Git: https://git-scm.com/
<h2>Contribution</h2>
Contributions are welcome! If you have ideas, bug fixes, or enhancements, feel free to open an issue or submit a pull request.

<h2>Credits</h2>
Graphics: Custom blocks created by ggavigan.</br>Additional images sourced from freepik.com.</br>
Development: ggavigan, with support from the open-source community.
