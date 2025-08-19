// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Services Carousel
const carouselContainer = document.querySelector('.carousel-container');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const serviceCards = document.querySelectorAll('.service-card');

let currentIndex = 0;
const cardWidth = serviceCards[0].offsetWidth + 20; // Including gap

function updateCarousel() {
    carouselContainer.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
    });
}

carouselNext.addEventListener('click', () => {
    if (currentIndex < serviceCards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

carouselPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Touch support for carousel
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startPos = e.touches[0].clientX;
    prevTranslate = currentTranslate;
});

carouselContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
});

carouselContainer.addEventListener('touchend', () => {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    
    if (movedBy < -50 && currentIndex < serviceCards.length - 1) {
        currentIndex++;
    } else if (movedBy > 50 && currentIndex > 0) {
        currentIndex--;
    }
    
    updateCarousel();
    currentTranslate = 0;
    prevTranslate = 0;
});

// Modal
const modal = document.getElementById('support-modal');
const closeModal = document.querySelector('.close-modal');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

function checkScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Range Input Value Display
document.querySelectorAll('input[type="range"]').forEach(range => {
    const valueDisplay = document.getElementById(`${range.id}-value`);
    if (valueDisplay) {
        range.addEventListener('input', () => {
            valueDisplay.textContent = range.value;
        });
    }
});
// Review card animation
const reviewCards = document.querySelectorAll('.review-card');

function checkReviews() {
    reviewCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', checkReviews);
window.addEventListener('load', checkReviews);

// Premium Plan Modal Functionality
const premiumModal = document.getElementById('premium-modal');
const premiumForm = document.getElementById('premium-form');
const planTypeSelect = document.getElementById('plan-type');
const selectedPlanInput = document.getElementById('selected-plan');
const closePremiumModal = document.querySelector('#premium-modal .close-modal');

// Open modal with pre-selected plan
function openPremiumModal(planName) {
    // Set the selected plan in both select and hidden input
    planTypeSelect.value = planName;
    selectedPlanInput.value = planName;
    
    // Show modal
    premiumModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closePremiumModalFunc() {
    premiumModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for premium plan buttons
document.querySelectorAll('.premium-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get plan name from the card
        const card = button.closest('.premium-card');
        const planName = card.querySelector('.card-title').textContent;
        
        openPremiumModal(planName);
    });
});


// Form submission
premiumForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('premium-name').value;
    const mobile = document.getElementById('premium-mobile').value;
    const email = document.getElementById('premium-email').value;
    const planType = document.getElementById('plan-type').value;
    
    // Validate mobile
    if (!/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    // Prepare WhatsApp message
    const whatsappMessage = `🚀 *Premium Plan Inquiry* 🚀\n\n*Name:* ${name}\n*Mobile:* ${mobile}\n*Email:* ${email || 'Not provided'}\n*Interested Plan:*  ${planType}\n\n*Submitted via AMOR WEALTH Website*`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Send to WhatsApp (REPLACE WITH YOUR NUMBER)
    window.open(`https://wa.me/919137297231?text=${encodedMessage}`, '_blank');
    
    // Show success message
    alert('Thank you! Our wealth specialist will contact you shortly.');
    
    // Reset and close form
    premiumForm.reset();
    closePremiumModalFunc();
});

// SIP Enquiry Modal Functionality
const sipModal = document.getElementById('sip-modal');
const sipForm = document.getElementById('sip-form');
const investNowBtn = document.getElementById('invest-now-btn');
const closeSipModal = document.querySelector('#sip-modal .close-modal');

// Open SIP modal
function openSipModal() {
    sipModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close SIP modal
function closeSipModalFunc() {
    sipModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listener for Invest Now button
investNowBtn.addEventListener('click', openSipModal);


// SIP Form submission
// SIP Form submission - Simplified
sipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('sip-name').value;
    const mobile = document.getElementById('sip-mobile').value;
    const email = document.getElementById('sip-email').value;
    const city = document.getElementById('sip-city').value;
    
    // Validate mobile
    if (!/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        return;
    }
    
    // Prepare WhatsApp message
    const whatsappMessage = `📈 *SIP Investment Enquiry* 📈\n\n*Name:* ${name}\n*Mobile:* ${mobile}\n*Email:* ${email || 'Not provided'}\n*City:* ${city}\n\n*Submitted via AMOR WEALTH SIP Calculator*`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Send to WhatsApp (REPLACE WITH YOUR NUMBER)
    window.open(`https://wa.me/919137297231?text=${encodedMessage}`, '_blank');
    
    // Show success message
    alert('Thank you! Our investment expert will contact you shortly.');
    
    // Reset and close form
    sipForm.reset();
    closeSipModalFunc();
});
// ================= UNIVERSAL MODAL HANDLER =================
function setupModalClose() {
    // Close modals when clicking close button
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal') || 
                           this.closest('.modal').id;
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupModalClose();
});