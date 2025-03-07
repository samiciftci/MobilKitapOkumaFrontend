import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Kullanıcı Girişi"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Kitap Listesi"
          onPress={() => navigation.navigate('KitapListesi')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Arama"
          onPress={() => {
            // Burada henüz bir "Arama" ekranı yoksa, ileride ekleyebilirsiniz.
            // Örneğin navigation.navigate('AramaEkrani');
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginBottom: 15,
  },
});
