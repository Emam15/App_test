 




// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function Index() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.logo}>🎓</Text>
//       <Text style={styles.title}>UAPMP</Text>
//       <Text style={styles.sub}>Choose your role to continue</Text>

//       <TouchableOpacity
//         style={[styles.btn, { backgroundColor: '#2563eb' }]}
//         onPress={() => router.replace('/(student)/home')}
//       >
//         <Text style={styles.btnIcon}>🎓</Text>
//         <Text style={styles.btnText}>Student</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.btn, { backgroundColor: '#059669' }]}
//         onPress={() => router.replace('/(doctor)/home')}
//       >
//         <Text style={styles.btnIcon}>👨‍🏫</Text>
//         <Text style={styles.btnText}>Doctor</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.btn, { backgroundColor: '#7c3aed' }]}
//         onPress={() => router.replace('/(admin)/home')}
//       >
//         <Text style={styles.btnIcon}>🛡️</Text>
//         <Text style={styles.btnText}>Admin</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, backgroundColor: '#f0f4ff',
//     alignItems: 'center', justifyContent: 'center', padding: 24,
//   },
//   logo: { fontSize: 60, marginBottom: 12 },
//   title: { fontSize: 32, fontWeight: '900', color: '#1e1b4b', marginBottom: 4 },
//   sub: { fontSize: 15, color: '#64748b', marginBottom: 40 },
//   btn: {
//     width: '100%', flexDirection: 'row', alignItems: 'center',
//     padding: 18, borderRadius: 16, marginBottom: 14,
//     gap: 14, elevation: 3,
//   },
//   btnIcon: { fontSize: 24 },
//   btnText: { fontSize: 18, fontWeight: '700', color: 'white' },
// });


import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(auth)/login" />;
}


 