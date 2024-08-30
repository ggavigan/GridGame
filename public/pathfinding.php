<?php
require_once 'src/Game.php';
require_once 'src/Pathfinding.php';

// Retrieve parameters from GET request
$gridX = $_GET['gridX'];
$gridY = $_GET['gridY'];
$playerX = $_GET['playerX'];
$playerY = $_GET['playerY'];
$monsterX = $_GET['monsterX'];
$monsterY = $_GET['monsterY'];

// Create game, player, and monster instances
$player = new Player(100, $playerX, $playerY);
$monster = new Monster(100, $monsterX, $monsterY);
$game = new Game($gridX, $gridY, $player, $monster);

// Perform pathfinding
$pathfinding = new Pathfinding($game->grid->blocks, $player->getPosition(), $monster->getPosition());
$path = $pathfinding->findPath();

// Output path as JSON
// header('Content-Type: application/json');
echo json_encode($path);
?>