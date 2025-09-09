// Play Store Frontend JavaScript

// API Configuration
const API_BASE_URL = 'http://localhost:8080';
const USER_API_URL = `${API_BASE_URL}/api/users`;
const OWNER_API_URL = `${API_BASE_URL}/api/owners`;
const APP_API_URL = `${API_BASE_URL}/api/apps`;

// Global State
let currentUser = null;
let currentUserType = null; // 'user' or 'owner'
let authToken = null;
let currentApps = [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    loadApps();
});

// Authentication Functions
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const userType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');
    
    if (token && userType && userData) {
        authToken = token;
        currentUserType = userType;
        currentUser = JSON.parse(userData);
        updateNavigation(true);
        showHome();
    } else {
        updateNavigation(false);
        showLogin();
    }
}

function updateNavigation(isLoggedIn) {
    const loginNavItem = document.getElementById('loginNavItem');
    const logoutNavItem = document.getElementById('logoutNavItem');
    const userNavItems = document.getElementById('userNavItems');
    const ownerNavItems = document.getElementById('ownerNavItems');
    
    if (isLoggedIn) {
        loginNavItem.style.display = 'none';
        logoutNavItem.style.display = 'block';
        
        if (currentUserType === 'user') {
            userNavItems.style.display = 'block';
            ownerNavItems.style.display = 'none';
        } else if (currentUserType === 'owner') {
            ownerNavItems.style.display = 'block';
            userNavItems.style.display = 'none';
        }
    } else {
        loginNavItem.style.display = 'block';
        logoutNavItem.style.display = 'none';
        userNavItems.style.display = 'none';
        ownerNavItems.style.display = 'none';
    }
}

// Page Navigation
function showLogin() {
    hideAllPages();
    document.getElementById('loginPage').style.display = 'block';
    showUserLogin();
}

function showHome() {
    hideAllPages();
    document.getElementById('homePage').style.display = 'block';
    loadApps();
}

function showMyApps() {
    if (currentUserType !== 'owner') return;
    hideAllPages();
    document.getElementById('myAppsPage').style.display = 'block';
    loadOwnerApps();
}

function showMyReviews() {
    if (currentUserType !== 'user') return;
    hideAllPages();
    document.getElementById('myReviewsPage').style.display = 'block';
    loadMyReviews();
}

function hideAllPages() {
    const pages = ['loginPage', 'homePage', 'myAppsPage', 'myReviewsPage'];
    pages.forEach(page => {
        document.getElementById(page).style.display = 'none';
    });
}

// Login/Register Form Management
function showUserLogin() {
    document.getElementById('userLoginForm').style.display = 'block';
    document.getElementById('userRegisterForm').style.display = 'none';
    document.getElementById('ownerLoginForm').style.display = 'none';
    document.getElementById('ownerRegisterForm').style.display = 'none';
    
    // Update tab appearance
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

function showUserRegister() {
    document.getElementById('userLoginForm').style.display = 'none';
    document.getElementById('userRegisterForm').style.display = 'block';
}

function showOwnerLogin() {
    document.getElementById('userLoginForm').style.display = 'none';
    document.getElementById('userRegisterForm').style.display = 'none';
    document.getElementById('ownerLoginForm').style.display = 'block';
    document.getElementById('ownerRegisterForm').style.display = 'none';
    
    // Update tab appearance
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

function showOwnerRegister() {
    document.getElementById('ownerLoginForm').style.display = 'none';
    document.getElementById('ownerRegisterForm').style.display = 'block';
}

// Authentication API Calls
async function userLogin(event) {
    event.preventDefault();
    const username = document.getElementById('userLoginUsername').value;
    const password = document.getElementById('userLoginPassword').value;
    
    showLoading(true);
    try {
        const response = await fetch(`${USER_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            handleAuthSuccess(data, 'user');
        } else {
            const error = await response.text();
            showAlert('Login failed: ' + error, 'danger');
        }
    } catch (error) {
        showAlert('Network error: ' + error.message, 'danger');
    }
    showLoading(false);
}

async function userRegister(event) {
    event.preventDefault();
    const username = document.getElementById('userRegUsername').value;
    const email = document.getElementById('userRegEmail').value;
    const password = document.getElementById('userRegPassword').value;
    
    showLoading(true);
    try {
        const response = await fetch(`${USER_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            handleAuthSuccess(data, 'user');
        } else {
            const error = await response.text();
            showAlert('Registration failed: ' + error, 'danger');
        }
    } catch (error) {
        showAlert('Network error: ' + error.message, 'danger');
    }
    showLoading(false);
}

async function ownerLogin(event) {
    event.preventDefault();
    const username = document.getElementById('ownerLoginUsername').value;
    const password = document.getElementById('ownerLoginPassword').value;
    
    showLoading(true);
    try {
        const response = await fetch(`${OWNER_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            handleAuthSuccess(data, 'owner');
        } else {
            const error = await response.text();
            showAlert('Login failed: ' + error, 'danger');
        }
    } catch (error) {
        showAlert('Network error: ' + error.message, 'danger');
    }
    showLoading(false);
}

async function ownerRegister(event) {
    event.preventDefault();
    const username = document.getElementById('ownerRegUsername').value;
    const email = document.getElementById('ownerRegEmail').value;
    const password = document.getElementById('ownerRegPassword').value;
    const companyName = document.getElementById('ownerRegCompany').value;
    
    showLoading(true);
    try {
        const response = await fetch(`${OWNER_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, companyName })
        });
        
        if (response.ok) {
            const data = await response.json();
            handleAuthSuccess(data, 'owner');
        } else {
            const error = await response.text();
            showAlert('Registration failed: ' + error, 'danger');
        }
    } catch (error) {
        showAlert('Network error: ' + error.message, 'danger');
    }
    showLoading(false);
}

function handleAuthSuccess(data, userType) {
    authToken = data.token;
    currentUser = data;
    currentUserType = userType;
    
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('userType', userType);
    localStorage.setItem('userData', JSON.stringify(data));
    
    updateNavigation(true);
    showHome();
    showAlert('Login successful!', 'success');
}

function logout() {
    authToken = null;
    currentUser = null;
    currentUserType = null;
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    
    updateNavigation(false);
    showLogin();
    showAlert('Logged out successfully!', 'info');
}

// App Management Functions
async function loadApps() {
    showLoading(true);
    try {
        const response = await fetch(`${APP_API_URL}`);
        if (response.ok) {
            const apps = await response.json();
            currentApps = apps;
            displayApps(apps);
        } else {
            showAlert('Failed to load apps', 'danger');
        }
    } catch (error) {
        showAlert('Network error: ' + error.message, 'danger');
    }
    showLoading(false);
}

function displayApps(apps) {
    const appsGrid = document.getElementById('appsGrid');
    appsGrid.innerHTML = '';
    
    if (apps.length === 0) {
        appsGrid.innerHTML = '<div class="col-12"><div class="alert alert-info">No apps found.</div></div>';
        return;
    }
    
    apps.forEach(app => {
        const appCard = createAppCard(app);
        appsGrid.appendChild(appCard);
    });
}

function createAppCard(app) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';
    
    col.innerHTML = `
        <div class="card app-card" onclick="showAppDetails(${app.id})">
            <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                    <img src="${app.iconUrl || 'https://via.placeholder.com/80'}" 
                         alt="${app.name}" class="app-icon me-3">
                    <div>
                        <h5 class="card-title mb-1">${app.name}</h5>
                        <span class="genre-badge">${app.genre}</span>
                    </div>
                </div>
                <p class="card-text">${app.description.substring(0, 100)}...</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="rating-stars">
                        ${generateStars(app.averageRating || 0)}
                    </div>
                    <small class="download-count">
                        <i class="fas fa-download"></i> ${app.downloadCount || 0}
                    </small>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Search and Filter Functions
function searchApps() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredApps = currentApps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm)
    );
    displayApps(filteredApps);
}

function filterApps() {
    const genreFilter = document.getElementById('genreFilter').value;
    const ratingFilter = parseInt(document.getElementById('ratingFilter').value) || 0;
    
    let filteredApps = currentApps;
    
    if (genreFilter) {
        filteredApps = filteredApps.filter(app => 
            app.genre.toLowerCase() === genreFilter.toLowerCase()
        );
    }
    
    if (ratingFilter > 0) {
        filteredApps = filteredApps.filter(app => 
            (app.averageRating || 0) >= ratingFilter
        );
    }
    
    displayApps(filteredApps);
}

// Utility Functions
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Placeholder functions (to be implemented)
function showAppDetails(appId) {
    console.log('Show app details for app:', appId);
    // Implementation will be added
}

function downloadApp() {
    console.log('Download app');
    // Implementation will be added
}

function loadOwnerApps() {
    console.log('Load owner apps');
    // Implementation will be added
}

function loadMyReviews() {
    console.log('Load my reviews');
    // Implementation will be added
}

function showAddAppForm() {
    console.log('Show add app form');
    // Implementation will be added
}