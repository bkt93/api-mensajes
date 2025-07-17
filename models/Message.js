import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
