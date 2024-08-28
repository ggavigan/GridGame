// api.js

// Function to fetch grid data
export function fetchGridData() {
    return axios.get('grid_data.php')
        .then(response => response.data)
        .catch(error => {
            console.error("There was an error fetching the grid data:", error);
            throw error;
        });
}
