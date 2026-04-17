import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>

     

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DE</Text>
        </View>

        <View>
          <Text style={styles.name}>Dr. Mohamed Elsawy</Text>
          <Text style={styles.sub}>Faculty of Science • Cairo University</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.row}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Students</Text>
          <Text style={styles.statValue}>142</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Pending Grading</Text>
          <Text style={styles.statValue}>28</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Upcoming Classes</Text>
          <Text style={styles.statValue}>2</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Attendance</Text>
          <Text style={styles.statValue}>42/50</Text>
        </View>
      </View>

      {/* Attendance Card */}
      <View style={styles.attendanceCard}>
        <Text style={styles.attTitle}>CS101 Session</Text>
        <Text style={styles.attSub}>Room 304 • Ends in 45m</Text>

        {/* Progress */}
        <View style={styles.progressBg}>
          <View style={styles.progressFill}></View>
        </View>

        <Text style={styles.attValue}>42 / 50 Checked In</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    padding: 16,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 15,
  },

  menu: {
    fontSize: 26,
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  profileCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
    elevation: 4,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#f2c4a5",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  sub: {
    color: "#666",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },

  statTitle: {
    fontSize: 12,
    color: "#888",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
    color: "#1a73e8",
  },

  attendanceCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginTop: 10,
    elevation: 4,
  },

  attTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  attSub: {
    color: "#666",
    marginBottom: 10,
  },

  progressBg: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },

  progressFill: {
    width: "84%",
    height: "100%",
    backgroundColor: "#1a73e8",
  },

  attValue: {
    fontSize: 12,
    color: "#555",
  },
});