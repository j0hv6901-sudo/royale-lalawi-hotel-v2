/* =========================================================
   ROYALE LALAWI HOTEL HMS V12
   ADMIN JS - PART 1
========================================================= */

// ===============================
// Global State
// ===============================

const dashboardState = {
    bookings: [],
    filteredBookings: [],
    selectedBooking: null
};

// ===============================
// Firebase References
// ===============================

const bookingsRef = firebaseAPI.collection(db, "bookings");

// ===============================
// DOM
// ===============================

const bookingTable = document.getElementById("bookingTable");
const searchInput = document.getElementById("searchBooking");
const statusFilter = document.getElementById("statusFilter");

const totalBookings = document.getElementById("totalBookings");
const pendingBookings = document.getElementById("pendingBookings");
const checkedInBookings = document.getElementById("checkedInBookings");
const bookingRevenue = document.getElementById("bookingRevenue");

// ===============================
// Start
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadBookings();

    searchInput?.addEventListener("input", filterBookings);

    statusFilter?.addEventListener("change", filterBookings);

});

// ===============================
// Real-time Loader
// ===============================

let unsubscribe = null;

function loadBookings() {

    if (unsubscribe) unsubscribe();

    unsubscribe = firebaseAPI.onSnapshot(bookingsRef, snapshot => {

        dashboardState.bookings = [];

        snapshot.forEach(doc => {

            dashboardState.bookings.push({

                id: doc.id,

                ...doc.data()

            });

        });

        filterBookings();

    });

}

// ===============================
// Filter
// ===============================

function filterBookings() {

    const keyword = searchInput?.value.toLowerCase() || "";

    const status = statusFilter?.value || "";

    dashboardState.filteredBookings =
        dashboardState.bookings.filter(b => {

            const searchMatch =

                (b.guestName || "")
                .toLowerCase()
                .includes(keyword)

                ||

                (b.roomName || "")
                .toLowerCase()
                .includes(keyword)

                ||

                (b.id || "")
                .toLowerCase()
                .includes(keyword);

            const statusMatch =

                status === "" ||

                b.status === status;

            return searchMatch && statusMatch;

        });

    renderBookings();

    updateDashboardCards();

}
/* =========================================================
   ROYALE LALAWI HOTEL HMS V12
   ADMIN JS - PART 2
========================================================= */

// ===============================
// Render Bookings
// ===============================

function renderBookings() {

    if (!bookingTable) return;

    if (dashboardState.filteredBookings.length === 0) {

        bookingTable.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center;padding:40px;">
                    No bookings found.
                </td>
            </tr>
        `;

        document.getElementById("showingCount").innerText = 0;
        document.getElementById("totalCount").innerText =
            dashboardState.bookings.length;

        return;
    }

    let html = "";

    dashboardState.filteredBookings.forEach(b => {

        const statusClass = String(b.status || "Pending")
            .toLowerCase()
            .replace(/\s/g, "");

        html += `
        <tr>

            <td>${b.id}</td>

            <td>${b.guestName ?? "-"}</td>

            <td>${b.phone ?? "-"}</td>

            <td>${b.roomName ?? "-"}</td>

            <td>${b.guests ?? 1}</td>

            <td>${b.checkIn ?? "-"}</td>

            <td>${b.checkOut ?? "-"}</td>

            <td>₹${Number(
                String(b.total ?? 0).replace(/[^\d.]/g,"")
            ).toLocaleString()}</td>

            <td>

                <span class="${statusClass}">
                    ${b.status ?? "Pending"}
                </span>

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editBooking('${b.id}')">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteBooking('${b.id}')">

                    Delete

                </button>

            </td>

        </tr>
        `;

    });

    bookingTable.innerHTML = html;

    document.getElementById("showingCount").innerText =
        dashboardState.filteredBookings.length;

    document.getElementById("totalCount").innerText =
        dashboardState.bookings.length;

}

// ===============================
// Dashboard Cards
// ===============================

function updateDashboardCards() {

    let pending = 0;

    let checkedIn = 0;

    let revenue = 0;

    dashboardState.bookings.forEach(b => {

        const status = b.status || "";

        if (status === "Pending") pending++;

        if (status === "Checked In") checkedIn++;

        if (status === "Checked Out") {

            revenue += Number(
                String(b.total ?? 0)
                .replace(/[^\d.]/g,"")
            ) || 0;

        }

    });

    totalBookings.innerText =
        dashboardState.bookings.length;

    pendingBookings.innerText =
        pending;

    checkedInBookings.innerText =
        checkedIn;

    bookingRevenue.innerText =
        "₹" + revenue.toLocaleString();

}

// ===============================
// Edit Booking
// ===============================

function editBooking(id){

    dashboardState.selectedBooking =
        dashboardState.bookings.find(
            b => b.id === id
        );

    console.log(
        "Edit Booking",
        dashboardState.selectedBooking
    );

    // Modal integration in Part 3

}

// ===============================
// Delete Booking
// ===============================

function deleteBooking(id){

    dashboardState.selectedBooking = id;

    document
        .getElementById("deleteModal")
        ?.classList.add("active");

}
/* =========================================================
   ROYALE LALAWI HOTEL HMS V12
   ADMIN JS - PART 3
========================================================= */

// ===============================
// Modal Controls
// ===============================

const bookingModal = document.getElementById("bookingModal");
const deleteModal = document.getElementById("deleteModal");

document.querySelector(".close-modal")?.addEventListener("click", closeBookingModal);

document.querySelector(".secondary-btn")?.addEventListener("click", closeBookingModal);

document.getElementById("newBookingBtn")?.addEventListener("click", () => {

    dashboardState.selectedBooking = null;

    document.getElementById("bookingForm").reset();

    bookingModal.classList.add("active");

});

function closeBookingModal(){

    bookingModal.classList.remove("active");

}

window.addEventListener("click",(e)=>{

    if(e.target===bookingModal){

        closeBookingModal();

    }

});

// ===============================
// Save Booking
// ===============================

document.getElementById("bookingForm")?.addEventListener("submit",saveBooking);

async function saveBooking(e){

    e.preventDefault();

    const booking={

        guestName:document.getElementById("guestName").value.trim(),

        phone:document.getElementById("guestPhone").value.trim(),

        roomName:document.getElementById("roomName").value,

        guests:Number(document.getElementById("guestCount").value),

        checkIn:document.getElementById("checkIn").value,

        checkOut:document.getElementById("checkOut").value,

        total:Number(document.getElementById("bookingTotal").value),

        status:document.getElementById("bookingStatus").value,

        updatedAt:new Date().toISOString()

    };

    try{

        if(dashboardState.selectedBooking){

            await firebaseAPI.updateDoc(

                firebaseAPI.doc(

                    db,

                    "bookings",

                    dashboardState.selectedBooking.id

                ),

                booking

            );

            showToast("Booking updated successfully","success");

        }else{

            booking.createdAt=new Date().toISOString();

            booking.bookingID="RLH"+Date.now();

            await firebaseAPI.addDoc(bookingsRef,booking);

            showToast("Booking created successfully","success");

        }

        bookingModal.classList.remove("active");

        document.getElementById("bookingForm").reset();

    }

    catch(err){

        console.error(err);

        showToast("Unable to save booking","error");

    }

}

// ===============================
// Delete Booking
// ===============================

document.getElementById("cancelDelete")?.addEventListener("click",()=>{

    deleteModal.classList.remove("active");

});

document.getElementById("confirmDelete")?.addEventListener("click",async()=>{

    try{

        await firebaseAPI.deleteDoc(

            firebaseAPI.doc(

                db,

                "bookings",

                dashboardState.selectedBooking

            )

        );

        deleteModal.classList.remove("active");

        showToast("Booking deleted","success");

    }

    catch(err){

        console.error(err);

        showToast("Delete failed","error");

    }

});

// ===============================
// Edit Form
// ===============================

function editBooking(id){

    const b=dashboardState.bookings.find(x=>x.id===id);

    if(!b)return;

    dashboardState.selectedBooking=b;

    document.getElementById("guestName").value=b.guestName||"";

    document.getElementById("guestPhone").value=b.phone||"";

    document.getElementById("roomName").value=b.roomName||"";

    document.getElementById("guestCount").value=b.guests||1;

    document.getElementById("checkIn").value=b.checkIn||"";

    document.getElementById("checkOut").value=b.checkOut||"";

    document.getElementById("bookingTotal").value=b.total||0;

    document.getElementById("bookingStatus").value=b.status||"Pending";

    bookingModal.classList.add("active");

}

// ===============================
// Toast Notification
// ===============================

function showToast(message,type="success"){

    let toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=`

        <i class="fas fa-check-circle"></i>

        <span>${message}</span>

    `;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

}

// ===============================
// Refresh
// ===============================

document.querySelector(".refresh-btn")?.addEventListener("click",()=>{

    filterBookings();

    showToast("Bookings refreshed");

});

console.log("Royale Lalawi HMS V12 Loaded Successfully");
/* =========================================================
   ROYALE LALAWI HOTEL HMS V12
   ADMIN JS - PART 4
   Room Sync • Analytics • Logs • Export
========================================================= */

// ===============================
// ROOM AUTO SYNC
// ===============================

async function syncRoomStatus() {

    try {

        const roomSnap = await firebaseAPI.getDocs(
            firebaseAPI.collection(db, "rooms")
        );

        for (const roomDoc of roomSnap.docs) {

            const room = roomDoc.data();

            const occupied = dashboardState.bookings.some(b =>
                b.roomName === room.roomName &&
                b.status === "Checked In"
            );

            const newStatus = occupied ? "Occupied" : "Available";

            if (room.status !== newStatus) {

                await firebaseAPI.updateDoc(
                    firebaseAPI.doc(db, "rooms", roomDoc.id),
                    {
                        status: newStatus,
                        updatedAt: new Date().toISOString()
                    }
                );

            }

        }

    }

    catch (err) {

        console.error("Room Sync Error:", err);

    }

}

// ===============================
// ANALYTICS
// ===============================

function updateAnalytics() {

    let todayRevenue = 0;

    let monthlyRevenue = 0;

    let occupancy = 0;

    const today = new Date().toISOString().split("T")[0];

    dashboardState.bookings.forEach(b => {

        if (b.status === "Checked Out") {

            const total = Number(
                String(b.total || 0).replace(/[^\d.]/g, "")
            );

            monthlyRevenue += total;

            if (b.checkOut === today) {

                todayRevenue += total;

            }

        }

        if (b.status === "Checked In") {

            occupancy++;

        }

    });

    document.getElementById("todayRevenue") &&
    (document.getElementById("todayRevenue").innerText =
        "₹" + todayRevenue.toLocaleString());

    document.getElementById("monthlyRevenue") &&
    (document.getElementById("monthlyRevenue").innerText =
        "₹" + monthlyRevenue.toLocaleString());

    document.getElementById("occupancyRate") &&
    (document.getElementById("occupancyRate").innerText =
        occupancy);

}

// ===============================
// ACTIVITY LOG
// ===============================

async function writeLog(action, details = "") {

    try {

        await firebaseAPI.addDoc(

            firebaseAPI.collection(db, "logs"),

            {

                action,

                details,

                time: new Date().toISOString(),

                user: "Administrator"

            }

        );

    }

    catch (err) {

        console.error(err);

    }

}

// ===============================
// EXPORT CSV
// ===============================

function exportCSV() {

    let csv = [];

    csv.push([
        "Booking ID",
        "Guest",
        "Room",
        "Check In",
        "Check Out",
        "Status",
        "Total"
    ].join(","));

    dashboardState.bookings.forEach(b => {

        csv.push([

            b.id,

            b.guestName,

            b.roomName,

            b.checkIn,

            b.checkOut,

            b.status,

            b.total

        ].join(","));

    });

    const blob = new Blob(

        [csv.join("\n")],

        { type: "text/csv" }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Bookings.csv";

    a.click();

    URL.revokeObjectURL(url);

}

// ===============================
// PRINT REPORT
// ===============================

function printBookings() {

    window.print();

}

// ===============================
// AUTO UPDATE
// ===============================

setInterval(() => {

    updateAnalytics();

    syncRoomStatus();

}, 30000);

// ===============================
// INITIAL LOAD
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    updateAnalytics();

    syncRoomStatus();

});

// ===============================
// LOG EVENTS
// ===============================

document.getElementById("bookingForm")?.addEventListener("submit", () => {

    writeLog("Booking Saved");

});

document.getElementById("confirmDelete")?.addEventListener("click", () => {

    writeLog("Booking Deleted");

});

console.log("V12 Analytics Engine Loaded");
