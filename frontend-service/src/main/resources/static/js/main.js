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
         const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('loggedInUser');
                updateNav();
                window.location.href = '/login';
            });
        }
    } else {
        navAuth.innerHTML = `
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        `;
    }
}
