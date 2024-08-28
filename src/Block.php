<?php

class Block {
    public $x;
    public $y;
    public $type;

    public function __construct($x, $y) {
        $this->x = $x;
        $this->y = $y;
        $this->type = rand(1, 3);
    }

    public function __toString() {
        return "Block(x={$this->x}, y={$this->y}, type={$this->type})";
    }
}