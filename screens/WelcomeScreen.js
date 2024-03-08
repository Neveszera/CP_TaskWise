import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.ease,
        useNativeDriver: true,
      }
    ).start(() => {
      navigation.replace('Home');
    });
  }, []);

  const fadeAnim = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim, textAlign: 'center'}]}>TaskWise</Animated.Text>
      <Image source={require('../assets/mobile-phone.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a1b9a',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
    padding: 20,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain', 
  },
});

export default WelcomeScreen;
