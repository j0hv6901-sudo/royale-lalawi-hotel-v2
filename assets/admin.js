async function loadDashboard() {

    const bookingsSnap = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "bookings")
    );

    let checkins = 0;
    let checkouts = 0;
    let pending = 0;
    let revenue = 0;

    const table = document.getElementById("bookingTable");
    table.innerHTML = "";

    bookingsSnap.forEach(docSnap => {
        const b = docSnap.data();

        // Status counters
        if (b.status === "Checked In") checkins++;
        if (b.status === "Checked Out") checkouts++;
        if (b.status === "Pending") pending++;

        revenue += Number(b.total || 0);

        table.innerHTML += `
            <tr>
                <td>${b.guestName}</td>
                <td>${b.roomName}</td>
                <td>${b.checkIn}</td>
                <td>${b.checkOut}</td>
                <td>${b.status}</td>
            </tr>
        `;
    });

    // Update dashboard UI
    document.getElementById("checkins").innerText = checkins;
    document.getElementById("checkouts").innerText = checkouts;
    document.getElementById("pending").innerText = pending;
    document.getElementById("revenue").innerText = "₹" + revenue;
}


// AUTO LOAD
document.addEventListener("DOMContentLoaded", loadDashboard);
