async function loadRooms() {

    const table = document.getElementById("roomTable");
    table.innerHTML = "";

    const snapshot = await firebaseAPI.getDocs(
        firebaseAPI.collection(db, "rooms")
    );

    snapshot.forEach(docSnap => {
        const r = docSnap.data();

        table.innerHTML += `
            <tr>
                <td>${r.name}</td>
                <td>₹${r.price}</td>
                <td>${r.capacity}</td>
                <td>${r.status}</td>
            </tr>
        `;
    });
}

// Add room
async function addRoom(name, price, capacity) {

    await firebaseAPI.addDoc(
        firebaseAPI.collection(db, "rooms"),
        {
            name,
            price,
            capacity,
            status: "Available"
        }
    );

    loadRooms();
}

document.addEventListener("DOMContentLoaded", loadRooms);
