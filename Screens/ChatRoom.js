import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { sendMessage } from './sendMessage';  // Asegúrate de importar la función desde el archivo correcto

const ChatRoom = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    sendMessage(message);
    setMessage('');  // Limpiar el campo de entrada
  };

  return (
    <View>
      <Text>Bienvenido al chat</Text>
      <TextInput
        placeholder="Escribe un mensaje..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
};

export default ChatRoom;
