 import { useState } from 'react';
 import {
   View, Text, TextInput, TouchableOpacity,
   StyleSheet, Alert, ScrollView,
   KeyboardAvoidingView, Platform, ActivityIndicator,
 } from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import { useRouter } from 'expo-router';
 import { register } from '../../api/auth';
 
 export default function SignupScreen() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirm, setConfirm] = useState('');
   const [showPw, setShowPw] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
   const [agreed, setAgreed] = useState(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();
 
   const handleSignup = async () => {
     if (!name || !email || !password || !confirm) {
       Alert.alert('Error', 'Please fill in all fields');
       return;
     }
     if (password !== confirm) {
       Alert.alert('Error', 'Passwords do not match');
       return;
     }
     if (password.length < 8) {
       Alert.alert('Error', 'Password must be at least 8 characters');
       return;
     }
     if (!agreed) {
       Alert.alert('Error', 'Please agree to the Terms & Conditions');
       return;
     }
 
     setLoading(true);
     try {
       await register(name, email, password, confirm);
       Alert.alert(
         'Account Created! 🎉',
         'Please check your email to verify your account before logging in.',
         [{ text: 'Go to Login', onPress: () => router.replace('/(auth)/login') }]
       );
     } catch (e) {
       if (e.code === 'DUPLICATE_ENTRY') {
         Alert.alert('Error', 'This email is already registered');
       } else if (e.code === 'WEAK_PASSWORD') {
         Alert.alert('Error', 'Password is too weak. Use at least 8 characters with numbers.');
       } else if (e.code === 'INVALID_EMAIL_FORMAT') {
         Alert.alert('Error', 'Please use your university email');
       } else if (e.code === 'PASSWORD_MISMATCH') {
         Alert.alert('Error', 'Passwords do not match');
       } else {
         Alert.alert('Error', e.message || 'Registration failed. Try again.');
       }
     } finally {
       setLoading(false);
     }
   };
 
   // Password strength indicator
   const getPasswordStrength = () => {
     if (password.length === 0) return null;
     if (password.length < 6) return { label: 'Weak', color: '#dc2626', width: '30%' };
     if (password.length < 10) return { label: 'Medium', color: '#d97706', width: '60%' };
     return { label: 'Strong', color: '#16a34a', width: '100%' };
   };
   const strength = getPasswordStrength();
 
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
           <Text style={styles.appSub}>Create your academic account</Text>
 
           {/* Card */}
           <View style={styles.card}>
             <Text style={styles.title}>Join UAPMP 🚀</Text>
             <Text style={styles.sub}>Fill in your details to get started</Text>
 
             {/* Role Info */}
             <View style={styles.infoBox}>
               <Text style={styles.infoText}>
                 💡 Your role is automatically detected from your email:
               </Text>
               <Text style={styles.infoItem}>🎓 Student: <Text style={styles.infoCode}>1234567@std.sci.cu.edu.eg</Text></Text>
               <Text style={styles.infoItem}>👨‍🏫 Instructor: <Text style={styles.infoCode}>name@sci.cu.edu.eg</Text></Text>
             </View>
 
             {/* Full Name */}
             <Text style={styles.label}>Full Name</Text>
             <View style={styles.inputWrap}>
               <Text style={styles.inputIcon}>👤</Text>
               <TextInput
                 style={styles.input}
                 placeholder="John Doe"
                 placeholderTextColor="#9ca3af"
                 value={name}
                 onChangeText={setName}
                 autoCapitalize="words"
               />
             </View>
 
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
                 placeholder="Min 8 characters"
                 placeholderTextColor="#9ca3af"
                 value={password}
                 onChangeText={setPassword}
                 secureTextEntry={!showPw}
               />
               <TouchableOpacity onPress={() => setShowPw(!showPw)} style={{ padding: 4 }}>
                 <Text style={{ fontSize: 16 }}>{showPw ? '🙈' : '👁'}</Text>
               </TouchableOpacity>
             </View>
 
             {/* Password Strength */}
             {strength && (
               <View style={styles.strengthWrap}>
                 <View style={styles.strengthBar}>
                   <View style={[styles.strengthFill, { width: strength.width, backgroundColor: strength.color }]} />
                 </View>
                 <Text style={[styles.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
               </View>
             )}
 
             {/* Confirm Password */}
             <Text style={styles.label}>Confirm Password</Text>
             <View style={[
               styles.inputWrap,
               confirm.length > 0 && password !== confirm && { borderColor: '#dc2626' },
               confirm.length > 0 && password === confirm && { borderColor: '#16a34a' },
             ]}>
               <Text style={styles.inputIcon}>🔄</Text>
               <TextInput
                 style={{ flex: 1, paddingVertical: 13, fontSize: 14, color: '#0f172a' }}
                 placeholder="Re-enter password"
                 placeholderTextColor="#9ca3af"
                 value={confirm}
                 onChangeText={setConfirm}
                 secureTextEntry={!showConfirm}
               />
               <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={{ padding: 4 }}>
                 <Text style={{ fontSize: 16 }}>{showConfirm ? '🙈' : '👁'}</Text>
               </TouchableOpacity>
             </View>
             {confirm.length > 0 && password !== confirm && (
               <Text style={styles.errorText}>❌ Passwords don't match</Text>
             )}
             {confirm.length > 0 && password === confirm && (
               <Text style={styles.successText}>✅ Passwords match</Text>
             )}
 
             {/* Terms */}
             <TouchableOpacity style={styles.termsRow} onPress={() => setAgreed(!agreed)}>
               <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
                 {agreed && <Text style={styles.checkmark}>✓</Text>}
               </View>
               <Text style={styles.termsText}>
                 I agree to the{' '}
                 <Text style={styles.termsLink}>Terms & Conditions</Text>
                 {' '}and{' '}
                 <Text style={styles.termsLink}>Privacy Policy</Text>
               </Text>
             </TouchableOpacity>
 
             {/* Signup Btn */}
             <TouchableOpacity
               style={[styles.btnPrimary, loading && { opacity: 0.7 }]}
               onPress={handleSignup}
               disabled={loading}
             >
               {loading
                 ? <ActivityIndicator color="white" />
                 : <Text style={styles.btnText}>Create Account 🎉</Text>
               }
             </TouchableOpacity>
 
             {/* Switch */}
             <View style={styles.switchRow}>
               <Text style={styles.switchText}>Already have an account? </Text>
               <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                 <Text style={styles.switchLink}>Log in</Text>
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
   container: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
   logoWrap: {
     width: 72, height: 72, borderRadius: 20,
     backgroundColor: '#2563eb', alignItems: 'center',
     justifyContent: 'center', marginBottom: 12, elevation: 8,
   },
   logoIcon: { fontSize: 36 },
   appName: { fontSize: 28, fontWeight: '900', color: '#1e1b4b', marginBottom: 4 },
   appSub: { fontSize: 13, color: '#64748b', marginBottom: 28 },
   card: { width: '100%', backgroundColor: 'white', borderRadius: 24, padding: 24, elevation: 4 },
   title: { fontSize: 22, fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: 4 },
   sub: { fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 20 },
   infoBox: {
     backgroundColor: '#eff6ff', borderRadius: 12, padding: 12,
     marginBottom: 20, borderWidth: 1, borderColor: '#bfdbfe',
   },
   infoText: { fontSize: 12, color: '#1d4ed8', fontWeight: '600', marginBottom: 6 },
   infoItem: { fontSize: 12, color: '#374151', marginBottom: 2 },
   infoCode: { color: '#2563eb', fontWeight: '700' },
   label: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 6 },
   inputWrap: {
     flexDirection: 'row', alignItems: 'center',
     borderWidth: 1.5, borderColor: '#e5e7eb',
     borderRadius: 12, paddingHorizontal: 12,
     backgroundColor: '#f9fafb', marginBottom: 14,
   },
   inputIcon: { fontSize: 15, marginRight: 8 },
   input: { flex: 1, paddingVertical: 13, fontSize: 14, color: '#0f172a' },
   strengthWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14, marginTop: -8 },
   strengthBar: { flex: 1, height: 4, backgroundColor: '#e5e7eb', borderRadius: 2, overflow: 'hidden' },
   strengthFill: { height: 4, borderRadius: 2 },
   strengthLabel: { fontSize: 11, fontWeight: '700', width: 50 },
   errorText: { fontSize: 12, color: '#dc2626', marginTop: -10, marginBottom: 10 },
   successText: { fontSize: 12, color: '#16a34a', marginTop: -10, marginBottom: 10 },
   termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
   checkbox: {
     width: 20, height: 20, borderWidth: 1.5, borderColor: '#d1d5db',
     borderRadius: 4, alignItems: 'center', justifyContent: 'center', flexShrink: 0,
   },
   checkboxActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
   checkmark: { color: 'white', fontSize: 12, fontWeight: '700' },
   termsText: { fontSize: 12, color: '#64748b', lineHeight: 18, flex: 1 },
   termsLink: { color: '#2563eb', fontWeight: '600' },
   btnPrimary: {
     backgroundColor: '#2563eb', borderRadius: 12,
     paddingVertical: 15, alignItems: 'center', elevation: 3,
   },
   btnText: { color: 'white', fontSize: 16, fontWeight: '700' },
   switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
   switchText: { fontSize: 13, color: '#64748b' },
   switchLink: { fontSize: 13, color: '#2563eb', fontWeight: '700' },
   footer: { textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 14 },
 });