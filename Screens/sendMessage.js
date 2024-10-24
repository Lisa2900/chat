import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase'; 

export const sendMessage = async (text, chatId) => {
  if (text.trim()) {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        email: auth.currentUser.email, // El remitente
        text: text,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al enviar el mensaje: ", error);
    }
  }
};
