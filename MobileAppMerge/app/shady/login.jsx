import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Login Function
  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // هنا تقدر تحط Firebase أو API بعدين
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>🏛️</Text>
        </View>
        <Text style={styles.logoText}>UAPMP</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Sign in to UAPMP</Text>
        <Text style={styles.subtitle}>
          Enter your academic credentials to access the portal
        </Text>

        <Text style={styles.label}>UNIVERSITY EMAIL</Text>
        <TextInput
          placeholder="student.name@university.edu"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {/* ✅ زرار Login بعد التعديل */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.link}>Forgot Password?</Text>
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        <Text style={styles.smallText}>Don't have an account?</Text>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.signupText}>SIGN UP?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9ff",
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: { alignItems: "center", marginBottom: 30 },
  iconBox: {
    width: 64,
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
  },
  icon: { fontSize: 28 },
  logoText: { fontSize: 22, fontWeight: "800" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 5 },
  subtitle: { fontSize: 13, color: "#666", marginBottom: 20 },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: "#555",
  },
  input: {
    backgroundColor: "#f2f3fd",
    padding: 14,
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1a73e8",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: {
    textAlign: "center",
    marginTop: 10,
    color: "#1a73e8",
    fontWeight: "600",
  },
  bottom: { marginTop: 25, alignItems: "center" },
  smallText: { fontSize: 12, marginBottom: 10, color: "#777" },
  signupBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  signupText: { color: "#1a73e8", fontWeight: "bold" },
});