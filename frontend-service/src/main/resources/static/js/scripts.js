
document.addEventListener("DOMContentLoaded", () => {
    attachFormListeners();
    loadApps();
});

const loadApps = async () => {
    const appGrid = document.getElementById("app-grid");
    if (!appGrid) return;

    try {
        const response = await fetch("/apps"); // Routed to app-service
        const apps = await response.json();

        appGrid.innerHTML = ""; // Clear placeholder

        apps.forEach(app => {
            const appElement = document.createElement("div");
            appElement.classList.add("app-card"); // For styling
            appElement.innerHTML = `
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <p><strong>Category:</strong> ${app.category}</p>
                <p><strong>Price:</strong> $${app.price.toFixed(2)}</p>
            `;
            appGrid.appendChild(appElement);
        });
    } catch (error) {
        console.error("Error loading apps:", error);
        appGrid.innerHTML = "<p>Could not load apps.</p>";
    }
};

const attachFormListeners = () => {
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;

            const response = await fetch("/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, role }),
            });

            if (response.ok) {
                alert("Registration successful!");
                window.location.href = "/login";
            } else {
                alert("Registration failed.");
            }
        });
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem("user", JSON.stringify(user));
                alert("Login successful!");
                window.location.href = "/home";
            } else {
                alert("Login failed.");
            }
        });
    }
};
