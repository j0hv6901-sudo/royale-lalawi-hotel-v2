let unsubscribeDashboard = null;

async function loadDashboard() {
    const table = document.getElementById("bookingTable");
    if (!table) return;

    // 🚨 prevent duplicate listeners (IMPORTANT FIX)
    if (unsubscribeDashboard) {
        unsubscribeDashboard();
        unsubscribeDashboard = null;
    }

    const bookingsRef = firebaseAPI.collection(db, "bookings");

    unsubscribeDashboard = firebaseAPI.onSnapshot(
        bookingsRef,
        (snapshot) => {

            let checkins = 0;
            let checkouts = 0;
            let pending = 0;
            let revenue = 0;

            let rows = "";

            snapshot.forEach((docSnap) => {
                const b = docSnap.data();

                // SAFE DEFAULTS
                const guestName = b.guestName ?? "N/A";
                const roomName = b.roomName ?? "N/A";
                const checkIn = b.checkIn ?? "-";
                const checkOut = b.checkOut ?? "-";
                const status = b.status ?? "Pending";

                // STATUS COUNTERS
                if (status === "Checked In") checkins++;
                else if (status === "Checked Out") checkouts++;
                else pending++;

                // SAFE REVENUE PARSING (V2 FIX)
                const amount = Number(
                    String(b.total ?? 0).replace(/[^\d.]/g, "")
                );

                revenue += isNaN(amount) ? 0 : amount;

                // ROW BUILDING
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

            // SINGLE DOM UPDATE (PERFORMANCE)
            table.innerHTML = rows || `
                <tr>
                    <td colspan="5">No bookings found</td>
                </tr>
            `;

            // SAFE UI UPDATER
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

// AUTO START
document.addEventListener("DOMContentLoaded", loadDashboard);
