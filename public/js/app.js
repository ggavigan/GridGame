import { fetchGridData } from '/js/api.js';

new Vue({
  el: '#app',
  data: {
      blocks: [],
      playerPos: { x: 1, y: 1 },
      gridX: 2,
      gridY: 2
  },
  mounted() {
      // Fetch the grid data when the component is mounted
      fetchGridData().then(data => {
          this.blocks = data.blocks;
          this.playerPos = data.playerPos || { x: 1, y: 1 };
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
      isPlayerHere(x, y) {
          return x === this.playerPos[0] && y === this.playerPos[1];
      },
      getPlayerImage(x, y) {
          return this.isPlayerHere(x, y) ? 'images/player.png' : null;
      },
      movePlayer(direction) {
          switch (direction) {
              case 'up':
                  if (this.playerPos[1] > 0) {
                    this.playerPos[1]--;
                  }
                  break;
              case 'down':
                  if (this.playerPos[1] < this.gridY - 1) {
                    this.playerPos[1]++;
                  }
                  break;
              case 'left':
                  if (this.playerPos[0] > 0) {

                    this.playerPos[0]--;
                }
                  break;
              case 'right':
                  if (this.playerPos[0] < this.gridX - 1) {
                    this.playerPos[0]++;
                  }
                  break;
          }
      }
  },
  template: `
      <div>
          <div v-for="y in gridY+1" :key="'row-' + (y - 1)" style="display: flex;">
              <div v-for="x in gridX+1" :key="'col-' + (x - 1)" style="width: 40px; height: 40px; position: relative;">
                  <img v-if="getPlayerImage(x - 1, y - 1)" :src="getPlayerImage(x - 1, y - 1)" style="position: absolute; width: 100%; height: 100%;" />
                  <img v-if="getBlockImage(x - 1, y - 1)" :src="getBlockImage(x - 1, y - 1)" style="width: 100%; height: 100%;" />
              </div>
          </div>
      </div>
  `
});