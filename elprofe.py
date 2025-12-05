import os
import requests
import json
import re
import argparse
from dotenv import load_dotenv
from typing import Optional, Tuple

# --- CONFIGURACIÓN INICIAL ---
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "b9bb3d18551c49abb0cb42ef4160c511.-trb3VNrC36kEWjMdhlfBjSR")
OPENROUTER_MODEL = "gpt-oss:120b-cloud"
API_BASE_URL = "https://ollama.com"
# Guardado incremental: cada cuántas secciones escribimos a disco (configurable vía env SAVE_EVERY_SECTIONS)
SAVE_EVERY_SECTIONS = int(os.getenv("SAVE_EVERY_SECTIONS", "5"))
RESUME_ENABLED = os.getenv("RESUME", "true").lower() in ("1","true","yes")

# --- FUNCIONES CORE ---

def call_openrouter(prompt):
    """Función centralizada para hacer llamadas a la API de OpenRouter."""
    if not all([OPENROUTER_API_KEY, OPENROUTER_MODEL]):
        print("ERROR: Asegúrate de que OPENROUTER_API_KEY y OPENROUTER_MODEL están definidos en tu archivo .env")
        return None

    print(f"INFO: Llamando al modelo {OPENROUTER_MODEL}...")
    try:
        response = requests.post(
            url=f"{API_BASE_URL}/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}"},
            data=json.dumps({"model": OPENROUTER_MODEL, "messages": [{"role": "user", "content": prompt}]})
        )
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except requests.exceptions.RequestException as e:
        print(f"ERROR: Fallo en la llamada a la API: {e}")
        return None

def generate_deep_outline(topic):
    """Crea un índice ultra-detallado, como el de un libro técnico."""
    print(f"INFO: Generando índice ultra-detallado para el tema: '{topic}'")
    prompt = f"""
    Crea un temario o índice extremadamente detallado para un libro de texto exhaustivo de 300 páginas sobre '{topic}'.
    La estructura debe ser jerárquica y muy granular, usando niveles como:
    - Parte I: Título de la Parte
      - Capítulo 1: Título del Capítulo
        - 1.1. Título de la Sección
        - 1.2. Título de la Sección
          - 1.2.1. Título de la Subsección
          - 1.2.2. Título de la Subsección
    
    El objetivo es tener una gran cantidad de sub-puntos para poder desarrollar contenido extenso. Asegúrate de que la progresión sea lógica, desde lo más fundamental a lo más avanzado y específico.
    """
    deep_outline = call_openrouter(prompt)
    return deep_outline

def generate_section_content(section_title, topic):
    """Genera el contenido detallado para una subsección, pidiendo una longitud considerable."""
    print(f"INFO: Generando contenido para la sección: '{section_title}'")
    prompt_content = f"""
    Eres un experto redactor técnico y pedagogo escribiendo un capítulo de un libro sobre '{topic}'.
    Tu tarea actual es desarrollar en profundidad la sección: '{section_title}'.

    Escribe un texto detallado y exhaustivo de aproximadamente 1500 palabras (unos 7000-8000 caracteres) sobre este punto específico.
    - Explica los conceptos a fondo.
    - Proporciona contexto histórico o teórico si es relevante.
    - Incluye ejemplos prácticos, analogías claras y, si aplica, bloques de código bien comentados.
    - Asegúrate de que el contenido sea denso, informativo y no contenga relleno.
    - El formato de salida debe ser exclusivamente Markdown.
    """
    content = call_openrouter(prompt_content)
    return content

def _sanitize_filename(raw: str) -> str:
    name = raw.strip().lower().replace(' ', '_')
    name = re.sub(r'[<>:"/\\|?*]', '_', name)  # caracteres inválidos Windows
    name = re.sub(r'_+', '_', name)
    return name[:180]

def save_guide_to_markdown(topic, content, incremental: bool = False):
    """Guarda el contenido en un archivo .md (nombre seguro).

    incremental: si True, mensaje distinto y menos invasivo.
    """
    filename = f"guia_extensa_{_sanitize_filename(topic)}.md"
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        if incremental:
            print(f"💾 Guardado incremental ({filename})")
        else:
            print(f"✅ ¡ÉXITO! Guía guardada en: {filename}")
    except OSError as e:
        print(f"ERROR: No se pudo guardar el archivo '{filename}': {e}")

def detect_existing_sections(content: str) -> set:
    """Devuelve un set de títulos de secciones ya presentes (forma completa) aceptando con o sin punto final."""
    pattern = re.compile(r"^#+\s+(\d+(?:\.\d+)+(?:\.)?\s+.+)$", re.MULTILINE)
    return set(pattern.findall(content))

def load_existing_progress(topic: str | None, resume_file: str | None) -> tuple[str | None, str | None]:
    """Carga contenido existente.

    Devuelve (contenido, topic_detectado_o_original)
    Prioridad:
      1. Si se pasa --resume-file explícito, usarlo.
      2. Si no, usar archivo derivado del topic (si RESUME_ENABLED True).
    Intenta inferir el topic del encabezado H1 si no se proporcionó.
    """
    if resume_file:
        if not os.path.exists(resume_file):
            print(f"ADVERTENCIA: Archivo de resume no encontrado: {resume_file}")
            return None, topic
        try:
            with open(resume_file, 'r', encoding='utf-8') as f:
                content = f.read()
            print(f"🔁 Reanudando desde archivo especificado: {resume_file}")
            if not topic:
                m = re.search(r"^# Guía de Aprendizaje Extensa sobre: (.+)$", content, re.MULTILINE)
                if m:
                    topic = m.group(1).strip()
                    print(f"INFO: Topic inferido desde archivo: {topic}")
            return content, topic
        except OSError as e:
            print(f"ADVERTENCIA: No se pudo leer '{resume_file}': {e}")
            return None, topic
    # Ruta derivada por topic
    if not RESUME_ENABLED or not topic:
        return None, topic
    filename = f"guia_extensa_{_sanitize_filename(topic)}.md"
    if os.path.exists(filename):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                existing = f.read()
            print(f"🔁 Reanudando desde archivo existente: {filename}")
            return existing, topic
        except OSError as e:
            print(f"ADVERTENCIA: No se pudo leer '{filename}' para reanudar: {e}")
    return None, topic

# --- FUNCIÓN PRINCIPAL DE ORQUESTACIÓN ---

def parse_args():
    parser = argparse.ArgumentParser(description="Generador de guía extensa multi-secciones")
    parser.add_argument("--topic", help="Tema de la guía (si se omite y se reanuda desde archivo se intentará inferir)")
    parser.add_argument("--resume-file", help="Ruta de archivo existente desde el cual reanudar", dest="resume_file")
    parser.add_argument("--no-resume", action="store_true", help="Ignora archivo existente aunque exista")
    return parser.parse_args()

def main():
    """Orquesta el proceso de creación de la guía masiva."""
    if not all([OPENROUTER_API_KEY, OPENROUTER_MODEL]):
        print("FATAL: Las variables de entorno no están configuradas en el archivo .env.")
        return

    args = parse_args()
    topic = args.topic

    if not topic and not args.resume_file:
        topic = input("Hola, soy tu Superagente. ¿Sobre qué tema quieres crear una guía masiva (~500,000 caracteres)?\n> ")
    elif not topic and args.resume_file:
        print("INFO: Intentaremos inferir el topic desde el archivo de resume.")
    
    # 1. Crear el esqueleto profundo de la guía
    deep_outline = generate_deep_outline(topic)
    if not deep_outline:
        print("ERROR: No se pudo generar el índice detallado. Abortando.")
        return

    print("\n--- ÍNDICE DETALLADO GENERADO ---\n")
    print(deep_outline)
    print("\n" + "-"*40 + "\n")

    # 2. Construir base o reanudar
    existing, topic = load_existing_progress(topic, None if args.no_resume else args.resume_file)
    if existing:
        full_guide_content = existing
    else:
        full_guide_content = f"# Guía de Aprendizaje Extensa sobre: {topic.title()}\n\n"
        full_guide_content += "## Índice Detallado\n" + deep_outline + "\n\n"
    
    # Extraer títulos numerados (admite viñetas '-' o '*' antes): "- 1.2.3. Texto" o "1.2. Texto"
    section_titles = re.findall(r"^[ \t]*[\-\*]?[ \t]*(\d+(?:\.\d+)+(?:\.)?\s+.+)$", deep_outline, re.MULTILINE)
    if not section_titles:
        print("ADVERTENCIA: Regex principal no encontró secciones. Probando patrón alternativo.")
        section_titles = re.findall(r"(\d+(?:\.\d+)+\.\s+.+)", deep_outline)
    print(f"INFO: Secciones detectadas en índice: {len(section_titles)}")

    # Filtrar secciones ya presentes si reanudamos
    if existing:
        done_sections = detect_existing_sections(existing)
        before = len(section_titles)
        # Además comparamos por clave numérica (e.g., '1.2.3') para robustez
        def numeric_key(s: str) -> str:
            m = re.match(r"(\d+(?:\.\d+)+)", s)
            return m.group(1) if m else s
        done_numeric = {numeric_key(s) for s in done_sections}
        filtered = []
        skipped = 0
        for s in section_titles:
            if s in done_sections or numeric_key(s) in done_numeric:
                skipped += 1
                continue
            filtered.append(s)
        section_titles = filtered
        print(f"INFO: Secciones ya completadas detectadas: {skipped} | Restantes: {len(section_titles)}")
        if skipped > 0:
            print("INFO: Reanudación omitirá secciones ya presentes. Primeras 5 omitidas:")
            for ds in list(done_sections)[:5]:
                print(f"   - {ds[:120]}")
    
    total_chars = len(full_guide_content)
    if existing:
        print(f"INFO: Reanudando con {total_chars} caracteres ya generados.")

    sections_processed = 0
    for title in section_titles:

        # Añadir el título al documento
        # Determinar el nivel del encabezado por el número de puntos
        level = title.count('.') + 1
        header = '#' * level
        full_guide_content += f"{header} {title}\n\n"
        
        section_content = generate_section_content(title, topic)
        if section_content:
            full_guide_content += section_content + "\n\n"
            total_chars = len(full_guide_content)
            print(f"PROGRESO: {total_chars} caracteres acumulados.\n")
        sections_processed += 1

        # Guardado incremental
        if sections_processed % SAVE_EVERY_SECTIONS == 0:
            save_guide_to_markdown(topic, full_guide_content, incremental=True)

    print("INFO: Generación de contenido completada. Procediendo a guardar.")
    
    # 3. Guardar el archivo final (la revisión y las ideas futuras se omiten por ahora
    # para no exceder los límites de contexto en un solo paso de revisión con un texto tan largo)
    save_guide_to_markdown(topic, full_guide_content)

if __name__ == "__main__":
    main()