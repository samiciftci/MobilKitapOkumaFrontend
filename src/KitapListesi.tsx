import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type KitapListesiNavigationProp = NativeStackNavigationProp<RootStackParamList, 'KitapListesi'>;

interface Kitap {
  id: number;
  ad: string;
  yazar: string;
  puan: number;
  // Diğer alanlar da eklenebilir...
}

interface KitapListesiProps {
  navigation: KitapListesiNavigationProp;
}

const KitapListesi: React.FC<KitapListesiProps> = ({ navigation }) => {
  const [kitaplar, setKitaplar] = useState<Kitap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('http://192.168.1.27:5000/api/Kitap')
      .then(response => {
        setKitaplar(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Kitapları alırken hata oluştu:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#3b5998" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={kitaplar}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('KitapDetay', { kitapId: item.id })}
            style={{
              padding: 15,
              marginBottom: 10,
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.ad}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>{item.yazar}</Text>
            <Text style={{ fontSize: 14, color: '#999' }}>⭐ {item.puan} Puan</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default KitapListesi;
