import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatItem = ({ chat }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Chat', { chatId: chat.id }); // Navega a la pantalla de chat
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text style={{ fontSize: 18 }}>{chat.email} - {chat.recipient}</Text>
        <Text>{chat.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
