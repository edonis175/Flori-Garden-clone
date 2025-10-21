// Mobile menu functionality for Figma design
function showMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");

  // Toggle the active class on the mobile menu
  mobileMenu.classList.toggle("active");

  // Toggle hamburger icon animation
  hamburger.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (mobileMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");

  // Check if click is outside mobile menu and hamburger
  if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close menu on window resize to desktop
window.addEventListener("resize", function () {
  if (window.innerWidth > 992) {
    const mobileMenu = document.getElementById("mobile-menu");
    const hamburger = document.getElementById("hamburger");
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close menu when clicking on mobile nav links
document.addEventListener("DOMContentLoaded", function () {
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Close mobile menu when link is clicked
      mobileMenu.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
});
