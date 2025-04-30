// Example JavaScript
document.addEventListener("DOMContentLoaded", function () { 
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
   // Check for dark mode preference
   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// DOM elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section-content');
const pageTitle = document.getElementById('page-title');
const studentNav = document.getElementById('student-nav');
const supervisorNav = document.getElementById('supervisor-nav');
const roleSelector = document.getElementById('role-selector');
const chapterGuideModal = document.getElementById('chapter-guide-modal');
const chapterGuideBtn = document.getElementById('chapter-guide-btn');
const closeGuideModalBtn = document.getElementById('close-guide-modal');
const closeGuideBtn = document.getElementById('close-guide-btn');
const guideTitle = document.getElementById('guide-title');
const guideContent = document.getElementById('guide-content');
const chaptersNavigation = document.getElementById('chapters-navigation');
const chapterTitle = document.getElementById('chapter-title');
const chapterContentView = document.getElementById('chapter-content-view');
const chapterContentEditor = document.getElementById('chapter-content-editor');
const chapterEditor = document.getElementById('chapter-editor');
const chapterEditBtn = document.getElementById('chapter-edit-btn');
const chapterSaveBtn = document.getElementById('chapter-save-btn');
const generateReportBtn = document.getElementById('generate-report-btn');
const notificationBtn = document.getElementById('notification-btn');
const notificationDropdown = document.getElementById('notification-dropdown');
const markAllReadBtn = document.getElementById('mark-all-read');
const notificationBadge = document.getElementById('notification-badge');
const notificationItems = document.querySelectorAll('.notification-item');

// Initialize the UI
let currentRole = 'student';
let currentUser = 'Desire Munyanyi';
let currentSection = 'home';
let currentChapter = 'chapter1';
let isEditingChapter = false;

// Toggle sidebar on mobile
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
});

// Navigation handling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('bg-primary', 'text-white', 'active-nav'));
        
        // Add active class to clicked link
        link.classList.add('bg-primary', 'text-white', 'active-nav');
        
        // Get the section id from data attribute
        const sectionId = link.getAttribute('data-section');
        currentSection = sectionId;
    
        // Close sidebar on mobile when a link is clicked
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        }
    });
});

// Update UI based on role
function updateUIForRole(role) {
    currentRole = role;
    const userInitial = document.getElementById('user-initial');
    const userName = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');
    const settingsInitial = document.getElementById('settings-initial');
    const settingsName = document.getElementById('settings-name');
    const settingsEmail = document.getElementById('settings-email');
    const settingsId = document.getElementById('settings-id');
    const settingsIdLabel = document.getElementById('settings-id-label');
    const settingsAvatar = document.getElementById('settings-avatar');
    const settingsTitle = document.getElementById('settings-title');
    
    if (role === 'student') {
        userInitial.textContent = 'D';
        userName.textContent = 'Desire Munyanyi';
        userRole.textContent = 'Student';
        currentUser = 'Desire Munyanyi';
        
        // Update settings
        settingsInitial.textContent = 'D';
        settingsName.value = 'Desire Munyanyi';
        settingsEmail.value = 'h230719c@hit.ac.zw';
        settingsId.value = 'H230719C';
        settingsIdLabel.textContent = 'Student ID';
        settingsAvatar.className = 'w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold mr-4';
        settingsTitle.textContent = 'Student Settings';
        
        // Show home section by default
        sections.forEach(section => section.classList.add('hidden'));
        document.getElementById('home-section').classList.remove('hidden');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('bg-primary', 'text-white', 'active-nav'));
        document.querySelector('.nav-link[data-section="home"]').classList.add('bg-primary', 'text-white', 'active-nav');
        pageTitle.textContent = 'Home';
    } else {
        userInitial.textContent = 'B';
        userName.textContent = 'Mr B Nyaruviro';
        userRole.textContent = 'Supervisor';
        currentUser = 'Mr B Nyaruviro';
        
        // Update settings
        settingsInitial.textContent = 'B';
        settingsName.value = 'Mr B Nyaruviro';
        settingsEmail.value = 'bnyaruviro@hit.ac.zw';
        settingsId.value = 'SUP2024-001';
        settingsIdLabel.textContent = 'Supervisor ID';
        settingsAvatar.className = 'w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold mr-4';
        settingsTitle.textContent = 'Supervisor Settings';
        
        // Show supervisor nav, hide student nav
        studentNav.classList.add('hidden');
        supervisorNav.classList.remove('hidden');
        
        // Show supervisor home section by default
        sections.forEach(section => section.classList.add('hidden'));
        document.getElementById('supervisor-home-section').classList.remove('hidden');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('bg-primary', 'text-white', 'active-nav'));
        document.querySelector('.nav-link[data-section="supervisor-home"]').classList.add('bg-primary', 'text-white', 'active-nav');
        pageTitle.textContent = 'Dashboard';
    }
}

// Initialize chapter navigation
function initChapterNavigation() {
    const chapterNavItems = document.querySelectorAll('.chapter-nav-item');
    
    chapterNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active chapter
            chapterNavItems.forEach(nav => nav.classList.remove('bg-primary/10', 'text-primary'));
            item.classList.add('bg-primary/10', 'text-primary');
            
            // Load chapter content
            const chapterKey = item.getAttribute('data-chapter');
            loadChapterContent(chapterKey);
        });
    });
}

// Load chapter content (simplified version)
function loadChapterContent(chapterKey) {
    currentChapter = chapterKey;
    
    // Set chapter title based on the selected chapter
    switch(chapterKey) {
        case 'pre-chapter':
            chapterTitle.textContent = 'Pre-Chapter Section';
            break;
        case 'chapter1':
            chapterTitle.textContent = 'Chapter 1: Introduction';
            break;
        case 'chapter2':
            chapterTitle.textContent = 'Chapter 2: Literature Review';
            break;
        case 'chapter3':
            chapterTitle.textContent = 'Chapter 3: Analysis';
            break;
        case 'chapter4':
            chapterTitle.textContent = 'Chapter 4: Design';
            break;
        case 'chapter5':
            chapterTitle.textContent = 'Chapter 5: Implementation & Testing';
            break;
        case 'chapter6':
            chapterTitle.textContent = 'Chapter 6: Conclusions & Recommendations';
            break;
        case 'references':
            chapterTitle.textContent = 'References';
            break;
        case 'appendices':
            chapterTitle.textContent = 'Appendices';
            break;
        default:
            chapterTitle.textContent = 'Chapter Content';
    }
    
    // Reset editing state
    isEditingChapter = false;
    chapterContentView.classList.remove('hidden');
    chapterContentEditor.classList.add('hidden');
    chapterEditBtn.classList.remove('hidden');
    chapterSaveBtn.classList.add('hidden');
}

// Toggle chapter editing
function toggleChapterEditing() {
    if (isEditingChapter) {
        // Save changes
        const content = chapterEditor.value;
        chapterContentView.innerHTML = marked.parse(content);
        
        // Reset editing state
        isEditingChapter = false;
        chapterContentView.classList.remove('hidden');
        chapterContentEditor.classList.add('hidden');
        chapterEditBtn.classList.remove('hidden');
        chapterSaveBtn.classList.add('hidden');
    } else {
        // Enter editing mode
        const content = chapterContentView.innerHTML;
        // This is a simple approach; in a real app you'd convert from HTML to Markdown
        chapterEditor.value = content;
        
        isEditingChapter = true;
        chapterContentView.classList.add('hidden');
        chapterContentEditor.classList.remove('hidden');
        chapterEditBtn.classList.add('hidden');
        chapterSaveBtn.classList.remove('hidden');
    }
}

// Show chapter guide
function showChapterGuide() {
    // Set guide title based on current chapter
    guideTitle.textContent = `${chapterTitle.textContent} - Guide`;
    
    // In a real app, you would load the appropriate guide content
    // For now, we'll keep the default content
    
    chapterGuideModal.classList.remove('hidden');
}

// Submit chapter feedback
function submitChapterFeedback() {
    const feedbackText = document.getElementById('feedback-input').value.trim();
    if (!feedbackText) return;
    
    // In a real app, this would save the feedback to a database
    
    // Create a new feedback element
    const feedbackList = document.getElementById('feedback-list');
    const newFeedback = document.createElement('div');
    newFeedback.className = 'bg-light-bg dark:bg-dark-bg p-3 rounded-lg';
    
    const initials = currentUser === 'Desire Munyanyi' ? 'DM' : 'BN';
    const bgColor = currentUser === 'Desire Munyanyi' ? 'bg-primary' : 'bg-purple-600';
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    newFeedback.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full ${bgColor} flex items-center justify-center text-white mr-2">
                    <span class="text-xs font-bold">${initials}</span>
                </div>
                <span class="font-medium">${currentUser}</span>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">${currentDate}</span>
        </div>
        <p class="text-sm">${feedbackText}</p>
    `;
    
    // Add to the feedback list
    feedbackList.insertBefore(newFeedback, feedbackList.firstChild);
    
    // Clear the input
    document.getElementById('feedback-input').value = '';
}

// Generate report
function generateReport() {
    // Show document preview when a report is generated
    document.getElementById('document-preview').scrollIntoView({ behavior: 'smooth' });
    alert('Report generated successfully. You can view it in the preview section below.');
}

// Toggle notification dropdown
function toggleNotifications() {
    notificationDropdown.classList.toggle('hidden');
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
    notificationBadge.classList.add('hidden');
    notificationItems.forEach(item => {
        item.classList.add('opacity-60');
    });
}

// Handle group message sending
function sendGroupMessage() {
    const messageInput = document.getElementById('group-message');
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Clear the input
    messageInput.value = '';
    
    // Create a new message element (simplified)
    const messagesContainer = document.querySelector('.space-y-4.mb-4.h-\\[300px\\].overflow-y-auto');
    const newMessage = document.createElement('div');
    newMessage.className = 'flex items-start justify-end';
    newMessage.innerHTML = `
        <div class="bg-primary/10 p-2 rounded-lg border border-primary/20 max-w-[80%]">
            <p class="text-sm">${message}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Just now</p>
        </div>
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ml-2 flex-shrink-0">
            <span class="text-xs font-bold">DM</span>
        </div>
    `;
    
    // Add to the messages container
    messagesContainer.appendChild(newMessage);
    
    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle chat message sending
function sendChatMessage() {
    const messageInput = document.getElementById('chat-input');
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Clear the input
    messageInput.value = '';
    
    // Create a new message element
    const messagesContainer = document.getElementById('chat-messages');
    const newMessage = document.createElement('div');
    newMessage.className = 'flex items-end justify-end';
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    newMessage.innerHTML = `
        <div class="max-w-[75%] bg-primary rounded-lg p-3 text-white">
            <p class="text-xs text-white/70 mb-1">You • ${timeStr}</p>
            <p>${message}</p>
        </div>
    `;
    
    // Add to the messages container
    messagesContainer.appendChild(newMessage);
    
    // Scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Delete annotation
function deleteAnnotation(e) {
    const annotationItem = e.target.closest('.flex.justify-between.items-center');
    if (annotationItem) {
        annotationItem.remove();
    }
}

// Add annotation
function addAnnotation() {
    const annotationsList = document.getElementById('annotations-list');
    const addButton = document.getElementById('add-annotation');
    
    // Create input field for new annotation
    const newAnnotationInput = document.createElement('div');
    newAnnotationInput.className = 'flex items-center space-x-2 mb-2';
    newAnnotationInput.innerHTML = `
        <input type="text" placeholder="Enter annotation..." class="flex-1 px-2 py-1 border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg rounded-md text-sm">
        <button class="px-2 py-1 bg-primary text-white rounded-md text-xs annotation-save">Save</button>
        <button class="px-2 py-1 border border-light-border dark:border-dark-border rounded-md text-xs annotation-cancel">Cancel</button>
    `;
    
    // Insert before the add button
    annotationsList.insertBefore(newAnnotationInput, addButton);
    
    // Focus the input
    const input = newAnnotationInput.querySelector('input');
    input.focus();
    
    // Handle save
    const saveBtn = newAnnotationInput.querySelector('.annotation-save');
    saveBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
            const newAnnotation = document.createElement('div');
            newAnnotation.className = 'flex justify-between items-center p-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-md';
            newAnnotation.innerHTML = `
                <span class="text-sm">${text}</span>
                <button class="text-red-500 annotation-delete">
                    <i class="bx bx-x"></i>
                </button>
            `;
            
            // Add delete event listener
            const deleteBtn = newAnnotation.querySelector('.annotation-delete');
            deleteBtn.addEventListener('click', deleteAnnotation);
            
            // Insert before the add button
            annotationsList.insertBefore(newAnnotation, addButton);
        }
        
        // Remove the input
        newAnnotationInput.remove();
    });
    
    // Handle cancel
    const cancelBtn = newAnnotationInput.querySelector('.annotation-cancel');
    cancelBtn.addEventListener('click', () => {
        newAnnotationInput.remove();
    });
}

// Set theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        // System theme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}
//role selector 
const studentSections = document.querySelectorAll('.student-section');
const supervisorSections = document.querySelectorAll('.supervisor-section');

function toggleSections() {
    const selectedRole = roleSelector.value;

    if (selectedRole === 'student') {
        studentSections.forEach(section => section.classList.remove('hidden'));
        supervisorSections.forEach(section => section.classList.add('hidden'));
    } else if (selectedRole === 'supervisor') {
        supervisorSections.forEach(section => section.classList.remove('hidden'));
        studentSections.forEach(section => section.classList.add('hidden'));
    }
}

// Initial toggle based on the current selection
toggleSections();

// Add event listener to toggle sections on role change
roleSelector.addEventListener('change', toggleSections);

chapterGuideBtn.addEventListener('click', showChapterGuide);
closeGuideModalBtn.addEventListener('click', () => chapterGuideModal.classList.add('hidden'));
closeGuideBtn.addEventListener('click', () => chapterGuideModal.classList.add('hidden'));
chapterEditBtn.addEventListener('click', toggleChapterEditing);
chapterSaveBtn.addEventListener('click', toggleChapterEditing);
generateReportBtn.addEventListener('click', generateReport);
document.getElementById('generate-report').addEventListener('click', generateReport);
document.getElementById('generate-supervisor-report').addEventListener('click', generateReport);

document.getElementById('submit-feedback').addEventListener('click', submitChapterFeedback);

notificationBtn.addEventListener('click', toggleNotifications);
markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);

// Chat functionality
document.getElementById('send-group-message').addEventListener('click', sendGroupMessage);
document.getElementById('send-chat-btn').addEventListener('click', sendChatMessage);

// Theme toggling
document.getElementById('theme-light').addEventListener('click', () => setTheme('light'));
document.getElementById('theme-dark').addEventListener('click', () => setTheme('dark'));
document.getElementById('theme-system').addEventListener('click', () => setTheme('system'));

// Delete annotations
document.querySelectorAll('.annotation-delete').forEach(btn => {
    btn.addEventListener('click', deleteAnnotation);
});

// Add annotation
document.getElementById('add-annotation').addEventListener('click', addAnnotation);

// Review form submission
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

// Logout buttons
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        alert('You have been logged out successfully.');
        // In a real app, you would redirect to login page
        window.location.reload();
    }
});

document.getElementById('supervisor-logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        alert('You have been logged out successfully.');
        // In a real app, you would redirect to login page
        window.location.reload();
    }
});

// Initialize the application
updateUIForRole('student');
initChapterNavigation();
console.log("JavaScript is loaded!");