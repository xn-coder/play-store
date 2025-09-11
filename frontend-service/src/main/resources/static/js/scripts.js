document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    const page = document.body.getAttribute('data-page');

    if (page === 'register') {
        setupRegistrationForm();
    } else if (page === 'login') {
        setupLoginForm();
    } else if (page === 'owner-dashboard') {
        if (!isLoggedIn()) {
            window.location.href = '/login';
            return;
        }
        setupOwnerDashboard();
    } else if (page === 'apps' || page === 'games') {
        loadApps(page);
    } else if (page === 'home') {
        // Potentially load featured content
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            updateNav();
            window.location.href = '/login';
        });
    }
});

function setupRegistrationForm() {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.username === username)) {
            alert('Username already exists!');
            return;
        }

        users.push({ username, email, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        window.location.href = '/login';
    });
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert('Login successful!');
            if (user.role === 'owner') {
                window.location.href = '/owner-dashboard';
            } else {
                window.location.href = '/';
            }
        } else {
            alert('Invalid credentials!');
        }
    });
}

function setupOwnerDashboard() {
    const uploadForm = document.getElementById('upload-app-form');
    uploadForm.addEventListener('submit', (e) => {
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
        uploadForm.reset();
    });

    loadOwnerApps();
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

function loadApps(pageCategory) {
    const appGrid = document.querySelector('.app-grid');
    const allApps = JSON.parse(localStorage.getItem('apps')) || [];
    // The category from the form is 'Apps' or 'Games', matching the page name
    const filteredApps = allApps.filter(app => app.category.toLowerCase() === pageCategory.slice(0, -1)); // 'apps' -> 'app'

    appGrid.innerHTML = '';
    if (filteredApps.length === 0) {
        appGrid.innerHTML = '<p>No apps to display in this category.</p>';
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

function isLoggedIn() {
    return !!localStorage.getItem('loggedInUser');
}

function updateNav() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navAuth = document.querySelector('.nav-auth');
    
    if (loggedInUser) {
        navAuth.innerHTML = `
            ${loggedInUser.role === 'owner' ? '<li><a href="/owner-dashboard">Dashboard</a></li>' : ''}
            <li><a href="#" id="logout-btn">Logout</a></li>
        `;
    } else {
        navAuth.innerHTML = `
            <li><a href="/login" class="${document.body.getAttribute('data-page') === 'login' ? 'active' : ''}">Login</a></li>
            <li><a href="/register" class="${document.body.getAttribute('data-page') === 'register' ? 'active' : ''}">Register</a></li>
        `;
    }
}
