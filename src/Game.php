<?php
include 'src/Player.php';
include 'src/Grid.php';

class Game {
    public $grid;
    public $player;

    public function __construct($gridX, $gridY, $player) {
        $this->grid = new Grid($gridX, $gridY);
        $this->player = $player;
    }

    public function __toString() {
        return "Game(grid={$this->grid}, player={$this->player})";
    }
}