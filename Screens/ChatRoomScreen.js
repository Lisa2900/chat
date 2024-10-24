import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TextInput, Button } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase'; 
import ChatItem from '../components/ChatItem';

const ChatRoomScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]); // Para almacenar los usuarios
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribeChats = onSnapshot(collection(db, "chats"), (snapshot) => {
      const chatsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filtramos chats que incluyen el usuario actual
      const userChats = chatsList.filter(chat => chat.email === auth.currentUser.email || chat.recipient === auth.currentUser.email);
      setChats(userChats);
      setLoading(false);
    });

    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList); // Guardamos los usuarios en el estado
    });

    return () => {
      unsubscribeChats();
      unsubscribeUsers();
    };
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Auth"); // Redirige a la pantalla de autenticación
      })
      .catch(error => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Buscar usuario"
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
      />
      <Button title="Cerrar sesión" onPress={handleLogout} />
      
      <FlatList
        data={filteredUsers} // Usa los usuarios filtrados
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem chat={{ email: item.email }} /> // Puedes modificar esto si necesitas más datos
        )}
      />
    </View>
  );
};

export default ChatRoomScreen;
