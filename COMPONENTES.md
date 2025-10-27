# Guía de Componentes

Este portafolio incluye varios componentes reutilizables para enriquecer tus artículos.

## 1. Link Cards (Previews de Enlaces)

Crea tarjetas visuales para enlaces externos con título, descripción e imagen.

### Uso Básico

```liquid
{% include link-card.html
   url="https://ejemplo.com"
   title="Título del Enlace"
   description="Descripción breve del contenido"
   image="https://ejemplo.com/imagen.jpg" %}
```

### Sin Imagen

```liquid
{% include link-card.html
   url="https://ejemplo.com"
   title="Título del Enlace"
   description="Descripción breve del contenido" %}
```

### Ejemplo Real

```liquid
{% include link-card.html
   url="https://www.deeplearningbook.org/"
   title="Deep Learning Book"
   description="El libro definitivo sobre aprendizaje profundo por Ian Goodfellow"
   image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400" %}
```

## 2. Embeds (Videos, iFrames)

Inserta videos de YouTube, Vimeo o cualquier contenido embebible.

### YouTube

```liquid
{% include embed.html
   url="https://www.youtube.com/embed/VIDEO_ID"
   title="Título del video" %}
```

### Con Ratio Personalizado

```liquid
{% include embed.html
   url="https://www.youtube.com/embed/VIDEO_ID"
   title="Título del video"
   ratio="21:9" %}
```

Ratios disponibles:
- `16:9` (por defecto)
- `4:3`
- `21:9`

### Ejemplo Real

```liquid
{% include embed.html
   url="https://www.youtube.com/embed/aircAruvnKk"
   title="But what is a neural network?" %}
```

## 3. Callouts (Cajas de Información)

Resalta información importante con cajas de colores.

### Tipos Disponibles

#### Info (Azul)
```liquid
{% include callout.html
   type="info"
   title="Información"
   content="Contenido del callout. Puedes usar **markdown** aquí." %}
```

#### Warning (Amarillo/Naranja)
```liquid
{% include callout.html
   type="warning"
   title="Advertencia"
   content="Esto es una advertencia importante." %}
```

#### Danger (Rojo)
```liquid
{% include callout.html
   type="danger"
   title="Peligro"
   content="Esto puede causar problemas si no tienes cuidado." %}
```

#### Success (Verde)
```liquid
{% include callout.html
   type="success"
   title="Éxito"
   content="¡Bien hecho! Has completado este paso." %}
```

### Sin Título

```liquid
{% include callout.html
   type="info"
   content="Callout sin título, solo con contenido." %}
```

## 4. Fórmulas Matemáticas (LaTeX)

Usa MathJax para renderizar fórmulas matemáticas.

### Inline (en línea)

```markdown
La función sigmoide es $\sigma(x) = \frac{1}{1+e^{-x}}$ y se usa mucho en ML.
```

### Bloque (display)

```markdown
$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$
```

### Ejemplos Comunes

**Sumatoria:**
```markdown
$$\sum_{i=1}^{n} x_i$$
```

**Integral:**
```markdown
$$\int_{a}^{b} f(x) \, dx$$
```

**Matriz:**
```markdown
$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$
```

**Sistema de ecuaciones:**
```markdown
$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$
```

## 5. Bloques de Código

### Código Inline

```markdown
Usa `código inline` con backticks simples.
```

### Bloques de Código

````markdown
```python
def hola_mundo():
    print("¡Hola, mundo!")
```
````

### Con Numeración de Líneas

Configurado automáticamente en `_config.yml`.

## 6. Tablas

Usa sintaxis estándar de Markdown:

```markdown
| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
| Dato 4    | Dato 5    | Dato 6    |
```

Las tablas tienen efectos hover automáticos.

## Combinando Componentes

Puedes combinar varios componentes en un solo artículo:

```markdown
---
layout: post
title: "Mi Artículo"
---

## Introducción

Aquí está mi contenido con una fórmula: $E = mc^2$

{% include callout.html type="info" title="Nota" content="Esto es importante." %}

Más contenido...

{% include link-card.html
   url="https://ejemplo.com"
   title="Recurso Útil"
   description="Descripción" %}

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

```python
print("Código de ejemplo")
```
```

## Tips de Uso

1. **Link Cards**: Úsalos para recursos externos relevantes
2. **Embeds**: Agrega videos solo cuando aporten valor real
3. **Callouts**: No abuses, usa solo para info importante
4. **LaTeX**: Verifica que las fórmulas se rendericen correctamente
5. **Imágenes en Links**: Usa URLs directas de imágenes (preferiblemente optimizadas)

## Imágenes Gratuitas

Para imágenes en link cards, puedes usar:
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
- Logos oficiales de proyectos

Formato recomendado: `https://images.unsplash.com/photo-XXXXX?w=400`

## Recursos

- **Markdown Guide**: https://www.markdownguide.org/
- **MathJax Docs**: https://www.mathjax.org/
- **Jekyll Liquid**: https://jekyllrb.com/docs/liquid/

---

## 7. Resaltador de Texto (Text Highlighter) ✨

El portafolio incluye un sistema de resaltado de texto con 6 colores diferentes y persistencia en el navegador.

### Características

- **6 colores** disponibles: amarillo, verde, azul, rosa, morado y naranja
- **Persistencia**: Los resaltados se guardan en localStorage y se restauran al volver
- **Responsive**: Funciona tanto en desktop como en móvil (táctil)
- **Modo oscuro**: Los colores se adaptan automáticamente al tema
- **Remover resaltados**: Botón para eliminar el resaltado seleccionado

### Cómo Usar

#### Desktop (Computadora)

1. **Selecciona** el texto que quieres resaltar
2. Aparecerá un menú flotante con **colores**
3. **Haz clic** en el color deseado
4. El texto se resaltará automáticamente
5. Para **quitar** un resaltado: selecciona el texto resaltado y haz clic en la **X**

#### Móvil (Táctil)

1. **Mantén presionado** (long press) el texto que quieres seleccionar
2. **Arrastra** para seleccionar el texto completo
3. Aparecerá el menú de colores
4. **Toca** el color que deseas
5. Para **quitar**: mantén presionado el texto resaltado y toca la **X**

### Colores Disponibles

| Color | Modo Claro | Modo Oscuro | Uso Sugerido |
|-------|------------|-------------|--------------|
| 🟡 Amarillo | Brillante | Dorado oscuro | Ideas importantes |
| 🟢 Verde | Claro | Esmeralda oscuro | Conceptos clave |
| 🔵 Azul | Cielo | Azul marino | Definiciones |
| 🌸 Rosa | Pastel | Rosa oscuro | Ejemplos |
| 🟣 Morado | Lavanda | Púrpura | Referencias |
| 🟠 Naranja | Suave | Terracota | Advertencias |

### Persistencia

- Los resaltados se **guardan automáticamente** en localStorage
- Se **restauran** cada vez que vuelves a la página
- Son **específicos por página**: cada artículo guarda sus propios resaltados
- **Privados**: Solo tú puedes ver tus resaltados (no se comparten)

### Gestión

- **Limpiar todo**: Para borrar todos los resaltados de una página, abre la consola del navegador (F12) y ejecuta:
  ```javascript
  localStorage.removeItem('text-highlights');
  location.reload();
  ```

- **Ver resaltados guardados**:
  ```javascript
  JSON.parse(localStorage.getItem('text-highlights'));
  ```

### Limitaciones

- Solo funciona dentro del contenido del artículo (`.post-content`)
- No funciona en código, tablas o elementos embebidos
- Los resaltados son por navegador (no sincronizados entre dispositivos)

### Tips de Uso

1. **Organiza** con colores: Usa diferentes colores para diferentes tipos de información
2. **No abuses**: Resalta solo lo más importante
3. **Compatibilidad**: Funciona en Chrome, Firefox, Safari y Edge modernos
4. **Mobile first**: En móvil, usa long-press en lugar de doble-tap

### Desactivar Temporalmente

Si quieres desactivar el highlighter temporalmente sin borrar los datos, agrega esto a tu navegador:

```javascript
// En la consola del navegador
document.querySelector('#highlighter-menu').style.display = 'none';
```

Para reactivarlo:

```javascript
document.querySelector('#highlighter-menu').style.display = '';
```
