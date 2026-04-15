import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) {
      // لو في يوزر روح للصفحة المناسبة
      if (user.role === 'admin' || user.role === 'super_admin') {
        router.replace('/(admin)/home');
      } else if (user.role === 'instructor') {
        router.replace('/(doctor)/home');
      } else {
        router.replace('/(student)/home');
      }
    } else {
      router.replace('/(auth)/login');
    }
  }, [user, loading]);

  // Loading screen
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}