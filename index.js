// Track scroll position for navbar visibility and active state
let lastScrollY = window.scrollY;

// DOM elements
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

// Handle navbar visibility on scroll
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Show/hide navbar based on scroll direction and position
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and not at the top - hide navbar
        navbar.classList.add("hidden");
    } else {
        // Scrolling up or at the top - show navbar
        navbar.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
    
    // Update active navigation link based on current position
    updateActiveNavLink();
});

// Function to update active navigation link based on scroll position
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Apply initial active state
    updateActiveNavLink();
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links (not external links)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Scroll smoothly to the target element
                    window.scrollTo({ 
                        top: targetElement.offsetTop - 80, // Adjust for navbar height
                        behavior: 'smooth'
                    });
                    
                    // Update URL without refreshing page
                    history.pushState(null, null, targetId);
                    
                    // Update active state
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Email functionality
    const emailButton = document.querySelector('button.email');
    if (emailButton) {
        emailButton.addEventListener('click', () => {
            window.location.href = "mailto:bashiradam219@gmail.com";
        });
    }
    
    // Add a small animation to the logo on page load
    const logo = document.querySelector('.logo i');
    if (logo) {
        setTimeout(() => {
            logo.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                logo.style.transform = 'rotate(0deg)';
            }, 600);
        }, 1000);
    }
});

// Apply fade-in animation to sections as they come into view
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
};

// Run the observer when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target) && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    });
});
