import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Message from './models/Message.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Ruta POST
app.post('/api/mensajes', async (req, res) => {
  const { numero, mensaje } = req.body;

  if (!numero || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const nuevoMensaje = new Message({ numero, mensaje });
    await nuevoMensaje.save();
    res.status(201).json({ success: true, message: 'Mensaje guardado' });
  } catch (error) {
    console.error('Error al guardar mensaje:', error);
    res.status(500).json({ success: false, error: 'Error al guardar' });
  }
});

app.get('/', (req, res) => {
  res.send('API activa');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
