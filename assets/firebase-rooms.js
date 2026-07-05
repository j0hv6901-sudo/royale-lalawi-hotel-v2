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

    snapshot.forEach(docSnap => {
        const r = docSnap.data();

        table.innerHTML += `
            <tr>
                <td>${r.roomName}</td>
                <td>₹${r.price}</td>
                <td>${r.status}</td>
                <td>${r.maxGuests}</td>
            </tr>
        `;
    });
}


// ADD ROOM TO FIREBASE
async function addRoom(roomName, price, maxGuests) {

    await firebaseAPI.addDoc(
        firebaseAPI.collection(db, "rooms"),
        {
            roomName: roomName,
            price: price,
            maxGuests: maxGuests,
            status: "Available",
            createdAt: new Date().toISOString()
        }
    );

    loadRooms(); // refresh UI after adding
}


// AUTO LOAD ON PAGE OPEN
document.addEventListener("DOMContentLoaded", loadRooms);
