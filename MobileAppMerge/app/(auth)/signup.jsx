//  import { useState } from 'react';
// import {
//   View, Text, TextInput, TouchableOpacity,
//   StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { register } from '../../api/auth';


// export default function SignupScreen() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [role, setRole] = useState('student');
//   const [agreed, setAgreed] = useState(false);
//   const router = useRouter();


// //---------------------------------------------------------------
//   // const handleSignup = () => {
//   //   if (!name || !email || !password || !confirm) {
//   //     Alert.alert('Error', 'Please fill in all fields');
//   //     return;
//   //   }
//   //   if (password !== confirm) {
//   //     Alert.alert('Error', 'Passwords do not match');
//   //     return;
//   //   }
//   //   if (!agreed) {
//   //     Alert.alert('Error', 'Please agree to the Terms & Conditions');
//   //     return;
//   //   }
//   //   Alert.alert('Success', 'Account created successfully!');
//   //   router.replace('/(auth)/login');
//   // };
//   //-------------------------------------------------------
//   const handleSignup = async () => {
//   if (!name || !email || !password || !confirm) {
//     Alert.alert('Error', 'Please fill in all fields');
//     return;
//   }
//   if (password !== confirm) {
//     Alert.alert('Error', 'Passwords do not match');
//     return;
//   }
//   if (!agreed) {
//     Alert.alert('Error', 'Please agree to the Terms & Conditions');
//     return;
//   }
//   try {
//     await register(name, email, password, confirm);
//     Alert.alert('Success! 🎉', 'Account created! Please check your email to verify your account.');
//     router.replace('/(auth)/login');
//   } catch (e) {
//     Alert.alert('Error', e.message || 'Registration failed');
//   }
// };
//   //--------------------------------------------------------

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//         <View style={styles.logoWrap}>
//           <Text style={styles.logoIcon}>🎓</Text>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.title}>Create your academic account</Text>
//           <Text style={styles.sub}>Join UAPMP to manage your courses and grades efficiently.</Text>

//           <View style={styles.roleTabs}>
//             <TouchableOpacity
//               style={[styles.roleTab, role === 'student' && styles.roleTabActive]}
//               onPress={() => setRole('student')}
//             >
//               <Text style={[styles.roleTabText, role === 'student' && styles.roleTabTextActive]}>🎓 Student</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.roleTab, role === 'instructor' && styles.roleTabActive]}
//               onPress={() => setRole('instructor')}
//             >
//               <Text style={[styles.roleTabText, role === 'instructor' && styles.roleTabTextActive]}>📡 Instructor</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.label}>Full Name</Text>
//           <View style={styles.inputWrap}>
//             <Text style={styles.inputIcon}>👤</Text>
//             <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#9ca3af" value={name} onChangeText={setName} />
//           </View>

//           <Text style={styles.label}>University Email</Text>
//           <View style={styles.inputWrap}>
//             <Text style={styles.inputIcon}>✉️</Text>
//             <TextInput style={styles.input} placeholder="student@university.edu" placeholderTextColor="#9ca3af" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
//           </View>

//           <Text style={styles.label}>Password</Text>
//           <View style={styles.inputWrap}>
//             <Text style={styles.inputIcon}>🔒</Text>
//             <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af" value={password} onChangeText={setPassword} secureTextEntry />
//           </View>

//           <Text style={styles.label}>Confirm Password</Text>
//           <View style={styles.inputWrap}>
//             <Text style={styles.inputIcon}>🔄</Text>
//             <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af" value={confirm} onChangeText={setConfirm} secureTextEntry />
//           </View>

//           <TouchableOpacity style={styles.termsRow} onPress={() => setAgreed(!agreed)}>
//             <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
//               {agreed && <Text style={styles.checkmark}>✓</Text>}
//             </View>
//             <Text style={styles.termsText}>
//               I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.btnPrimary} onPress={handleSignup}>
//             <Text style={styles.btnText}>Create Account</Text>
//           </TouchableOpacity>

//           <View style={styles.switchRow}>
//             <Text style={styles.switchText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
//               <Text style={styles.switchLink}>Log in</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.footer}>Having trouble? <Text style={styles.switchLink}>Contact Support</Text></Text>
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
//   roleTabs: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 12, padding: 4, marginBottom: 18, gap: 4 },
//   roleTab: { flex: 1, paddingVertical: 10, borderRadius: 9, alignItems: 'center' },
//   roleTabActive: { backgroundColor: 'white', elevation: 2 },
//   roleTabText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
//   roleTabTextActive: { color: '#2563eb' },
//   inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, backgroundColor: '#f9fafb', marginBottom: 14 },
//   inputIcon: { fontSize: 15, marginRight: 8 },
//   input: { flex: 1, paddingVertical: 13, fontSize: 14, color: '#0f172a' },
//   termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 20 },
//   checkbox: { width: 20, height: 20, borderWidth: 1.5, borderColor: '#d1d5db', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
//   checkboxActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
//   checkmark: { color: 'white', fontSize: 12, fontWeight: '700' },
//   termsText: { fontSize: 12, color: '#64748b', lineHeight: 18, flex: 1 },
//   termsLink: { color: '#2563eb', fontWeight: '600' },
//   btnPrimary: { backgroundColor: '#2563eb', borderRadius: 12, paddingVertical: 14, alignItems: 'center', elevation: 4 },
//   btnText: { color: 'white', fontSize: 15, fontWeight: '700' },
//   switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
//   switchText: { fontSize: 13, color: '#64748b' },
//   switchLink: { fontSize: 13, color: '#2563eb', fontWeight: '700' },
//   footer: { textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 12 },
// });


// //--------------------------------------------------------------------------------------------------


// كووووووووووود شادى 

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";

// export default function SignUpScreen({ navigation }) {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_URL = "http://localhost:5000/api/auth/register";

//   const handleSignUp = async () => {
//     if (!fullName || !email || !password || !confirmPassword) {
//       alert("All fields are required");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     // password rules (زي الـ HTML)
//     const hasLength = password.length >= 6;
//     const hasLetter = /[a-zA-Z]/.test(password);
//     const hasDigit = /\d/.test(password);
//     const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     if (!(hasLength && hasLetter && hasDigit && hasSpecial)) {
//       alert("Password must be strong (letters + numbers + special char)");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(REGISTER_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName,
//           email,
//           password,
//           confirmPassword,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert("Account created successfully 🎉");

//         // reset form
//         setFullName("");
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");

//         // redirect to login
//         navigation.replace("SignIn");
//       } else {
//         alert(data.message || "Registration failed");
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Server error — check backend connection");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <TextInput
//         placeholder="Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity
//         style={[styles.button, loading && { opacity: 0.6 }]}
//         onPress={handleSignUp}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Sign Up</Text>
//         )}
//       </TouchableOpacity>

//       <Text style={styles.signInText}>
//         Already have an account?{" "}
//         <Text
//           style={styles.signInLink}
//           onPress={() => navigation.navigate("SignIn")}
//         >
//           Sign In
//         </Text>
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: "#f9f9ff",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   button: {
//     backgroundColor: "#1a73e8",
//     padding: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   signInText: {
//     textAlign: "center",
//     color: "#555",
//   },
//   signInLink: {
//     color: "#1a73e8",
//     fontWeight: "bold",
//   },
// });


//   الكوووووووووووووووووووووود القديم 

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

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('student');
  const [agreed, setAgreed] = useState(false);
  const { signup } = useAuth();
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
    if (!agreed) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions');
      return;
    }
    const result = await signup(name, email, password, role);
    if (result.success) {
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/(auth)/login');
    } else {
      Alert.alert('Error', result.message);
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
          <Text style={styles.title}>Create your academic account</Text>
          <Text style={styles.sub}>
            Join UAPMP to manage your courses and grades efficiently.
          </Text>

          <View style={styles.roleTabs}>
            <TouchableOpacity
              style={[styles.roleTab, role === 'student' && styles.roleTabActive]}
              onPress={() => setRole('student')}
            >
              <Text style={[styles.roleTabText, role === 'student' && styles.roleTabTextActive]}>
                🎓 Student
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleTab, role === 'instructor' && styles.roleTabActive]}
              onPress={() => setRole('instructor')}
            >
              <Text style={[styles.roleTabText, role === 'instructor' && styles.roleTabTextActive]}>
                📡 Instructor
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>👤</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />
          </View>

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
              secureTextEntry
            />
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrap}>
            <Text style={styles.inputIcon}>🔄</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9ca3af"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreed(!agreed)}
          >
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

          <TouchableOpacity style={styles.btnPrimary} onPress={handleSignup}>
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.switchLink}>Log in</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            Having trouble signing up?{' '}
            <Text style={styles.switchLink}>Contact Support</Text>
          </Text>
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
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
    gap: 4,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  roleTabActive: {
    backgroundColor: 'white',
    elevation: 2,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  roleTabTextActive: {
    color: '#2563eb',
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  termsText: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
    flex: 1,
  },
  termsLink: {
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