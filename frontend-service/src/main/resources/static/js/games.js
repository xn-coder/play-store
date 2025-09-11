document.addEventListener('DOMContentLoaded', () => {
    loadApps('game');
});

function loadApps(pageCategory) {
    const appGrid = document.querySelector('.app-grid');
    const allApps = JSON.parse(localStorage.getItem('apps')) || [];
    const filteredApps = allApps.filter(app => app.category.toLowerCase() === pageCategory);

    appGrid.innerHTML = '';
    if (filteredApps.length === 0) {
        appGrid.innerHTML = '<p>No games to display in this category.</p>';
        return;
    }
    
    filteredApps.forEach(app => {
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