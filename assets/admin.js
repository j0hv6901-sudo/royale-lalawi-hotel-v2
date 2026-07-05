async function loadDashboard() {
    const table = document.getElementById("bookingTable");
    if (!table) return;

    let checkins = 0;
    let checkouts = 0;
    let pending = 0;
    let revenue = 0;

    // REAL-TIME LISTENER (IMPORTANT UPGRADE)
    firebaseAPI.onSnapshot(
        firebaseAPI.collection(db, "bookings"),
        (snapshot) => {

            checkins = 0;
            checkouts = 0;
            pending = 0;
            revenue = 0;

            let rows = "";

            snapshot.forEach((docSnap) => {
                const b = docSnap.data();

                // SAFE VALUE HANDLING
                const guestName = b.guestName || "N/A";
                const roomName = b.roomName || "N/A";
                const checkIn = b.checkIn || "-";
                const checkOut = b.checkOut || "-";
                const status = b.status || "Pending";

                // STATUS COUNTERS (ROBUST)
                if (status === "Checked In") checkins++;
                else if (status === "Checked Out") checkouts++;
                else pending++;

                // SAFE REVENUE PARSING
                const amount = parseFloat(
                    String(b.total || 0).replace(/[^\d.]/g, "")
                );

                revenue += amount || 0;

                // TABLE ROW
                rows += `
                    <tr>
                        <td>${guestName}</td>
                        <td>${roomName}</td>
                        <td>${checkIn}</td>
                        <td>${checkOut}</td>
                        <td>${status}</td>
                    </tr>
                `;
            });

            // UPDATE TABLE ONCE (PERFORMANCE FIX)
            table.innerHTML = rows || `
                <tr>
                    <td colspan="5">No bookings found</td>
                </tr>
            `;

            // SAFE UI UPDATES
            const setText = (id, value) => {
                const el = document.getElementById(id);
                if (el) el.innerText = value;
            };

            setText("checkins", checkins);
            setText("checkouts", checkouts);
            setText("pending", pending);
            setText("revenue", "₹" + revenue.toLocaleString());
        }
    );
}

// AUTO LOAD
document.addEventListener("DOMContentLoaded", loadDashboard);
