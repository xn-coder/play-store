document.addEventListener('DOMContentLoaded', function() {
    const userLoginForm = document.getElementById('userLoginForm');
    const ownerLoginForm = document.getElementById('ownerLoginForm');

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
        const url = type === 'user' ? `${USER_SERVICE_URL}/auth/login` : `${OWNER_SERVICE_URL}/auth/login`;

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