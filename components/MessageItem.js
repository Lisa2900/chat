import React from 'react';
import { View, Text } from 'react-native';

const MessageItem = ({ message }) => {
  return (
    <View>
      <Text>{message.email}: {message.text}</Text>
      <Text>{message.createdAt.toDate().toLocaleString()}</Text>
    </View>
  );
};

export default MessageItem;
