
// LOAD DASHBOARD (FIREBASE VERSION)
async function loadDashboard() {

    let checkins = 0;
    let checkouts = 0;
    let pending = 0;
    let revenue = 0;

    const snapshot = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "bookings")
    );

    const table = document.getElementById("bookingTable");
    table.innerHTML = "";

    snapshot.forEach(docSnap => {
        const b = docSnap.data();

        // STATS CALCULATION
        if (b.status === "Confirmed") checkins++;
        if (b.status === "Completed") checkouts++;
        if (b.status === "Pending") pending++;

        // OPTIONAL: revenue example (if you later store price)
        if (b.amount) revenue += Number(b.amount);

        // STATUS COLOR
        let color = "";

        if (b.status === "Confirmed") color = "green";
        else if (b.status === "Pending") color = "orange";
        else if (b.status === "Cancelled") color = "red";
        else if (b.status === "Completed") color = "blue";

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

    // UPDATE UI STATS
    document.getElementById("checkins").innerText = checkins;
    document.getElementById("checkouts").innerText = checkouts;
    document.getElementById("pending").innerText = pending;
    document.getElementById("revenue").innerText = "₹" + revenue;
}


// AUTO LOAD
document.addEventListener("DOMContentLoaded", loadDashboard);
