import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// src klasöründekiler
import HomeScreen from './src/HomeScreen';
import KitapListesi from './src/KitapListesi';
import KitapDetay from './src/KitapDetay';

// Kök dizinde olanlar
import KitapPdf from './KitapPdf';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

// RootStackParamList: Ekranların parametre tanımları
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  KitapListesi: undefined;
  KitapDetay: { kitapId: number };
  KitapPdf: { pdfUrl: string };
};

// Stack oluşturma
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Ana sayfa */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Ana Sayfa' }}
        />

        {/* Login ve Register ekranları */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Giriş Yap' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Kayıt Ol' }}
        />

        {/* Kitap ekranları */}
        <Stack.Screen
          name="KitapListesi"
          component={KitapListesi}
          options={{ title: '📚 Kitap Listesi' }}
        />
        <Stack.Screen
          name="KitapDetay"
          component={KitapDetay}
          options={{ title: '📖 Kitap Detay' }}
        />
        <Stack.Screen
          name="KitapPdf"
          component={KitapPdf}
          options={{ title: 'PDF Okuma' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
