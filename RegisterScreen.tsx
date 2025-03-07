import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!kullaniciAdi || !email || !sifre) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    setLoading(true);
    axios.post(
      'http://192.168.1.27:5000/api/Kullanici',
      {
        id: 0,
        kullaniciAdi,
        email,
        sifre,
      },
      { headers: { 'Content-Type': 'application/json-patch+json' } }
    )
    .then(response => {
      Alert.alert('Başarılı', 'Kayıt başarılı, lütfen giriş yapın.');
      navigation.navigate('Login');
    })
    .catch(error => {
      console.error('Kayıt hatası:', error);
      Alert.alert('Hata', 'Kayıt yapılamadı.');
    })
    .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={kullaniciAdi}
        onChangeText={setKullaniciAdi}
      />
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
      <Button title={loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'} onPress={handleRegister} />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Zaten hesabınız var mı?</Text>
        <Button title="Giriş Yap" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  loginContainer: { marginTop: 20, alignItems: 'center' },
  loginText: { marginBottom: 10 },
});

export default RegisterScreen;
