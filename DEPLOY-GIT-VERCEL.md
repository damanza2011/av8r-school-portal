# Desplegar AV8R School en GitHub + Vercel

Guía para Windows. Tiempo estimado: **15–25 minutos**. El objetivo es que el portal quede publicado en una URL de Vercel y que cada `git push` actualice la web automáticamente.

## 0. Antes de empezar

- Ten lista una cuenta de **GitHub** y una de **Vercel** (puedes entrar con GitHub).
- Usa el ZIP **`AV8R-SKOOL-WEB-DEPLOY.zip`**, no el ZIP completo de propuesta.
- Decide el nombre del repositorio: por ejemplo `av8r-school-portal`.
- **No subas el ZIP a GitHub directamente.** GitHub no lo interpreta como repositorio. Hay que descomprimirlo y subir los archivos con Git.
- Si no tienes Git: instala [Git for Windows](https://git-scm.com/download/win) y abre **Git Bash** o PowerShell.

## 1. Descomprimir el ZIP

En PowerShell:

```powershell
cd C:\Users\dan\Documents\deepseek-harness\default-workspace
Expand-Archive -Path .\AV8R-SKOOL-WEB-DEPLOY.zip -DestinationPath .\av8r-school-portal -Force
cd .\av8r-school-portal
```

Comprueba que estás en la carpeta correcta:

```powershell
dir
```

Debes ver `index.html`, `assets`, `api`, `DEPLOY-GIT-VERCEL.md` y `.env.example`.

## 2. Crear el repositorio en GitHub

1. Entra a [github.com/new](https://github.com/new).
2. Repository name: `av8r-school-portal`.
3. Visibilidad: **Private** hasta que Néstor apruebe.
4. **NO** marques “Add a README”, “Add .gitignore” ni “Choose a license”. El repo debe estar vacío.
5. Crea el repositorio y copia la URL, por ejemplo:

```
https://github.com/TU-USUARIO/av8r-school-portal.git
```

## 3. Subir el proyecto con Git

### Opción A · Git CLI (recomendada)

```powershell
git init
git add .
git commit -m "AV8R School portal v1"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/av8r-school-portal.git
git push -u origin main
```

Si GitHub te pide autenticación, usa el navegador o un **Personal Access Token**; no uses tu contraseña normal.

Si el remoto ya existe:

```powershell
git remote set-url origin https://github.com/TU-USUARIO/av8r-school-portal.git
git push -u origin main
```

Si el push falla porque el repo tiene un README:

```powershell
git pull --rebase origin main
git push -u origin main
```

### Opción B · GitHub Desktop (más visual)

1. Abre GitHub Desktop.
2. **File → Add local repository**.
3. Selecciona `C:\...\av8r-school-portal`.
4. Si pregunta, elige **create a repository**.
5. Name: `av8r-school-portal`; visibility: Private.
6. **Publish repository**.
7. Escribe el summary `AV8R School portal v1` y haz **Commit to main**.
8. **Push origin**.

### Opción C · GitHub CLI (si ya lo tienes instalado)

```powershell
gh repo create av8r-school-portal --private --source=. --remote=origin --push
```

## 4. Crear el proyecto en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new).
2. Autoriza a Vercel para ver tu GitHub si es la primera vez.
3. Busca `av8r-school-portal` y pulsa **Import**.
4. Configuración:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** dejar vacío
   - **Output Directory:** dejar vacío
   - **Install Command:** dejar vacío
5. Abre **Environment Variables** y agrega:

| Name | Value |
|---|---|
| `GEMINI_API_KEY` | Tu clave nueva de Google AI Studio |
| `GEMINI_MODEL` | `gemini-3.8-flash` (o el modelo disponible en tu cuenta) |

Marca las casillas **Production**, **Preview** y **Development**.

> Si no pones `GEMINI_API_KEY`, el portal igual funciona: el chat usa el fallback local. Para la sorpresa, la API es un plus, no un requisito.

6. Pulsa **Deploy**.
7. Espera el build. Vercel te dará una URL parecida a:

```
https://av8r-school-portal.vercel.app
```

## 5. Probar antes de enviar

Abre la URL en una ventana **incógnita**:

- [ ] La home carga en desktop y móvil.
- [ ] El botón **ES/EN** cambia el idioma.
- [ ] Los filtros de programas funcionan.
- [ ] El FAQ abre y cierra.
- [ ] El botón **AV8R Guide** abre el chat.
- [ ] El chat responde “ruta FAA” con las 5 etapas.
- [ ] Si hay API key, en DevTools → Network, `/api/chat` responde **200**.
- [ ] Si no hay API key, el chat igual responde con el fallback.
- [ ] El formulario abre el correo o muestra el aviso de prototipo.
- [ ] La URL no pide login de Vercel.

### Si la URL pide login

Vercel puede tener **Deployment Protection** activado:

1. Vercel → Project → **Settings → Deployment Protection**.
2. Desactiva **Vercel Authentication** para ese proyecto o usa un **Share Link**.
3. Vuelve a abrir en incógnito.

### Si `/api/chat` da 404 o 503

- 404: el archivo `api/chat.js` no está en la raíz del repo o el Root Directory está mal.
- 503: falta `GEMINI_API_KEY` o el modelo no existe.
- Cambia `GEMINI_MODEL` por el modelo que veas en Google AI Studio y haz **Redeploy**.

## 6. Actualizar la web después

Cada cambio:

```powershell
git add .
git commit -m "Ajuste de contenido"
git push
```

Vercel detecta el push y publica solo. No tienes que volver a importar el proyecto.

## 7. Antes de la sorpresa: cambia los placeholders

En `index.html` y `assets/js/app.js`:

- `hello@av8rschool.com` → correo real de AV8R.
- `https://av8rschool.com/` en `canonical` y OG → URL real de Vercel o dominio propio.
- Texto “Prototipo de portal · datos públicos de Skool” del footer → quítalo o cámbialo cuando Néstor apruebe.
- Si Néstor ya tiene WhatsApp, agrega el enlace en el formulario o en el footer.

Luego:

```powershell
git add .
git commit -m "Datos de contacto AV8R"
git push
```

## 8. Dominio propio (opcional)

Solo si AV8R ya tiene dominio:

1. Vercel → Project → **Settings → Domains**.
2. Agrega `av8rschool.com` o `portal.av8rschool.com`.
3. Sigue los DNS que indica Vercel.
4. Espera la propagación.

No compres un dominio nuevo esta noche solo por la sorpresa. La URL `*.vercel.app` es suficiente para la mañana.

## 9. Qué enviarle a Néstor

**No le envíes el ZIP como entrega principal.** Envía la URL de Vercel; el ZIP es respaldo.

Mensaje sugerido:

> Buenos días, Néstor. Anoche dejé una primera versión navegable de AV8R School:  
> **https://TU-PROYECTO.vercel.app**  
>  
> Incluye la ruta FAA A&P, programas, comunidad Skool, alianzas y un asistente bilingüe. Es un prototipo: no publiqué precios ni promesas de visa o empleo.  
>  
> Cuando me des acceso a los 9 cursos y 23 módulos, lo convertimos en el portal completo. ¿Lo revisamos hoy?

Versión en inglés:

> Good morning, Nestor. I left a first navigable version of AV8R School:  
> **https://YOUR-PROJECT.vercel.app**  
>  
> It includes the FAA A&P path, programs, Skool community, alliances and a bilingual assistant. It is a prototype: no prices, visa or job promises.  
>  
> Once you give me access to the 9 courses and 23 modules, we turn it into the full portal. Can we review it today?

## 10. Errores comunes

| Problema | Causa | Solución |
|---|---|---|
| GitHub no acepta el ZIP | GitHub no despliega ZIP como repo | Descomprime y usa Git. |
| `remote origin already exists` | Ya hay un remoto | `git remote set-url origin ...` |
| `src refspec main does not match` | La rama no se llama main | `git branch -M main` |
| Vercel no ve el repo | Falta autorizar GitHub | “Adjust GitHub App Permissions”. |
| La página carga sin estilos | Ruta de assets mal o Root Directory incorrecto | Root `./`; verifica `assets/css/styles.css`. |
| El chat no responde con IA | Falta key o modelo inválido | Revisa env vars y Redeploy. |
| La URL pide login | Deployment Protection | Desactívala o comparte el link. |
| El formulario abre un correo raro | Placeholder `hello@av8rschool.com` | Cámbialo antes de enviar. |

## 11. Seguridad

- **Nunca** subas `.env` ni la API key a GitHub.
- La clave va solo en **Vercel → Environment Variables**.
- Si una clave se expuso en un chat o captura, **revócala** y crea otra.
- Mantén el repo privado hasta que Néstor autorice publicar.
- El formulario actual usa `mailto:`; no recibe datos en un servidor. Para producción, conecta un CRM con consentimiento y política de privacidad.
- No presentes la web como escuela FAA aprobada, garantía de visa ni bolsa de empleo.

## 12. Checklist final para la mañana

- [ ] Repo en GitHub con el código.
- [ ] Proyecto importado en Vercel.
- [ ] Deploy en Production exitoso.
- [ ] URL pública probada en incógnito.
- [ ] Chat probado en ES y EN.
- [ ] Correo placeholder reemplazado o aviso claro.
- [ ] Capturas desktop/móvil listas.
- [ ] Mensaje para Néstor copiado.
- [ ] ZIP guardado como respaldo, no como enlace principal.

## Comandos rápidos (todo junto)

```powershell
cd C:\Users\dan\Documents\deepseek-harness\default-workspace
Expand-Archive -Path .\AV8R-SKOOL-WEB-DEPLOY.zip -DestinationPath .\av8r-school-portal -Force
cd .\av8r-school-portal
git init
git add .
git commit -m "AV8R School portal v1"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/av8r-school-portal.git
git push -u origin main
```

Después: Vercel → Add New → Project → Import → Environment Variables → Deploy.
