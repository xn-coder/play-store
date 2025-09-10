document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const appList = document.getElementById('appList');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        if (query) {
            searchApps(query);
        }
    });

    function searchApps(query) {
        // In a real application, you would make an API call to the backend.
        // For this example, we'll use a static list of apps.
        const apps = [
            { name: 'App 1', category: 'Productivity', rating: 4.5 },
            { name: 'App 2', category: 'Games', rating: 4.2 },
            { name: 'App 3', category: 'Social', rating: 4.8 },
            { name: 'App 4', category: 'Productivity', rating: 4.0 },
            { name: 'App 5', category: 'Games', rating: 4.6 },
        ];

        const filteredApps = apps.filter(app => app.name.toLowerCase().includes(query.toLowerCase()));

        displayApps(filteredApps);
    }

    function displayApps(apps) {
        appList.innerHTML = '';
        if (apps.length === 0) {
            appList.innerHTML = '<p>No apps found.</p>';
            return;
        }

        apps.forEach(app => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';

            appItem.innerHTML = `
                <h3>${app.name}</h3>
                <p>${app.category}</p>
                <p>Rating: ${app.rating}</p>
                <button>Install</button>
            `;

            appList.appendChild(appItem);
        });
    }

    // Initial load of some apps
    searchApps('');
});
