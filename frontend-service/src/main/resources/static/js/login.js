
document.addEventListener('DOMContentLoaded', function() {
    const userToggle = document.getElementById('userToggle');
    const ownerToggle = document.getElementById('ownerToggle');
    const userLoginForm = document.getElementById('userLoginForm');
    const ownerLoginForm = document.getElementById('ownerLoginForm');

    userToggle.addEventListener('click', () => {
        userToggle.classList.add('active');
        ownerToggle.classList.remove('active');
        userLoginForm.style.display = 'block';
        ownerLoginForm.style.display = 'none';
    });

    ownerToggle.addEventListener('click', () => {
        ownerToggle.classList.add('active');
        userToggle.classList.remove('active');
        ownerLoginForm.style.display = 'block';
        userLoginForm.style.display = 'none';
    });

    userLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        login(email, password, 'user');
    });

    ownerLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('ownerEmail').value;
        const password = document.getElementById('ownerPassword').value;
        login(email, password, 'owner');
    });

    function login(email, password, type) {
        let users = localStorage.getItem(type + 's');
        if (users) {
            users = JSON.parse(users);
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('token', 'dummy-token');
                localStorage.setItem('userType', type);
                localStorage.setItem('userEmail', email);
                window.location.href = '/';
            } else {
                alert('Invalid credentials');
            }
        } else {
            alert('No users found. Please register first.');
        }
    }
});
