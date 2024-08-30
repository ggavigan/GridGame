<?php

class Monster {
    public $hp;
    public $position;
    public $target;

    public function __construct($hp, $x, $y, $target = null) {
        $this->hp = $hp;
        $this->position = (object) array('x' => $x, 'y' => $y);
        $this->target = $target;
    }

    public function getPosition() {
        return $this->position;
    }

    public function setPosition($x, $y) {
        $this->position->x = $x;
        $this->position->y = $y;
    }

    public function getTarget() {
        return $this->target;
    }

    public function setTarget($target) {
        $this->target = $target;
    }

    public function moveToTarget() {
        if ($this->target === null) {
            return; // No target to move towards
        }

        $targetPosition = $this->target->getPosition();
        $dx = $targetPosition->x - $this->position->x;
        $dy = $targetPosition->y - $this->position->y;

        if ($dx !== 0) $dx = ($dx > 0) ? 1 : -1;
        if ($dy !== 0) $dy = ($dy > 0) ? 1 : -1;

        $this->position->x += $dx;
        $this->position->y += $dy;
    }
}
?>
