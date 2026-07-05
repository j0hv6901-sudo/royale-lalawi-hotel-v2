let dashboardState = {
    bookings: [],
    rooms: [],
    checkins: 0,
    checkouts: 0,
    pending: 0,
    revenue: 0
};

let unsubscribeDashboard = null;
async function loadDashboard() {
    const table = document.getElementById("bookingTable");
    if (!table) return;

    // prevent duplicate listeners
    if (unsubscribeDashboard) {
        unsubscribeDashboard();
    }

    const bookingsRef = firebaseAPI.collection(db, "bookings");

    unsubscribeDashboard = firebaseAPI.onSnapshot(
        bookingsRef,
        async (snapshot) => {

            let checkins = 0;
            let checkouts = 0;
            let pending = 0;
            let revenue = 0;

            let rows = [];
            let bookings = [];

            snapshot.forEach((docSnap) => {
                const b = docSnap.data();

                const status = b.status ?? "Pending";

                // counters
                if (status === "Checked In") checkins++;
                else if (status === "Checked Out") checkouts++;
                else pending++;

                // revenue safe parse
                const amount = Number(
                    String(b.total ?? 0).replace(/[^\d.]/g, "")
                );

                revenue += isNaN(amount) ? 0 : amount;

                bookings.push(b);

                rows.push(`
                    <tr>
                        <td>${b.guestName ?? "N/A"}</td>
                        <td>${b.roomName ?? "N/A"}</td>
                        <td>${b.checkIn ?? "-"}</td>
                        <td>${b.checkOut ?? "-"}</td>
                        <td>${status}</td>
                    </tr>
                `);
            });

            // commit state
            dashboardState = {
                ...dashboardState,
                bookings,
                checkins,
                checkouts,
                pending,
                revenue
            };

            // update UI once
            renderDashboard(rows);
            updateStats();
            await syncRoomEngine();
        }
    );
}

document.addEventListener("DOMContentLoaded", loadDashboard);
