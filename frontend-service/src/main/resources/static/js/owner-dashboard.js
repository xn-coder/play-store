document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        window.location.href = '/login';
        return;
    }
    loadOwnerApps();
});

function handleUpload(e) {
    e.preventDefault();
    const appName = document.getElementById('app-name').value;
    const appDescription = document.getElementById('app-description').value;
    const appPrice = parseFloat(document.getElementById('app-price').value);
    const appCategory = document.getElementById('app-category').value;
    const owner = JSON.parse(localStorage.getItem('loggedInUser'));

    const apps = JSON.parse(localStorage.getItem('apps')) || [];
    apps.push({
        id: Date.now(),
        name: appName,
        description: appDescription,
        price: appPrice,
        category: appCategory,
        owner: owner.username
    });
    localStorage.setItem('apps', JSON.stringify(apps));
    alert('App uploaded successfully!');
    loadOwnerApps();
    document.getElementById('upload-app-form').reset();
}

function loadOwnerApps() {
    const tbody = document.getElementById('owner-apps-tbody');
    const owner = JSON.parse(localStorage.getItem('loggedInUser'));
    const allApps = JSON.parse(localStorage.getItem('apps')) || [];
    const ownerApps = allApps.filter(app => app.owner === owner.username);

    tbody.innerHTML = '';
    ownerApps.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.description}</td>
            <td>$${app.price.toFixed(2)}</td>
            <td>${app.category}</td>
            <td><button onclick="deleteApp(${app.id})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

function deleteApp(appId) {
    let apps = JSON.parse(localStorage.getItem('apps')) || [];
    apps = apps.filter(app => app.id !== appId);
    localStorage.setItem('apps', JSON.stringify(apps));
    loadOwnerApps();
}