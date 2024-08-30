<?php

class Pathfinding
{
    private $grid;
    private $playerPos;
    private $monsterPos;

    public function __construct($grid, $playerPos, $monsterPos)
    {
        $this->grid = $grid;
        $this->playerPos = $playerPos;
        $this->monsterPos = $monsterPos;
    }

    public function findPath()
    {
        // Implement A* algorithm or another pathfinding algorithm
        // Return an array of positions or an empty array if no path is found

        // Placeholder code: Use a simple pathfinding strategy
        return $this->simplePath();
    }

    private function simplePath()
    {
        $path = [];
        $current = $this->monsterPos;

        while ($current->x !== $this->playerPos->x || $current->y !== $this->playerPos->y) {
            $next = (object) ['x' => $current->x, 'y' => $current->y];

            if ($current->x < $this->playerPos->x) {
                $next->x++;
            } elseif ($current->x > $this->playerPos->x) {
                $next->x--;
            }
            if ($current->y < $this->playerPos->y) {
                $next->y++;
            } elseif ($current->y > $this->playerPos->y) {
                $next->y--;
            }

            if ($this->isWalkable($next)) {
                $path[] = ['x' => $next->x, 'y' => $next->y]; // Store as associative array
                $current = $next;
            } else {
                break; // Cannot move further in this direction
            }
        }

        return $path;
    }

    private function isWalkable($pos)
    {
        // Check if the position is walkable (block type 0)
        // Convert $this->grid to a 2D array mapping of block objects

        // Convert grid to associative array for easier access
        $gridMap = [];
        foreach ($this->grid as $block) {
            if (!isset($gridMap[$block->x])) {
                $gridMap[$block->x] = [];
            }
            $gridMap[$block->x][$block->y] = $block;
        }

        if (isset($gridMap[$pos->x][$pos->y])) {
            $block = $gridMap[$pos->x][$pos->y];
            return $block->type === 0; // Assuming Block has a 'type' property
        }
        return false;
    }
}
?>
