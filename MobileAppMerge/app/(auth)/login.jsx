 import { useState } from 'react';
 import {
   View, Text, TextInput, TouchableOpacity,
   StyleSheet, Alert, ScrollView,
   KeyboardAvoidingView, Platform, ActivityIndicator,
 } from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import { useRouter } from 'expo-router';
 import { useAuth } from '../../context/AuthContext';
 
 export default function LoginScreen() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPw, setShowPw] = useState(false);
   const [loading, setLoading] = useState(false);
   const { login } = useAuth();
   const router = useRouter();
 
   const handleLogin = async () => {
     if (!email || !password) {
       Alert.alert('Error', 'Please enter your email and password');
       return;
     }
     setLoading(true);
     try {
       const result = await login(email, password);
       if (result.success) {
         if (result.role === 'admin' || result.role === 'super_admin') {
           router.replace('/(admin)/home');
         } else if (result.role === 'instructor') {
           router.replace('/(doctor)/home');
         } else {
           router.replace('/(student)/home');
         }
       } else {
         // Handle specific error codes from backend
         if (result.code === 'EMAIL_NOT_VERIFIED') {
           Alert.alert(
             'Email Not Verified',
             'Please check your email and verify your account first.',
             [{ text: 'OK' }]
           );
         } else if (result.code === 'INVALID_CREDENTIALS') {
           Alert.alert('Error', 'Invalid email or password');
         } else {
           Alert.alert('Error', result.message || 'Login failed');
         }
       }
     } catch (e) {
       Alert.alert('Error', 'Connection failed. Check your internet.');
     } finally {
       setLoading(false);
     }
   };
 
   return (
     <SafeAreaView style={styles.safe}>
       <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
       >
         <ScrollView
           contentContainerStyle={styles.container}
           keyboardShouldPersistTaps="handled"
         >
           {/* Logo */}
           <View style={styles.logoWrap}>
             <Text style={styles.logoIcon}>🎓</Text>
           </View>
           <Text style={styles.appName}>UAPMP</Text>
           <Text style={styles.appSub}>University Academic Portal</Text>
 
           {/* Card */}
           <View style={styles.card}>
             <Text style={styles.title}>Welcome Back 👋</Text>
             <Text style={styles.sub}>Sign in to access your dashboard</Text>
 
             {/* Email */}
             <Text style={styles.label}>University Email</Text>
             <View style={styles.inputWrap}>
               <Text style={styles.inputIcon}>✉️</Text>
               <TextInput
                 style={styles.input}
                 placeholder="student@university.edu"
                 placeholderTextColor="#9ca3af"
                 value={email}
                 onChangeText={setEmail}
                 keyboardType="email-address"
                 autoCapitalize="none"
                 autoCorrect={false}
               />
             </View>
 
             {/* Password */}
             <Text style={styles.label}>Password</Text>
             <View style={styles.inputWrap}>
               <Text style={styles.inputIcon}>🔒</Text>
               <TextInput
                 style={{ flex: 1, paddingVertical: 13, fontSize: 14, color: '#0f172a' }}
                 placeholder="••••••••"
                 placeholderTextColor="#9ca3af"
                 value={password}
                 onChangeText={setPassword}
                 secureTextEntry={!showPw}
               />
               <TouchableOpacity onPress={() => setShowPw(!showPw)} style={{ padding: 4 }}>
                 <Text style={{ fontSize: 16 }}>{showPw ? '🙈' : '👁'}</Text>
               </TouchableOpacity>
             </View>
 
             {/* Forgot */}
             <TouchableOpacity style={styles.forgotWrap}>
               <Text style={styles.forgotText}>Forgot Password?</Text>
             </TouchableOpacity>
 
             {/* Login Btn */}
             <TouchableOpacity
               style={[styles.btnPrimary, loading && { opacity: 0.7 }]}
               onPress={handleLogin}
               disabled={loading}
             >
               {loading
                 ? <ActivityIndicator color="white" />
                 : <Text style={styles.btnText}>Log In →</Text>
               }
             </TouchableOpacity>
 
             {/* Divider */}
             <View style={styles.divider}>
               <View style={styles.dividerLine} />
               <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
               <View style={styles.dividerLine} />
             </View>
 
             {/* Google */}
             <TouchableOpacity style={styles.btnGoogle}>
               <Text style={styles.googleG}>G</Text>
               <Text style={styles.googleText}>Sign in with Google</Text>
             </TouchableOpacity>
 
             {/* Switch */}
             <View style={styles.switchRow}>
               <Text style={styles.switchText}>New student? </Text>
               <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                 <Text style={styles.switchLink}>Create an account</Text>
               </TouchableOpacity>
             </View>
 
             <Text style={styles.footer}>© 2024 UAPMP. All rights reserved.</Text>
           </View>
         </ScrollView>
       </KeyboardAvoidingView>
     </SafeAreaView>
   );
 }
 
 const styles = StyleSheet.create({
   safe: { flex: 1, backgroundColor: '#f0f2f5' },
   container: {
     flexGrow: 1, alignItems: 'center',
     justifyContent: 'center', padding: 24,
   },
   logoWrap: {
     width: 72, height: 72, borderRadius: 20,
     backgroundColor: '#2563eb', alignItems: 'center',
     justifyContent: 'center', marginBottom: 12, elevation: 8,
   },
   logoIcon: { fontSize: 36 },
   appName: { fontSize: 28, fontWeight: '900', color: '#1e1b4b', marginBottom: 4 },
   appSub: { fontSize: 13, color: '#64748b', marginBottom: 28 },
   card: {
     width: '100%', backgroundColor: 'white',
     borderRadius: 24, padding: 24, elevation: 4,
   },
   title: { fontSize: 22, fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: 4 },
   sub: { fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 24, lineHeight: 18 },
   label: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 6 },
   inputWrap: {
     flexDirection: 'row', alignItems: 'center',
     borderWidth: 1.5, borderColor: '#e5e7eb',
     borderRadius: 12, paddingHorizontal: 12,
     backgroundColor: '#f9fafb', marginBottom: 14,
   },
   inputIcon: { fontSize: 15, marginRight: 8 },
   input: { flex: 1, paddingVertical: 13, fontSize: 14, color: '#0f172a' },
   forgotWrap: { alignItems: 'flex-end', marginBottom: 18, marginTop: -6 },
   forgotText: { fontSize: 12, color: '#2563eb', fontWeight: '600' },
   btnPrimary: {
     backgroundColor: '#2563eb', borderRadius: 12,
     paddingVertical: 15, alignItems: 'center', elevation: 3,
   },
   btnText: { color: 'white', fontSize: 16, fontWeight: '700' },
   divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
   dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
   dividerText: { fontSize: 10, color: '#9ca3af', marginHorizontal: 10, fontWeight: '600' },
   btnGoogle: {
     flexDirection: 'row', alignItems: 'center',
     justifyContent: 'center', borderWidth: 1.5,
     borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 13, gap: 8,
   },
   googleG: {
     width: 22, height: 22, borderRadius: 11,
     backgroundColor: '#4285f4', color: 'white',
     fontSize: 12, fontWeight: '800', textAlign: 'center', lineHeight: 22,
   },
   googleText: { fontSize: 14, fontWeight: '600', color: '#374151' },
   switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
   switchText: { fontSize: 13, color: '#64748b' },
   switchLink: { fontSize: 13, color: '#2563eb', fontWeight: '700' },
   footer: { textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 14 },
 });