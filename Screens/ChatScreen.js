import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      {messages.map((message, index) => (
        <Text key={index}>{message.email}: {message.text}</Text>
      ))}
    </View>
  );
};

export default ChatScreen;
