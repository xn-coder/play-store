
document.addEventListener('DOMContentLoaded', function() {
    const userToggle = document.getElementById('userToggle');
    const ownerToggle = document.getElementById('ownerToggle');
    const userRegistrationForm = document.getElementById('userRegistrationForm');
    const ownerRegistrationForm = document.getElementById('ownerRegistrationForm');

    userToggle.addEventListener('click', () => {
        userToggle.classList.add('active');
        ownerToggle.classList.remove('active');
        userRegistrationForm.style.display = 'block';
        ownerRegistrationForm.style.display = 'none';
    });

    ownerToggle.addEventListener('click', () => {
        ownerToggle.classList.add('active');
        userToggle.classList.remove('active');
        ownerRegistrationForm.style.display = 'block';
        userRegistrationForm.style.display = 'none';
    });

    userRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        register(name, email, password, 'user');
    });

    ownerRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('ownerName').value;
        const email = document.getElementById('ownerEmail').value;
        const password = document.getElementById('ownerPassword').value;
        register(name, email, password, 'owner');
    });

    function register(name, email, password, type) {
        const url = type === 'user' ? `${config.apiGatewayUrl}/api/users/auth/register` : `${config.apiGatewayUrl}/api/owners/auth/register`;

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
