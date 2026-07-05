function loadDashboard() {

    document.getElementById("checkins").innerText = HotelData.stats.checkins;
    document.getElementById("checkouts").innerText = HotelData.stats.checkouts;
    document.getElementById("pending").innerText = HotelData.stats.pending;
    document.getElementById("revenue").innerText = "₹" + HotelData.stats.revenue;

    const table = document.getElementById("bookingTable");

    table.innerHTML = "";

    HotelData.bookings.forEach(b => {

        let color = "";

        if (b.status === "Confirmed") color = "green";
        if (b.status === "Pending") color = "orange";
        if (b.status === "Cancelled") color = "red";
        if (b.status === "Completed") color = "blue";

        table.innerHTML += `
            <tr>
                <td>${b.guest}</td>
                <td>${b.room}</td>
                <td style="color:${color}; font-weight:bold;">
                    ${b.status}
                </td>
            </tr>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadDashboard);
