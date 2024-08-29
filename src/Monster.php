<?php

// Assuming Player.php is in the same directory or properly autoloaded

class Monster extends Player {
    private $target;

    public function __construct($hp, $x, $y, $target = null) {
        // Call parent constructor to initialize common properties
        parent::__construct($hp, $x, $y);
        // Initialize unique property for Monster
        $this->target = $target;
    }

    // Get the monster's target
    public function getTarget() {
        return $this->target;
    }

    // Set a new target for the monster
    public function setTarget($target) {
        $this->target = $target;
    }

    // Move the monster towards its target
    public function moveToTarget() {
        if ($this->target === null) {
            return; // No target to move towards
        }

        $targetPosition = $this->target->getPosition();

        // Calculate direction to move towards target
        $dx = $targetPosition->x - $this->position->x;
        $dy = $targetPosition->y - $this->position->y;

        // Normalize direction
        if ($dx !== 0) $dx = ($dx > 0) ? 1 : -1;
        if ($dy !== 0) $dy = ($dy > 0) ? 1 : -1;

        // Update monster's position
        $this->position->x += $dx;
        $this->position->y += $dy;
    }
}
