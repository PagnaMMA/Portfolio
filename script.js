// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close mobile menu after click
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update the button text based on the current mode
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️ Light Mode';
    } else {
        darkModeToggle.textContent = '🌙 Dark Mode';
    }
    
    // Save preference to local storage
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const darkModeSaved = localStorage.getItem('darkMode') === 'true';
    if (darkModeSaved) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Light Mode';
    }
});

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation setup
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .contact-info, .contact-form');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load
    setTimeout(animateOnScroll, 300);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Timeline animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Initial state - hide timeline items
    timelineItems.forEach(item => {
      item.style.opacity = 0;
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const animateTimeline = () => {
      timelineItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Add delay based on index for cascading effect
        if (itemPosition < windowHeight - 50) {
          setTimeout(() => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
          }, index * 200); // 200ms delay between each item
        }
      });
    };
    
    // Run animation on page load after a slight delay
    setTimeout(animateTimeline, 500);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateTimeline);
  });

  // Enhanced form validation and submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formFields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };
    const formErrors = {};
    
    // Create error message elements
    Object.keys(formFields).forEach(field => {
      formErrors[field] = document.createElement('div');
      formErrors[field].className = 'error-message';
      formFields[field].after(formErrors[field]);
    });
    
    // Validation functions
    const validators = {
      name: value => value.trim().length > 2 ? '' : 'Name must be at least 3 characters',
      email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address',
      subject: value => value.trim().length > 3 ? '' : 'Subject must be at least 4 characters',
      message: value => value.trim().length > 10 ? '' : 'Message must be at least 10 characters'
    };
    
    // Live validation as user types
    Object.keys(formFields).forEach(field => {
      formFields[field].addEventListener('input', () => {
        const error = validators[field](formFields[field].value);
        formErrors[field].textContent = error;
        formFields[field].classList.toggle('invalid', Boolean(error));
      });
    });
    
    // Form submission with proper handling
    if (contactForm) {
      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields before submission
        let hasErrors = false;
        Object.keys(formFields).forEach(field => {
          const error = validators[field](formFields[field].value);
          formErrors[field].textContent = error;
          if (error) {
            hasErrors = true;
            formFields[field].classList.add('invalid');
          }
        });
        
        if (hasErrors) {
          return;
        }
        
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
          // Simulated API call (replace with actual endpoint when available)
          // const response = await fetch('/api/contact', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     name: formFields.name.value,
          //     email: formFields.email.value,
          //     subject: formFields.subject.value,
          //     message: formFields.message.value
          //   })
          // });
          
          // if (!response.ok) {
          //   throw new Error('Network response was not ok');
          // }
          
          // Simulated success for now
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
          contactForm.innerHTML = '';
          contactForm.appendChild(successMessage);
          
        } catch (error) {
          console.error('Error submitting form:', error);
          const errorBanner = document.createElement('div');
          errorBanner.className = 'error-banner';
          errorBanner.textContent = 'Sorry, there was a problem sending your message. Please try again later.';
          contactForm.prepend(errorBanner);
          
          // Reset button
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    }
  });