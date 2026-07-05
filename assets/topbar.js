document.getElementById("topbar").innerHTML = `
<div class="topbar-left">
    <h2>Dashboard</h2>
</div>

<div class="topbar-right">

    <!-- Notifications -->
    <div class="icon-btn" title="Notifications">
        <i class="fas fa-bell"></i>
        <span class="badge">3</span>
    </div>

    <!-- Messages (optional future use) -->
    <div class="icon-btn" title="Messages">
        <i class="fas fa-envelope"></i>
    </div>

    <!-- Profile -->
    <div class="profile">
        <img src="https://i.pravatar.cc/40" alt="User">
        <span>Admin</span>
    </div>

    <!-- Logout -->
    <button id="logoutBtn" class="logout-btn">
        Logout
    </button>

</div>
`;
document.addEventListener("click", function(e) {
    if (e.target.closest("#logoutBtn")) {
        Auth.logout();
    }
});
