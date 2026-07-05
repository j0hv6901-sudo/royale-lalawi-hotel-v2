const Auth = {
    // Save login state (temporary system for now)
    login: function(user) {
        localStorage.setItem("hotel_user", JSON.stringify(user));
    },

    // Get current user
    getUser: function() {
        return JSON.parse(localStorage.getItem("hotel_user"));
    },

    // Logout user
    logout: function() {
        localStorage.removeItem("hotel_user");
        window.location.href = "login.html";
    },

    // Protect pages (IMPORTANT)
    requireAuth: function() {
        const user = this.getUser();
        if (!user) {
            window.location.href = "login.html";
        }
    }
};
