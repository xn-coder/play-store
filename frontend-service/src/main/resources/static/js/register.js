document.addEventListener('DOMContentLoaded', function() {
    const userRegisterForm = document.getElementById('userRegisterForm');
    const ownerRegisterForm = document.getElementById('ownerRegisterForm');

    userRegisterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        register(name, email, password, 'user');
    });

    ownerRegisterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('ownerName').value;
        const email = document.getElementById('ownerEmail').value;
        const password = document.getElementById('ownerPassword').value;
        register(name, email, password, 'owner');
    });

    function register(name, email, password, type) {
        const url = type === 'user' ? `${USER_SERVICE_URL}/auth/register` : `${OWNER_SERVICE_URL}/auth/register`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Registration failed');
            }
        })
        .then(data => {
            // Store the token in local storage or session storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userType', type);
            // Redirect to the home page
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    }
});