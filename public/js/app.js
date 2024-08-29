import { fetchGridData } from '/js/api.js';

new Vue({
  el: '#app',
  data: {
    blocks: [],
    playerPos: { x: 4, y: 4 },
    gridX: 7,
    gridY: 7
  },
  mounted() {
    // Fetch the grid data when the component is mounted
    fetchGridData().then(data => {
      this.blocks = data.blocks;
      this.playerPos = data.playerPos || { x: 4, y: 4 };
      this.gridX = data.gridX;
      this.gridY = data.gridY;
    });
    

    // Add the keyboard event listener
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeDestroy() {
    // Remove the keyboard event listener when the component is destroyed
    window.removeEventListener('keydown', this.handleKeyPress);
  },
  methods: {
    handleKeyPress(event) {
      // Handle the movement based on the key pressed
      switch (event.key) {
        case 'w':
          this.movePlayer('up');
          break;
        case 's':
          this.movePlayer('down');
          break;
        case 'a':
          this.movePlayer('left');
          break;
        case 'd':
          this.movePlayer('right');
          break;
      }
    },
    getBlockImage(x, y) {
      const block = this.blocks.find(block => block.x === x && block.y === y);
      return block ? `images/block${block.type}.png` : null;
    },
    getPlayerImage(x, y) {
      return this.isPlayerHere(x, y) ? 'images/player.png' : null;
    },
    isPlayerHere(x, y) {
      return x === this.playerPos.x && y === this.playerPos.y;
    },
    movePlayer(direction) {
      // Update the player's position
      switch (direction) {
        case 'up':
          if (this.playerPos.y > 1) {
            this.playerPos.y--;
          }
          break;
        case 'down':
          if (this.playerPos.y < this.gridY) {
            this.playerPos.y++;
          }
          break;
        case 'left':
          if (this.playerPos.x > 1) {
            this.playerPos.x--;
          }
          break;
        case 'right':
          if (this.playerPos.x < this.gridX) {
            this.playerPos.x++;
          }
          break;
      }
    }
  },
  template: `
    <div>
      <div v-for="y in gridY+1" :key="'row-' + y" style="display: flex;">
        <div v-for="x in gridX+1" :key="'col-' + x" style="width: 40px; height: 40px; position: relative;">
          <!-- Block image -->
          <img v-if="getPlayerImage(x, y)" :src="getPlayerImage(x, y)" style="position: absolute; width: 100%; height: 100%;" />
          <img v-if="getBlockImage(x, y)" :src="getBlockImage(x, y)" style="width: 100%; height: 100%;" />
          <!-- Player image -->
        </div>
      </div>
    </div>
  `
});
