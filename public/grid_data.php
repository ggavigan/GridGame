<?php
include 'src/Game.php';

// Initialize the grid and player
$player = new Player(100, 10, 10);
$game = new Game(21, 21, $player);

// Prepare the blocks data for JSON output
$blocks = [];
foreach ($game->grid->blocks as $block) {
    $blocks[] = [
        'x' => $block->x,
        'y' => $block->y,
        'type' => $block->type
    ];
}

// Return the grid data as JSON, including grid dimensions
header('Content-Type: application/json');
echo json_encode([
    'blocks' => $blocks,
    'gridX' => $game->grid->width,
    'gridY' => $game->grid->height,
    'playerPos' => $player->position
]);
?>
