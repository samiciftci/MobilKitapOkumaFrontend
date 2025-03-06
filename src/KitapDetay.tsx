import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

// Opsiyonel: Tüm API isteklerinde kullanacağımız temel URL
const BASE_URL = 'http://192.168.1.27:5000';

// Kategori arayüzü
interface Kategori {
  kategori: {
    id: number;
    ad: string;
  };
}

// Kitap arayüzü
interface Kitap {
  id: number;
  ad: string;
  yazar: string;
  puan: number;
  pdfYolu?: string; // Bazı kitaplarda PDF olmayabilir
  kitapKategoriler?: Kategori[];
}

type KitapDetayNavigationProp = NativeStackNavigationProp<RootStackParamList, 'KitapDetay'>;
type KitapDetayRouteProp = RouteProp<RootStackParamList, 'KitapDetay'>;

interface KitapDetayProps {
  navigation: KitapDetayNavigationProp;
  route: KitapDetayRouteProp;
}

const KitapDetay: React.FC<KitapDetayProps> = ({ route, navigation }) => {
  const { kitapId } = route.params;

  // "kitap" artık Kitap veya null olabilir
  const [kitap, setKitap] = useState<Kitap | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Kitap>(`${BASE_URL}/api/Kitap/${kitapId}`)
      .then(response => {
        setKitap(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Kitap detayları alınırken hata oluştu:', error);
        Alert.alert('Hata', 'Kitap detayları alınamadı.');
        setLoading(false);
      });
  }, [kitapId]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3b5998"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }

  if (!kitap) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Kitap detayları bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{kitap.ad}</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Yazar: {kitap.yazar}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Puan: {kitap.puan}</Text>

      {kitap.kitapKategoriler && (
        <View>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>Kategoriler:</Text>
          {kitap.kitapKategoriler.map((kategori) => (
            <Text key={kategori.kategori.id} style={{ fontSize: 14, color: '#555' }}>
              • {kategori.kategori.ad}
            </Text>
          ))}
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title="PDF İndir/Okumaya Başla"
          onPress={() => {
            if (kitap.pdfYolu) {
              // PDF dosyası "/pdfs/Dune.pdf" gibi saklanıyorsa, tam URL:
              const pdfUrl = `${BASE_URL}${kitap.pdfYolu}`;
              navigation.navigate('KitapPdf', { pdfUrl });
            } else {
              Alert.alert('Bilgi', 'PDF dosyası bulunamadı.');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default KitapDetay;
