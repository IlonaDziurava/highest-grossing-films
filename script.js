// Load JSON data
fetch('data_1.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector("#films-table tbody");

    // Function to populate the table
    const populateTable = (data) => {
      tableBody.innerHTML = ""; // Clear the table
      data.forEach(film => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${film.title}</td>
          <td>${film.release_year}</td>
          <td>${film.director}</td>
          <td>$${film.box_office.toLocaleString()}</td>
          <td>${film.country}</td>
        `;
        tableBody.appendChild(row);
      });
    };

    // Initial table population
    populateTable(data);

    // Sort by box office
    document.getElementById("sort-by-box-office").addEventListener("click", () => {
      const sortedData = [...data].sort((a, b) => b.box_office - a.box_office);
      populateTable(sortedData);
    });

    // Sort by year
    document.getElementById("sort-by-year").addEventListener("click", () => {
      const sortedData = [...data].sort((a, b) => b.release_year - a.release_year);
      populateTable(sortedData);
    });

    // Search by title
    document.getElementById("search").addEventListener("input", (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filteredData = data.filter(film => film.title.toLowerCase().includes(searchTerm));
      populateTable(filteredData);
    });
  })
  .catch(error => console.error("Error loading data:", error));