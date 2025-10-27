// Theme Toggle Script
(function() {
    'use strict';

    const STORAGE_KEY = 'theme-preference';

    // Obtener preferencia guardada o detectar preferencia del sistema
    function getThemePreference() {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
            return storedTheme;
        }

        // Detectar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    // Aplicar tema
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Inicializar tema al cargar la página
    function initTheme() {
        const theme = getThemePreference();
        setTheme(theme);
    }

    // Toggle entre modo claro y oscuro
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Inicializar tema inmediatamente
    initTheme();

    // Esperar a que el DOM esté listo para agregar el event listener
    document.addEventListener('DOMContentLoaded', function() {
        const toggleButton = document.getElementById('theme-toggle');

        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }

        // Escuchar cambios en la preferencia del sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                // Solo cambiar automáticamente si el usuario no ha establecido una preferencia manual
                if (!localStorage.getItem(STORAGE_KEY)) {
                    setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    });

    // Prevenir flash de contenido sin estilo (FOUC) en modo oscuro
    // Este script debe ejecutarse lo antes posible
    const style = document.createElement('style');
    style.textContent = `
        html:not([data-theme]) {
            visibility: hidden;
            opacity: 0;
        }
        html[data-theme] {
            visibility: visible;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
})();
