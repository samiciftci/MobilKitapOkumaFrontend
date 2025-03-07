import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

interface Book {
  id: number;
  ad: string;
  yazar: string;
  puan: number;
  kategoriler?: string[];
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = () => {
    if (!keyword.trim()) {
      Alert.alert('Uyarı', 'Arama terimi boş olamaz.');
      return;
    }
    setLoading(true);

    axios
      .get(`http://192.168.1.27:5000/api/Kitap/Search?keyword=${encodeURIComponent(keyword)}`)
      .then((response) => {
        // Backend'in dönüştürülmüş verisini Book tipine çeviriyoruz:
        const transformed = response.data.map((item: any) => ({
          id: item.kitapId,
          ad: item.kitapAdi,
          yazar: item.yazar,
          puan: item.puan,
          kategoriler: item.kategoriler,
        }));
        setResults(transformed);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Arama hatası:', error);

        // Eğer 404 dönerse, özel bir mesaj gösterebilirsiniz:
        if (error.response && error.response.status === 404) {
          Alert.alert('Bilgi', 'Aradığınız kriterlere uygun kitap bulunamadı.');
        } else {
          Alert.alert('Hata', 'Arama yapılırken bir sorun oluştu.');
        }
      });
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('KitapDetay', { kitapId: item.id })}
    >
      <Text style={styles.itemTitle}>{item.ad}</Text>
      <Text style={styles.itemSubtitle}>{item.yazar}</Text>
      <Text style={styles.itemRating}>⭐ {item.puan}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kitap Arama</Text>
      <TextInput
        style={styles.input}
        placeholder="Kitap adı, yazar veya kategori..."
        value={keyword}
        onChangeText={setKeyword}
      />
      <Button title="Ara" onPress={handleSearch} />
      {loading && <ActivityIndicator size="large" color="#3b5998" style={styles.loading} />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookItem}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>Arama sonucu bulunamadı.</Text>
          )
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  loading: { marginVertical: 20 },
  listContainer: { paddingVertical: 10 },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemSubtitle: { fontSize: 14, color: '#666' },
  itemRating: { fontSize: 14, color: '#999' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#888' },
});

export default SearchScreen;
