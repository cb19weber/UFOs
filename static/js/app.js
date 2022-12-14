// Import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Create function to iterate through UFO data
function buildTable(data) {
    // Clear out any existing table data
    tbody.html("");

    // Loop through each object in the data
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");

        // Loop through each field in the dataRaow
        Object.values(dataRow).forEach((val) => {
            // and add each value as a table cell (td)
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

// 1. Create a variable to keep track of all the filters as an object.
var filterVariables = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);

    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
        filterVariables[filterId] = elementValue
        console.log(filterVariables); // I removed the previous logging to only show 
                                      // that the full variable was stored.
    }
    else {
        delete filterVariables[filterId];
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }

  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    if (filterVariables.datetime) {
        filteredData = filteredData.filter(row => row.datetime === filterVariables.datetime); 
    }
    if (filterVariables.city) {
        filteredData = filteredData.filter(row => row.city === filterVariables.city); 
    }
    if (filterVariables.state) {
        filteredData = filteredData.filter(row => row.state === filterVariables.state); 
    }
    if (filterVariables.country) {
        filteredData = filteredData.filter(row => row.country === filterVariables.country); 
    }
    if (filterVariables.shape) {
        filteredData = filteredData.filter(row => row.shape === filterVariables.shape); 
    }
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
}

// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);