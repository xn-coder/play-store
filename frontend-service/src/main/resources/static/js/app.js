
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const appList = document.getElementById('appList');
    const featuredAppList = document.getElementById('featuredAppList');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutButton = document.getElementById('logoutButton');
    const publishAppForm = document.getElementById('publishAppForm');
    const publishAppButton = document.getElementById('publishAppButton');

    let allApps = JSON.parse(localStorage.getItem('apps')) || [];

    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (token) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutButton.style.display = 'block';
        if (userType === 'owner') {
            publishAppButton.style.display = 'block';
        }
    } else {
        publishAppButton.style.display = 'none';
    }

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        window.location.reload();
    });

    publishAppButton.addEventListener('click', function() {
        publishAppForm.style.display = 'block';
    });

    publishAppForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const appName = document.getElementById('appName').value;
        const appDescription = document.getElementById('appDescription').value;
        const appCategory = document.getElementById('appCategory').value;
        const newApp = { name: appName, description: appDescription, category: appCategory, owner: localStorage.getItem('userEmail') };
        allApps.push(newApp);
        localStorage.setItem('apps', JSON.stringify(allApps));
        publishAppForm.style.display = 'none';
        fetchAndDisplayApps();
    });

    function displayApps(apps, listElement) {
        listElement.innerHTML = '';
        if (apps.length === 0) {
            listElement.innerHTML = '<p>No apps found.</p>';
            return;
        }
        apps.forEach(app => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';
            const iconUrl = app.iconUrl || '/images/default-icon.png';
            appItem.innerHTML = `
                <img src="${iconUrl}" alt="${app.name}">
                <h3>${app.name}</h3>
                <p>${app.category || 'General'}</p>
                <button class="install-button" data-app-name="${app.name}">Install</button>
            `;
            listElement.appendChild(appItem);
        });

        document.querySelectorAll('.install-button').forEach(button => {
            button.addEventListener('click', function() {
                const appName = this.getAttribute('data-app-name');
                installApp(appName);
            });
        });
    }

    function installApp(appName) {
        if (!localStorage.getItem('token')) {
            alert('Please login to install apps.');
            return;
        }
        let installedApps = JSON.parse(localStorage.getItem('installedApps')) || [];
        if (installedApps.includes(appName)) {
            alert('App already installed.');
        } else {
            installedApps.push(appName);
            localStorage.setItem('installedApps', JSON.stringify(installedApps));
            alert('App installed successfully.');
        }
    }

    function fetchAndDisplayApps() {
        allApps = JSON.parse(localStorage.getItem('apps')) || [];
        const featuredApps = allApps.slice(0, 4);
        displayApps(featuredApps, featuredAppList);
        displayApps(allApps, appList);
    }

    function searchApps(query) {
        const normalizedQuery = query.toLowerCase();
        const filteredApps = allApps.filter(app =>
            app.name.toLowerCase().includes(normalizedQuery)
        );
        document.querySelector('.featured-apps').style.display = 'none';
        const allAppsContainer = document.querySelector('.app-list-container');
        allAppsContainer.querySelector('h2').textContent = `Search Results for "${query}"`;
        displayApps(filteredApps, appList);
    }

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            searchApps(query);
        } else {
            document.querySelector('.featured-apps').style.display = 'block';
            document.querySelector('.app-list-container h2').textContent = 'All Apps';
            fetchAndDisplayApps();
        }
    });

    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    fetchAndDisplayApps();
});
