import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function StudentHome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoSmall}>
            <Text style={styles.logoSmallText}>🎓</Text>
          </View>
          <View>
            <Text style={styles.logoName}>UAPMP</Text>
            <Text style={styles.logoSub}>Student Portal</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>☀️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👨‍💻</Text>
            </View>
            <View style={styles.welcomeInfo}>
              <Text style={styles.welcomeName}>Welcome back, Alex!</Text>
              <Text style={styles.welcomeSub}>Computer Science Major • 3rd Year</Text>
              <Text style={styles.welcomeMeta}>ID: 20240912 • Last login: Today, 9:41 AM</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLbl}>Courses</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>92%</Text>
              <Text style={styles.statLbl}>Attendance</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>B+</Text>
              <Text style={styles.statLbl}>Avg Grade</Text>
            </View>
          </View>
        </View>

        {/* Enrolled Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Enrolled Classes</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { code: 'CS101', name: 'Intro to Algorithms', prof: 'Prof. Alan Turing', time: 'Mon/Wed • 10:00 AM', color: '#4f46e5', btn: 'Join Class', active: true },
              { code: 'MATH202', name: 'Linear Algebra', prof: 'Prof. Katherine Johnson', time: 'Tue/Thu • 2:00 PM', color: '#059669', btn: 'Class Ended', active: false },
              { code: 'ENG105', name: 'Technical Writing', prof: 'Prof. Hemingway', time: 'Fri • 9:00 AM', color: '#d97706', btn: 'View Details', active: true },
            ].map((course, i) => (
              <View key={i} style={styles.courseCard}>
                <View style={[styles.courseTop, { backgroundColor: course.color }]}>
                  <Text style={styles.courseCode}>{course.code}</Text>
                </View>
                <View style={styles.courseBody}>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <Text style={styles.courseProf}>{course.prof}</Text>
                  <Text style={styles.courseTime}>🕐 {course.time}</Text>
                  <TouchableOpacity
                    style={[styles.courseBtn, !course.active && styles.courseBtnDisabled]}
                  >
                    <Text style={[styles.courseBtnText, !course.active && styles.courseBtnTextDisabled]}>
                      {course.btn}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Pending Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>+ Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            {[
              { name: 'Submit Algorithm Project', priority: 'HIGH', type: 'Course', color: '#fee2e2', textColor: '#dc2626' },
              { name: 'Register for next semester', priority: 'MEDIUM', type: 'Personal', color: '#fef3c7', textColor: '#d97706' },
              { name: 'Return Library Book', priority: 'LOW', type: 'Personal', color: '#dcfce7', textColor: '#16a34a' },
            ].map((task, i) => (
              <View key={i} style={[styles.taskRow, i === 2 && { borderBottomWidth: 0 }]}>
                <View style={styles.taskCheck} />
                <View style={styles.taskInfo}>
                  <Text style={styles.taskName}>{task.name}</Text>
                  <View style={styles.taskMeta}>
                    <View style={[styles.priorityBadge, { backgroundColor: task.color }]}>
                      <Text style={[styles.priorityText, { color: task.textColor }]}>{task.priority}</Text>
                    </View>
                    <Text style={styles.taskType}>{task.type}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Grades */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Grades</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View Report Card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHead, { flex: 1 }]}>COURSE</Text>
              <Text style={[styles.tableHead, { flex: 2 }]}>ASSESSMENT</Text>
              <Text style={[styles.tableHead, { flex: 1 }]}>SCORE</Text>
              <Text style={[styles.tableHead, { flex: 1 }]}>GRADE</Text>
            </View>
            {[
              { course: 'CS101', assessment: 'Midterm Exam', score: '88/100', grade: 'B+', color: '#dbeafe', textColor: '#1d4ed8' },
              { course: 'MATH202', assessment: 'Quiz 3', score: '10/10', grade: 'A', color: '#dcfce7', textColor: '#15803d' },
              { course: 'ENG105', assessment: 'Essay', score: '92/100', grade: 'A-', color: '#d1fae5', textColor: '#065f46' },
            ].map((row, i) => (
              <View key={i} style={[styles.tableRow, i === 2 && { borderBottomWidth: 0 }]}>
                <Text style={[styles.tableCell, { flex: 1, fontWeight: '700' }]}>{row.course}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{row.assessment}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{row.score}</Text>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={[styles.gradeBadge, { backgroundColor: row.color }]}>
                    <Text style={[styles.gradeText, { color: row.textColor }]}>{row.grade}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Attendance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance</Text>
          <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10 }]}>
            <View style={styles.attendanceCircle}>
              <Text style={styles.attendancePercent}>92%</Text>
            </View>
            <View>
              <Text style={styles.attendanceTitle}>Overall Attendance</Text>
              <Text style={styles.attendanceSub}>You missed 3 classes this semester.</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { icon: '🏠', label: 'Dashboard', active: true },
          { icon: '📚', label: 'Courses' },
          { icon: '⭐', label: 'Grades' },
          { icon: '📅', label: 'Schedule' },
          { icon: '⚙️', label: 'Settings' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem}>
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>
              {item.label}
            </Text>
            {item.active && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f4ff' },
  header: {
    backgroundColor: 'white', padding: 14,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', elevation: 3,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoSmall: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center',
  },
  logoSmallText: { fontSize: 18 },
  logoName: { fontSize: 15, fontWeight: '900', color: '#1e1b4b' },
  logoSub: { fontSize: 11, color: '#888' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#f5f3ff', alignItems: 'center', justifyContent: 'center',
  },
  iconBtnText: { fontSize: 16 },
  scroll: { padding: 16 },
  welcomeCard: {
    backgroundColor: '#2563eb', borderRadius: 20,
    padding: 20, marginBottom: 20,
  },
  welcomeTop: { flexDirection: 'row', gap: 14, marginBottom: 16 },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: { fontSize: 28 },
  welcomeInfo: { flex: 1, justifyContent: 'center' },
  welcomeName: { fontSize: 18, fontWeight: '900', color: 'white' },
  welcomeSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  welcomeMeta: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10, padding: 10, alignItems: 'center',
  },
  statVal: { fontSize: 20, fontWeight: '900', color: 'white' },
  statLbl: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e1b4b' },
  viewAll: { fontSize: 13, color: '#2563eb', fontWeight: '600' },
  courseCard: {
    width: 160, backgroundColor: 'white', borderRadius: 16,
    marginRight: 12, overflow: 'hidden', elevation: 3,
  },
  courseTop: { height: 80, padding: 10, justifyContent: 'flex-start' },
  courseCode: {
    backgroundColor: 'rgba(255,255,255,0.25)', color: 'white',
    fontSize: 11, fontWeight: '700', paddingHorizontal: 8,
    paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start',
  },
  courseBody: { padding: 12 },
  courseName: { fontSize: 13, fontWeight: '700', color: '#1e1b4b', marginBottom: 4 },
  courseProf: { fontSize: 11, color: '#888', marginBottom: 6 },
  courseTime: { fontSize: 11, color: '#666', marginBottom: 10 },
  courseBtn: {
    backgroundColor: '#2563eb', borderRadius: 8,
    paddingVertical: 8, alignItems: 'center',
  },
  courseBtnDisabled: { backgroundColor: '#f3f4f6' },
  courseBtnText: { color: 'white', fontSize: 12, fontWeight: '700' },
  courseBtnTextDisabled: { color: '#9ca3af' },
  card: {
    backgroundColor: 'white', borderRadius: 16,
    padding: 16, elevation: 2,
  },
  taskRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f9fafb', gap: 12,
  },
  taskCheck: {
    width: 20, height: 20, borderRadius: 6,
    borderWidth: 2, borderColor: '#e5e7eb',
  },
  taskInfo: { flex: 1 },
  taskName: { fontSize: 13, fontWeight: '600', color: '#1e1b4b' },
  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  priorityBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  priorityText: { fontSize: 10, fontWeight: '700' },
  taskType: { fontSize: 10, color: '#888' },
  tableHeader: {
    flexDirection: 'row', paddingBottom: 8,
    borderBottomWidth: 1, borderBottomColor: '#f3f4f6', marginBottom: 4,
  },
  tableHead: { fontSize: 10, color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' },
  tableRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f9fafb',
  },
  tableCell: { fontSize: 12, color: '#374151' },
  gradeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  gradeText: { fontSize: 11, fontWeight: '700' },
  attendanceCircle: {
    width: 70, height: 70, borderRadius: 35,
    borderWidth: 7, borderColor: '#2563eb',
    alignItems: 'center', justifyContent: 'center',
  },
  attendancePercent: { fontSize: 16, fontWeight: '900', color: '#2563eb' },
  attendanceTitle: { fontSize: 15, fontWeight: '700', color: '#1e1b4b' },
  attendanceSub: { fontSize: 12, color: '#888', marginTop: 4 },
  bottomNav: {
    backgroundColor: 'white', flexDirection: 'row',
    justifyContent: 'space-around', paddingTop: 10,
    paddingBottom: 16, borderTopWidth: 1, borderTopColor: '#f0f0f0', elevation: 8,
  },
  navItem: { alignItems: 'center', gap: 3 },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 10, color: '#9ca3af', fontWeight: '600' },
  navLabelActive: { color: '#2563eb' },
  navDot: { width: 4, height: 4, backgroundColor: '#2563eb', borderRadius: 2 },
});