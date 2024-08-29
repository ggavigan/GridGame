<?php

class Block {
    public $x;
    public $y;
    public $type;

    public function __construct($x, $y) {
        $this->x = $x;
        $this->y = $y;

        // Generate a random number between 1 and 100
        $randomChance = rand(1, 100);

        // 75% chance for type 0, 25% for type 1, 2, or 3
        if ($randomChance <= 75) {
            $this->type = 0;
        } else {
            $this->type = rand(1, 3);
        }
    }

    public function __toString() {
        return "Block(x={$this->x}, y={$this->y}, type={$this->type})";
    }
}
