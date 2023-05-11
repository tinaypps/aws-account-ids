fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let pageSize = 10;
        let currentPage = 1;
        let totalPage = Math.ceil(data.length / pageSize);

        // Function to display data in the table
        function displayData() {
            let start = (currentPage - 1) * pageSize;
            let end = start + pageSize;

            // Clear the table
            document.getElementById('table-body').innerHTML = '';

            data.slice(start, end).forEach(item => {
                document.getElementById('table-body').innerHTML += `
                    <tr>
                        <td>${item.owner}</td>
                        <td>${item.description}</td>
                        <td>${item.id}</td>
                        <td><a href="${item.source}" target="_blank">Link</a></td>
                    </tr>
                `;
            });

            document.getElementById('pagination').innerHTML = '';
            for(let i = 1; i <= totalPage; i++) {
                document.getElementById('pagination').innerHTML += `<button class="page">${i}</button>`;
            }
        }

        displayData();

        document.getElementById('pagination').addEventListener('click', function(e) {
            if(e.target.className === 'page') {
                currentPage = Number(e.target.textContent);
                displayData();
            }
        });

        document.getElementById('search').addEventListener('keyup', function(e) {
            let searchString = e.target.value.toLowerCase();

            // Filter data
            data = data.filter(item => item.owner.toLowerCase().includes(searchString) || 
                item.description.toLowerCase().includes(searchString) || 
                item.id.includes(searchString));

            totalPage = Math.ceil(data.length / pageSize);
            currentPage = 1;
            displayData();
        });
    });