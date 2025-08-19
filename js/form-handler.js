document.addEventListener('DOMContentLoaded', function() {
    // Main form handler
    const supportForm = document.getElementById('support-form');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const city = document.getElementById('city').value;
            const issue = document.getElementById('issue').value;
            const insurer = document.getElementById('insurer').value;
            
            // Validate mobile number
            if (!/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Validate email
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Prepare WhatsApp message
            const whatsappMessage = `New Support Request:\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nCity: ${city}\nIssue: ${issue}\nCurrent Insurer: ${insurer || 'N/A'}`;
            
            // Encode for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Send to WhatsApp
            window.open(`https://wa.me/919137297231?text=${encodedMessage}`, '_blank');
            
            // Prepare email subject and body
            const emailSubject = `New Support Request from ${name}`;
            const emailBody = whatsappMessage.replace(/\n/g, '%0D%0A');
            
            // Send email (will open user's default email client)
            window.open(`mailto:contact@amorwealth.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`);
            
            // Reset form
            supportForm.reset();
            
            // Show success message
            alert('Thank you for your request! We will contact you shortly.');
        });
    }
    
    // Modal form handler
    const modalForm = document.getElementById('modal-form');
    
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('modal-name').value;
            const mobile = document.getElementById('modal-mobile').value;
            const issue = document.getElementById('modal-issue').value;
            
            // Validate mobile number
            if (!/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Prepare WhatsApp message
            const whatsappMessage = `Quick Support Request:\n\nName: ${name}\nMobile: ${mobile}\nIssue: ${issue}`;
            
            // Encode for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Send to WhatsApp
            window.open(`https://wa.me/919137297231?text=${encodedMessage}`, '_blank');
            
            // Reset form
            modalForm.reset();
            
            // Close modal
            document.querySelector('.close-modal').click();
            
            // Show success message
            alert('Thank you for your request! We will contact you shortly.');
        });
    }
});