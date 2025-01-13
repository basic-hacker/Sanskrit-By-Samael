document.addEventListener('DOMContentLoaded', () => {
    // Check if the user has a saved theme preference in localStorage
    const userTheme = localStorage.getItem('theme');
    if (userTheme) {
        document.body.classList.add(userTheme); // Apply saved theme
    }

    // Theme switcher button
    const themeSwitcher = document.getElementById('theme-switcher');
    
    themeSwitcher.addEventListener('click', () => {
        // Toggle dark mode class on the body
        document.body.classList.toggle('dark-mode');
        
        // Save the user's theme preference in localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.setItem('theme', '');
        }
    });
});
