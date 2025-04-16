document.addEventListener('DOMContentLoaded', () =>{
    console.log('Authentication page loaded.');

    const emailInput = document.getElementById('id_email');
    const roleInput = document.getElementById('id_role');
    const registerButton = document.getElementById('register_button'); // Assuming the register button has this ID

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

    if (registerButton) {
        registerButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submission
            const role = roleInput.value;

            alert(`You are registering as a ${role}.`);
            window.location.href = '/login'; // Redirect to the login page
        });
    }
            const localPart = emailValue.split('@')[0];

            if (localPart.startsWith('H23')) {
                roleInput.value = 'student';
            } else if (localPart.length > 2 && /^[a-zA-Z]+$/.test(localPart)) {
                roleInput.value = 'supervisor';
            } else {
                roleInput.value = 'student'; // Default role
            }
        });


// Add your JavaScript code here
