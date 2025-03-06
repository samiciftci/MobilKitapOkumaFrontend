import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type KitapDetayNavigationProp = NativeStackNavigationProp<RootStackParamList, 'KitapDetay'>;
type KitapDetayRouteProp = RouteProp<RootStackParamList, 'KitapDetay'>;

interface KitapDetayProps {
  navigation: KitapDetayNavigationProp;
  route: KitapDetayRouteProp;
}

const KitapDetay: React.FC<KitapDetayProps> = ({ route, navigation }) => {
  const { kitapId } = route.params;
  const [kitap, setKitap] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`http://192.168.1.27:5000/api/Kitap/${kitapId}`)
      .then(response => {
        setKitap(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Kitap detayları alınırken hata oluştu:", error);
        Alert.alert("Hata", "Kitap detayları alınamadı.");
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
          {kitap.kitapKategoriler.map((kategori: any) => (
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
              // Şimdilik PDF işlevselliğini eklemeden önce basit bir uyarı gösterelim:
              Alert.alert("Bilgi", "PDF işlevselliği eklenmeden önceki stabil versiyon.");
              // Daha sonra PDF ekranına yönlendirme yapılabilir.
              // const pdfUrl = `http://192.168.1.27:5000${kitap.pdfYolu}`;
              // navigation.navigate('PdfViewer', { pdfUrl });
            } else {
              Alert.alert("Bilgi", "PDF dosyası bulunamadı.");
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default KitapDetay;
