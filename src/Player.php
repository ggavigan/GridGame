<?php

class Player {
    public $hp;
    public $position;

    public function __construct($hp, $x, $y) {
        $this->hp = $hp;
        $this->position = array($x, $y);
    }
}