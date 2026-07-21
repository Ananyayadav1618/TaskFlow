// ===========================
// TASKFLOW LANDING PAGE
// ===========================

// Smooth Scroll for Navigation Links

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const targetId = this.getAttribute("href");

        const target = document.querySelector(targetId);

        if(target){

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ===========================
// NAVBAR SHADOW ON SCROLL
// ===========================

const navbar = document.querySelector("nav");

window.addEventListener("scroll", function(){

    if(window.scrollY > 20){

        navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,.15)";

    }
    else{

        navbar.style.boxShadow = "0 3px 10px rgba(0,0,0,.08)";

    }

});

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function(){

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// ===========================
// HERO BUTTON ANIMATION
// ===========================

const primaryBtn = document.querySelector(".primary-btn");

if(primaryBtn){

    setInterval(function(){

        primaryBtn.style.transform = "scale(1.05)";

        setTimeout(function(){

            primaryBtn.style.transform = "scale(1)";

        },300);

    },3000);

}