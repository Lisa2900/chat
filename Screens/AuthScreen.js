import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate de que tu importación sea correcta

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigation = useNavigation();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Guardar el correo electrónico en Firestore
        const userId = userCredential.user.uid;
        await setDoc(doc(db, "users", userId), {
          email: email,
        });
        Alert.alert("Registro exitoso", "Bienvenido!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Inicio de sesión exitoso", "Bienvenido de nuevo!");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

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
