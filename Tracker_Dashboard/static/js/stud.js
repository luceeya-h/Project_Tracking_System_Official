document.addEventListener("DOMContentLoaded", function () {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('student-nav');
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

    // Chapter features
    const chapterEditBtn = document.getElementById('chapter-edit-btn');
    const chapterSaveBtn = document.getElementById('chapter-save-btn');
    const chapterEditor = document.getElementById('chapter-editor');
    const chapterContentView = document.getElementById('chapter-content-view');
    const chapterContentEditor = document.getElementById('chapter-content-editor');
    const chapterTitle = document.getElementById('chapter-title');
    let isEditingChapter = false;

    function toggleChapterEditing() {
        if (isEditingChapter) {
            chapterContentView.innerHTML = marked.parse(chapterEditor.value);
            isEditingChapter = false;
            chapterContentView.classList.remove('hidden');
            chapterContentEditor.classList.add('hidden');
            chapterEditBtn.classList.remove('hidden');
            chapterSaveBtn.classList.add('hidden');
        } else {
            chapterEditor.value = chapterContentView.innerHTML;
            isEditingChapter = true;
            chapterContentView.classList.add('hidden');
            chapterContentEditor.classList.remove('hidden');
            chapterEditBtn.classList.add('hidden');
            chapterSaveBtn.classList.remove('hidden');
        }
    }

    chapterEditBtn?.addEventListener('click', toggleChapterEditing);
    chapterSaveBtn?.addEventListener('click', toggleChapterEditing);

    // Chapter navigation
    const chapterNavItems = document.querySelectorAll('.chapter-nav-item');
    chapterNavItems.forEach(item => {
        item.addEventListener('click', () => {
            chapterNavItems.forEach(nav => nav.classList.remove('bg-primary/10', 'text-primary'));
            item.classList.add('bg-primary/10', 'text-primary');
            chapterTitle.textContent = item.textContent;
        });
    });

    // Chapter guide modal
    const chapterGuideBtn = document.getElementById('chapter-guide-btn');
    const chapterGuideModal = document.getElementById('chapter-guide-modal');
    const closeGuideModalBtn = document.getElementById('close-guide-modal');
    const closeGuideBtn = document.getElementById('close-guide-btn');

    chapterGuideBtn?.addEventListener('click', () => chapterGuideModal?.classList.remove('hidden'));
    closeGuideModalBtn?.addEventListener('click', () => chapterGuideModal?.classList.add('hidden'));
    closeGuideBtn?.addEventListener('click', () => chapterGuideModal?.classList.add('hidden'));

    // Submit feedback
    document.getElementById('submit-feedback')?.addEventListener('click', () => {
        const feedbackInput = document.getElementById('feedback-input');
        const feedbackText = feedbackInput?.value.trim();
        if (!feedbackText) return;

        const feedbackList = document.getElementById('feedback-list');
        const newFeedback = document.createElement('div');
        newFeedback.className = 'bg-light-bg dark:bg-dark-bg p-3 rounded-lg';
        newFeedback.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-2">
                        <span class="text-xs font-bold">DM</span>
                    </div>
                    <span class="font-medium">Desire Munyanyi</span>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">${new Date().toLocaleDateString()}</span>
            </div>
            <p class="text-sm">${feedbackText}</p>
        `;
        feedbackList?.prepend(newFeedback);
        feedbackInput.value = '';
    });

    // Generate report
    const generateBtn = document.getElementById('generate-report');
    generateBtn?.addEventListener('click', () => {
        document.getElementById('document-preview')?.scrollIntoView({ behavior: 'smooth' });
        alert('Report generated successfully.');
    });

    // Chat
    document.getElementById('send-group-message')?.addEventListener('click', () => {
        const messageInput = document.getElementById('group-message');
        const message = messageInput?.value.trim();
        if (!message) return;
        messageInput.value = '';

        const container = document.querySelector('.space-y-4.mb-4.h-\\[300px\\].overflow-y-auto');
        const newMessage = document.createElement('div');
        newMessage.className = 'flex items-start justify-end';
        newMessage.innerHTML = `
            <div class="bg-primary/10 p-2 rounded-lg border border-primary/20 max-w-[80%]">
                <p class="text-sm">${message}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Just now</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center ml-2 flex-shrink-0">
                <span class="text-xs font-bold">DM</span>
            </div>
        `;
        container?.appendChild(newMessage);
        container.scrollTop = container.scrollHeight;
    });

    document.getElementById('send-chat-btn')?.addEventListener('click', () => {
        const messageInput = document.getElementById('chat-input');
        const message = messageInput?.value.trim();
        if (!message) return;
        messageInput.value = '';

        const messages = document.getElementById('chat-messages');
        const newMessage = document.createElement('div');
        newMessage.className = 'flex items-end justify-end';
        newMessage.innerHTML = `
            <div class="max-w-[75%] bg-primary rounded-lg p-3 text-white">
                <p class="text-xs text-white/70 mb-1">You • ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>${message}</p>
            </div>
        `;
        messages?.appendChild(newMessage);
        messages.scrollTop = messages.scrollHeight;
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

    // Annotation management
    document.getElementById('add-annotation')?.addEventListener('click', () => {
        const list = document.getElementById('annotations-list');
        const newInput = document.createElement('div');
        newInput.className = 'flex items-center space-x-2 mb-2';
        newInput.innerHTML = `
            <input type="text" class="flex-1 px-2 py-1 border rounded-md text-sm" placeholder="Enter annotation..." />
            <button class="px-2 py-1 bg-primary text-white rounded-md text-xs">Save</button>
            <button class="px-2 py-1 border rounded-md text-xs">Cancel</button>
        `;
        list?.insertBefore(newInput, document.getElementById('add-annotation'));
    });

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            alert('You have been logged out successfully.');
            window.location.reload();
        }
    });

    // DOM elements specific to student
    const studentNav = document.getElementById('student-nav');
    const studentSections = document.querySelectorAll('.student-section');

    // Update UI for student role
    function updateUIForStudent() {
        studentNav.classList.remove('hidden');
        studentSections.forEach(section => section.classList.remove('hidden'));
    }

    // Initialize student-specific UI
    updateUIForStudent();
});
