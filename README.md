# 🌿 CV Interactivo – Sheila Cortés

CV interactivo estilo Animal Crossing con personaje animado, despacho 3D, libros clickeables y formulario de contacto seguro.

---

## 🏗️ Arquitectura

```
GitHub Pages  →  sirve el frontend (docs/)   → https://TU_USUARIO.github.io/TU_REPO
EmailJS       →  envía los emails             → gratis, sin servidor propio
```

- Todo el CV va en **GitHub Pages** — completamente gratis, sin servidores.
- El formulario de citas usa **EmailJS** — tu correo vive en su servidor, nunca en el código.

---

## 🚀 Pasos para publicar

### 1️⃣ Configura EmailJS (gratis, 200 emails/mes)

1. Crea una cuenta en [emailjs.com](https://www.emailjs.com)
2. **Add New Service** → conecta tu cuenta de Gmail → copia el `Service ID`
3. **Email Templates → Create New Template** → usa estas variables:
   ```
   De: {{from_name}} ({{from_email}})
   Fecha: {{fecha}}
   Motivo: {{motivo}}
   ```
   Copia el `Template ID`
4. En **Account → General** copia tu `Public Key`

5. Edita `docs/main.js` líneas 3-5 con tus valores:
   ```js
   const EMAILJS_SERVICE_ID  = 'service_xxxxxxx';
   const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';
   const EMAILJS_PUBLIC_KEY  = 'xxxxxxxxxxxxxxxx';
   ```

### 2️⃣ Sube el proyecto a GitHub

```bash
git init
git add .
git commit -m "CV interactivo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### 3️⃣ Activa GitHub Pages

1. Repo en GitHub → **Settings → Pages**
2. **Source**: `Branch: main` / `Folder: /docs`
3. Tu URL será: `https://TU_USUARIO.github.io/TU_REPO`

---

## 🛡️ Seguridad con EmailJS

- ✅ Tu correo destino **vive en los servidores de EmailJS**, nunca en el código
- ✅ La `Public Key` es segura — solo permite enviar desde tu dominio configurado
- ✅ En EmailJS → **Account → Security** puedes restringir el dominio permitido a `TU_USUARIO.github.io`
- ✅ Límite de 200 emails/mes en el plan gratuito (anti-spam)

---

## 💻 Ejecución local

```bash
npm install
npm start
# Abre http://localhost:3000
```

> El servidor local sirve `public/` (que usa `fetch /api/cita`).
> La carpeta `docs/` es exclusivamente para GitHub Pages (usa EmailJS).
