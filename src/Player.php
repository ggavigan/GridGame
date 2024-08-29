<?php

class Player {
    public $hp;
    public $position;

    public function __construct($hp, $x, $y) {
        $this->hp = $hp;
        $this->position = (object) array('x' => $x, 'y' => $y);
    }

    public function getPosition() {
        return $this->position;
    }

    public function setPosition($x, $y) {
        $this->position->x = $x;
        $this->position->y = $y;
    }
}
