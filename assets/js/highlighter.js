// Text Highlighter con persistencia
(function() {
    'use strict';

    const STORAGE_KEY = 'text-highlights';
    const COLORS = ['yellow', 'green', 'blue', 'pink', 'purple', 'orange'];
    const MOBILE_BREAKPOINT = 768;

    let highlighterMenu = null;
    let currentSelection = null;
    let longPressTimer = null;
    let activeColor = null;
    let removalMode = false;
    const colorButtons = new Map();
    let removeButtonRef = null;
    let mobileWidthQuery = null;
    let coarsePointerQuery = null;
    const LONG_PRESS_DURATION = 500; // ms

    function updateMediaQueries() {
        if (!window.matchMedia) return;
        mobileWidthQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
        coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    }

    function addMediaQueryListener(query, handler) {
        if (!query || !handler) return;
        if (typeof query.addEventListener === 'function') {
            query.addEventListener('change', handler);
        } else if (typeof query.addListener === 'function') {
            query.addListener(handler);
        }
    }

    function isMobileView() {
        if (mobileWidthQuery && mobileWidthQuery.matches) return true;
        if (coarsePointerQuery && coarsePointerQuery.matches) return true;

        if (window.matchMedia) {
            try {
                if (window.matchMedia('(pointer: coarse)').matches) return true;
            } catch (e) {
                // Ignore matchMedia errors in older browsers
            }
            try {
                if (window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches) return true;
            } catch (e) {
                // Ignore matchMedia errors in older browsers
            }
        }

        if (typeof navigator !== 'undefined') {
            if (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) return true;
            if (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0) return true;
        }

        return 'ontouchstart' in window || window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function handleButtonTouchStart(e) {
        e.currentTarget.classList.add('touch-active');
    }

    function handleButtonTouchEnd(e) {
        e.currentTarget.classList.remove('touch-active');
    }

    function updateButtonStates() {
        colorButtons.forEach((button, color) => {
            const isSelected = !removalMode && activeColor === color;
            button.classList.toggle('selected', isSelected);
        });

        if (removeButtonRef) {
            removeButtonRef.classList.toggle('selected', removalMode);
        }
    }

    function setActiveColor(color) {
        activeColor = color;
        removalMode = false;
        updateButtonStates();
    }

    function enableRemovalMode() {
        if (removalMode) {
            removalMode = false;
        } else {
            activeColor = null;
            removalMode = true;
        }
        updateButtonStates();
    }

    function ensureDefaultMobileColor() {
        if (!COLORS.length) return;
        if (!activeColor) {
            setActiveColor(COLORS[0]);
        } else {
            updateButtonStates();
        }
    }

    function ensureMobileMenuVisible() {
        if (!highlighterMenu) return;
        ensureDefaultMobileColor();
        highlighterMenu.classList.add('mobile');
        highlighterMenu.classList.add('active');
        highlighterMenu.style.left = '';
        highlighterMenu.style.top = '';
        highlighterMenu.style.bottom = '';
        highlighterMenu.style.transform = '';
        updateButtonStates();
    }

    function positionHighlighterMenu(pos) {
        if (!highlighterMenu) return;

        if (isMobileView()) {
            ensureMobileMenuVisible();
        } else {
            highlighterMenu.classList.remove('mobile');
            highlighterMenu.style.bottom = '';
            highlighterMenu.style.left = `${pos.x}px`;
            highlighterMenu.style.top = `${pos.y}px`;
            highlighterMenu.style.transform = 'translateX(-50%) translateY(-100%)';
        }
    }

    function handleViewportModeChange() {
        if (!highlighterMenu) return;

        if (isMobileView()) {
            ensureMobileMenuVisible();
        } else {
            highlighterMenu.classList.remove('mobile');

            if (highlighterMenu.classList.contains('active')) {
                const pos = getMenuPosition();
                highlighterMenu.style.bottom = '';
                highlighterMenu.style.left = `${pos.x}px`;
                highlighterMenu.style.top = `${pos.y}px`;
                highlighterMenu.style.transform = 'translateX(-50%) translateY(-100%)';
            } else if (!currentSelection) {
                highlighterMenu.classList.remove('active');
                highlighterMenu.style.bottom = '';
                highlighterMenu.style.left = '';
                highlighterMenu.style.top = '';
                highlighterMenu.style.transform = '';
            }
        }

        updateButtonStates();
    }

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
                if (currentSelection) {
                    highlightSelection(color);
                } else if (isMobileView()) {
                    setActiveColor(color);
                }
            });
            button.addEventListener('touchstart', handleButtonTouchStart, { passive: true });
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleButtonTouchEnd(e);
                if (currentSelection) {
                    highlightSelection(color);
                } else if (isMobileView()) {
                    setActiveColor(color);
                }
            });
            button.addEventListener('touchcancel', handleButtonTouchEnd);
            colorButtons.set(color, button);
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
            if (currentSelection) {
                removeHighlight();
            } else if (isMobileView()) {
                enableRemovalMode();
            }
        });
        removeButton.addEventListener('touchstart', handleButtonTouchStart, { passive: true });
        removeButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleButtonTouchEnd(e);
            if (currentSelection) {
                removeHighlight();
            } else if (isMobileView()) {
                enableRemovalMode();
            }
        });
        removeButton.addEventListener('touchcancel', handleButtonTouchEnd);
        removeButtonRef = removeButton;
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
        positionHighlighterMenu(pos);
        highlighterMenu.classList.add('active');
    }

    // Ocultar el menú
    function hideHighlighterMenu() {
        if (!highlighterMenu) {
            currentSelection = null;
            return;
        }

        if (isMobileView()) {
            ensureMobileMenuVisible();
        } else {
            highlighterMenu.classList.remove('active');
            highlighterMenu.classList.remove('mobile');
            highlighterMenu.style.bottom = '';
            highlighterMenu.style.top = '';
            highlighterMenu.style.left = '';
            highlighterMenu.style.transform = '';
        }

        currentSelection = null;
    }

    function isRangeInPostContent(range) {
        if (!range) return false;

        const container = range.commonAncestorContainer;
        const element = container.nodeType === Node.TEXT_NODE
            ? container.parentElement
            : container;

        return !!(element && element.closest('.post-content'));
    }

    function rangeTouchesExistingHighlight(range) {
        const startElement = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement
            : range.startContainer;
        const endElement = range.endContainer.nodeType === Node.TEXT_NODE
            ? range.endContainer.parentElement
            : range.endContainer;

        if ((startElement && startElement.closest('mark.highlight')) ||
            (endElement && endElement.closest('mark.highlight'))) {
            return true;
        }

        try {
            const fragment = range.cloneContents();
            if (fragment.querySelector && fragment.querySelector('mark.highlight')) {
                return true;
            }
        } catch (err) {
            // Ignorar errores de cloneContents en rangos complejos
        }

        return false;
    }

    function highlightRange(range, color) {
        if (!range || range.collapsed) {
            console.warn('Range not available to highlight');
            return false;
        }

        if (!color) {
            console.warn('No color selected for highlight');
            return false;
        }

        if (!isRangeInPostContent(range)) {
            console.warn('Range is outside post content');
            return false;
        }

        if (rangeTouchesExistingHighlight(range)) {
            console.warn('Range intersects existing highlight');
            return false;
        }

        const mark = document.createElement('mark');
        mark.className = `highlight highlight-${color}`;
        mark.setAttribute('data-highlight-id', generateId());
        mark.setAttribute('data-color', color);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            range.surroundContents(mark);
            console.log('Highlight applied successfully');
        } catch (e) {
            console.warn('Fallback to alternative highlight method', e);
            const fragment = range.extractContents();
            mark.appendChild(fragment);
            range.insertNode(mark);
            console.log('Highlight applied with fallback method');
        }

        selection.removeAllRanges();
        saveHighlights();
        return true;
    }

    // Aplicar resaltado a selección manual
    function highlightSelection(color) {
        if (!currentSelection) {
            console.warn('No selection available');
            return;
        }

        const range = currentSelection.range.cloneRange();
        const applied = highlightRange(range, color);

        if (applied && !isMobileView()) {
            hideHighlighterMenu();
        }

        currentSelection = null;
    }

    function unwrapMark(mark) {
        if (!mark || !mark.parentNode) {
            return false;
        }

        const parent = mark.parentNode;
        while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
        }

        parent.removeChild(mark);
        parent.normalize();
        return true;
    }

    // Remover resaltado
    function removeHighlight() {
        if (!currentSelection) {
            console.warn('No selection available for removal');
            return;
        }

        const range = currentSelection.range;
        let element = range.commonAncestorContainer;
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentElement;
        }

        const mark = element ? element.closest('mark.highlight') : null;

        if (mark && unwrapMark(mark)) {
            console.log('Highlight removed successfully');
            saveHighlights();
        } else {
            console.warn('No highlight mark found to remove');
        }

        const selection = window.getSelection();
        selection.removeAllRanges();

        if (!isMobileView()) {
            hideHighlighterMenu();
        }

        currentSelection = null;
    }

    function resolveTextPosition(node, offset) {
        if (!node) return null;

        if (node.nodeType === Node.TEXT_NODE) {
            return {
                node,
                offset: Math.min(offset, node.textContent.length)
            };
        }

        const childNodes = node.childNodes;
        if (!childNodes || childNodes.length === 0) {
            return null;
        }

        const targetIndex = Math.min(offset, childNodes.length - 1);
        let target = childNodes[targetIndex];

        while (target && target.nodeType !== Node.TEXT_NODE) {
            target = target.firstChild || target.nextSibling;
        }

        if (!target || target.nodeType !== Node.TEXT_NODE) {
            return null;
        }

        return {
            node: target,
            offset: Math.min(offset, target.textContent.length)
        };
    }

    function expandRangeToWord(range) {
        const textNode = range.startContainer;
        if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
            return null;
        }

        const text = textNode.textContent;
        let start = range.startOffset;
        let end = range.endOffset;

        while (start > 0 && /\S/.test(text[start - 1])) start--;
        while (end < text.length && /\S/.test(text[end])) end++;

        if (start === end) {
            return null;
        }

        const wordRange = document.createRange();
        wordRange.setStart(textNode, start);
        wordRange.setEnd(textNode, end);
        return wordRange;
    }

    function getRangeFromPoint(x, y) {
        let baseRange = null;

        if (document.caretRangeFromPoint) {
            baseRange = document.caretRangeFromPoint(x, y);
        } else if (document.caretPositionFromPoint) {
            const position = document.caretPositionFromPoint(x, y);
            if (position) {
                baseRange = document.createRange();
                baseRange.setStart(position.offsetNode, position.offset);
                baseRange.setEnd(position.offsetNode, position.offset);
            }
        }

        if (!baseRange || !baseRange.startContainer) {
            return null;
        }

        if (baseRange.startContainer.nodeType !== Node.TEXT_NODE) {
            const resolved = resolveTextPosition(baseRange.startContainer, baseRange.startOffset);
            if (!resolved) return null;
            baseRange.setStart(resolved.node, resolved.offset);
            baseRange.setEnd(resolved.node, resolved.offset);
        }

        return expandRangeToWord(baseRange);
    }

    function removeMarkAtPoint(x, y) {
        const element = document.elementFromPoint(x, y);
        if (!element) return false;

        const mark = element.closest('mark.highlight');
        if (mark && unwrapMark(mark)) {
            saveHighlights();
            return true;
        }

        return false;
    }

    function handleTouchHighlight(event) {
        if (!isMobileView()) return;
        if (!activeColor && !removalMode) return;

        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;

        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!targetElement || !targetElement.closest('.post-content')) {
            return;
        }

        if (removalMode) {
            if (removeMarkAtPoint(touch.clientX, touch.clientY)) {
                event.preventDefault();
            }
            return;
        }

        if (!activeColor) {
            return;
        }

        const range = getRangeFromPoint(touch.clientX, touch.clientY);
        if (!range) {
            return;
        }

        if (!isRangeInPostContent(range)) {
            return;
        }

        event.preventDefault();
        const applied = highlightRange(range, activeColor);
        if (applied) {
            currentSelection = null;
        }
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
        const postContent = document.querySelector('.post-content');

        if (postContent) {
            postContent.addEventListener('touchstart', () => {
                if (isMobileView()) {
                    currentSelection = null;
                }
            }, { passive: true });

            postContent.addEventListener('touchend', handleTouchHighlight, { passive: false });
        }

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
            if (e.target.closest('.highlighter-menu')) {
                return;
            }

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

        document.addEventListener('touchend', (e) => {
            if (e.target.closest('.highlighter-menu')) {
                return;
            }

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

        window.addEventListener('resize', () => {
            if (!highlighterMenu) return;
            handleViewportModeChange();
        });

        window.addEventListener('orientationchange', () => {
            if (!highlighterMenu) return;
            setTimeout(handleViewportModeChange, 50);
        });
    }

    // Inicializar
    function init() {
        // Solo activar en páginas de posts
        if (!document.querySelector('.post-content')) return;

        updateMediaQueries();
        highlighterMenu = createHighlighterMenu();
        updateButtonStates();

        if (isMobileView()) {
            ensureMobileMenuVisible();
        }

        setupEventListeners();
        addMediaQueryListener(mobileWidthQuery, handleViewportModeChange);
        addMediaQueryListener(coarsePointerQuery, handleViewportModeChange);

        handleViewportModeChange();

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
