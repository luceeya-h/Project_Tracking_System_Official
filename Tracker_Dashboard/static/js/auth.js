document.addEventListener('DOMContentLoaded', () => {
    console.log('Authentication page loaded.');


    const emailInput = document.getElementById('id_email');
        emailInput.addEventListener('input', function() {
            const emailValue = emailInput.value;
            if (emailValue.startsWith('REG')) {
                document.getElementById('id_registration_number').required = true;
            } else if (emailValue.startsWith('TN')) {
                document.getElementById('id_registration_number').required = false;
            }
        });

    // Validating the register and login forms.
});

// Add your JavaScript code here
