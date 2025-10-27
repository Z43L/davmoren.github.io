// Text Highlighter con persistencia
(function() {
    'use strict';

    const STORAGE_KEY = 'text-highlights';
    const COLORS = ['yellow', 'green', 'blue', 'pink', 'purple', 'orange'];

    let highlighterMenu = null;
    let currentSelection = null;
    let longPressTimer = null;
    const LONG_PRESS_DURATION = 500; // ms

    // Crear el menú de highlighter
    function createHighlighterMenu() {
        const menu = document.createElement('div');
        menu.className = 'highlighter-menu';
        menu.id = 'highlighter-menu';

        // Botones de colores
        COLORS.forEach(color => {
            const button = document.createElement('button');
            button.className = `highlighter-button ${color}`;
            button.title = color.charAt(0).toUpperCase() + color.slice(1);
            button.setAttribute('data-color', color);
            button.type = 'button'; // Importante para prevenir submit
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                highlightSelection(color);
            });
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                highlightSelection(color);
            });
            menu.appendChild(button);
        });

        // Botón para remover highlight
        const removeButton = document.createElement('button');
        removeButton.className = 'highlighter-button remove';
        removeButton.title = 'Quitar resaltado';
        removeButton.type = 'button';
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeHighlight();
        });
        removeButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            removeHighlight();
        });
        menu.appendChild(removeButton);

        document.body.appendChild(menu);
        return menu;
    }

    // Obtener la posición del menú cerca de la selección
    function getMenuPosition() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return { x: 0, y: 0 };

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        return {
            x: rect.left + (rect.width / 2),
            y: rect.top - 10 // Encima de la selección
        };
    }

    // Mostrar el menú de highlighter
    function showHighlighterMenu() {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        // Solo mostrar si hay texto seleccionado y está dentro del post-content
        if (!selectedText || selectedText.length === 0) {
            hideHighlighterMenu();
            return;
        }

        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        const postContent = container.nodeType === 3
            ? container.parentElement.closest('.post-content')
            : container.closest('.post-content');

        if (!postContent) {
            hideHighlighterMenu();
            return;
        }

        currentSelection = {
            text: selectedText,
            range: range.cloneRange()
        };

        const pos = getMenuPosition();
        highlighterMenu.style.left = `${pos.x}px`;
        highlighterMenu.style.top = `${pos.y}px`;
        highlighterMenu.style.transform = 'translateX(-50%) translateY(-100%)';
        highlighterMenu.classList.add('active');
    }

    // Ocultar el menú
    function hideHighlighterMenu() {
        if (highlighterMenu) {
            highlighterMenu.classList.remove('active');
        }
        currentSelection = null;
    }

    // Aplicar resaltado
    function highlightSelection(color) {
        console.log('Applying highlight with color:', color);

        if (!currentSelection) {
            console.warn('No selection available');
            return;
        }

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(currentSelection.range);

        const range = selection.getRangeAt(0);
        const mark = document.createElement('mark');
        mark.className = `highlight highlight-${color}`;
        mark.setAttribute('data-highlight-id', generateId());
        mark.setAttribute('data-color', color);

        console.log('Created mark with classes:', mark.className);

        try {
            range.surroundContents(mark);
            console.log('Highlight applied successfully');
            saveHighlights();
            hideHighlighterMenu();
        } catch (e) {
            // Si falla (por ejemplo, selección parcial de nodos), usar execCommand
            console.warn('Fallback to alternative highlight method', e);
            // Alternativa: insertar el contenido manualmente
            const fragment = range.extractContents();
            mark.appendChild(fragment);
            range.insertNode(mark);
            console.log('Highlight applied with fallback method');
            saveHighlights();
            hideHighlighterMenu();
        }

        selection.removeAllRanges();
    }

    // Remover resaltado
    function removeHighlight() {
        console.log('Removing highlight');

        if (!currentSelection) {
            console.warn('No selection available for removal');
            return;
        }

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(currentSelection.range);

        const range = currentSelection.range;

        // Encontrar el mark element más cercano
        let element = range.commonAncestorContainer;
        if (element.nodeType === 3) element = element.parentElement;

        const mark = element.closest('mark.highlight');

        if (mark) {
            console.log('Found mark to remove:', mark);
            const parent = mark.parentNode;

            // Mover todos los nodos hijos fuera del mark
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }

            // Remover el mark vacío
            parent.removeChild(mark);

            // Normalizar el texto para limpiar nodos adyacentes
            parent.normalize();

            console.log('Highlight removed successfully');
            saveHighlights();
        } else {
            console.warn('No highlight mark found to remove');
        }

        hideHighlighterMenu();
        selection.removeAllRanges();
    }

    // Generar ID único
    function generateId() {
        return `hl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Guardar highlights en localStorage
    function saveHighlights() {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        const highlights = [];
        const marks = postContent.querySelectorAll('mark.highlight[data-highlight-id]');

        marks.forEach(mark => {
            const textContent = mark.textContent;
            const color = mark.getAttribute('data-color');
            const id = mark.getAttribute('data-highlight-id');

            // Obtener contexto (texto antes y después para mejor identificación)
            const parent = mark.parentNode;
            const parentText = parent.textContent;
            const index = parentText.indexOf(textContent);
            const before = parentText.substring(Math.max(0, index - 20), index);
            const after = parentText.substring(index + textContent.length, index + textContent.length + 20);

            highlights.push({
                id,
                text: textContent,
                color,
                before,
                after,
                path: getElementPath(mark)
            });
        });

        const pageUrl = window.location.pathname;
        const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        storage[pageUrl] = highlights;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
    }

    // Obtener el path del elemento para mejor identificación
    function getElementPath(element) {
        const path = [];
        let current = element;

        while (current && current !== document.body) {
            let index = 0;
            let sibling = current;
            while (sibling = sibling.previousElementSibling) {
                index++;
            }
            path.unshift({
                tag: current.tagName,
                index: index,
                class: current.className
            });
            current = current.parentElement;
        }

        return path;
    }

    // Restaurar highlights desde localStorage
    function restoreHighlights() {
        const pageUrl = window.location.pathname;
        const storage = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const pageHighlights = storage[pageUrl];

        if (!pageHighlights || pageHighlights.length === 0) return;

        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        // Remover highlights existentes primero
        postContent.querySelectorAll('mark.highlight').forEach(mark => {
            const parent = mark.parentNode;
            while (mark.firstChild) {
                parent.insertBefore(mark.firstChild, mark);
            }
            parent.removeChild(mark);
        });

        // Aplicar cada highlight guardado
        pageHighlights.forEach(hl => {
            highlightText(postContent, hl);
        });
    }

    // Aplicar highlight a un texto específico
    function highlightText(container, highlightData) {
        const { text, color, before, after, id } = highlightData;

        // Buscar el texto usando TreeWalker
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            const nodeText = node.textContent;
            const index = nodeText.indexOf(text);

            if (index !== -1) {
                // Verificar contexto si está disponible
                const actualBefore = nodeText.substring(Math.max(0, index - 20), index);
                const actualAfter = nodeText.substring(index + text.length, index + text.length + 20);

                if ((before && actualBefore.includes(before)) || !before) {
                    if ((after && actualAfter.includes(after)) || !after) {
                        // Crear el highlight
                        const range = document.createRange();
                        range.setStart(node, index);
                        range.setEnd(node, index + text.length);

                        const mark = document.createElement('mark');
                        mark.className = `highlight highlight-${color}`;
                        mark.setAttribute('data-highlight-id', id);
                        mark.setAttribute('data-color', color);

                        try {
                            range.surroundContents(mark);
                            return; // Éxito, salir
                        } catch (e) {
                            console.warn('Could not restore highlight:', e);
                        }
                    }
                }
            }
        }
    }

    // Event listeners para selección de texto
    function setupEventListeners() {
        // Desktop: mouseup
        document.addEventListener('mouseup', (e) => {
            // Pequeño delay para asegurar que la selección esté completa
            setTimeout(() => {
                const selection = window.getSelection();
                if (selection.toString().trim().length > 0) {
                    // No mostrar si se clickeó en el menú
                    if (!e.target.closest('.highlighter-menu')) {
                        showHighlighterMenu();
                    }
                } else {
                    hideHighlighterMenu();
                }
            }, 10);
        });

        // Móvil: long press para mostrar menú
        let touchStartPos = { x: 0, y: 0 };

        document.addEventListener('touchstart', (e) => {
            touchStartPos = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };

            longPressTimer = setTimeout(() => {
                const selection = window.getSelection();
                if (selection.toString().trim().length > 0) {
                    showHighlighterMenu();
                }
            }, LONG_PRESS_DURATION);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            // Cancelar long press si se mueve mucho el dedo
            const touch = e.touches[0];
            const deltaX = Math.abs(touch.clientX - touchStartPos.x);
            const deltaY = Math.abs(touch.clientY - touchStartPos.y);

            if (deltaX > 10 || deltaY > 10) {
                if (longPressTimer) {
                    clearTimeout(longPressTimer);
                    longPressTimer = null;
                }
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }

            // Mostrar menú si hay selección después de soltar
            setTimeout(() => {
                const selection = window.getSelection();
                if (selection.toString().trim().length > 0) {
                    showHighlighterMenu();
                }
            }, 100);
        });

        // Ocultar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.highlighter-menu') && !e.target.closest('mark.highlight')) {
                const selection = window.getSelection();
                if (!selection.toString().trim()) {
                    hideHighlighterMenu();
                }
            }
        });

        // Ocultar al scroll
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(hideHighlighterMenu, 100);
        }, { passive: true });
    }

    // Inicializar
    function init() {
        // Solo activar en páginas de posts
        if (!document.querySelector('.post-content')) return;

        highlighterMenu = createHighlighterMenu();
        setupEventListeners();

        // Restaurar highlights guardados
        window.addEventListener('load', restoreHighlights);

        // Si ya está cargado
        if (document.readyState === 'complete') {
            restoreHighlights();
        }
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
