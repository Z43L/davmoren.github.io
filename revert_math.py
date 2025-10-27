#!/usr/bin/env python3
"""
Script para revertir la conversión anterior de divs a formato original \[ \]
"""

import re
import os

def revert_display_math(content):
    """
    Revierte <div markdown="0" class="math-display">\[ ... \]</div> a \[ ... \]
    """
    pattern = r'<div markdown="0" class="math-display">\\\\?\[(.*?)\\\\?\]</div>'

    result = re.sub(pattern, r'\\[\1\\]', content, flags=re.DOTALL)

    return result

def process_file(filepath):
    """
    Procesa un archivo markdown, revirtiendo las conversiones.
    """
    print(f"Procesando: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Verificar si hay divs para revertir
    if 'class="math-display"' not in content:
        print(f"  → Sin divs para revertir")
        return False

    # Revertir
    new_content = revert_display_math(content)

    # Guardar
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  → Revertido exitosamente")
    return True

def main():
    posts_dir = '_posts'

    if not os.path.exists(posts_dir):
        print(f"ERROR: Directorio {posts_dir} no encontrado")
        return

    for filename in os.listdir(posts_dir):
        if filename.endswith('.md'):
            filepath = os.path.join(posts_dir, filename)
            process_file(filepath)

    print("\n✅ Revertido completado")

if __name__ == '__main__':
    main()
