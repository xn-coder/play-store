
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const appList = document.getElementById('appList');
    const featuredAppList = document.getElementById('featuredAppList');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutButton = document.getElementById('logoutButton');

    let allApps = []; // Cache for all fetched apps

    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutButton.style.display = 'block';
    }

    // Add event listener for the logout button
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        window.location.reload();
    });

    // Function to display apps in a given list element
    function displayApps(apps, listElement) {
        listElement.innerHTML = ''; // Clear existing content
        if (apps.length === 0) {
            listElement.innerHTML = '<p>No apps found.</p>';
            return;
        }
        apps.forEach(app => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';
            // Use a default icon if iconUrl is not provided
            const iconUrl = app.iconUrl || '/images/default-icon.png';
            appItem.innerHTML = `
                <img src="${iconUrl}" alt="${app.name}">
                <h3>${app.name}</h3>
                <p>${app.category || 'General'}</p>
            `;
            listElement.appendChild(appItem);
        });
    }

    // Function to fetch all apps and display them
    function fetchAndDisplayApps() {
        fetch(`${config.apiGatewayUrl}/api/apps`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(apps => {
                allApps = apps;

                // Use first 4 apps as featured, or fewer if not enough apps
                const featuredApps = allApps.slice(0, 4);
                displayApps(featuredApps, featuredAppList);

                // Display all apps
                displayApps(allApps, appList);
            })
            .catch(error => {
                console.error('Error fetching apps:', error);
                appList.innerHTML = '<p>Could not load apps. Please try again later.</p>';
                featuredAppList.innerHTML = '<p>Could not load featured apps.</p>';
            });
    }

    // Client-side search functionality
    function searchApps(query) {
        const normalizedQuery = query.toLowerCase();
        const filteredApps = allApps.filter(app =>
            app.name.toLowerCase().includes(normalizedQuery)
        );

        // Update UI for search results
        document.querySelector('.featured-apps').style.display = 'none';
        const allAppsContainer = document.querySelector('.app-list-container');
        allAppsContainer.querySelector('h2').textContent = `Search Results for "${query}"`;
        displayApps(filteredApps, appList);
    }

    // Add event listener for the search button
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchApps(query);
        } else {
            // If search is empty, restore the original view
            document.querySelector('.featured-apps').style.display = 'block';
            document.querySelector('.app-list-container h2').textContent = 'All Apps';
            displayApps(allApps, appList); // Re-display all apps
        }
    });
    
    // Also allow searching by pressing Enter
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Initial fetch of apps
    fetchAndDisplayApps();
});
