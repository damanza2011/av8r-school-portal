# AV8R School · Portal de certificación y empleo

Prototipo de portal bilingüe para AV8R School, inspirado en la estructura de las mejores escuelas FAA A&P y en la comunidad de Skool del fundador. No es una página oficial de la FAA ni una oferta de empleo/visa.

## Ver la página

Abre `index.html` en el navegador. No necesita build.

También está servida en local para esta demo:

```
http://127.0.0.1:8088/
```

Para probar el servidor local con API:

```powershell
npx serve .
```

La API `/api/chat` solo funciona en Vercel (o un runtime serverless equivalente). En GitHub Pages, `file://` o un servidor estático, el chat usa el **fallback local** y sigue funcionando.

## Propuesta y benchmark

- `PROPUESTA-WEB-AV8R.pdf`: propuesta de 3 páginas para Néstor.
- `propuesta.html`: fuente editable de la propuesta.
- `BENCHMARK-AV8R.md`: los 10 referentes y qué se adaptó.
- `preview-desktop.png`, `preview-mobile.png`, `preview-chat.png`: capturas.

## Chat

- `AV8R Guide` responde en español e inglés.
- Intenciones locales: ruta FAA, cursos, precio, inglés, visa, empleo, OEM, comunidad, empleador, online y contacto.
- Si existe `api/chat.js` y `GEMINI_API_KEY`, el frontend intenta la API y, si falla, cae al fallback local.
- No inventa precios, fechas, visas ni empleos.
- El enlace de humano va a Skool; el correo es un placeholder.

### Variables en Vercel

- `GEMINI_API_KEY`
- `GEMINI_MODEL` (por defecto `gemini-3.8-flash`; usa el modelo disponible en tu AI Studio)

Después de guardar, **Redeploy**.

## Qué reemplazar antes de publicar

1. **Datos de contacto:** `hello@av8rschool.com` en `index.html`, `app.js` (`CONFIG.email`) y formulario.
2. **Skool:** `CONFIG.skool` y los enlaces del HTML ya apuntan a `https://www.skool.com/av8rschool`.
3. **Cifras públicas:** 391 miembros, 9 cursos, 23 módulos y 75 posts son un snapshot de octubre de 2026. Actualízalas o retíralas.
4. **Cursos, precios, duración y fechas:** no están inventados; el portal dice que se confirman con AV8R. Si AV8R entrega la malla, se agrega.
5. **Fotos/videos reales:** el prototipo usa tipografía, SVG y CSS. Reemplazar por material de la escuela cuando exista.
6. **Legal:** privacidad, términos, reembolsos, consentimiento, accesibilidad y disclaimers FAA/visa/ITAR/EAR.
7. **Quitar el aviso de prototipo** del footer.
8. **CRM/ATS:** el formulario abre un correo; en producción conectar HubSpot/Kommo/Salesforce y un ATS.

## Estructura

```
av8r-web/
├── index.html
├── api/chat.js
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   └── img/
│       ├── favicon.svg
│       └── og-av8r.jpg
├── .env.example
└── README.md
```

## Despliegue

Guía completa paso a paso: `DEPLOY-GIT-VERCEL.md`.
ZIP limpio para GitHub/Vercel: `AV8R-SKOOL-WEB-DEPLOY.zip`.

### Vercel (recomendado: API + front)

1. Sube la carpeta a GitHub o arrástrala a Vercel.
2. Framework: Other. Root: `/`.
3. Agrega `GEMINI_API_KEY` y `GEMINI_MODEL`.
4. Deploy.

### GitHub Pages (solo front)

Funciona, pero el chat usa el fallback local porque no hay funciones serverless. Es suficiente para una demo.

## Límites y advertencias

- La FAA certifica al técnico; la plataforma no certifica.
- El A&P no otorga visa ni autorización de trabajo en EE. UU.
- La práctica y el oral/practical requieren partner o DME autorizado.
- EASA Part 66 es un sistema distinto.
- Los datos técnicos de aeronaves de lujo pueden estar sujetos a ITAR/EAR.
- Las cifras de Skool son públicas y pueden cambiar.
- Este prototipo no está afiliado a la FAA, a las OEMs ni a Skool.

## Benchmark

Ver `BENCHMARK-AV8R.md` para los 10 referentes y lo que se adaptó.
