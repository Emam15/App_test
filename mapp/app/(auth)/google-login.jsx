import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ هذا هو المكان الصحيح لتعريف الـ Client ID
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '303955489135-58iqib3ca385os26p7r7ghgufo9q3si2.apps.googleusercontent.com',
    androidClientId: '303955489135-58iqib3ca385os26p7r7ghgufo9q3si2.apps.googleusercontent.com', // ✅ كما هو
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    } else if (response?.type === 'error') {
      Alert.alert('خطأ', 'فشل الاتصال بـ Google');
      console.log('Google Auth Error:', response.error);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/google-login', { token: idToken });
      const { token, user, needsProfileCompletion } = res.data;

      if (token) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        if (needsProfileCompletion) {
          router.replace('/(auth)/complete-profile');
        } else {
          if (user.role === 'student') router.replace('/(student)/home');
          else if (user.role === 'instructor') router.replace('/(doctor)/home');
          else if (user.role === 'admin') router.replace('/(admin)/home');
          else router.replace('/(auth)/login');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('خطأ', 'فشل تسجيل الدخول بـ Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={() => promptAsync()}
        disabled={!request || loading}
      >
        <Text style={styles.googleBtnText}>
          {loading ? 'جاري...' : '🚀  تسجيل الدخول بـ Google'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  googleBtn: {
    backgroundColor: '#DB4437',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    elevation: 2,
  },
  googleBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});