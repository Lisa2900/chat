import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Alternar entre registro e inicio de sesión
  const navigation = useNavigation();

  // Manejar autenticación (registro o inicio de sesión)
  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Registro de usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Registro exitoso", `Bienvenido ${userCredential.user.email}`);
      } else {
        // Inicio de sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Inicio de sesión exitoso", `Bienvenido de nuevo ${userCredential.user.email}`);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // Redirigir a la sala de chat si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("ChatRoom"); // Reemplaza la pantalla de autenticación con la de chat
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isSignUp ? "Registrarse" : "Iniciar sesión"} onPress={handleAuth} />
      <Text onPress={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </Text>
    </View>
  );
};

export default AuthScreen;
