<?php
require_once 'src/Game.php';

// Initialize the grid and player positions
$gameX = 9;
$gameY = 9;

$playerX = (int) floor(($gameX / 2) + 1);
$playerY = (int) floor(($gameY / 2) + 1);
// Create Player instance
$player = new Player(100, $playerX, $playerY);

// Define corners of the grid
$corners = [
    [0, 0],               // Top-left
    [0, $gameY-1],      // Bottom-left
    [$gameX-1, 0],      // Top-right
    [$gameX-1, $gameY-1] // Bottom-right
];

// Randomly select one of the corners for monster spawn
$randomCorner = $corners[array_rand($corners)];
$monsterX = $randomCorner[0]+1;
$monsterY = $randomCorner[1]+1;

// Create Monster instance
$monster = new Monster(100, $monsterX, $monsterY);

// Create Game instance
$game = new Game($gameX, $gameY, $player);

// Prepare the blocks data for JSON output
$blocks = [];
foreach ($game->grid->blocks as $block) {
    $blocks[] = [
        'x' => $block->x,
        'y' => $block->y,
        'type' => ($player->position->x === $block->x && $player->position->y === $block->y) ||
            ($monster->position->x === $block->x && $monster->position->y === $block->y)
            ? 0
            : $block->type
    ];
}

// Return the grid data as JSON, including grid dimensions
header('Content-Type: application/json');
echo json_encode([
    'blocks' => $blocks,
    'gridX' => $game->grid->width,
    'gridY' => $game->grid->height,
    'playerPos' => $player->getPosition(),
    'monsterPos' => $monster->getPosition()
]);
?>
