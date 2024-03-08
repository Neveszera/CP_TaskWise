import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteCard = ({ text }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 2,
  },
  text: {
    fontSize: 16,
  },
});

export default NoteCard;