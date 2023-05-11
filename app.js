fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('table-body');
        const paginationDiv = document.getElementById('pagination');
        const searchInput = document.getElementById('search');

        let pageSize = 10;
        let currentPage = 1;

        function paginate(array, pageSize, pageNumber) {
            return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
        }

        // Function to display data in the table
        function displayData(data) {
            // Clear the table
            tableBody.innerHTML = '';

            const paginatedData = paginate(data, pageSize, currentPage);

            // Display a slice of the data in the table
            paginatedData.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.owner}</td>
                    <td>${item.description}</td>
                    <td>${item.id}</td>
                    <td><a href="${item.source}" target="_blank">Link</a></td>
                `;
                tableBody.appendChild(row);
            });

            // Display the pagination
            displayPagination(data.length, pageSize);
        }

        // Function to display pagination
        function displayPagination(totalItems, itemsPerPage) {
            // Calculate the number of pages
            const numPages = Math.ceil(totalItems / itemsPerPage);

            // Clear the pagination
            paginationDiv.innerHTML = '';

            // Add a button for each page
            for (let i = 1; i <= numPages; i++) {
                const btn = document.createElement('button');
                btn.classList.add('btn', 'btn-light', 'mx-1');
                btn.innerText = i;
                btn.addEventListener('click', function() {
                    currentPage = i;
                    displayData(data);
                });
                paginationDiv.appendChild(btn);
            }
        }

        // Display all data by default
        displayData(data);

        // Search function
        searchInput.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();

            // Filter data
            const filteredData = data