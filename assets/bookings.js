// ADD NEW BOOKING (FIREBASE + ROOM LINK)
async function addBooking(guest, roomName, status = "Pending") {

    // 1. Create booking in Firestore
    await firebaseAPI.addDoc(
        firebaseAPI.collection(db, "bookings"),
        {
            guest,
            room: roomName,
            status,
            date: new Date().toISOString().split("T")[0]
        }
    );

    // 2. Mark room as BOOKED
    const roomsSnap = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "rooms")
    );

    roomsSnap.forEach(async (docSnap) => {
        const room = docSnap.data();

        if (room.roomName === roomName) {

            await firebaseAPI.updateDoc(
                docSnap.ref,
                {
                    status: "Booked"
                }
            );
        }
    });

    // refresh UI
    if (typeof loadBookings === "function") loadBookings();
    if (typeof loadRooms === "function") loadRooms();
}


// UPDATE BOOKING STATUS
async function updateBookingStatus(id, newStatus) {

    const bookingsSnap = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "bookings")
    );

    bookingsSnap.forEach(async (docSnap) => {

        if (docSnap.id === id) {

            await firebaseAPI.updateDoc(
                docSnap.ref,
                {
                    status: newStatus
                }
            );
        }
    });

    // refresh UI
    if (typeof loadBookings === "function") loadBookings();
}


// LIVE STATS (FIREBASE VERSION)
async function updateStats() {

    let checkins = 0;
    let checkouts = 0;
    let pending = 0;

    const snapshot = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "bookings")
    );

    snapshot.forEach(docSnap => {
        const b = docSnap.data();

        if (b.status === "Confirmed") checkins++;
        if (b.status === "Completed") checkouts++;
        if (b.status === "Pending") pending++;
    });

    // If you still use dashboard stats UI
    if (window.dashboardStats) {
        window.dashboardStats.checkins = checkins;
        window.dashboardStats.checkouts = checkouts;
        window.dashboardStats.pending = pending;
    }

    if (typeof loadDashboard === "function") {
        loadDashboard();
    }
}
