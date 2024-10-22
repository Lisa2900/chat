import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './Screens/AuthScreen';
import ChatRoom from './Screens/ChatRoom'; // Asegúrate de que este componente esté bien definido

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: true }} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
