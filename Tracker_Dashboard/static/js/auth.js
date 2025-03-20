document.addEventListener('DOMContentLoaded', () => {
    console.log('Authentication page loaded.');

    const emailInput = document.getElementById('id_email');
    const roleInput = document.getElementById('id_role');

    if (emailInput && roleInput) {
        emailInput.addEventListener('input', function() {
            const emailValue = emailInput.value;
            const localPart = emailValue.split('@')[0];

            if (localPart.startsWith('H23')) {
                roleInput.value = 'student';
            } else if (localPart.length > 2 && /^[a-zA-Z]+$/.test(localPart)) {
                roleInput.value = 'supervisor';
            } else {
                roleInput.value = 'student'; // Default role
            }
        });
    }

    // Validating the register and login forms.
});

// Add your JavaScript code here
