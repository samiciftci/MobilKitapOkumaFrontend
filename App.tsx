import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KitapListesi from './src/KitapListesi';
import KitapDetay from './src/KitapDetay';

export type RootStackParamList = {
  KitapListesi: undefined;
  KitapDetay: { kitapId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="KitapListesi">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
