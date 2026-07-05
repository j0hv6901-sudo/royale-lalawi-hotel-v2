// LOAD ROOMS FROM FIRESTORE
async function loadRooms() {

    const table = document.getElementById("roomsTable");
    table.innerHTML = "";

    const snapshot = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "rooms")
    );

    if (snapshot.empty) {
        table.innerHTML = `
            <tr>
                <td colspan="4">No Rooms Found</td>
            </tr>
        `;
        return;
    }

    let rows = "";

    snapshot.forEach(docSnap => {
        const r = docSnap.data();

        rows += `
            <tr>
                <td>${r.roomName}</td>
                <td>₹${r.price}</td>
                <td>${r.status}</td>
                <td>${r.maxGuests}</td>
            </tr>
        `;
    });

    table.innerHTML = rows;
}


// ADD ROOM TO FIREBASE
async function addRoom(roomName, price, maxGuests) {

    await firebaseAPI.addDoc(
        firebaseAPI.collection(db, "rooms"),
        {
            roomName,
            price,
            maxGuests,
            status: "Available",
            createdAt: new Date().toISOString()
        }
    );

    loadRooms(); // refresh UI
}


// AUTO LOAD
document.addEventListener("DOMContentLoaded", loadRooms);
