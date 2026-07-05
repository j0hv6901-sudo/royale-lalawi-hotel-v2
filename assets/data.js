const HotelData = {

    bookings: [
        {
            id: 1,
            guest: "John Doe",
            room: "Deluxe Room",
            status: "Confirmed",
            date: "2026-07-05"
        }
    ],

    rooms: [
        {
            id: 101,
            name: "Deluxe Room",
            price: 2500,
            capacity: 2,
            status: "Available"
        },
        {
            id: 102,
            name: "Suite Room",
            price: 5000,
            capacity: 4,
            status: "Maintenance"
        }
    ],

    stats: {
        checkins: 1,
        checkouts: 0,
        pending: 1,
        revenue: 2500
    }
};
