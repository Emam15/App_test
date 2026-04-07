import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function DoctorHome() {
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
            <Text style={styles.logoSub}>Instructor Portal</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👩‍🏫</Text>
            </View>
            <View style={styles.welcomeInfo}>
              <Text style={styles.welcomeName}>Welcome back, Prof. Jenkins! 👋</Text>
              <Text style={styles.welcomeSub}>Your lecture schedules and student grades are ready for review.</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLbl}>Active Classes</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>125</Text>
              <Text style={styles.statLbl}>Students</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>85%</Text>
              <Text style={styles.statLbl}>Avg Attendance</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Total Students', val: '145', icon: '👥', badge: '+2.5%', up: true },
            { label: 'Avg Attendance', val: '87%', icon: '✅', badge: '+1.2%', up: true },
            { label: 'To Grade', val: '12', icon: '⭐', badge: 'Pending', up: null },
            { label: 'At Risk', val: '3', icon: '⚠️', badge: 'Alert', up: false },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={styles.statCardTop}>
                <Text style={styles.statCardIcon}>{s.icon}</Text>
                <Text style={[
                  styles.statCardBadge,
                  s.up === true && { color: '#16a34a' },
                  s.up === false && { color: '#dc2626' },
                  s.up === null && { color: '#d97706' },
                ]}>{s.badge}</Text>
              </View>
              <Text style={styles.statCardLabel}>{s.label}</Text>
              <Text style={styles.statCardVal}>{s.val}</Text>
            </View>
          ))}
        </View>

        {/* Classes Taught */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Classes Taught</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {[
            { code: 'CS101', name: 'Intro to Computer Science', section: 'Section A', students: 45, time: 'Mon/Wed 10:00 AM', status: 'ACTIVE', statusColor: '#dcfce7', statusText: '#15803d' },
            { code: 'CS302', name: 'Data Structures & Algo', section: 'Section B', students: 38, time: 'Tue/Thu 02:00 PM', status: 'ACTIVE', statusColor: '#dcfce7', statusText: '#15803d' },
            { code: 'CS450', name: 'Web Development Capstone', section: 'Section A', students: 42, time: 'Fri 09:00 AM', status: 'PAUSED', statusColor: '#fef3c7', statusText: '#d97706' },
          ].map((cls, i) => (
            <View key={i} style={styles.classCard}>
              <View style={styles.classCardTop}>
                <View>
                  <Text style={styles.className}>{cls.name}</Text>
                  <Text style={styles.classSub}>{cls.code} • {cls.section}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: cls.statusColor }]}>
                  <Text style={[styles.statusText, { color: cls.statusText }]}>{cls.status}</Text>
                </View>
              </View>
              <View style={styles.classCardBottom}>
                <Text style={styles.classMeta}>👥 {cls.students} Students</Text>
                <Text style={styles.classMeta}>🕐 {cls.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Attendance Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance Overview</Text>
          <View style={[styles.card, { marginTop: 10 }]}>
            <Text style={styles.attendanceBig}>85%</Text>
            <Text style={styles.attendanceAvg}>Average</Text>
            {[
              { code: 'CS101', pct: 92, color: '#16a34a' },
              { code: 'CS302', pct: 78, color: '#d97706' },
              { code: 'CS450', pct: 88, color: '#16a34a' },
            ].map((a, i) => (
              <View key={i} style={styles.attendanceRow}>
                <Text style={styles.attendanceCode}>{a.code}</Text>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, { width: `${a.pct}%`, backgroundColor: a.color }]} />
                </View>
                <Text style={styles.attendancePct}>{a.pct}%</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.attendanceBtn}>
              <Text style={styles.attendanceBtnText}>Take Attendance</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks <Text style={{ color: '#dc2626', fontSize: 13 }}>3 Pending</Text></Text>
          <View style={[styles.card, { marginTop: 10 }]}>
            {[
              { name: 'Grade Midterm Exams', sub: 'CS101', due: 'Due Today', dueColor: '#dc2626' },
              { name: 'Review Syllabus Changes', sub: 'CS302', due: 'Due Friday', dueColor: '#d97706' },
            ].map((t, i) => (
              <View key={i} style={[styles.taskRow, i === 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.taskCheck} />
                <View>
                  <Text style={styles.taskName}>{t.name}</Text>
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 3 }}>
                    <Text style={styles.taskCode}>{t.sub}</Text>
                    <Text style={[styles.taskDue, { color: t.dueColor }]}>{t.due}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          { icon: '🏠', label: 'Dashboard', active: true },
          { icon: '📚', label: 'Classes' },
          { icon: '👥', label: 'Students' },
          { icon: '📅', label: 'Schedule' },
          { icon: '💬', label: 'Messages' },
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
    padding: 20, marginBottom: 16,
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
  welcomeName: { fontSize: 16, fontWeight: '900', color: 'white' },
  welcomeSub: { fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 4, lineHeight: 16 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10, padding: 10, alignItems: 'center',
  },
  statVal: { fontSize: 18, fontWeight: '900', color: 'white' },
  statLbl: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2, textAlign: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statCard: {
    width: '47%', backgroundColor: 'white',
    borderRadius: 16, padding: 14, elevation: 2,
  },
  statCardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statCardIcon: { fontSize: 22 },
  statCardBadge: { fontSize: 12, fontWeight: '700' },
  statCardLabel: { fontSize: 12, color: '#64748b', marginBottom: 4 },
  statCardVal: { fontSize: 24, fontWeight: '900', color: '#0f172a' },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e1b4b' },
  viewAll: { fontSize: 13, color: '#2563eb', fontWeight: '600' },
  classCard: {
    backgroundColor: 'white', borderRadius: 16,
    padding: 14, marginBottom: 10, elevation: 2,
  },
  classCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  className: { fontSize: 14, fontWeight: '700', color: '#1e1b4b' },
  classSub: { fontSize: 12, color: '#888', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  classCardBottom: { flexDirection: 'row', gap: 16 },
  classMeta: { fontSize: 12, color: '#666' },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, elevation: 2 },
  attendanceBig: { fontSize: 40, fontWeight: '900', color: '#0f172a', textAlign: 'center' },
  attendanceAvg: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16 },
  attendanceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  attendanceCode: { fontSize: 12, fontWeight: '700', color: '#374151', width: 45 },
  progressBg: { flex: 1, height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },
  attendancePct: { fontSize: 12, fontWeight: '700', color: '#374151', width: 35, textAlign: 'right' },
  attendanceBtn: {
    backgroundColor: '#2563eb', borderRadius: 10,
    paddingVertical: 12, alignItems: 'center', marginTop: 14,
  },
  attendanceBtnText: { color: 'white', fontSize: 14, fontWeight: '700' },
  taskRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1,
    borderBottomColor: '#f9fafb', gap: 12,
  },
  taskCheck: {
    width: 20, height: 20, borderRadius: 4,
    borderWidth: 2, borderColor: '#e5e7eb',
  },
  taskName: { fontSize: 13, fontWeight: '600', color: '#1e1b4b' },
  taskCode: { fontSize: 11, color: '#2563eb', fontWeight: '700' },
  taskDue: { fontSize: 11, fontWeight: '600' },
  bottomNav: {
    backgroundColor: 'white', flexDirection: 'row',
    justifyContent: 'space-around', paddingTop: 10,
    paddingBottom: 16, borderTopWidth: 1,
    borderTopColor: '#f0f0f0', elevation: 8,
  },
  navItem: { alignItems: 'center', gap: 3 },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 10, color: '#9ca3af', fontWeight: '600' },
  navLabelActive: { color: '#2563eb' },
  navDot: { width: 4, height: 4, backgroundColor: '#2563eb', borderRadius: 2 },
});