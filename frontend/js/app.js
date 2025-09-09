// Play Store Frontend JavaScript

// Global State
let currentUser = null;
let currentUserType = null; // 'user' or 'owner'
let authToken = null;
let currentApps = [];
let API_URLS = {};

// const USER_API_URL = "localhost:8081"

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Initialize API URLs from config
    API_URLS = window.apiConfig.getApiUrls();

    console.log(API_URLS);
    
    
    // Check API connectivity
    checkApiConnectivity();
    
    // Check auth status and load initial data
    checkAuthStatus();
    loadApps();
});

// API Connectivity Check
async function checkApiConnectivity() {
    try {
        const results = await window.apiConfig.testConnectivity();
        const hasIssues = Object.values(results).some(status => !status);
        
        if (hasIssues) {
            showConnectionStatus('Some services may be unavailable. Please ensure all backend services are running.', 'warning');
        }
    } catch (error) {
        showConnectionStatus('Unable to connect to backend services. Please check if services are running.', 'danger');
    }
}

function showConnectionStatus(message, type) {
    const statusBanner = document.getElementById('connectionStatus');
    const messageSpan = document.getElementById('connectionMessage');
    
    statusBanner.className = `alert alert-${type} alert-dismissible`;
    messageSpan.textContent = message;
    statusBanner.classList.remove('d-none');
}

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
    // event.target.classList.add('active');
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

// Enhanced API call function with better error handling
async function makeApiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Authentication API Calls
async function userLogin(event) {
    event.preventDefault();
    const username = document.getElementById('userLoginUsername').value;
    const password = document.getElementById('userLoginPassword').value;
    
    showLoading(true);
    try {
        const response = await makeApiCall(`${API_URLS.USER_API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        handleAuthSuccess(response, 'user');
    } catch (error) {
        showAlert('Login failed: ' + error.message, 'danger');
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
        const response = await makeApiCall(`${API_URLS.USER_API_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });
        
        handleAuthSuccess(response, 'user');
    } catch (error) {
        showAlert('Registration failed: ' + error.message, 'danger');
    }
    showLoading(false);
}

async function ownerLogin(event) {
    event.preventDefault();
    const username = document.getElementById('ownerLoginUsername').value;
    const password = document.getElementById('ownerLoginPassword').value;
    
    showLoading(true);
    try {
        const response = await makeApiCall(`${API_URLS.OWNER_API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        handleAuthSuccess(response, 'owner');
    } catch (error) {
        showAlert('Login failed: ' + error.message, 'danger');
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
        const response = await makeApiCall(`${API_URLS.OWNER_API_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ username, email, password, companyName })
        });
        
        handleAuthSuccess(response, 'owner');
    } catch (error) {
        showAlert('Registration failed: ' + error.message, 'danger');
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
        const apps = await makeApiCall(`${API_URLS.APP_API_URL}`);
        currentApps = apps;
        displayApps(apps);
    } catch (error) {
        showAlert('Failed to load apps: ' + error.message, 'danger');
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

// App Details and Reviews
let currentAppId = null;

async function showAppDetails(appId) {
    try {
        showLoading(true);
        
        // Fetch app details
        const app = await makeApiCall(`${API_URLS.APP_API_URL}/${appId}`);
        
        // Fetch app reviews
        const reviews = await makeApiCall(`${API_URLS.USER_API_URL}/reviews/app/${appId}`)
            .catch(() => []); // If reviews fail, show empty array
        
        // Fetch average rating
        const averageRating = await makeApiCall(`${API_URLS.USER_API_URL}/reviews/app/${appId}/average-rating`)
            .catch(() => 0); // If rating fails, show 0
        
        currentAppId = appId;
        
        // Update modal content
        document.getElementById("appDetailsTitle").textContent = app.name;
        document.getElementById("appDetailsBody").innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${app.iconUrl || "https://via.placeholder.com/150"}" 
                         alt="${app.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-8">
                    <h6>Description:</h6>
                    <p>${app.description}</p>
                    
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <strong>Version:</strong> ${app.version}
                        </div>
                        <div class="col-sm-6">
                            <strong>Genre:</strong> <span class="genre-badge">${app.genre}</span>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <strong>Downloads:</strong> ${app.downloadCount || 0}
                        </div>
                        <div class="col-sm-6">
                            <strong>Rating:</strong> 
                            <span class="rating-stars">${generateStars(averageRating)}</span>
                            (${typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'})
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-sm-6">
                            <strong>Release Date:</strong> ${new Date(app.releaseDate).toLocaleDateString()}
                        </div>
                        <div class="col-sm-6">
                            <strong>Visibility:</strong> 
                            <span class="badge ${app.visible ? 'bg-success' : 'bg-warning'}">${app.visible ? 'Public' : 'Hidden'}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr>
            
            <!-- Reviews Section -->
            <div class="mt-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6>Reviews (${reviews.length})</h6>
                    ${currentUserType === "user" ? `
                        <button class="btn btn-primary btn-sm" onclick="showReviewForm()">
                            <i class="fas fa-plus"></i> Add Review
                        </button>
                    ` : ""}
                </div>
                
                <!-- Review Form (hidden by default) -->
                <div id="reviewForm" style="display: none;" class="mb-3">
                    <div class="card">
                        <div class="card-body">
                            <form onsubmit="submitReview(event)">
                                <div class="mb-3">
                                    <label class="form-label">Rating:</label>
                                    <select class="form-select" id="reviewRating" required>
                                        <option value="">Select Rating</option>
                                        <option value="5">5 Stars - Excellent</option>
                                        <option value="4">4 Stars - Good</option>
                                        <option value="3">3 Stars - Average</option>
                                        <option value="2">2 Stars - Poor</option>
                                        <option value="1">1 Star - Terrible</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Comment:</label>
                                    <textarea class="form-control" id="reviewComment" rows="3" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit Review</button>
                                <button type="button" class="btn btn-secondary" onclick="hideReviewForm()">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <!-- Reviews List -->
                <div id="reviewsList">
                    ${reviews.length > 0 ? reviews.map(review => `
                        <div class="card mb-2">
                            <div class="card-body review-card">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <strong>${review.username || "Anonymous"}</strong>
                                        <span class="review-rating ms-2">${generateStars(review.rating)}</span>
                                    </div>
                                    <small class="text-muted">${new Date(review.createdAt).toLocaleDateString()}</small>
                                </div>
                                <p class="mt-2 mb-0">${review.comment}</p>
                            </div>
                        </div>
                    `).join("") : "<p class='text-muted'>No reviews yet.</p>"}
                </div>
            </div>
        `;
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById("appDetailsModal"));
        modal.show();
        
    } catch (error) {
        showAlert("Error loading app details: " + error.message, "danger");
    }
    showLoading(false);
}

function showReviewForm() {
    document.getElementById("reviewForm").style.display = "block";
}

function hideReviewForm() {
    document.getElementById("reviewForm").style.display = "none";
    document.getElementById("reviewRating").value = "";
    document.getElementById("reviewComment").value = "";
}

async function submitReview(event) {
    event.preventDefault();
    
    if (!authToken) {
        showAlert("Please login to submit a review", "warning");
        return;
    }
    
    const rating = parseInt(document.getElementById("reviewRating").value);
    const comment = document.getElementById("reviewComment").value;
    
    try {
        showLoading(true);
        await makeApiCall(`${API_URLS.USER_API_URL}/reviews`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                appId: currentAppId,
                rating: rating,
                comment: comment
            })
        });
        
        showAlert("Review submitted successfully!", "success");
        hideReviewForm();
        // Refresh app details to show new review
        showAppDetails(currentAppId);
    } catch (error) {
        showAlert("Failed to submit review: " + error.message, "danger");
    }
    showLoading(false);
}

async function downloadApp() {
    if (!currentAppId) return;
    
    try {
        showLoading(true);
        await makeApiCall(`${API_URLS.APP_API_URL}/${currentAppId}/download`, {
            method: "POST"
        });
        
        showAlert("Download started! Thank you for downloading.", "success");
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("appDetailsModal"));
        modal.hide();
    } catch (error) {
        showAlert("Download failed: " + error.message, "danger");
    }
    showLoading(false);
}

// Owner App Management
async function loadOwnerApps() {
    if (currentUserType !== "owner" || !authToken) return;
    
    try {
        showLoading(true);
        const apps = await makeApiCall(`${API_URLS.APP_API_URL}/my-apps`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        
        displayOwnerApps(apps);
    } catch (error) {
        showAlert("Failed to load your apps: " + error.message, "danger");
    }
    showLoading(false);
}

function displayOwnerApps(apps) {
    const appsGrid = document.getElementById("myAppsGrid");
    appsGrid.innerHTML = "";
    
    if (apps.length === 0) {
        appsGrid.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    <h5>No apps yet!</h5>
                    <p>Click "Add New App" to create your first application.</p>
                </div>
            </div>
        `;
        return;
    }
    
    apps.forEach(app => {
        const appCard = createOwnerAppCard(app);
        appsGrid.appendChild(appCard);
    });
}

function createOwnerAppCard(app) {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4";
    
    col.innerHTML = `
        <div class="card app-card">
            <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                    <img src="${app.iconUrl || "https://via.placeholder.com/80"}" 
                         alt="${app.name}" class="app-icon me-3">
                    <div class="flex-grow-1">
                        <h5 class="card-title mb-1">${app.name}</h5>
                        <span class="genre-badge">${app.genre}</span>
                        ${app.visible ? 
                            "<span class='badge bg-success ms-2'>Visible</span>" : 
                            "<span class='badge bg-warning ms-2'>Hidden</span>"
                        }
                    </div>
                </div>
                <p class="card-text">${app.description.substring(0, 100)}...</p>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <small class="download-count">
                        <i class="fas fa-download"></i> ${app.downloadCount || 0} downloads
                    </small>
                    <small class="text-muted">v${app.version}</small>
                </div>
                <div class="btn-group w-100" role="group">
                    <button class="btn btn-outline-primary btn-sm" onclick="editApp(${app.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="toggleAppVisibility(${app.id}, ${app.visible})">
                        <i class="fas fa-eye${app.visible ? "-slash" : ""}"></i> ${app.visible ? "Hide" : "Show"}
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteApp(${app.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// User Reviews Management
async function loadMyReviews() {
    if (currentUserType !== "user" || !authToken) return;
    
    try {
        showLoading(true);
        const reviews = await makeApiCall(`${API_URLS.USER_API_URL}/reviews/my-reviews`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        
        displayMyReviews(reviews);
    } catch (error) {
        showAlert("Failed to load your reviews: " + error.message, "danger");
    }
    showLoading(false);
}

function displayMyReviews(reviews) {
    const reviewsList = document.getElementById("myReviewsList");
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = `
            <div class="alert alert-info">
                <h5>No reviews yet!</h5>
                <p>Start reviewing apps to see your reviews here.</p>
            </div>
        `;
        return;
    }
    
    reviewsList.innerHTML = reviews.map(review => `
        <div class="card mb-3 review-card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="card-title">${review.appName || `App ID: ${review.appId}`}</h6>
                        <div class="review-rating mb-2">
                            ${generateStars(review.rating)} (${review.rating}/5)
                        </div>
                        <p class="card-text">${review.comment}</p>
                    </div>
                    <small class="text-muted">${new Date(review.createdAt).toLocaleDateString()}</small>
                </div>
            </div>
        </div>
    `).join("");
}

// Add New App Modal and Functions
function showAddAppForm() {
    if (currentUserType !== "owner") return;
    
    // Create modal for adding new app
    const modalHtml = `
        <div class="modal fade" id="addAppModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New App</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addAppForm" onsubmit="submitApp(event)">
                            <div class="mb-3">
                                <label for="appName" class="form-label">App Name</label>
                                <input type="text" class="form-control" id="appName" required>
                            </div>
                            <div class="mb-3">
                                <label for="appDescription" class="form-label">Description</label>
                                <textarea class="form-control" id="appDescription" rows="3" required></textarea>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="appVersion" class="form-label">Version</label>
                                        <input type="text" class="form-control" id="appVersion" placeholder="1.0.0" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="appGenre" class="form-label">Genre</label>
                                        <select class="form-select" id="appGenre" required>
                                            <option value="">Select Genre</option>
                                            <option value="games">Games</option>
                                            <option value="beauty">Beauty</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="women">Women</option>
                                            <option value="health">Health</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="appIconUrl" class="form-label">Icon URL (optional)</label>
                                <input type="url" class="form-control" id="appIconUrl" placeholder="https://example.com/icon.png">
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="appVisible" checked>
                                <label class="form-check-label" for="appVisible">
                                    Make app visible to users
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" form="addAppForm" class="btn btn-success">Create App</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById("addAppModal");
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("addAppModal"));
    modal.show();
}

async function submitApp(event) {
    event.preventDefault();
    
    const appData = {
        name: document.getElementById("appName").value,
        description: document.getElementById("appDescription").value,
        version: document.getElementById("appVersion").value,
        genre: document.getElementById("appGenre").value,
        iconUrl: document.getElementById("appIconUrl").value,
        visible: document.getElementById("appVisible").checked
    };
    
    try {
        showLoading(true);
        await makeApiCall(`${API_URLS.APP_API_URL}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(appData)
        });
        
        showAlert("App created successfully!", "success");
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("addAppModal"));
        modal.hide();
        
        // Refresh owner apps
        loadOwnerApps();
    } catch (error) {
        showAlert("Failed to create app: " + error.message, "danger");
    }
    showLoading(false);
}

// ENHANCED: Edit App functionality - now properly implemented
async function editApp(appId) {
    if (currentUserType !== "owner" || !authToken) return;
    
    try {
        showLoading(true);
        
        // First fetch the app details
        const app = await makeApiCall(`${API_URLS.APP_API_URL}/${appId}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        
        // Create edit modal with pre-filled data
        const modalHtml = `
            <div class="modal fade" id="editAppModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit App: ${app.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editAppForm" onsubmit="submitEditApp(event, ${appId})">
                                <div class="mb-3">
                                    <label for="editAppName" class="form-label">App Name</label>
                                    <input type="text" class="form-control" id="editAppName" value="${app.name}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="editAppDescription" class="form-label">Description</label>
                                    <textarea class="form-control" id="editAppDescription" rows="3" required>${app.description}</textarea>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="editAppVersion" class="form-label">Version</label>
                                            <input type="text" class="form-control" id="editAppVersion" value="${app.version}" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="editAppGenre" class="form-label">Genre</label>
                                            <select class="form-select" id="editAppGenre" required>
                                                <option value="">Select Genre</option>
                                                <option value="games" ${app.genre === 'games' ? 'selected' : ''}>Games</option>
                                                <option value="beauty" ${app.genre === 'beauty' ? 'selected' : ''}>Beauty</option>
                                                <option value="fashion" ${app.genre === 'fashion' ? 'selected' : ''}>Fashion</option>
                                                <option value="women" ${app.genre === 'women' ? 'selected' : ''}>Women</option>
                                                <option value="health" ${app.genre === 'health' ? 'selected' : ''}>Health</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="editAppIconUrl" class="form-label">Icon URL (optional)</label>
                                    <input type="url" class="form-control" id="editAppIconUrl" value="${app.iconUrl || ''}" placeholder="https://example.com/icon.png">
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="editAppVisible" ${app.visible ? 'checked' : ''}>
                                    <label class="form-check-label" for="editAppVisible">
                                        Make app visible to users
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" form="editAppForm" class="btn btn-primary">Update App</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if present
        const existingModal = document.getElementById("editAppModal");
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to page
        document.body.insertAdjacentHTML("beforeend", modalHtml);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById("editAppModal"));
        modal.show();
        
    } catch (error) {
        showAlert("Failed to load app details for editing: " + error.message, "danger");
    }
    showLoading(false);
}

async function submitEditApp(event, appId) {
    event.preventDefault();
    
    const appData = {
        name: document.getElementById("editAppName").value,
        description: document.getElementById("editAppDescription").value,
        version: document.getElementById("editAppVersion").value,
        genre: document.getElementById("editAppGenre").value,
        iconUrl: document.getElementById("editAppIconUrl").value,
        visible: document.getElementById("editAppVisible").checked
    };
    
    try {
        showLoading(true);
        await makeApiCall(`${API_URLS.APP_API_URL}/${appId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(appData)
        });
        
        showAlert("App updated successfully!", "success");
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("editAppModal"));
        modal.hide();
        
        // Refresh owner apps
        loadOwnerApps();
    } catch (error) {
        showAlert("Failed to update app: " + error.message, "danger");
    }
    showLoading(false);
}

async function toggleAppVisibility(appId, currentVisibility) {
    try {
        showLoading(true);
        await makeApiCall(`${API_URLS.APP_API_URL}/${appId}/visibility?visible=${!currentVisibility}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        
        showAlert(`App ${!currentVisibility ? "shown" : "hidden"} successfully!`, "success");
        loadOwnerApps(); // Refresh the list
    } catch (error) {
        showAlert("Failed to update app visibility: " + error.message, "danger");
    }
    showLoading(false);
}

async function deleteApp(appId) {
    if (!confirm("Are you sure you want to delete this app? This action cannot be undone.")) {
        return;
    }
    
    try {
        showLoading(true);
        await makeApiCall(`${API_URLS.APP_API_URL}/${appId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        
        showAlert("App deleted successfully!", "success");
        loadOwnerApps(); // Refresh the list
    } catch (error) {
        showAlert("Failed to delete app: " + error.message, "danger");
    }
    showLoading(false);
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