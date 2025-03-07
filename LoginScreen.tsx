import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !sifre) {
      Alert.alert('Hata', 'Lütfen email ve şifre giriniz.');
      return;
    }
    setLoading(true);
    // Tüm kullanıcıları getirip email & şifre kontrolü yapıyoruz.
    axios.get('http://192.168.1.27:5000/api/Kullanici')
      .then(response => {
        const kullanicilar = response.data;
        const kullanici = kullanicilar.find((u: any) => u.email === email && u.sifre === sifre);
        if (kullanici) {
          Alert.alert('Başarılı', 'Giriş yapıldı.');
          navigation.navigate('KitapListesi');
        } else {
          Alert.alert('Hata', 'Geçersiz email veya şifre.');
        }
      })
      .catch(error => {
        console.error('Giriş hatası:', error);
        Alert.alert('Hata', 'Giriş yapılırken hata oluştu.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={sifre}
        onChangeText={setSifre}
        secureTextEntry
      />
      <Button title={loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'} onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Hesabınız yok mu?</Text>
        <Button title="Kayıt Ol" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  registerContainer: { marginTop: 20, alignItems: 'center' },
  registerText: { marginBottom: 10 },
});

export default LoginScreen;
