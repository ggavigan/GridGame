<?php
include 'src/Block.php';

class Grid {
    public $width;
    public $height;
    public $blocks = array();

    public function __construct($width, $height) {
        $this->width = $width;
        $this->height = $height;
        for ($x = 1; $x <= $width; $x++) {
            for ($y = 1; $y <= $height; $y++) {
                $this->blocks[] = new Block($x, $y);
            }
        }
    }

    public function __toString() {
        $string = "Grid(width={$this->width}, height={$this->height})\n";
        foreach ($this->blocks as $block) {
            $string .= $block . "\n";
        }
        return $string;
    }
}