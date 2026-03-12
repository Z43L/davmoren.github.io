import os
import re
import argparse
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "minimax-m2.5:cloud")
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")


def call_ollama(prompt):
    try:
        response = requests.post(
            f"{OLLAMA_BASE_URL}/api/chat",
            json={
                "model": OLLAMA_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "stream": False,
            },
        )
        response.raise_for_status()
        return response.json()["message"]["content"]
    except Exception as e:
        print(f"ERROR: {e}")
        return None


def generate_content(topic):
    prompt = f"""Escribe un artículo de blog detallado y exhaustivo sobre '{topic}'. 
    Approximadamente 3000-5000 palabras.
    Formato: Markdown puro, listo para publicar.
    Incluye:
    - Introducción atractiva
    - Explicaciones teóricas claras
    - Ejemplos prácticos con código si es relevante
    - Conclusión con puntos clave
    
    El tono debe ser educativo pero accesible."""
    return call_ollama(prompt)


def generate_excerpt(content, topic):
    prompt = f"Genera un excerpt (máximo 150 caracteres) para un artículo sobre '{topic}'. Debe ser atractivo y descriptivo. Solo el texto, sin comillas."
    return call_ollama(prompt)


def calculate_reading_time(content):
    words = len(content.split())
    return max(1, round(words / 200))


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r"[áàäâ]", "a", text)
    text = re.sub(r"[éèëê]", "e", text)
    text = re.sub(r"[íìïî]", "i", text)
    text = re.sub(r"[óòöô]", "o", text)
    text = re.sub(r"[úùüû]", "u", text)
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "_", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text[:80]


def create_frontmatter(title, tags, excerpt, reading_time):
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S %z")
    tags_str = ", ".join([f"{t.strip()}" for t in tags]) if tags else ""

    fm = f"""---
layout: post
title: "{title}"
date: {date_str}
author: David Moreno Jimenez
tags: [{tags_str}]
reading_time: {reading_time}
excerpt: "{excerpt}"
---

"""
    return fm


def save_post(title, content, tags):
    slug = slugify(title)
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"_posts/{date_str}-{slug}.md"

    excerpt = generate_excerpt(content, title) if len(title) > 10 else title[:150]
    reading_time = calculate_reading_time(content)
    frontmatter = create_frontmatter(title, tags, excerpt, reading_time)

    full_content = frontmatter + content

    with open(filename, "w", encoding="utf-8") as f:
        f.write(full_content)

    print(f"✅ Post guardado: {filename}")
    return filename


def git_commit_push(filename, message=None):
    if message is None:
        message = f"Add post: {filename}"

    os.system(f"git add {filename}")
    os.system(f'git commit -m "{message}"')
    print("✅ Commit realizado")

    os.system("git push origin main")
    print("✅ Push completado")


def main():
    parser = argparse.ArgumentParser(
        description="Generador automático de posts para Jekyll"
    )
    parser.add_argument("--topic", required=True, help="Tema del post")
    parser.add_argument("--tags", help="Tags separados por coma", default="")
    parser.add_argument(
        "--commit", action="store_true", help="Hacer commit automáticamente"
    )
    parser.add_argument(
        "--push", action="store_true", help="Hacer push después del commit"
    )
    args = parser.parse_args()

    topic = args.topic
    tags = [t.strip() for t in args.tags.split(",")] if args.tags else []

    print(f"🔄 Generando post sobre: {topic}")
    print(f"📡 Modelo: {OLLAMA_MODEL}")

    content = generate_content(topic)
    if not content:
        print("ERROR: No se pudo generar el contenido")
        return

    filename = save_post(topic, content, tags)

    if args.commit:
        git_commit_push(filename)
    elif args.push:
        git_commit_push(filename)


if __name__ == "__main__":
    main()
