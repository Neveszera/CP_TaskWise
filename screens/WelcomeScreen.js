import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Image, Text } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 4000,
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
      <View style={styles.bottomTextContainer}>
      <Animated.Text style={[styles.byText, { opacity: fadeAnim}]}>by</Animated.Text>
      <Animated.Text style={[styles.bottomText, { opacity: fadeAnim}]}>Gabriel Neves Gomes - RM552244</Animated.Text>
      <Animated.Text style={[styles.bottomText, { opacity: fadeAnim}]}>Gabriel Sampaio Gianini - RM552342</Animated.Text>
      </View>
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
  bottomTextContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  byText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  bottomText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;