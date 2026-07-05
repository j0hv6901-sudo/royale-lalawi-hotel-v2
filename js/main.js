/* ===================================
   NexoStudio - Main JavaScript
=================================== */

// ===========================
// Sticky Header
// ===========================

const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.style.background = "#0F172A";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
    } else {
        header.style.background = "rgba(15,23,42,.65)";
        header.style.boxShadow = "none";
    }
});

// ===========================
// Smooth Scroll
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});

// ===========================
// Scroll To Top Button
// ===========================

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.cssText = `
position:fixed;
bottom:25px;
right:25px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#D4AF37;
color:white;
font-size:22px;
cursor:pointer;
display:none;
z-index:9999;
box-shadow:0 10px 25px rgba(0,0,0,.25);
`;

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topButton.style.display="block";

    }else{

        topButton.style.display="none";

    }

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

// ===========================
// Fade In Animation
// ===========================

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});

// ===========================
// FAQ Toggle
// ===========================

document.querySelectorAll(".faq-item h3").forEach(item=>{

    item.addEventListener("click",()=>{

        const p=item.nextElementSibling;

        if(p.style.display==="block"){

            p.style.display="none";

        }else{

            document.querySelectorAll(".faq-item p").forEach(x=>{

                x.style.display="none";

            });

            p.style.display="block";

        }

    });

});

// Hide FAQ answers initially

document.querySelectorAll(".faq-item p").forEach(p=>{

    p.style.display="none";

});

// ===========================
// Booking Form Validation
// ===========================

const bookingForm=document.querySelector(".booking-search form");

if(bookingForm){

bookingForm.addEventListener("submit",function(e){

e.preventDefault();

const inputs=this.querySelectorAll("input, select");

let valid=true;

inputs.forEach(input=>{

if(input.value===""){

valid=false;

input.style.borderColor="red";

}else{

input.style.borderColor="#ddd";

}

});

if(valid){

window.location.href="booking.html";

}else{

alert("Please complete all booking details.");

}

});

}

// ===========================
// Image Lazy Loading
// ===========================

const images=document.querySelectorAll("img");

const imgObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.classList.add("loaded");

imgObserver.unobserve(img);

}

});

});

images.forEach(img=>{

imgObserver.observe(img);

});

// ===========================
// Console Message
// ===========================

console.log("Royale Lalawi Hotel V2");
console.log("Designed & Developed by NexoStudio");
