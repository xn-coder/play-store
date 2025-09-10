
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
        const user = { name, email, password };
        let users = localStorage.getItem(type + 's');
        if (users) {
            users = JSON.parse(users);
        } else {
            users = [];
        }
        users.push(user);
        localStorage.setItem(type + 's', JSON.stringify(users));
        window.location.href = 'login.html';
    }
});
