---
layout: default
title: Inicio
---

<div class="home-intro">
  <h1>David Moreno</h1>
  <p>
    Explora artículos sobre inteligencia artificial, matemáticas,
    programación y tecnología. Comparto mis apuntes, investigaciones
    y aprendizajes en el mundo de la IA.
  </p>
</div>

## Artículos Recientes

<ul class="post-list">
  {% for post in site.posts limit:5 %}
    <li class="post-list-item">
      <h3 class="post-list-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h3>
      <div class="post-list-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%d de %B, %Y" }}
        </time>
        {% if post.tags %}
          {% for tag in post.tags limit:3 %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
      {% if post.excerpt %}
        <p class="post-list-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>

{% if site.posts.size > 5 %}
<div class="text-center mt-4">
  <a href="{{ '/blog/' | relative_url }}">Ver todos los artículos →</a>
</div>
{% endif %}
