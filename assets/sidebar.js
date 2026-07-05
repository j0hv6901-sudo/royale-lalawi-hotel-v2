const currentPage = window.location.pathname.split("/").pop();

document.getElementById("sidebar").innerHTML = `
<aside class="sidebar">

    <div class="logo">
        <h2>Royale Lalawi</h2>
        <p>Hotel HMS</p>
    </div>

    <nav class="menu">

        <a href="dashboard.html" class="menu-item ${currentPage === 'dashboard.html' ? 'active' : ''}">
            <i class="fas fa-chart-line"></i>
            <span>Dashboard</span>
        </a>

        <a href="bookings.html" class="menu-item ${currentPage === 'bookings.html' ? 'active' : ''}">
            <i class="fas fa-calendar-check"></i>
            <span>Bookings</span>
        </a>

        <a href="rooms.html" class="menu-item ${currentPage === 'rooms.html' ? 'active' : ''}">
            <i class="fas fa-bed"></i>
            <span>Rooms</span>
        </a>

        <a href="hall-bookings.html" class="menu-item ${currentPage === 'hall-bookings.html' ? 'active' : ''}">
            <i class="fas fa-building"></i>
            <span>Hall Booking</span>
        </a>

        <a href="offers.html" class="menu-item ${currentPage === 'offers.html' ? 'active' : ''}">
            <i class="fas fa-tags"></i>
            <span>Offers</span>
        </a>

        <a href="customers.html" class="menu-item ${currentPage === 'customers.html' ? 'active' : ''}">
            <i class="fas fa-users"></i>
            <span>Customers</span>
        </a>

        <a href="reports.html" class="menu-item ${currentPage === 'reports.html' ? 'active' : ''}">
            <i class="fas fa-chart-pie"></i>
            <span>Reports</span>
        </a>

        <a href="settings.html" class="menu-item ${currentPage === 'settings.html' ? 'active' : ''}">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
        </a>

    </nav>

</aside>
`;
