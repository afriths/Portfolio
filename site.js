let isSending = false;

function sendMail(event) {
    event.preventDefault();
    
    if (isSending) return false;
    
    const submitBtn = event.target.querySelector('.send-message-btn');
    
    // Store original button state
    const originalBtnHTML = submitBtn.innerHTML;
    
    // Update button to loading state
    submitBtn.disabled = true;
    isSending = true;
    
    // Update button text to show loading
    submitBtn.querySelector('.button-text').textContent = 'Sending...';

    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_z9bzkh3", "template_6x9x10n", params)
        .then(function() {
            // Show success message
            document.getElementById('successOverlay').style.display = 'block';
            document.getElementById('successMessage').style.display = 'flex';
            
            // Animate success icon
            setTimeout(() => {
                document.querySelector('.success-message').classList.add('active');
                document.getElementById('successOverlay').style.opacity = '1';
            }, 10);
            
            // Reset form only on success
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('.button-text').textContent = 'Send Message';
            isSending = false;
        });
    
    return false;
}

// Add event listener for closing success message
document.getElementById('closeSuccess').addEventListener('click', function() {
    document.querySelector('.success-message').classList.remove('active');
    document.getElementById('successOverlay').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('successOverlay').style.display = 'none';
        document.getElementById('successMessage').style.display = 'none';
    }, 300);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const fadeElements = document.querySelectorAll('.fade-in, .about-points li, .experience-card, .skill-category, .education-item, .contact-info, .contact-form');
const homeContent = document.querySelector('.home-content');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('home-content')) {
                entry.target.classList.add('visible');
            } else if (entry.target.classList.contains('about-points')) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            } else {
                entry.target.classList.add('visible');
            }
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

if (homeContent) {
    observer.observe(homeContent);
}

// // Theme toggle functionality
// const themeToggle = document.getElementById('themeToggle');
// const themeIcon = themeToggle.querySelector('i');
// const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// // Initialize theme
// function initializeTheme() {
//     const savedTheme = localStorage.getItem('theme');
    
//     if (savedTheme) {
//         document.documentElement.setAttribute('data-theme', savedTheme);
//         updateToggleIcon(savedTheme);
//     } else if (prefersDarkScheme.matches) {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         updateToggleIcon('dark');
//     }
// }

// // Update the toggle icon
// function updateToggleIcon(theme) {
//     if (theme === 'dark') {
//         themeIcon.classList.remove('fa-moon');
//         themeIcon.classList.add('fa-sun');
//     } else {
//         themeIcon.classList.remove('fa-sun');
//         themeIcon.classList.add('fa-moon');
//     }
// }

// // Toggle theme
// function toggleTheme() {
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     let newTheme = 'light';
    
//     if (currentTheme !== 'dark') {
//         newTheme = 'dark';
//     }
    
//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//     updateToggleIcon(newTheme);
// }

// // Initialize theme on page load
// initializeTheme();

// // Add event listener for theme toggle
// themeToggle.addEventListener('click', toggleTheme);

// // Watch for system theme changes
// prefersDarkScheme.addListener((e) => {
//     if (!localStorage.getItem('theme')) {
//         const newTheme = e.matches ? 'dark' : 'light';
//         document.documentElement.setAttribute('data-theme', newTheme);
//         updateToggleIcon(newTheme);
//     }
// });

// Dynamic navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--navbar-bg)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--navbar-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Horizontal scroll for experience cards on touch devices
let isDragging = false;
let startX;
let scrollLeft;
const experienceContainer = document.querySelector('.experience-container');

if (experienceContainer) {
    experienceContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - experienceContainer.offsetLeft;
        scrollLeft = experienceContainer.scrollLeft;
        experienceContainer.style.cursor = 'grabbing';
        experienceContainer.style.userSelect = 'none';
    });

    experienceContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        experienceContainer.style.cursor = 'grab';
    });

    experienceContainer.addEventListener('mouseup', () => {
        isDragging = false;
        experienceContainer.style.cursor = 'grab';
    });

    experienceContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - experienceContainer.offsetLeft;
        const walk = (x - startX) * 2;
        experienceContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    experienceContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - experienceContainer.offsetLeft;
        scrollLeft = experienceContainer.scrollLeft;
    });

    experienceContainer.addEventListener('touchend', () => {
        isDragging = false;
    });

    experienceContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - experienceContainer.offsetLeft;
        const walk = (x - startX) * 2;
        experienceContainer.scrollLeft = scrollLeft - walk;
    });
}

// Initialize scroll position for experience cards
if (document.querySelector('.experience-scroll')) {
    document.querySelector('.experience-scroll').scrollLeft = 0;
}

// Add click animation to skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.addEventListener('click', () => {
        category.style.transform = 'scale(0.95)';
        setTimeout(() => {
            category.style.transform = 'translateY(-5px)';
        }, 100);
    });
});

// Enhanced scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    scrollToTopBtn.classList.add('clicked');
    setTimeout(() => {
        scrollToTopBtn.classList.remove('clicked');
    }, 300);
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Add animation for button click
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-5px) scale(1.05); }
    }
    .scroll-to-top.clicked {
        animation: bounce 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize the page with animations
document.addEventListener('DOMContentLoaded', () => {
    // Trigger home content animation after a short delay
    setTimeout(() => {
        if (homeContent) {
            homeContent.classList.add('visible');
        }
    }, 300);
    
    // Add animation delay to about points
    const aboutPoints = document.querySelectorAll('.about-points li');
    aboutPoints.forEach((point, index) => {
        point.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add animation delay to experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add animation delay to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });
    
    
    // Add animation to contact info on scroll
    const contactInfo = document.querySelector('.contact-info');
    const contactFormEl = document.querySelector('.contact-form');
    
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === contactInfo) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target === contactFormEl) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            }
        });
    }, { threshold: 0.1 });
    
    if (contactInfo) contactObserver.observe(contactInfo);
    if (contactFormEl) contactObserver.observe(contactFormEl);
});

document.addEventListener('DOMContentLoaded', function() {
    // Card toggle functionality
    const toggles = document.querySelectorAll('.rad-content-grid-card__front-toggle');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const card = this.closest('.rad-content-grid-card');
            
            // Close other open cards when opening a new one
            if (this.checked) {
                document.querySelectorAll('.rad-content-grid-card--open').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('rad-content-grid-card--open');
                        openCard.querySelector('.rad-content-grid-card__front-toggle').checked = false;
                        openCard.querySelector('.rad-content-grid-card__front-toggle').setAttribute('aria-expanded', 'false');
                    }
                });
            }
            
            card.classList.toggle('rad-content-grid-card--open', this.checked);
            this.setAttribute('aria-expanded', this.checked.toString());
        });
    });

    // Scroll indicator functionality
    const scrollContainer = document.querySelector('.experience-container');
    const scrollThumb = document.querySelector('.scroll-thumb');
    
    if (scrollContainer && scrollThumb) {
        scrollContainer.addEventListener('scroll', function() {
            const scrollPercentage = scrollContainer.scrollLeft / 
                (scrollContainer.scrollWidth - scrollContainer.clientWidth);
            const thumbPosition = scrollPercentage * 
                (this.clientWidth - scrollThumb.clientWidth);
            scrollThumb.style.transform = `translateX(${thumbPosition}px)`;
        });
    }
});



