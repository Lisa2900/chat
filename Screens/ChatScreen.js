import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Button } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 
import { sendMessage } from './SendMessage';

const ChatScreen = ({ route }) => {
  const { chatId } = route.params; // Obtener el ID del chat
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const unsubscribeMessages = onSnapshot(collection(db, "chats", chatId, "messages"), (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
    });

    return () => unsubscribeMessages();
  }, [chatId]);

  const handleSend = () => {
    sendMessage(messageText, chatId);
    setMessageText(''); // Limpiar el campo de entrada
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.email}: {item.text}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Escribe un mensaje..."
        value={messageText}
        onChangeText={setMessageText}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10 }}
      />
      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
};

export default ChatScreen;
