// Page scripts (moved from inline <script> in index.html)

const htmlElement = document.documentElement;

/**
 * Initializes the theme based on localStorage or OS preference.
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    let initialTheme = 'light';

    if (savedTheme === 'light') {
        initialTheme = 'light';
    } else if (savedTheme === 'dark') {
        initialTheme = 'dark';
    } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialTheme = prefersDark ? 'dark' : 'light';
    }

    if (initialTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    localStorage.setItem('theme', initialTheme);
}

/**
 * Update visibility of sun/moon icons (some builds replace SVGs via Lucide).
 */
function updateThemeIcons() {
    const moon = document.getElementById('icon-moon');
    const sun = document.getElementById('icon-sun');
    const isDark = htmlElement.classList.contains('dark');
    if (moon) {
        if (isDark) {
            moon.classList.remove('hidden');
            moon.classList.add('block');
        } else {
            moon.classList.add('hidden');
            moon.classList.remove('block');
        }
    }
    if (sun) {
        if (isDark) {
            sun.classList.add('hidden');
            sun.classList.remove('block');
        } else {
            sun.classList.remove('hidden');
            sun.classList.add('block');
        }
    }
}
// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide icons (if lucide is loaded)
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    // Mobile nav toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileNav = document.getElementById('mobileNav');
    const mobileCloseButton = document.getElementById('mobileCloseButton');
    function openMobileNav() {
        if (mobileNav) {
            mobileNav.classList.remove('hidden');
            if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'true');
        }
    }
    function closeMobileNav() {
        if (mobileNav) {
            mobileNav.classList.add('hidden');
            if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    }
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', (e) => {
            const isHidden = mobileNav.classList.contains('hidden');
            if (isHidden) openMobileNav(); else closeMobileNav();
        });
    }
    if (mobileCloseButton) {
        mobileCloseButton.addEventListener('click', closeMobileNav);
    }
    if (mobileNav) {
        // close when clicking overlay outside panel
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) closeMobileNav();
        });
    }

    // 2. Initialize theme
    initializeTheme();

    // 3. Theme toggle UI removed — no event listeners to attach

    // 4. Set current year in footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

