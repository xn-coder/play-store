
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
        const url = type === 'user' ? `${config.apiGatewayUrl}/api/users/auth/login` : `${config.apiGatewayUrl}/api/owners/auth/login`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Login failed');
            }
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', type);
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    }
});
