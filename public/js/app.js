import { fetchGridData } from '/js/api.js';

new Vue({
    el: '#app',
    data: {
      blocks: [],
      playerPos: { x: 0, y: 0 }, // Initialize playerPos with default values
      gridX: 2, // Default grid size; will be updated when data is fetched
      gridY: 2
    },
    mounted() {
      // Fetch the grid data from the server when the component is mounted
      fetchGridData().then(data => {
        this.blocks = data.blocks;
        this.playerPos = data.playerPos || { x: 0, y: 0 };
        this.gridX = data.gridX;
        this.gridY = data.gridY;
    });
    },
    methods: {
      isPlayer(x, y) {
        // Ensure playerPos is defined before checking
        return this.playerPos && x === this.playerPos.x && y === this.playerPos.y;
      }
    },
    template: `
      <div>
        <div v-for="y in gridY" :key="'row-' + (y-1)" style="display: flex;">
          <div v-for="x in gridX" :key="'col-' + (x-1)" style="width: 40px; height: 40px; position: relative;">
            <img v-if="isPlayer(x-1, y-1)" src="images/player.png" style="position: absolute; width: 100%; height: 100%;" />
            <img v-if="blocks.some(block => block.x === x-1 && block.y === y-1)" :src="'images/block' + blocks.find(block => block.x === x-1 && block.y === y-1).type + '.png'" style="width: 100%; height: 100%;" />
          </div>
        </div>
      </div>
    `
});
