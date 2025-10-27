#!/usr/bin/env python3
"""
Script para convertir fórmulas LaTeX con \[ \] a un formato que Kramdown no procese
pero MathJax sí pueda renderizar.
"""

import re
import sys
import os

def convert_display_math(content):
    """
    Convierte \[ ... \] a script tags que MathJax procesará.
    """
    # Patrón para encontrar \[ ... \] (incluyendo contenido multilínea)
    pattern = r'\\\[(.*?)\\\]'

    def replacement(match):
        formula = match.group(1).strip()
        # Usar script tags tipo math/tex que MathJax reconoce
        # y Kramdown no procesará
        return f'<script type="math/tex; mode=display">\n{formula}\n</script>'

    # re.DOTALL permite que . coincida con saltos de línea
    result = re.sub(pattern, replacement, content, flags=re.DOTALL)

    return result

def process_file(filepath):
    """
    Procesa un archivo markdown, convirtiendo las fórmulas display.
    """
    print(f"Procesando: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Verificar si hay fórmulas \[ \] (pero no script tags ya convertidos)
    if r'\[' not in content or 'type="math/tex; mode=display"' in content:
        # Si no hay \[ o ya están convertidas
        if 'type="math/tex; mode=display"' in content:
            print(f"  → Ya convertido previamente")
        else:
            print(f"  → Sin fórmulas \\[ \\] para convertir")
        return False

    # Convertir
    new_content = convert_display_math(content)

    # Contar conversiones
    original_count = content.count(r'\[')
    new_count = new_content.count('type="math/tex; mode=display"')

    if new_count > 0:
        # Guardar
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  → Convertidas {new_count} fórmulas display")
        return True
    else:
        print(f"  → Sin cambios")
        return False

def main():
    # Procesar todos los archivos .md en _posts
    posts_dir = '_posts'

    if not os.path.exists(posts_dir):
        print(f"ERROR: Directorio {posts_dir} no encontrado")
        sys.exit(1)

    processed_count = 0
    for filename in os.listdir(posts_dir):
        if filename.endswith('.md'):
            filepath = os.path.join(posts_dir, filename)
            if process_file(filepath):
                processed_count += 1

    print(f"\n✅ Completado: {processed_count} archivo(s) modificado(s)")

if __name__ == '__main__':
    main()
