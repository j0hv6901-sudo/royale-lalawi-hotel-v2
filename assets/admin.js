function loadDashboard() {

    // Update stats
    document.getElementById("checkins").innerText = HotelData.stats.checkins;
    document.getElementById("checkouts").innerText = HotelData.stats.checkouts;
    document.getElementById("pending").innerText = HotelData.stats.pending;
    document.getElementById("revenue").innerText = "₹" + HotelData.stats.revenue;

    // Load bookings table
    const table = document.getElementById("bookingTable");

    table.innerHTML = "";

    HotelData.bookings.forEach(b => {
        table.innerHTML += `
            <tr>
                <td>${b.guest}</td>
                <td>${b.room}</td>
                <td>${b.status}</td>
            </tr>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadDashboard);
