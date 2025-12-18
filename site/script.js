// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animateElements = document.querySelectorAll('.focus-card, .research-card, .publication-item, .about-grid, .contact-grid');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: slideIn 0.3s ease-out;
    `;
    
    successMessage.innerHTML = `
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style="margin-bottom: 1rem;">
            <circle cx="32" cy="32" r="28" fill="#2d5016" opacity="0.1"/>
            <path d="M20 32L28 40L44 24" stroke="#2d5016" stroke-width="4" stroke-linecap="round"/>
        </svg>
        <h3 style="font-family: 'Crimson Pro', serif; font-size: 1.5rem; color: #1a3309; margin-bottom: 0.5rem;">Cảm ơn bạn!</h3>
        <p style="color: #5a5348; margin-bottom: 1.5rem;">Tin nhắn của bạn đã được gửi thành công. Tôi sẽ phản hồi sớm nhất có thể.</p>
        <button onclick="this.parentElement.remove()" style="
            background: #2d5016;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s;
        ">Đóng</button>
    `;
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -40%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    `;
    overlay.addEventListener('click', () => {
        successMessage.remove();
        overlay.remove();
    });
    document.body.appendChild(overlay);
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add animation to stats on scroll
const statNumbers = document.querySelectorAll('.stat-number');
const visualStatNumbers = document.querySelectorAll('.visual-stat-number');

const animateNumber = (element) => {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateNumber(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));
visualStatNumbers.forEach(stat => statsObserver.observe(stat));

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
                navLink.style.color = 'var(--primary)';
            }
        } else if (navLink) {
            navLink.style.color = 'var(--text-secondary)';
        }
    });
});

// Add print styles dynamically
const printStyles = `
    @media print {
        .navbar,
        .hero-buttons,
        .scroll-indicator,
        .contact-form,
        .footer {
            display: none !important;
        }
        
        body {
            background: white;
        }
        
        .section {
            page-break-inside: avoid;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);

// Console message
console.log('%c🌱 Nghiên cứu sinh Tiến sĩ - Trồng trọt & Nông học Bền vững', 
    'color: #2d5016; font-size: 16px; font-weight: bold;');
console.log('%cWebsite designed with modern, clean aesthetics', 
    'color: #5a5348; font-size: 12px;');