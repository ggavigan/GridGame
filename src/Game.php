<?php
require_once 'src/Player.php';
require_once 'src/Monster.php';
require_once 'src/Grid.php';
require_once 'src/Pathfinding.php';

class Game {
    public $grid;
    public $player;
    public $monster;

    public function __construct($gridX, $gridY, $player, $monster) {
        $this->grid = new Grid($gridX, $gridY);
        $this->player = $player;
        $this->monster = $monster;
    }

    public function __toString() {
        return "Game(grid={$this->grid}, player={$this->player}, monster={$this->monster})";
    }

    public function moveMonsterTowardPlayer() {
        $playerPos = $this->player->getPosition();
        $monsterPos = $this->monster->getPosition();
        
        // Use Pathfinding to find a viable path
        $pathfinding = new Pathfinding($this->grid->blocks, $playerPos, $monsterPos);
        $path = $pathfinding->findPath();
        
        if (!empty($path)) {
            $nextPos = array_shift($path); // Get the next step
            $this->monster->setPosition($nextPos['x'], $nextPos['y']);
        }
    }
}
?>
