# AV8R School · Portal Web

Plataforma bilingüe (Español / Inglés) de preparación para la certificación **FAA A&P** y carreras en **aviación ejecutiva**.

**Sitio en producción (GitHub Pages):** [damanza2011.github.io/av8r-school-portal](https://damanza2011.github.io/av8r-school-portal/)  
**Repositorio GitHub:** [damanza2011/av8r-school-portal](https://github.com/damanza2011/av8r-school-portal)

---

## 📁 Arquitectura del Código

El proyecto sigue una arquitectura frontend limpia, desacoplada y modular, sin requerir pasos de compilación complejos (`buildless` / Vanilla JS moderno):

```
nestor web 2/
├── index.html                  # HTML5 semántico estructurado
├── .nojekyll                   # Evita procesamiento Jekyll en GitHub Pages
├── README.md                   # Documentación técnica
└── assets/
    ├── css/
    │   └── styles.css          # Sistema de diseño, variables, responsive y animaciones
    └── js/
        ├── data/
        │   ├── i18n-data.js    # Diccionario bilingüe completo (ES/EN)
        │   └── content-data.js # Catálogo de programas, etapas de ruta y FAQs
        ├── modules/
        │   ├── chat.js         # Asistente virtual "AV8R Guide" (intents locales + fallback API)
        │   └── i18n.js         # Motor de internacionalización y render dinámico
        └── app.js              # Orquestador: navegación, observador de scroll y formulario
```

---

## 🚀 Despliegue en GitHub Pages

Para actualizar los cambios en tu repositorio de GitHub:

1. Asegúrate de subir tanto el archivo `index.html` como la carpeta `assets/` a la raíz del repositorio.
2. Si subes vía Git:
   ```bash
   git add .
   git commit -m "Arquitectura modular y buenas prácticas frontend"
   git push origin main
   ```
3. En GitHub (**Settings > Pages**), la fuente debe estar en **Deploy from a branch** -> `main` / `root`.

---

## 🛠️ Tecnologías Utilizadas
- **HTML5 Semántico**: Meta tags SEO, Open Graph, Twitter Cards y Schema.org (JSON-LD).
- **CSS3 Nativo**: Variables personalizadas (`:root`), tipografías Archivo & IBM Plex Mono, Flexbox/Grid.
- **JavaScript ES6+**: Arquitectura basada en módulos, manipulación del DOM sin frameworks pesados, persistencia con `localStorage` y `IntersectionObserver`.
