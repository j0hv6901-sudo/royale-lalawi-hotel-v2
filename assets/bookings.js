// Add new booking
function addBooking(guest, room, status = "Pending") {

    const newBooking = {
        id: Date.now(),
        guest,
        room,
        status,
        date: new Date().toISOString().split("T")[0]
    };

    HotelData.bookings.push(newBooking);

    updateStats();
}

// Update booking status
function updateBookingStatus(id, newStatus) {

    const booking = HotelData.bookings.find(b => b.id === id);

    if (booking) {
        booking.status = newStatus;
        updateStats();
    }
}

// Recalculate stats
function updateStats() {

    let checkins = 0;
    let checkouts = 0;
    let pending = 0;

    HotelData.bookings.forEach(b => {
        if (b.status === "Confirmed") checkins++;
        if (b.status === "Completed") checkouts++;
        if (b.status === "Pending") pending++;
    });

    HotelData.stats.checkins = checkins;
    HotelData.stats.checkouts = checkouts;
    HotelData.stats.pending = pending;

    // reload dashboard if open
    if (typeof loadDashboard === "function") {
        loadDashboard();
    }
}
