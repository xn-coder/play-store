document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedApps();
});

function loadFeaturedApps() {
    const appGrid = document.querySelector('.featured-apps .app-grid');
    const allApps = JSON.parse(localStorage.getItem('apps')) || [];

    appGrid.innerHTML = '';
    if (allApps.length === 0) {
        appGrid.innerHTML = '<p>No apps to display.</p>';
        return;
    }

    allApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <span>$${app.price.toFixed(2)}</span>
        `;
        appGrid.appendChild(card);
    });
}