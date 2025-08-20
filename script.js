document.addEventListener('DOMContentLoaded', function () {
    const menteeForm = document.getElementById('menteeForm');
    const container = document.querySelector('.container');
    const menteeNameInput = document.getElementById('menteeName');

    // Initialize page animations
    function initAnimations() {
        // Fade in the container
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.6s ease';

        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);

        // Animate form elements sequentially
        const formElements = document.querySelectorAll('input, button');
        formElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(15px)';
            element.style.transition = 'all 0.5s ease';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }

    // Enhanced validation with better feedback
    function showValidationError(input, message) {
        // Remove any existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message
        const errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#f72585';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.animation = 'shake 0.5s ease';

        input.parentNode.appendChild(errorElement);

        // Add shake animation to input
        input.style.borderColor = '#f72585';
        input.style.animation = 'shake 0.5s ease';

        // Remove animation after it completes
        setTimeout(() => {
            input.style.animation = '';
        }, 500);

        // Focus on the input
        input.focus();
    }

    // Remove validation error
    function removeValidationError(input) {
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '#e2e8f0';
    }

    // Handle form submission
    menteeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const menteeName = menteeNameInput.value.trim();

        if (!menteeName) {
            showValidationError(menteeNameInput, 'Please enter the mentee name to continue');
            return;
        }

        if (menteeName.length < 2) {
            showValidationError(menteeNameInput, 'Name should be at least 2 characters long');
            return;
        }

        // Add loading animation to button
        const submitButton = menteeForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting Session...';
        submitButton.disabled = true;

        // Store the mentee name for use in the next page
        sessionStorage.setItem('menteeName', menteeName);

        // Simulate a brief loading period before redirecting
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1200);
    });

    // Real-time validation
    menteeNameInput.addEventListener('input', function () {
        if (this.value.trim()) {
            removeValidationError(this);
        }
    });

    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
  `;
    document.head.appendChild(style);

    // Initialize animations
    initAnimations();
});