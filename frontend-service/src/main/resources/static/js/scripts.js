document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners based on the current page
    const page = document.body.dataset.page;

    if (page === 'register') {
        setupRegistrationForm();
    } else if (page === 'login') {
        setupLoginForm();
    } else if (page === 'owner-dashboard') {
        setupOwnerDashboard();
    } else if (page === 'apps' || page === 'games') {
        loadApps(page);
    }
});

function setupRegistrationForm() {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Registration logic here
        console.log('Registration form submitted');
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Login logic here
        console.log('Login form submitted');
    });
}

function setupOwnerDashboard() {
    const uploadForm = document.getElementById('upload-app-form');
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // App upload logic here
        console.log('Upload app form submitted');
    });

    loadOwnerApps();
}

async function loadOwnerApps() {
    const tbody = document.getElementById('owner-apps-tbody');
    // Mock data for now
    const apps = [
        { name: 'My Awesome App', description: 'This is a great app.', price: 1.99, category: 'Productivity' },
        { name: 'Another Cool App', description: 'Even cooler than the last one.', price: 0.99, category: 'Social' },
    ];

    tbody.innerHTML = '';
    apps.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.description}</td>
            <td>$${app.price.toFixed(2)}</td>
            <td>${app.category}</td>
            <td><button>Edit</button> <button>Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

async function loadApps(category) {
    const appGrid = document.querySelector('.app-grid');
    // Mock data for now
    const apps = [
        { name: 'App One', description: 'Description for app one.', price: 0.99, category: 'Apps' },
        { name: 'Game One', description: 'Description for game one.', price: 2.99, category: 'Games' },
        { name: 'App Two', description: 'Description for app two.', price: 1.99, category: 'Apps' },
    ];

    const filteredApps = apps.filter(app => app.category.toLowerCase() === category);

    appGrid.innerHTML = '';
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
