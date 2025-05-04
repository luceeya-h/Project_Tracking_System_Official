document.addEventListener("DOMContentLoaded", function () {

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
    }

    // Listen for system theme changes and update dynamically
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('supervisor-nav');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });
    }

    // Notification dropdown
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');
    const markAllReadBtn = document.getElementById('mark-all-read');
    const notificationBadge = document.getElementById('notification-badge');
    const notificationItems = document.querySelectorAll('.notification-item');

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', () => {
            notificationDropdown.classList.toggle('hidden');
        });
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            notificationBadge?.classList.add('hidden');
            notificationItems.forEach(item => item.classList.add('opacity-60'));
        });
    }

    // DOM elements specific to supervisor
    const supervisorNav = document.getElementById('supervisor-nav');
    const supervisorSections = document.querySelectorAll('.supervisor-section');
    const generateReportBtn = document.getElementById('generate-supervisor-report');

    // Update UI for supervisor role
    function updateUIForSupervisor() {
        supervisorNav.classList.remove('hidden');
        supervisorSections.forEach(section => section.classList.remove('hidden'));
    }

    // Generate supervisor report
    document.getElementById('generate-supervisor-report')?.addEventListener('click', () => {
        document.getElementById('document-preview')?.scrollIntoView({ behavior: 'smooth' });
        alert('Supervisor report generated successfully.');
    });

    // Theme toggling
    document.getElementById('theme-light')?.addEventListener('click', () => document.documentElement.classList.remove('dark'));
    document.getElementById('theme-dark')?.addEventListener('click', () => document.documentElement.classList.add('dark'));
    document.getElementById('theme-system')?.addEventListener('click', () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    // Supervisor review form actions
    document.getElementById('save-review-draft')?.addEventListener('click', () => {
        alert('Review draft saved successfully');
    });

    document.getElementById('submit-review')?.addEventListener('click', () => {
        const reviewComments = document.getElementById('review-comments')?.value.trim();
        const reviewScore = document.getElementById('review-score')?.value;
        const reviewDecision = document.getElementById('review-decision')?.value;

        if (!reviewComments || !reviewScore || !reviewDecision) {
            alert('Please fill out all required fields');
            return;
        }

        alert('Review submitted successfully');
    });

    // Logout
    document.getElementById('supervisor-logout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            alert('You have been logged out successfully.');
            window.location.reload();
        }
    });

    // Initialize supervisor-specific UI
    updateUIForSupervisor();
});
