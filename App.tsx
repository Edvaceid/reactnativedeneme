import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const backgroundImage = require('./assets/background2.jpg'); // Yerel arka plan resmi dosyasını ekliyoruz

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginCardX = useSharedValue(0);
  const registerCardX = useSharedValue(width);

  const loginCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: loginCardX.value }],
    };
  });

  const registerCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: registerCardX.value }],
    };
  });

  const toggleToRegister = () => {
    setIsLogin(false);
    loginCardX.value = withTiming(-width * 0.3, { duration: 300 }, () => {
      loginCardX.value = withTiming(-width, { duration: 300 });
      registerCardX.value = withSpring(0, { stiffness: 200 });
    });
  };

  const toggleToLogin = () => {
    setIsLogin(true);
    registerCardX.value = withTiming(width * 0.3, { duration: 300 }, () => {
      registerCardX.value = withTiming(width, { duration: 300 });
      loginCardX.value = withSpring(0, { stiffness: 200 });
    });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <Animated.View style={[styles.card, loginCardStyle]}>
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.subtitle}>Kahve tariflerini keşfetmek için hemen giriş yapın!</Text>
        <TextInput style={styles.input} placeholder="E-posta" keyboardType="email-address" placeholderTextColor="#bca383" />
        <TextInput style={styles.input} placeholder="Şifre" secureTextEntry placeholderTextColor="#bca383" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleToRegister}>
          <Text style={styles.linkText}>Hesabınız yok mu? Kayıt olun</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.card, registerCardStyle]}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.subtitle}>En lezzetli kahve tarifleri için üye olun!</Text>
        <TextInput style={styles.input} placeholder="E-posta" keyboardType="email-address" placeholderTextColor="#bca383" />
        <TextInput style={styles.input} placeholder="Şifre" secureTextEntry placeholderTextColor="#bca383" />
        <TextInput style={styles.input} placeholder="Şifreyi onayla" secureTextEntry placeholderTextColor="#bca383" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleToLogin}>
          <Text style={styles.linkText}>Hesabınız var mı? Giriş yapın</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: width * 0.8,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(60, 42, 33, 0.9)', // Kahve tonlarında yarı saydam arka plan
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#f7d8a0',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#7a5547',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff8f0',
    color: '#3c2a21',
  },
  button: {
    backgroundColor: '#8b5e34',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#f7d8a0',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default App;
