/* ===================================
   Royale Lalawi Booking System
   NexoStudio
=================================== */

// Room Prices

const roomPrices = {
    "Deluxe Room": 2086,
    "Executive Twin": 2800,
    "Executive Suite": 4500,
    "Family Room": 5200,
    "Premium Suite": 6500
};

// Elements

const room = document.getElementById("room");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

const summaryRoom = document.getElementById("summaryRoom");
const summaryCheckin = document.getElementById("summaryCheckin");
const summaryCheckout = document.getElementById("summaryCheckout");
const summaryNights = document.getElementById("summaryNights");
const summaryPrice = document.getElementById("summaryPrice");

const availability = document.getElementById("availabilityMessage");

function updateSummary(){

    summaryRoom.textContent = room.value || "Not Selected";

    summaryCheckin.textContent = checkin.value || "--";
    summaryCheckout.textContent = checkout.value || "--";

    if(!checkin.value || !checkout.value){

        summaryNights.textContent="0";
        summaryPrice.textContent="₹0";

        return;

    }

    const inDate = new Date(checkin.value);
    const outDate = new Date(checkout.value);

    const nights = Math.ceil(
        (outDate-inDate)/(1000*60*60*24)
    );

    if(nights<=0){

        summaryNights.textContent="0";
        summaryPrice.textContent="₹0";

        availability.innerHTML="🔴 Check-out must be after Check-in";
        availability.style.color="red";

        return;

    }

    summaryNights.textContent=nights;

    const price = roomPrices[room.value] || 0;

    summaryPrice.textContent=
        "₹"+(price*nights).toLocaleString();

    availability.innerHTML="🟢 Dates look good. Availability will be checked after submission.";
    availability.style.color="green";

}

room.addEventListener("change",updateSummary);
checkin.addEventListener("change",updateSummary);
checkout.addEventListener("change",updateSummary);

// Prevent past dates

const today=new Date().toISOString().split("T")[0];

checkin.min=today;
checkout.min=today;

// Booking Form

const form=document.getElementById("bookingForm");

form.addEventListener("submit",function(e){

    e.preventDefault();

    if(room.value==="Select Room"){

        alert("Please select a room.");

        return;

    }

    if(!checkin.value || !checkout.value){

        alert("Please select your stay dates.");

        return;

    }

    const inDate=new Date(checkin.value);
    const outDate=new Date(checkout.value);

    if(outDate<=inDate){

        alert("Check-out date must be after Check-in.");

        return;

    }

    // Firebase save will go here later

    alert(
`Booking Submitted Successfully!

Status: Pending Approval

Our team will verify room availability and contact you shortly.`
);

    form.reset();

    updateSummary();

});

// Initial Summary

updateSummary();

console.log("Booking System Loaded");
