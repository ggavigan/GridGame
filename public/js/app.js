import { fetchGridData } from '/js/api.js';

new Vue({
  el: '#app',
  data: {
    blocks: [],
    playerPos: { x: 4, y: 4 },
    monsterPos: { x: 7, y: 1 },
    gridX: 7,
    gridY: 7,
    debounceDelay: 100, // Delay in milliseconds
    debounceTimer: null,
    updateInterval: 1000 // Interval to update monster position
  },
  mounted() {
    // Fetch the grid data when the component is mounted
    this.updateGameData();
    
    // Add the keyboard event listener
    window.addEventListener('keydown', this.debounce(this.handleKeyPress, this.debounceDelay));
    
    // Set an interval to update the monster's position
    this.monsterUpdateTimer = setInterval(this.moveMonster, this.updateInterval);
  },
  beforeDestroy() {
    // Remove the keyboard event listener and clear the interval
    window.removeEventListener('keydown', this.debounce(this.handleKeyPress, this.debounceDelay));
    clearInterval(this.monsterUpdateTimer);
  },
  methods: {
    debounce(func, delay) {
      return function(...args) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => func.apply(this, args), delay);
      }.bind(this);
    },
    handleKeyPress(event) {
      // Handle the movement based on the key pressed
      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          this.movePlayer('up');
          break;
        case 's':
        case 'ArrowDown':
          this.movePlayer('down');
          break;
        case 'a':
        case 'ArrowLeft':
          this.movePlayer('left');
          break;
        case 'd':
        case 'ArrowRight':
          this.movePlayer('right');
          break;
      }
    },
    async updateGameData() {
      try {
        const data = await fetchGridData();
        this.blocks = data.blocks;
        this.playerPos = data.playerPos || { x: 4, y: 4 };
        this.monsterPos = data.monsterPos || { x: 7, y: 1 };
        this.gridX = data.gridX;
        this.gridY = data.gridY;
      } catch (error) {
        console.error('Failed to fetch grid data:', error);
      }
    },
    getBlockType(x, y) {
      const block = this.blocks.find(block => block.x === x && block.y === y);
      return block ? block.type : null;
    },
    getBlockImage(x, y) {
      const block = this.blocks.find(block => block.x === x && block.y === y);
      return block ? `images/block${block.type}.png` : null;
    },
    getPlayerImage(x, y) {
      return this.isPlayerHere(x, y) ? 'images/player.png' : null;
    },
    getMonsterImage(x, y) {
      return this.isMonsterHere(x, y) ? 'images/monster.png' : null;
    },
    isPlayerHere(x, y) {
      return x === this.playerPos.x && y === this.playerPos.y;
    },
    isMonsterHere(x, y) {
      return x === this.monsterPos.x && y === this.monsterPos.y;
    },
    isBlockType(x, y, type) {
      const block = this.blocks.find(block => block.x === x && block.y === y);
      return block && block.type === type;
    },
    movePlayer(direction) {
      // Update the player's position
      switch (direction) {
        case 'up':
          if (this.playerPos.y > 1 && this.isBlockType(this.playerPos.x, this.playerPos.y - 1, 0)) {
            this.playerPos.y--;
          }
          break;
        case 'down':
          if (this.playerPos.y < this.gridY && this.isBlockType(this.playerPos.x, this.playerPos.y + 1, 0)) {
            this.playerPos.y++;
          }
          break;
        case 'left':
          if (this.playerPos.x > 1 && this.isBlockType(this.playerPos.x - 1, this.playerPos.y, 0)) {
            this.playerPos.x--;
          }
          break;
        case 'right':
          if (this.playerPos.x < this.gridX && this.isBlockType(this.playerPos.x + 1, this.playerPos.y, 0)) {
            this.playerPos.x++;
          }
          break;
      }
    },
    moveMonster() {
      fetch(`/pathfinding.php?gridX=${this.gridX}&gridY=${this.gridY}&playerX=${this.playerPos.x}&playerY=${this.playerPos.y}&monsterX=${this.monsterPos.x}&monsterY=${this.monsterPos.y}`)
        .then(response => response.json())
        .then(path => {
          if (path.length > 0) {
            const nextPos = path.shift(); // Get the next step in the path
            this.monsterPos = { x: nextPos.x, y: nextPos.y };
          }
        })
        .catch(error => {
          console.error('Failed to fetch path for monster:', error);
        });
    }
  },
  template: `
    <div>
      <div v-for="y in gridY+1" :key="'row-' + y" style="display: flex;">
        <div v-for="x in gridX+1" :key="'col-' + x" style="width: 40px; height: 40px; position: relative;">
          <!-- Player image -->
          <img v-if="getPlayerImage(x, y)" :src="getPlayerImage(x, y)" style="position: absolute; width: 100%; height: 100%;" />
          <!-- Monster image -->
          <img v-if="getMonsterImage(x, y)" :src="getMonsterImage(x, y)" style="position: absolute; width: 100%; height: 100%;" />
          <!-- Block image -->
          <img v-if="getBlockImage(x, y)" :src="getBlockImage(x, y)" style="width: 100%; height: 100%;" />
        </div>
      </div>
    </div>
  `
});
