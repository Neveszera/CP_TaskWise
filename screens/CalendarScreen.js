import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const NotesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FUNCIONALIDADE DISPONÍVEL EM BREVE!</Text>
      <Image source={require('../assets/update.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#808080',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', 
  },
});

export default NotesScreen;
