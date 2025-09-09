// API Configuration for Play Store Frontend
// This file handles API URLs and configuration for different environments

class ApiConfig {
    constructor() {
        // Detect if running on Windows localhost
        this.isWindows = navigator.platform.indexOf('Win') > -1;
        
        // Base URLs - can be overridden by environment variables or detection
        this.detectApiUrls();
    }

    detectApiUrls() {
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        // For development - try to detect if services are running on different ports
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            this.API_BASE_URL = `${protocol}//${hostname}:8080`;
            this.USER_API_URL = `${this.API_BASE_URL}/api/users`;
            this.OWNER_API_URL = `${this.API_BASE_URL}/api/owners`;
            this.APP_API_URL = `${this.API_BASE_URL}/api/apps`;
            this.NOTIFICATION_API_URL = `${this.API_BASE_URL}/api/notifications`;
            
            // Direct service URLs for fallback testing
            this.USER_SERVICE_DIRECT = `${protocol}//${hostname}:8081/api/users`;
            this.OWNER_SERVICE_DIRECT = `${protocol}//${hostname}:8082/api/owners`;
            this.APP_SERVICE_DIRECT = `${protocol}//${hostname}:8082/api/apps`;
        } else {
            // Production URLs
            this.API_BASE_URL = `${protocol}//${hostname}`;
            this.USER_API_URL = `${this.API_BASE_URL}/api/users`;
            this.OWNER_API_URL = `${this.API_BASE_URL}/api/owners`;
            this.APP_API_URL = `${this.API_BASE_URL}/api/apps`;
            this.NOTIFICATION_API_URL = `${this.API_BASE_URL}/api/notifications`;
        }
    }

    // Method to test API connectivity
    async testConnectivity() {
        const endpoints = [
            { name: 'API Gateway', url: `${this.API_BASE_URL}/actuator/health` },
            { name: 'User Service', url: `${this.USER_API_URL}/health` },
            { name: 'Owner Service', url: `${this.OWNER_API_URL}/health` }
        ];

        const results = {};
        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint.url, { method: 'GET' });
                results[endpoint.name] = response.ok;
            } catch (error) {
                results[endpoint.name] = false;
            }
        }
        return results;
    }

    // Get API URLs
    getApiUrls() {
        return {
            API_BASE_URL: this.API_BASE_URL,
            USER_API_URL: this.USER_API_URL,
            OWNER_API_URL: this.OWNER_API_URL,
            APP_API_URL: this.APP_API_URL,
            NOTIFICATION_API_URL: this.NOTIFICATION_API_URL
        };
    }
}

// Export singleton instance
const apiConfig = new ApiConfig();
window.apiConfig = apiConfig;