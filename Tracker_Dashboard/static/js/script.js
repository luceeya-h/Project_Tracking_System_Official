// Example JavaScript
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript is loaded!");
    // Add your custom JavaScript logic here

    // JavaScript to toggle supervisor view
    const roleSelector = document.getElementById('role-selector');
    const studentNav = document.getElementById('student-nav');
    const supervisorNav = document.getElementById('supervisor-nav');

    roleSelector.addEventListener('change', () => {
        if (roleSelector.value === 'supervisor') {
            studentNav.classList.add('hidden');
            supervisorNav.classList.remove('hidden');
        } else {
            supervisorNav.classList.add('hidden');
            studentNav.classList.remove('hidden');
        }
    });
});
