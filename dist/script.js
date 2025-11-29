// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrollPercentage / 100})`;
});

// Navbar Background on Scroll - Modified for Light Theme
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    // The class is now handled by CSS default transparency,
    // but we can add a shadow or stronger blur if needed.
    // Current CSS handles .nav-blur class perfectly.
});

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.3;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');
// Select the containers instead of the images directly
const galleryItems = document.querySelectorAll('.img-container');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Find the image inside the clicked container
        const img = item.querySelector('img');
        if (img) {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            document.body.style.overflow = 'hidden';
        }
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Portfolio Filtering
const filterBtnContainer = document.getElementById('filterBtnContainer');
const filterBtns = filterBtnContainer.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.masonry-item');
const masonryContainer = document.querySelector('.masonry');

// Store original order
const originalOrder = Array.from(portfolioItems);

// Function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to reorder DOM elements
function reorderItems(itemsArray) {
    itemsArray.forEach(item => {
        masonryContainer.appendChild(item);
    });
}

filterBtnContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // Handle active button state
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

        // Handle item filtering
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || filterValue === itemCategory) {
                item.classList.remove('hide-filter');
            } else {
                item.classList.add('hide-filter');
            }
        });

        // Shuffle if 'all' is selected, otherwise restore original order
        if (filterValue === 'all') {
            const shuffledItems = shuffleArray(originalOrder);
            reorderItems(shuffledItems);
        } else {
            reorderItems(originalOrder);
        }
    }
});

// Magnetic Button Effect
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Animate button
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Message Sent! ✓';
        // Changed success color to green-600 for better visibility on light bg
        button.classList.add('bg-green-600');
        button.classList.remove('from-blue-500', 'to-purple-500'); // Remove gradient if needed

        setTimeout(() => {
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('bg-green-600');
            // Re-add original gradient classes if you stripped them
        }, 2000);
    }, 1500);
});

// Add initial active class to elements in viewport
window.addEventListener('load', () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
});

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
