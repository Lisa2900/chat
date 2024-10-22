// sendMessage.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';  // Ajusta la ruta según tu estructura de archivos

export const sendMessage = async (text) => {
  if (text.trim()) {
    try {
      await addDoc(collection(db, "chats"), {
        email: auth.currentUser.email,
        text: text,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al enviar el mensaje: ", error);
    }
  }
};
