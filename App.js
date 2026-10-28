import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const DAFTAR_MENU = [
  { id: '1', nama: 'Kopi Susu Catnip', harga: 20000 },
  { id: '2', nama: 'Matcha Paw Latte', harga: 25000 },
  { id: '3', nama: 'Croissant Ikan Tuna', harga: 18000 },
];

const formatRupiah = (angka) =>
  'Rp ' + String(angka).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Child Component 1: menerima props totalCount
function OrderSummary({ totalCount }) {
  return (
    <View style={styles.summaryBox}>
      <Text style={styles.summaryText}>Total Item Dipesan: {totalCount}</Text>
      {totalCount >= 5 && (
        <Text style={styles.promoText}>
          🎉 Selamat! Anda Mendapatkan Diskon 10%
        </Text>
      )}
    </View>
  );
}

// Child Component 2: props + state mandiri (qty)
function MenuItem({ nama, harga, onTambahPesanan }) {
  const [qty, setQty] = useState(0);

  const handleTambah = () => {
    setQty((prevQty) => prevQty + 1); // update state lokal
    onTambahPesanan();                // beri tahu parent
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.menuName}>{nama}</Text>
        <Text style={styles.menuPrice}>{formatRupiah(harga)}</Text>
        <Text style={styles.menuQty}>Dipesan: {qty}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleTambah}>
        <Text style={styles.buttonText}>Tambah Pesanan</Text>
      </TouchableOpacity>
    </View>
  );
}

// Parent Component: state global totalPesanan
export default function App() {
  const [totalPesanan, setTotalPesanan] = useState(0);

  const handleTambahPesanan = () => {
    setTotalPesanan((prevTotal) => prevTotal + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🐱 Kafe Kucing</Text>
      <OrderSummary totalCount={totalPesanan} />
      <FlatList
        data={DAFTAR_MENU}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MenuItem
            nama={item.nama}
            harga={item.harga}
            onTambahPesanan={handleTambahPesanan}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0', paddingTop: 40 },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5D4037',
    marginBottom: 12,
  },
  summaryBox: {
    backgroundColor: '#FFE0B2',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  summaryText: { fontSize: 16, fontWeight: '600', color: '#4E342E' },
  promoText: { marginTop: 6, fontSize: 14, fontWeight: 'bold', color: '#2E7D32' },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardInfo: { flex: 1, paddingRight: 8 },
  menuName: { fontSize: 16, fontWeight: 'bold', color: '#3E2723' },
  menuPrice: { fontSize: 14, color: '#6D4C41', marginTop: 2 },
  menuQty: { fontSize: 13, color: '#8D6E63', marginTop: 4 },
  button: {
    backgroundColor: '#8D6E63',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});