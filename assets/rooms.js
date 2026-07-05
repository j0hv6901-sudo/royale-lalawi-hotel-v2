// Add new room
function addRoom(name, price, capacity) {

    const newRoom = {
        id: Date.now(),
        name,
        price,
        capacity,
        status: "Available"
    };

    HotelData.rooms.push(newRoom);

    loadRooms();
}

// Toggle room status
function toggleRoomStatus(id) {

    const room = HotelData.rooms.find(r => r.id === id);

    if (room) {
        room.status = room.status === "Available" ? "Maintenance" : "Available";
        loadRooms();
    }
}

// Delete room
function deleteRoom(id) {

    HotelData.rooms = HotelData.rooms.filter(r => r.id !== id);

    loadRooms();
}

// Load rooms to UI
function loadRooms() {

    const table = document.getElementById("roomTable");

    if (!table) return;

    table.innerHTML = "";

    HotelData.rooms.forEach(room => {

        let color = room.status === "Available" ? "green" : "red";

        table.innerHTML += `
            <tr>
                <td>${room.name}</td>
                <td>₹${room.price}</td>
                <td>${room.capacity}</td>
                <td style="color:${color}; font-weight:bold;">
                    ${room.status}
                </td>
                <td>
                    <button onclick="toggleRoomStatus(${room.id})">Toggle</button>
                    <button onclick="deleteRoom(${room.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadRooms);
