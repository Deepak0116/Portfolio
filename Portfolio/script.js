// DOM Elements
const menuBtn = document.querySelector(".menu-btn")
const nav = document.querySelector("nav")
const navLinks = document.querySelectorAll(".nav-links a")
const backToTop = document.getElementById("backToTop")
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("formStatus")
const currentYear = document.getElementById("currentYear")
const skillItems = document.querySelectorAll(".skill-item")

// Set current year in footer
currentYear.textContent = new Date().getFullYear()

// Toggle mobile menu
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open")
  nav.classList.toggle("active")
  document.body.classList.toggle("no-scroll")
})

// Close mobile menu when clicking a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("open")
    nav.classList.remove("active")
    document.body.classList.remove("no-scroll")

    // Update active link
    navLinks.forEach((navLink) => navLink.classList.remove("active"))
    link.classList.add("active")
  })
})

// Back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("active")
  } else {
    backToTop.classList.remove("active")
  }

  // Update active nav link based on scroll position
  updateActiveNavLink()
})

backToTop.addEventListener("click", (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Validate form
  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields."
    formStatus.className = "form-status error"
    return
  }

  // Simulate form submission
  formStatus.textContent = "Sending message..."
  formStatus.className = "form-status success"

  setTimeout(() => {
    formStatus.textContent = "Thank you for your message! I'll get back to you soon."

    // Reset form
    contactForm.reset()

    // Hide status after 5 seconds
    setTimeout(() => {
      formStatus.className = "form-status"
    }, 5000)
  }, 1500)
})

// Animation for skill items
function animateSkillItems() {
  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, 100 * index)
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "skills") {
        animateSkillItems()
      }
      entry.target.classList.add("animate")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Initially set active nav link
  updateActiveNavLink()

  // Set initial opacity for skill items
  skillItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
  })
})

