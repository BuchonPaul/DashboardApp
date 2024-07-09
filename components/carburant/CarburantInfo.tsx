import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarburantInfo = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{'name' || "Station sans nom"}</Text>
      <Text>{'brand'}</Text>
      <Text>{'address'}</Text>
      <Text>Distance: {'distance'}</Text>
      <View style={styles.fuelList}>
        <Text>Gazole</Text>
        <Text>E85</Text>
        <Text>SP95-E10</Text>
        <Text>SP98</Text>
        <Text>GPLc</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fuelList: {
    marginTop: 10,
  },
});

export default CarburantInfo;
