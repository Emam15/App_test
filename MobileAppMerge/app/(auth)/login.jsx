//  import { useState } from 'react';
// import {
//   View, Text, TextInput, TouchableOpacity,
//   StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useAuth } from '../../context/AuthContext';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPw, setShowPw] = useState(false);
//   const router = useRouter();

// //-------------------------------------------------------------

// //   const handleLogin = () => {
// //   if (!email || !password) {
// //     Alert.alert('Error', 'Please enter your email and password');
// //     return;
// //   }
// //   // مؤقتاً بدون backend بيروح على صفحة الاختيار
// //   if (email.includes('admin')) {
// //     router.replace('/(admin)/home');
// //   } else if (email.includes('doctor')) {
// //     router.replace('/(doctor)/home');
// //   } else {
// //     router.replace('/(student)/home');
// //   }
// // };
// //---------------------------------------------
// const { login } = useAuth();

// const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert('Error', 'Please enter your email and password');
//     return;
//   }
//   const result = await login(email, password);
//   if (result.success) {
//     if (result.role === 'admin' || result.role === 'super_admin') {
//       router.replace('/(admin)/home');
//     } else if (result.role === 'instructor') {
//       router.replace('/(doctor)/home');
//     } else {
//       router.replace('/(student)/home');
//     }
//   } else {
//     Alert.alert('Error', result.message);
//   }
// };

// //---------------------------------------------

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//         <View style={styles.logoWrap}>
//           <Text style={styles.logoIcon}>🎓</Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.title}>Sign in to UAPMP</Text>
//           <Text style={styles.sub}>Enter your academic credentials to access the portal</Text>

//           <Text style={styles.label}>University Email</Text>
//           <View style={styles.inputWrap}>
//             <Text style={styles.inputIcon}>✉️</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="student@university.edu"
//               placeholderTextColor="#9ca3af"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           <Text style={styles.label}>Password</Text>
//           <View style={styles.inputWrap}>
//             <Text style={styles.inputIcon}>🔒</Text>
//             <TextInput
//               style={{ flex: 1, paddingVertical: 13, fontSize: 14, color: '#0f172a' }}
//               placeholder="••••••••"
//               placeholderTextColor="#9ca3af"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPw}
//             />
//             <TouchableOpacity onPress={() => setShowPw(!showPw)}>
//               <Text style={styles.eyeIcon}>{showPw ? '🙈' : '👁'}</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.forgotWrap}>
//             <Text style={styles.forgotText}>Forgot Password?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
//             <Text style={styles.btnText}>Log In →</Text>
//           </TouchableOpacity>

//           <View style={styles.divider}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           <TouchableOpacity style={styles.btnGoogle}>
//             <Text style={styles.googleG}>G</Text>
//             <Text style={styles.googleText}>Sign in with Google</Text>
//           </TouchableOpacity>

//           <View style={styles.switchRow}>
//             <Text style={styles.switchText}>New student? </Text>
//             <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
//               <Text style={styles.switchLink}>Activate your account</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.footer}>© 2024 UAPMP.</Text>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, backgroundColor: '#f0f2f5', alignItems: 'center', justifyContent: 'center', padding: 24 },
//   logoWrap: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center', marginBottom: 20, elevation: 8 },
//   logoIcon: { fontSize: 32 },
//   card: { width: '100%', backgroundColor: 'white', borderRadius: 24, padding: 24, elevation: 4 },
//   title: { fontSize: 20, fontWeight: '800', color: '#0f172a', textAlign: 'center', marginBottom: 4 },
//   sub: { fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 22, lineHeight: 18 },
//   label: { fontSize: 12, fontWeight: '600', color: '#374151', marginBottom: 6 },
//   inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9fafb', marginBottom: 14 },
//   inputIcon: { fontSize: 15, marginRight: 8 },
//   input: { flex: 1, paddingVertical: 13, fontSize: 14, color: '#0f172a' },
//   eyeIcon: { fontSize: 16, color: '#9ca3af', padding: 4 },
//   forgotWrap: { alignItems: 'flex-end', marginBottom: 18, marginTop: -6 },
//   forgotText: { fontSize: 12, color: '#2563eb', fontWeight: '600' },
//   btnPrimary: { backgroundColor: '#2563eb', borderRadius: 12, paddingVertical: 14, alignItems: 'center', elevation: 4 },
//   btnText: { color: 'white', fontSize: 15, fontWeight: '700' },
//   divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 18 },
//   dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
//   dividerText: { fontSize: 10, color: '#9ca3af', marginHorizontal: 10, fontWeight: '600' },
//   btnGoogle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 13, gap: 8 },
//   googleG: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#4285f4', color: 'white', fontSize: 11, fontWeight: '800', textAlign: 'center', lineHeight: 20 },
//   googleText: { fontSize: 14, fontWeight: '600', color: '#374151' },
//   switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
//   switchText: { fontSize: 13, color: '#64748b' },
//   switchLink: { fontSize: 13, color: '#2563eb', fontWeight: '700' },
//   footer: { textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 12 },
// });




// //-----------------------------------------------------------------


// كووووووووووووود  شادى 
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";

// export default function HomeScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // ✅ Login Function
//   const handleLogin = () => {
//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     // هنا تقدر تحط Firebase أو API بعدين
//     navigation.navigate("Main");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Logo */}
//       <View style={styles.logoContainer}>
//         <View style={styles.iconBox}>
//           <Text style={styles.icon}>🏛️</Text>
//         </View>
//         <Text style={styles.logoText}>UAPMP</Text>
//       </View>

//       {/* Card */}
//       <View style={styles.card}>
//         <Text style={styles.title}>Sign in to UAPMP</Text>
//         <Text style={styles.subtitle}>
//           Enter your academic credentials to access the portal
//         </Text>

//         <Text style={styles.label}>UNIVERSITY EMAIL</Text>
//         <TextInput
//           placeholder="student.name@university.edu"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//         />

//         <Text style={styles.label}>PASSWORD</Text>
//         <TextInput
//           placeholder="••••••••"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//           style={styles.input}
//         />

//         {/* ✅ زرار Login بعد التعديل */}
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Log In</Text>
//         </TouchableOpacity>

//         <Text style={styles.link}>Forgot Password?</Text>
//       </View>

//       {/* Bottom */}
//       <View style={styles.bottom}>
//         <Text style={styles.smallText}>Don't have an account?</Text>

//         <TouchableOpacity
//           style={styles.signupBtn}
//           onPress={() => navigation.navigate("SignUp")}
//         >
//           <Text style={styles.signupText}>SIGN UP?</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9ff",
//     padding: 20,
//     justifyContent: "center",
//   },
//   logoContainer: { alignItems: "center", marginBottom: 30 },
//   iconBox: {
//     width: 64,
//     height: 64,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//     elevation: 3,
//   },
//   icon: { fontSize: 28 },
//   logoText: { fontSize: 22, fontWeight: "800" },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     elevation: 3,
//   },
//   title: { fontSize: 20, fontWeight: "700", marginBottom: 5 },
//   subtitle: { fontSize: 13, color: "#666", marginBottom: 20 },
//   label: {
//     fontSize: 10,
//     fontWeight: "bold",
//     marginBottom: 5,
//     marginTop: 10,
//     color: "#555",
//   },
//   input: {
//     backgroundColor: "#f2f3fd",
//     padding: 14,
//     borderRadius: 10,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#1a73e8",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
//   link: {
//     textAlign: "center",
//     marginTop: 10,
//     color: "#1a73e8",
//     fontWeight: "600",
//   },
//   bottom: { marginTop: 25, alignItems: "center" },
//   smallText: { fontSize: 12, marginBottom: 10, color: "#777" },
//   signupBtn: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 14,
//     borderRadius: 12,
//     width: "100%",
//     alignItems: "center",
//   },
//   signupText: { color: "#1a73e8", fontWeight: "bold" },
// });




// الكووووووووووووووووووووووووووووووووووووود القديم 
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'ادخل الايميل والباسورد');
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      if (result.role === 'admin') router.replace('/(admin)/home');
      else if (result.role === 'doctor') router.replace('/(doctor)/home');
      else router.replace('/(student)/home');
    } else {
      Alert.alert('خطأ', result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrap}>
          <Text style={styles.logoIcon}>🎓</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Sign in to UAPMP</Text>
          <Text style={styles.sub}>
            Enter your academic credentials to access the portal
          </Text>

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
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPw}
            />
            <TouchableOpacity onPress={() => setShowPw(!showPw)}>
              <Text style={styles.eyeIcon}>{showPw ? '🙈' : '👁'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotWrap}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.btnGoogle}>
            <Text style={styles.googleG}>G</Text>
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>New student? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.switchLink}>Activate your account</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>© 2024 UAPMP.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 32,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    marginBottom: 14,
  },
  inputIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    color: '#0f172a',
  },
  eyeIcon: {
    fontSize: 16,
    color: '#9ca3af',
    padding: 4,
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginBottom: 18,
    marginTop: -6,
  },
  forgotText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    fontSize: 10,
    color: '#9ca3af',
    marginHorizontal: 10,
    fontWeight: '600',
  },
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 13,
    gap: 8,
  },
  googleG: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285f4',
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 20,
  },
  googleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  switchText: {
    fontSize: 13,
    color: '#64748b',
  },
  switchLink: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 12,
  },
});