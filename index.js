require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();
const port = 3000;

const cvRoutes = require('./routes/cvRoutes');

// CORS: solo permite peticiones desde GitHub Pages y localhost
app.use(cors({
  origin: [
    process.env.GITHUB_PAGES_URL,
    'http://localhost:3000'
  ].filter(Boolean)
}));

app.use(express.json());
app.use(express.static('public'));
app.use('/api', cvRoutes);

// ===== NODEMAILER =====
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// ===== RATE LIMIT: máx 3 solicitudes por IP cada 60 minutos =====
const citaLimiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES) || 60) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 3,
  message: { error: 'Demasiadas solicitudes. Por favor, inténtalo más tarde.' },
  standardHeaders: true,
  legacyHeaders: false
});

// ===== VALIDACIÓN básica =====
function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function esTextoSeguro(texto) {
  // Evitar inyecciones HTML/script
  return typeof texto === 'string' && !/[<>]/.test(texto);
}

// ===== ENDPOINT CITA =====
// El correo destino NUNCA sale del servidor
app.post('/api/cita', citaLimiter, async (req, res) => {
  const { nombre, email, fecha, hora, motivo } = req.body;

  // Validaciones
  if (!nombre || !email || !fecha) {
    return res.status(400).json({ error: 'Faltan campos obligatorios.' });
  }
  if (!esEmailValido(email)) {
    return res.status(400).json({ error: 'El email no es válido.' });
  }
  if (!esTextoSeguro(nombre) || !esTextoSeguro(motivo || '')) {
    return res.status(400).json({ error: 'El texto contiene caracteres no permitidos.' });
  }
  if (nombre.length > 100 || (motivo && motivo.length > 500)) {
    return res.status(400).json({ error: 'El texto es demasiado largo.' });
  }

  const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const mailOptions = {
    from: `"CV Interactivo" <${process.env.MAIL_USER}>`,
    to: process.env.CONTACT_EMAIL,          // ← solo visible en el servidor
    replyTo: email,                          // ← responder va al remitente
    subject: `Solicitud de cita - ${nombre}`,
    text:
      `Hola,\n\n` +
      `Has recibido una solicitud de cita:\n\n` +
      `📋 Datos del solicitante:\n` +
      `• Nombre: ${nombre}\n` +
      `• Email: ${email}\n` +
      `• Fecha preferida: ${fechaFormateada}${hora ? ' a las ' + hora : ''}\n` +
      `${motivo ? '• Motivo: ' + motivo : ''}\n\n` +
      `Puedes responder directamente a este email.\n\n` +
      `— CV Interactivo`,
    html:
      `<h3>Nueva solicitud de cita</h3>` +
      `<p><b>Nombre:</b> ${nombre}</p>` +
      `<p><b>Email:</b> ${email}</p>` +
      `<p><b>Fecha:</b> ${fechaFormateada}${hora ? ' a las ' + hora : ''}</p>` +
      `${motivo ? `<p><b>Motivo:</b> ${motivo}</p>` : ''}` +
      `<hr><small>Enviado desde tu CV Interactivo</small>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true, mensaje: '¡Solicitud enviada correctamente!' });
  } catch (err) {
    console.error('Error al enviar email:', err.message);
    res.status(500).json({ error: 'No se pudo enviar el email. Inténtalo más tarde.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
