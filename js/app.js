// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Create function to iterate through UFO data and create a table
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

// Create a function to filter the table data on the web page
function handleChange(event) {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    // Check to see if a date was entered and filter the data using that date
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will be original tableData
    buildTable(filteredData);
    }
}

// Attach an event to listen for the form filter
d3.selectAll("#filter-btn").on("change", handleChange)

// Build the table when the page loads
buildTable(tableData);