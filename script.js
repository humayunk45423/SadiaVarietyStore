// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const navContent = document.querySelector('.nav-content');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(13, 74, 34, 0.1)';
        navContent.style.height = '70px';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
        navContent.style.height = '90px';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Offset for fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const cards = document.querySelectorAll('.category-card, .product-card, .lpg-promo-banner');
    
    // Set initial state
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(card);
    });
};

// Hero Image Slideshow with Touch Swiping
const initSlideshow = () => {
    const slides = document.querySelectorAll('.hero-image.slide');
    const slideshowContainer = document.querySelector('.hero-slideshow');
    if (slides.length === 0 || !slideshowContainer) return;
    
    let currentSlide = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    const showSlide = (index) => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    const startInterval = () => {
        stopInterval();
        slideInterval = setInterval(nextSlide, 5000);
    };

    const stopInterval = () => {
        if (slideInterval) clearInterval(slideInterval);
    };

    // Touch events for swiping
    slideshowContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopInterval();
    }, { passive: true });

    slideshowContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
        startInterval();
    }, { passive: true });

    const handleGesture = () => {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide(); // Swipe Left -> Next
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide(); // Swipe Right -> Prev
        }
    };

    // Mouse support for desktop swiping (optional but good for testing)
    slideshowContainer.addEventListener('mousedown', (e) => {
        touchStartX = e.screenX;
        stopInterval();
    });

    slideshowContainer.addEventListener('mouseup', (e) => {
        touchEndX = e.screenX;
        handleGesture();
        startInterval();
    });

    // Start the slideshow
    startInterval();
};

// Initialize animations and slideshow on load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    initSlideshow();
});
