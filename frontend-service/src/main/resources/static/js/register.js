document.addEventListener('DOMContentLoaded', function() {
    const userRegistrationForm = document.getElementById('userRegistrationForm');
    const ownerRegistrationForm = document.getElementById('ownerRegistrationForm');

    userRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('userUsername').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        register(username, email, password, 'user');
    });

    ownerRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('ownerUsername').value;
        const email = document.getElementById('ownerEmail').value;
        const password = document.getElementById('ownerPassword').value;
        register(username, email, password, 'owner');
    });

    function register(username, email, password, type) {
        const url = type === 'user' ? `/api/users/auth/register` : `/api/owners/auth/register`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
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