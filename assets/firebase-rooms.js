// LOAD BOOKINGS FROM FIRESTORE
async function loadBookings() {

    const table = document.getElementById("bookingTable");
    table.innerHTML = "";

    const snapshot = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "bookings")
    );

    if (snapshot.empty) {
        table.innerHTML = `
            <tr>
                <td colspan="3">No Bookings Yet</td>
            </tr>
        `;
        return;
    }

    snapshot.forEach(docSnap => {
        const b = docSnap.data();

        table.innerHTML += `
            <tr>
                <td>${b.guest}</td>
                <td>${b.room}</td>
                <td>${b.status}</td>
            </tr>
        `;
    });
}

// ADD BOOKING TO FIREBASE
async function addBooking(guest, room) {

    await firebaseAPI.addDoc(
        firebaseAPI.collection(db, "bookings"),
        {
            guest: guest,
            room: room,
            status: "Pending",
            date: new Date().toISOString()
        }
    );

    loadBookings(); // refresh UI
}

document.addEventListener("DOMContentLoaded", loadBookings);
