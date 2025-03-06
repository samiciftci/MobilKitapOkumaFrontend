import React from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // App.tsx'yi bir üst dizinden import

type KitapPdfRouteProp = RouteProp<RootStackParamList, 'KitapPdf'>;

interface KitapPdfProps {
  route: KitapPdfRouteProp;
}

const KitapPdf: React.FC<KitapPdfProps> = ({ route }) => {
  const { pdfUrl } = route.params;
  const source = { uri: pdfUrl, cache: true };

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View key="1" style={styles.page}>
          <WebView
            source={source}
            style={styles.webview}
            onError={(error) => {
              console.log('PDF yüklenirken hata oluştu:', error);
              Alert.alert('PDF Hatası', JSON.stringify(error));
            }}
          />
        </View>
      </PagerView>
    </View>
  );
};

export default KitapPdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  webview: {
    width: Dimensions.get('window').width,
    flex: 1,
  },
});
