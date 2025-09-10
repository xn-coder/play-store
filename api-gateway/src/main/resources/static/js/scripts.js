document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");

    const loadContent = async (url) => {
        try {
            const response = await fetch(url);
            const content = await response.text();
            mainContent.innerHTML = content;
            attachFormListeners();

            if (url.endsWith("/apps.html")) {
                await loadApps();
            }
        } catch (error) {
            console.error("Error loading content:", error);
            mainContent.innerHTML = "<p>Error loading page.</p>";
        }
    };

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
                    loadContent("/login.html");
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
                    loadContent("/home.html");
                } else {
                    alert("Login failed.");
                }
            });
        }
    };

    document.body.addEventListener("click", (event) => {
        if (event.target.tagName === 'A') {
            const href = event.target.getAttribute("href");

            // Handle internal links
            if (href && !href.startsWith("http")) {
                event.preventDefault();
                history.pushState(null, "", href);
                loadContent(href);
            }
        }
    });

    // Handle back/forward buttons
    window.addEventListener("popstate", () => {
        loadContent(location.pathname);
    });

    // Load initial content
    loadContent(location.pathname === "/" ? "/home.html" : location.pathname);
});