fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('table-body');
        const searchInput = document.getElementById('search');

        // Function to display data in the table
        function displayData(data) {
            tableBody.innerHTML = '';
            data.forEach(item => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${item.owner}</td>
                        <td>${item.description}</td>
                        <td><a href="${item.source}" target="_blank">Link</a></td>
                        <td>${item.id}</td>
                    </tr>
                `;
            });
        }

        // Display all data by default
        displayData(data);

        // Search function
        searchInput.addEventListener('keyup', (e) => {
            const searchString = e.target.value.toLowerCase();

            // Filter data
            const filteredData = data.filter(item => {
                return (
                    item.owner.toLowerCase().includes(searchString) ||
                    item.description.toLowerCase().includes(searchString) ||
                    item.id.includes(searchString)
                );
            });

            // Display filtered data
            displayData(filteredData);
        });
    })
    .catch(error => console.error(error));
