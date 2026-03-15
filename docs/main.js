// ===== CONFIGURACIÓN EMAILJS =====
// Tu correo nunca aparece aquí — EmailJS lo guarda en su servidor
// Registrate gratis en https://www.emailjs.com y rellena estos 3 valores:
const EMAILJS_SERVICE_ID  = 'service_ss4nzxu';
const EMAILJS_TEMPLATE_ID = 'template_0vnslmf';
const EMAILJS_PUBLIC_KEY  = '_wdz5QyXpIeoR1Zkn';

// ===== PARPADEO =====
function blink() {
  const leftLid = document.getElementById('leftEyeLid');
  const rightLid = document.getElementById('rightEyeLid');
  leftLid.setAttribute('ry', '18');
  rightLid.setAttribute('ry', '18');
  setTimeout(() => {
    leftLid.setAttribute('ry', '0');
    rightLid.setAttribute('ry', '0');
  }, 150);
}

function startBlinking() {
  const randomDelay = 3000 + Math.random() * 2000;
  setTimeout(() => {
    blink();
    startBlinking();
  }, randomDelay);
}
startBlinking();

// ===== REFERENCIAS =====
const personaje = document.getElementById('personaje');
const despacho = document.querySelector('.despacho');

// ===== PERRITO =====
const perrito = document.getElementById('perrito');
const perritoBody = document.getElementById('perritoBody');
let perritoX = 50;
let perritoDirection = 1;
let perritoSpeed = 1.5;
let perritoTargetScale = 1;
let perritoCurrentScale = 1;

function animatePerrito() {
  perritoX += perritoSpeed * perritoDirection;

  if (perritoX > 480) {
    perritoDirection = -1;
    perritoTargetScale = -1;
  } else if (perritoX < 50) {
    perritoDirection = 1;
    perritoTargetScale = 1;
  }

  perritoCurrentScale += (perritoTargetScale - perritoCurrentScale) * 0.1;

  perrito.setAttribute('transform', `translate(${perritoX}, 400)`);
  perritoBody.setAttribute('transform', `scale(${perritoCurrentScale}, 1)`);

  requestAnimationFrame(animatePerrito);
}
animatePerrito();

// ===== MODAL PORTÁTIL =====
function openLaptopModal() {
  document.getElementById('laptopModal').classList.add('active');
}

function closeLaptopModal(event) {
  if (!event || event.target === document.getElementById('laptopModal')) {
    document.getElementById('laptopModal').classList.remove('active');
  }
}

// ===== MODAL CALENDARIO =====
function openCalendarModal() {
  // Poner fecha mínima = hoy
  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('cita-fecha').min = hoy;
  document.getElementById('calendarModal').classList.add('active');
}

function closeCalendarModal(event) {
  if (!event || event.target === document.getElementById('calendarModal')) {
    document.getElementById('calendarModal').classList.remove('active');
  }
}

function enviarCita() {
  const nombre    = document.getElementById('cita-nombre').value.trim();
  const email     = document.getElementById('cita-email').value.trim();
  const fecha     = document.getElementById('cita-fecha').value;
  const hora      = document.getElementById('cita-hora').value;
  const motivo    = document.getElementById('cita-motivo').value.trim();
  const errorEl   = document.getElementById('cita-error');
  const btnEnviar = document.querySelector('#calendarModal button[onclick="enviarCita()"]');

  if (!nombre || !email || !fecha) {
    errorEl.style.color = '#e74c3c';
    errorEl.textContent = '⚠️ Por favor rellena los campos obligatorios (nombre, email y fecha).';
    errorEl.style.display = 'block';
    return;
  }
  errorEl.style.display = 'none';

  const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  btnEnviar.disabled = true;
  btnEnviar.textContent = '⏳ Enviando...';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  nombre,
    from_email: email,
    fecha:      fechaFormateada + (hora ? ' a las ' + hora : ''),
    motivo:     motivo || 'Sin especificar'
  }, EMAILJS_PUBLIC_KEY)
    .then(() => {
      btnEnviar.disabled = false;
      btnEnviar.textContent = '✉️ Enviar solicitud de cita';
      errorEl.style.color = '#2ecc71';
      errorEl.textContent = '✅ ¡Solicitud enviada correctamente!';
      errorEl.style.display = 'block';
      setTimeout(() => {
        closeCalendarModal();
        errorEl.style.color = '#e74c3c';
        errorEl.style.display = 'none';
      }, 2500);
    })
    .catch(() => {
      btnEnviar.disabled = false;
      btnEnviar.textContent = '✉️ Enviar solicitud de cita';
      errorEl.style.color = '#e74c3c';
      errorEl.textContent = '⚠️ Error al enviar. Inténtalo de nuevo.';
      errorEl.style.display = 'block';
    });
}

// ===== DATOS LIBROS =====
const bookData = {
  'JavaScript Avanzado': {
    color: '#c0392b',
    left: `<b>📘 JavaScript Avanzado</b><br><br>
           Capítulo 1 – ES6+<br>
           Arrow functions, destructuring,<br>
           spread/rest operators, módulos.<br><br>
           Capítulo 2 – Async<br>
           Promises, async/await,<br>
           manejo de errores asincrónicos.<br><br>
           Capítulo 3 – Closures<br>
           Scope léxico, patrones de módulo<br>
           y funciones de orden superior.`,
    right: `Capítulo 4 – Patrones<br>
            Observer, Factory, Singleton<br>
            aplicados en JavaScript moderno.<br><br>
            Capítulo 5 – Performance<br>
            Debounce, throttle, lazy loading<br>
            y optimización del DOM.<br><br>
            <i>"Cualquier aplicación que pueda<br>
            escribirse en JavaScript,<br>
            eventualmente lo será."</i><br>
            – Jeff Atwood`
  },
  'React & Vue': {
    color: '#2980b9',
    left: `<b>⚛️ React & Vue</b><br><br>
           React – Componentes<br>
           Hooks, Context API, Virtual DOM<br>
           y ciclo de vida.<br><br>
           React – Estado<br>
           useState, useEffect, useReducer,<br>
           Redux Toolkit y Zustand.<br><br>
           Vue 3 – Composition API<br>
           ref, reactive, computed y watch.`,
    right: `Vue 3 – Ecosistema<br>
            Vue Router, Pinia, Vuex<br>
            y Vue DevTools.<br><br>
            Comparativa<br>
            Cuándo usar React vs Vue según<br>
            el tamaño y tipo de proyecto.<br><br>
            Testing<br>
            Vitest, React Testing Library<br>
            y buenas prácticas de tests.`
  },
  'Node.js': {
    color: '#27ae60',
    left: `<b>🟢 Node.js</b><br><br>
           Fundamentos<br>
           Event loop, módulos CommonJS<br>
           y ESModules en Node.<br><br>
           Express.js<br>
           Middlewares, rutas, controladores<br>
           y manejo de errores.<br><br>
           APIs RESTful<br>
           Diseño de endpoints, versionado<br>
           y documentación con Swagger.`,
    right: `Microservicios<br>
            Arquitectura, comunicación<br>
            entre servicios y mensajería.<br><br>
            Seguridad<br>
            JWT, OAuth2, rate limiting<br>
            y validación de inputs.<br><br>
            Deploy<br>
            PM2, Docker, variables de entorno<br>
            y CI/CD con GitHub Actions.`
  },
  'Python': {
    color: '#8e44ad',
    left: `<b>🐍 Python</b><br><br>
           Fundamentos<br>
           Tipos, funciones, listas,<br>
           dicts, comprehensions.<br><br>
           Automatización<br>
           Scripts, cron jobs, web scraping<br>
           con BeautifulSoup y Selenium.<br><br>
           Análisis de Datos<br>
           Pandas, NumPy y visualización<br>
           con Matplotlib y Seaborn.`,
    right: `Machine Learning<br>
            Scikit-learn, regresión,<br>
            clasificación y clustering.<br><br>
            FastAPI<br>
            APIs modernas y rápidas,<br>
            tipado con Pydantic.<br><br>
            <i>"Python es el segundo mejor<br>
            lenguaje para todo."</i>`
  },
  'Bases de Datos': {
    color: '#d35400',
    left: `<b>🗄️ Bases de Datos</b><br><br>
           SQL – Fundamentos<br>
           SELECT, JOIN, GROUP BY,<br>
           subconsultas y transacciones.<br><br>
           PostgreSQL<br>
           Índices, JSONB, extensiones<br>
           y optimización de queries.<br><br>
           MySQL<br>
           Motor InnoDB, replicación<br>
           y particionado de tablas.`,
    right: `MongoDB<br>
            Documentos, colecciones,<br>
            agregaciones y Atlas Search.<br><br>
            Redis<br>
            Caché, pub/sub, sesiones<br>
            y estructuras de datos.<br><br>
            ORM/ODM<br>
            Sequelize, TypeORM, Mongoose:<br>
            cuándo y cómo usarlos.`
  },
  'DevOps': {
    color: '#16a085',
    left: `<b>⚙️ DevOps</b><br><br>
           Git<br>
           Branching, merging, rebase,<br>
           cherry-pick y hooks.<br><br>
           Docker<br>
           Imágenes, contenedores,<br>
           Dockerfile y docker-compose.<br><br>
           CI/CD<br>
           GitHub Actions, pipelines,<br>
           tests automáticos y deploy.`,
    right: `Kubernetes<br>
            Pods, servicios, ingress,<br>
            escalado y monitorización.<br><br>
            Cloud<br>
            AWS, GCP, Azure: servicios<br>
            principales y costes.<br><br>
            Observabilidad<br>
            Logs, métricas, trazas<br>
            con Grafana y Prometheus.`
  },
  'HTML5 & CSS3': {
    color: '#e74c3c',
    left: `<b>🎨 HTML5 & CSS3</b><br><br>
           HTML Semántico<br>
           article, section, nav, aside,<br>
           accesibilidad y SEO básico.<br><br>
           Flexbox<br>
           Contenedor, ejes, alineación<br>
           y casos de uso prácticos.<br><br>
           Grid<br>
           Grid areas, auto-fill, auto-fit<br>
           y layouts complejos.`,
    right: `Animaciones CSS<br>
            transitions, keyframes,<br>
            transforms y will-change.<br><br>
            Responsive Design<br>
            Media queries, unidades relativas,<br>
            mobile-first y container queries.<br><br>
            Variables CSS<br>
            Custom properties, theming<br>
            y modo oscuro nativo.`
  },
  'TypeScript': {
    color: '#3498db',
    left: `<b>🔷 TypeScript</b><br><br>
           Tipos Básicos<br>
           string, number, boolean,<br>
           any, unknown, never, void.<br><br>
           Interfaces & Types<br>
           Diferencias, extends, intersección<br>
           y tipos utilitarios.<br><br>
           Genéricos<br>
           T, K, V: funciones y clases<br>
           genéricas con constraints.`,
    right: `Decoradores<br>
            Decoradores de clase, método<br>
            y propiedad en NestJS.<br><br>
            Config avanzada<br>
            tsconfig, strict mode, paths<br>
            y declaración de módulos.<br><br>
            <i>"TypeScript no es un lenguaje<br>
            diferente, es JavaScript<br>
            con superpoderes."</i>`
  },
  'Testing': {
    color: '#2ecc71',
    left: `<b>🧪 Testing</b><br><br>
           Tests Unitarios<br>
           Jest, describe, it, expect,<br>
           mocks y spies.<br><br>
           Tests de Integración<br>
           Supertest, base de datos<br>
           en memoria y fixtures.<br><br>
           Tests E2E<br>
           Cypress: visitar, interactuar<br>
           y validar flujos completos.`,
    right: `TDD<br>
            Red, Green, Refactor:<br>
            diseño guiado por tests.<br><br>
            Coverage<br>
            Líneas, ramas, funciones:<br>
            cómo interpretar el reporte.<br><br>
            Buenas Prácticas<br>
            Tests rápidos, deterministas,<br>
            independientes y legibles.`
  },
  'Arquitectura': {
    color: '#9b59b6',
    left: `<b>🏗️ Arquitectura</b><br><br>
           MVC<br>
           Model, View, Controller:<br>
           separación de responsabilidades.<br><br>
           Clean Architecture<br>
           Capas, dependencias hacia dentro,<br>
           casos de uso y entidades.<br><br>
           Microservicios<br>
           Bounded contexts, API Gateway<br>
           y comunicación asíncrona.`,
    right: `SOLID<br>
            Los 5 principios aplicados<br>
            con ejemplos reales en JS/TS.<br><br>
            DDD<br>
            Domain-Driven Design:<br>
            agregados, repositorios, eventos.<br><br>
            Clean Code<br>
            Nombres, funciones pequeñas,<br>
            comentarios y refactoring.`
  },
  'Seguridad Web': {
    color: '#e67e22',
    left: `<b>🔐 Seguridad Web</b><br><br>
           OWASP Top 10<br>
           Injection, XSS, CSRF,<br>
           IDOR y misconfiguration.<br><br>
           Autenticación<br>
           JWT, OAuth2, sesiones seguras,<br>
           refresh tokens y cookies.<br><br>
           HTTPS<br>
           TLS, certificados, HSTS<br>
           y headers de seguridad.`,
    right: `Validación<br>
            Sanitización de inputs,<br>
            Zod, Joi y express-validator.<br><br>
            Rate Limiting<br>
            Protección contra fuerza bruta,<br>
            DDoS y abuso de APIs.<br><br>
            Auditoría<br>
            npm audit, SAST, DAST<br>
            y pentesting básico.`
  }
};

// ===== LIBRO ABIERTO =====
function openBookModal(title, description, color) {
  const data = bookData[title] || { color: color || '#7a4a25', left: `<b>${title}</b><br><br>${description}`, right: '' };
  const c = data.color;
  document.getElementById('bookSpineEl').style.background = c;
  document.getElementById('bookTitleLeft').style.color = c;
  document.getElementById('bookTitleLeft').style.borderBottomColor = c;
  document.getElementById('bookTitleLeft').innerHTML = title;
  document.getElementById('bookContentLeft').innerHTML = data.left;
  document.getElementById('bookContentRight').innerHTML = data.right;
  document.getElementById('bookCloseBtn').style.background = c;
  // Reiniciar animación
  const container = document.querySelector('.book-container');
  container.style.animation = 'none';
  container.offsetHeight; // reflow
  container.style.animation = '';
  document.getElementById('bookOverlay').classList.add('active');
}

function closeBook(event) {
  if (!event || event.target === document.getElementById('bookOverlay')) {
    document.getElementById('bookOverlay').classList.remove('active');
  }
}

// ===== TECLADO (Escape + flechas) =====
let personajeX = 0;
const moveSpeed = 15;
const maxMove = 150;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLaptopModal();
    closeBook();
    closeCalendarModal();
  }
  if (e.key === 'ArrowLeft') {
    personajeX = Math.max(personajeX - moveSpeed, -maxMove);
    personaje.style.transform = `translateX(${personajeX}px)`;
  }
  if (e.key === 'ArrowRight') {
    personajeX = Math.min(personajeX + moveSpeed, maxMove);
    personaje.style.transform = `translateX(${personajeX}px)`;
  }
});

// ===== BOCADILLO =====
const bocadillo = document.getElementById('bocadillo');

setTimeout(() => {
  bocadillo.classList.add('visible');

  setTimeout(() => {
    bocadillo.classList.remove('visible');
    bocadillo.classList.add('salir');
    setTimeout(() => {
      bocadillo.classList.remove('salir');
    }, 500);
  }, 10000);

}, 5000);

