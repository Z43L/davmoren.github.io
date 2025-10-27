# Mi Portafolio en GitHub Pages

Portafolio personal construido con Jekyll para publicar artículos sobre inteligencia artificial, matemáticas y programación.

## Características

- Diseño minimalista y profesional
- Totalmente responsive
- Sistema de blog con Jekyll
- Soporte completo para Markdown
- Resaltado de sintaxis para código
- Optimizado para GitHub Pages
- SEO friendly

## Estructura del Proyecto

```
aiapuntes/
├── _config.yml          # Configuración principal de Jekyll
├── _layouts/            # Plantillas HTML
│   ├── default.html     # Layout base
│   └── post.html        # Layout para artículos
├── _posts/              # Tus artículos en Markdown
│   └── YYYY-MM-DD-titulo.md
├── assets/
│   └── css/
│       └── main.css     # Estilos del sitio
├── blog/                # Página índice del blog
├── index.md             # Página de inicio
├── about.md             # Página "Acerca de"
└── README.md            # Este archivo

```

## Instalación Local

### Prerequisitos

1. Instala Ruby (versión 2.7 o superior)
2. Instala Bundler:
   ```bash
   gem install bundler
   ```

### Configuración

1. Crea un archivo `Gemfile` en la raíz del proyecto:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.8"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end
```

2. Instala las dependencias:
```bash
bundle install
```

3. Ejecuta el servidor local:
```bash
bundle exec jekyll serve
```

4. Abre tu navegador en `http://localhost:4000`

## Configuración del Sitio

Edita `_config.yml` para personalizar tu portafolio:

```yaml
title: Mi Portafolio
description: Tu descripción
url: "https://tuusuario.github.io"
baseurl: "" # Para GitHub Pages: /nombre-repo si no es tuusuario.github.io

author:
  name: Tu Nombre
  email: tu-email@ejemplo.com
  bio: Tu biografía
```

## Cómo Agregar Artículos

1. Crea un nuevo archivo en `_posts/` con el formato:
   ```
   YYYY-MM-DD-titulo-del-articulo.md
   ```

2. Agrega el front matter al inicio del archivo:
   ```yaml
   ---
   layout: post
   title: "Título de tu artículo"
   date: 2025-10-27 10:00:00 -0000
   author: Tu Nombre
   tags: [tag1, tag2, tag3]
   reading_time: 5
   excerpt: "Breve descripción del artículo"
   ---
   ```

3. Escribe tu contenido en Markdown debajo del front matter

### Ejemplo de Artículo

```markdown
---
layout: post
title: "Mi Primer Artículo"
date: 2025-10-27
tags: [tutorial, ia]
reading_time: 3
---

# Introducción

Este es mi primer artículo...

## Sección 1

Contenido aquí...

` ` `python
# Código de ejemplo
print("Hola mundo")
` ` `
```

## Publicar en GitHub Pages

### Opción 1: Repositorio personal (tuusuario.github.io)

1. Crea un repositorio llamado `tuusuario.github.io`
2. Sube todos los archivos:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tuusuario/tuusuario.github.io.git
   git push -u origin main
   ```
3. Ve a Settings > Pages > Source > Branch: main
4. Tu sitio estará disponible en `https://tuusuario.github.io`

### Opción 2: Repositorio de proyecto

1. Crea un repositorio con cualquier nombre (ej: `mi-portafolio`)
2. En `_config.yml`, configura:
   ```yaml
   baseurl: "/mi-portafolio"
   ```
3. Sube los archivos como en la Opción 1
4. Tu sitio estará en `https://tuusuario.github.io/mi-portafolio`

## Personalización

### Cambiar Colores

Edita las variables CSS en `assets/css/main.css`:

```css
:root {
    --color-primary: #2563eb;    /* Color principal */
    --color-text: #1a1a1a;       /* Color del texto */
    --color-bg: #ffffff;          /* Color de fondo */
}
```

### Modificar el Layout

Los layouts están en `_layouts/`. Puedes editarlos para cambiar la estructura HTML.

### Agregar Páginas

Crea archivos `.md` en la raíz con front matter:

```markdown
---
layout: default
title: Mi Nueva Página
---

# Contenido de la página
```

## Sintaxis Markdown Soportada

- **Encabezados**: `# H1`, `## H2`, etc.
- **Negrita**: `**texto**`
- **Cursiva**: `*texto*`
- **Listas**: `- item` o `1. item`
- **Enlaces**: `[texto](url)`
- **Imágenes**: `![alt](url)`
- **Código**: ` ` `lenguaje ... ` ` `
- **Tablas**: Markdown tables
- **Citas**: `> texto`

## Recursos Adicionales

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [Liquid Template Language](https://shopify.github.io/liquid/)

## Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

---

Hecho con Jekyll y GitHub Pages
