 






// import { useState } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Modal,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import { useTheme } from '../../context/ThemeContext';

// export default function StudentHome() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { colors: c, dark, toggleDark } = useTheme();
//   const router = useRouter();

//   return (
//     <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>
//       <Modal visible={menuOpen} transparent animationType="slide">
//         <TouchableOpacity style={styles.overlay} onPress={() => setMenuOpen(false)} />
//         <View style={[styles.sidebar, { backgroundColor: c.card }]}>
//           <View style={styles.sidebarHeader}>
//             <View style={styles.logoSmall}>
//               <Text style={styles.logoSmallText}>🎓</Text>
//             </View>
//             <View>
//               <Text style={[styles.logoName, { color: c.text }]}>UAPMP</Text>
//               <Text style={[styles.logoSub, { color: c.subText }]}>Student Portal</Text>
//             </View>
//           </View>
//           {[
//             { icon: '🏠', label: 'Dashboard', active: true, route: '/(student)/home' },
//             { icon: '📚', label: 'Courses', route: '/(student)/classes' },
//             { icon: '⭐', label: 'Grades' },
//             { icon: '📅', label: 'Schedule' },
//             { icon: '⚙️', label: 'Settings' },
//           ].map((item, i) => (
//             <TouchableOpacity
//               key={i}
//               style={[styles.sidebarItem, item.active && { backgroundColor: '#2563eb22' }]}
//               onPress={() => {
//                 setMenuOpen(false);
//                 if (item.route) router.push(item.route);
//               }}
//             >
//               <Text style={styles.sidebarIcon}>{item.icon}</Text>
//               <Text style={[styles.sidebarLabel, { color: item.active ? '#2563eb' : c.text }]}>
//                 {item.label}
//               </Text>
//               {item.active && <View style={styles.sidebarDot} />}
//             </TouchableOpacity>
//           ))}
//           <TouchableOpacity
//             style={[styles.sidebarItem, { marginTop: 20, borderTopWidth: 1, borderTopColor: c.border }]}
//           >
//             <Text style={styles.sidebarIcon}>🚪</Text>
//             <Text style={[styles.sidebarLabel, { color: '#dc2626' }]}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
//         <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.hamburger}>
//           <View style={[styles.hLine, { backgroundColor: c.text }]} />
//           <View style={[styles.hLine, { backgroundColor: c.text, width: 16 }]} />
//           <View style={[styles.hLine, { backgroundColor: c.text, width: 10 }]} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: c.text }]}>Dashboard</Text>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]}>
//             <Text style={styles.iconBtnText}>🔔</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]} onPress={toggleDark}>
//             <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>
//         <View style={styles.welcomeCard}>
//           <View style={styles.welcomeTop}>
//             <View style={styles.avatar}>
//               <Text style={styles.avatarText}>👨‍💻</Text>
//             </View>
//             <View style={styles.welcomeInfo}>
//               <Text style={styles.welcomeName}>Welcome back, Alex!</Text>
//               <Text style={styles.welcomeSub}>Computer Science Major • 3rd Year</Text>
//               <Text style={styles.welcomeMeta}>ID: 20240912 • Last login: Today, 9:41 AM</Text>
//             </View>
//           </View>
//           <View style={styles.statsRow}>
//             <View style={styles.statBox}>
//               <Text style={styles.statVal}>3</Text>
//               <Text style={styles.statLbl}>Courses</Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statVal}>92%</Text>
//               <Text style={styles.statLbl}>Attendance</Text>
//             </View>
//             <View style={styles.statBox}>
//               <Text style={styles.statVal}>B+</Text>
//               <Text style={styles.statLbl}>Avg Grade</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, { color: c.text }]}>Enrolled Classes</Text>
//             <TouchableOpacity onPress={() => router.push('/(student)/classes')}>
//               <Text style={styles.viewAll}>View all</Text>
//             </TouchableOpacity>
//           </View>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {[
//               { code: 'CS101', name: 'Intro to Algorithms', prof: 'Prof. Alan Turing', time: 'Mon/Wed • 10:00 AM', color: '#4f46e5', btn: 'Join Class', active: true },
//               { code: 'MATH202', name: 'Linear Algebra', prof: 'Prof. Katherine Johnson', time: 'Tue/Thu • 2:00 PM', color: '#059669', btn: 'Class Ended', active: false },
//               { code: 'ENG105', name: 'Technical Writing', prof: 'Prof. Hemingway', time: 'Fri • 9:00 AM', color: '#d97706', btn: 'View Details', active: true },
//             ].map((course, i) => (
//               <View key={i} style={[styles.courseCard, { backgroundColor: c.card }]}>
//                 <View style={[styles.courseTop, { backgroundColor: course.color }]}>
//                   <Text style={styles.courseCode}>{course.code}</Text>
//                 </View>
//                 <View style={styles.courseBody}>
//                   <Text style={[styles.courseName, { color: c.text }]}>{course.name}</Text>
//                   <Text style={[styles.courseProf, { color: c.subText }]}>{course.prof}</Text>
//                   <Text style={[styles.courseTime, { color: c.subText }]}>🕐 {course.time}</Text>
//                   <TouchableOpacity style={[styles.courseBtn, !course.active && { backgroundColor: c.bg }]}>
//                     <Text style={[styles.courseBtnText, !course.active && { color: '#9ca3af' }]}>
//                       {course.btn}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, { color: c.text }]}>Pending Tasks</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>+ Add</Text></TouchableOpacity>
//           </View>
//           <View style={[styles.card, { backgroundColor: c.card }]}>
//             {[
//               { name: 'Submit Algorithm Project', priority: 'HIGH', type: 'Course', color: '#fee2e2', textColor: '#dc2626' },
//               { name: 'Register for next semester', priority: 'MEDIUM', type: 'Personal', color: '#fef3c7', textColor: '#d97706' },
//               { name: 'Return Library Book', priority: 'LOW', type: 'Personal', color: '#dcfce7', textColor: '#16a34a' },
//             ].map((task, i) => (
//               <View key={i} style={[styles.taskRow, i === 2 && { borderBottomWidth: 0 }, { borderBottomColor: c.border }]}>
//                 <View style={[styles.taskCheck, { borderColor: c.border }]} />
//                 <View style={styles.taskInfo}>
//                   <Text style={[styles.taskName, { color: c.text }]}>{task.name}</Text>
//                   <View style={styles.taskMeta}>
//                     <View style={[styles.priorityBadge, { backgroundColor: task.color }]}>
//                       <Text style={[styles.priorityText, { color: task.textColor }]}>{task.priority}</Text>
//                     </View>
//                     <Text style={[styles.taskType, { color: c.subText }]}>{task.type}</Text>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={[styles.sectionTitle, { color: c.text }]}>Recent Grades</Text>
//             <TouchableOpacity><Text style={styles.viewAll}>View Report Card</Text></TouchableOpacity>
//           </View>
//           <View style={[styles.card, { backgroundColor: c.card }]}>
//             <View style={[styles.tableHeader, { borderBottomColor: c.border }]}>
//               <Text style={[styles.tableHead, { flex: 1 }]}>COURSE</Text>
//               <Text style={[styles.tableHead, { flex: 2 }]}>ASSESSMENT</Text>
//               <Text style={[styles.tableHead, { flex: 1 }]}>SCORE</Text>
//               <Text style={[styles.tableHead, { flex: 1 }]}>GRADE</Text>
//             </View>
//             {[
//               { course: 'CS101', assessment: 'Midterm Exam', score: '88/100', grade: 'B+', color: '#dbeafe', textColor: '#1d4ed8' },
//               { course: 'MATH202', assessment: 'Quiz 3', score: '10/10', grade: 'A', color: '#dcfce7', textColor: '#15803d' },
//               { course: 'ENG105', assessment: 'Essay', score: '92/100', grade: 'A-', color: '#d1fae5', textColor: '#065f46' },
//             ].map((row, i) => (
//               <View key={i} style={[styles.tableRow, i === 2 && { borderBottomWidth: 0 }, { borderBottomColor: c.border }]}>
//                 <Text style={[styles.tableCell, { flex: 1, fontWeight: '700', color: c.text }]}>{row.course}</Text>
//                 <Text style={[styles.tableCell, { flex: 2, color: c.subText }]}>{row.assessment}</Text>
//                 <Text style={[styles.tableCell, { flex: 1, color: c.subText }]}>{row.score}</Text>
//                 <View style={{ flex: 1, alignItems: 'center' }}>
//                   <View style={[styles.gradeBadge, { backgroundColor: row.color }]}>
//                     <Text style={[styles.gradeText, { color: row.textColor }]}>{row.grade}</Text>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={styles.section}>
//           <Text style={[styles.sectionTitle, { color: c.text }]}>Attendance</Text>
//           <View style={[styles.card, { backgroundColor: c.card, flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10 }]}>
//             <View style={styles.attendanceCircle}>
//               <Text style={styles.attendancePercent}>92%</Text>
//             </View>
//             <View>
//               <Text style={[styles.attendanceTitle, { color: c.text }]}>Overall Attendance</Text>
//               <Text style={[styles.attendanceSub, { color: c.subText }]}>You missed 3 classes this semester.</Text>
//             </View>
//           </View>
//         </View>

//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1 },
//   overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' },
//   sidebar: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 260, padding: 24, elevation: 20, paddingTop: 50 },
//   sidebarHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
//   sidebarItem: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12, borderRadius: 12, marginBottom: 4 },
//   sidebarIcon: { fontSize: 20 },
//   sidebarLabel: { fontSize: 15, fontWeight: '600', flex: 1 },
//   sidebarDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2563eb' },
//   header: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3, borderBottomWidth: 1 },
//   hamburger: { gap: 5, padding: 4 },
//   hLine: { height: 2.5, width: 22, borderRadius: 2 },
//   headerTitle: { fontSize: 18, fontWeight: '800' },
//   headerRight: { flexDirection: 'row', gap: 8 },
//   iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
//   iconBtnText: { fontSize: 16 },
//   logoSmall: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
//   logoSmallText: { fontSize: 18 },
//   logoName: { fontSize: 15, fontWeight: '900' },
//   logoSub: { fontSize: 11 },
//   scroll: { padding: 16 },
//   welcomeCard: { backgroundColor: '#2563eb', borderRadius: 20, padding: 20, marginBottom: 20 },
//   welcomeTop: { flexDirection: 'row', gap: 14, marginBottom: 16 },
//   avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
//   avatarText: { fontSize: 28 },
//   welcomeInfo: { flex: 1, justifyContent: 'center' },
//   welcomeName: { fontSize: 18, fontWeight: '900', color: 'white' },
//   welcomeSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
//   welcomeMeta: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
//   statsRow: { flexDirection: 'row', gap: 10 },
//   statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: 10, alignItems: 'center' },
//   statVal: { fontSize: 20, fontWeight: '900', color: 'white' },
//   statLbl: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
//   section: { marginBottom: 20 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
//   sectionTitle: { fontSize: 16, fontWeight: '700' },
//   viewAll: { fontSize: 13, color: '#2563eb', fontWeight: '600' },
//   courseCard: { width: 160, borderRadius: 16, marginRight: 12, overflow: 'hidden', elevation: 3 },
//   courseTop: { height: 80, padding: 10, justifyContent: 'flex-start' },
//   courseCode: { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
//   courseBody: { padding: 12 },
//   courseName: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
//   courseProf: { fontSize: 11, marginBottom: 6 },
//   courseTime: { fontSize: 11, marginBottom: 10 },
//   courseBtn: { backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
//   courseBtnText: { color: 'white', fontSize: 12, fontWeight: '700' },
//   card: { borderRadius: 16, padding: 16, elevation: 2 },
//   taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, gap: 12 },
//   taskCheck: { width: 20, height: 20, borderRadius: 6, borderWidth: 2 },
//   taskInfo: { flex: 1 },
//   taskName: { fontSize: 13, fontWeight: '600' },
//   taskMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
//   priorityBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
//   priorityText: { fontSize: 10, fontWeight: '700' },
//   taskType: { fontSize: 10 },
//   tableHeader: { flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1, marginBottom: 4 },
//   tableHead: { fontSize: 10, color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' },
//   tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 },
//   tableCell: { fontSize: 12 },
//   gradeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
//   gradeText: { fontSize: 11, fontWeight: '700' },
//   attendanceCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 7, borderColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
//   attendancePercent: { fontSize: 16, fontWeight: '900', color: '#2563eb' },
//   attendanceTitle: { fontSize: 15, fontWeight: '700' },
//   attendanceSub: { fontSize: 12, marginTop: 4 },
// });

import { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function StudentHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>
      <Modal visible={menuOpen} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuOpen(false)} />
        <View style={[styles.sidebar, { backgroundColor: c.card }]}>
          <View style={styles.sidebarHeader}>
            <View style={styles.logoSmall}>
              <Text style={styles.logoSmallText}>🎓</Text>
            </View>
            <View>
              <Text style={[styles.logoName, { color: c.text }]}>UAPMP</Text>
              <Text style={[styles.logoSub, { color: c.subText }]}>Student Portal</Text>
            </View>
          </View>
          {[
            { icon: '🏠', label: 'Dashboard', active: true, route: '/(student)/home' },
            { icon: '📚', label: 'Courses', route: '/(student)/classes' },
            { icon: '⭐', label: 'Grades' },
            { icon: '📅', label: 'Schedule' },
            { icon: '⚙️', label: 'Settings' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.sidebarItem, item.active && { backgroundColor: '#2563eb22' }]}
              onPress={() => {
                setMenuOpen(false);
                if (item.route) router.push(item.route);
              }}
            >
              <Text style={styles.sidebarIcon}>{item.icon}</Text>
              <Text style={[styles.sidebarLabel, { color: item.active ? '#2563eb' : c.text }]}>
                {item.label}
              </Text>
              {item.active && <View style={styles.sidebarDot} />}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.sidebarItem, { marginTop: 20, borderTopWidth: 1, borderTopColor: c.border }]}
          >
            <Text style={styles.sidebarIcon}>🚪</Text>
            <Text style={[styles.sidebarLabel, { color: '#dc2626' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.hamburger}>
          <View style={[styles.hLine, { backgroundColor: c.text }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 16 }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 10 }]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Dashboard</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]}>
            <Text style={styles.iconBtnText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]} onPress={toggleDark}>
            <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>Enrolled Classes</Text>
            <TouchableOpacity onPress={() => router.push('/(student)/classes')}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { code: 'CS101', name: 'Intro to Algorithms', prof: 'Prof. Alan Turing', time: 'Mon/Wed • 10:00 AM', color: '#4f46e5', btn: 'View Class', active: true },
              { code: 'MATH202', name: 'Linear Algebra', prof: 'Prof. Katherine Johnson', time: 'Tue/Thu • 2:00 PM', color: '#059669', btn: 'Class Ended', active: false },
              { code: 'ENG105', name: 'Technical Writing', prof: 'Prof. Hemingway', time: 'Fri • 9:00 AM', color: '#d97706', btn: 'View Class', active: true },
            ].map((course, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.courseCard, { backgroundColor: c.card }]}
                onPress={() => course.active && router.push('/(student)/class-details')}
                activeOpacity={course.active ? 0.8 : 1}
              >
                <View style={[styles.courseTop, { backgroundColor: course.color }]}>
                  <Text style={styles.courseCode}>{course.code}</Text>
                </View>
                <View style={styles.courseBody}>
                  <Text style={[styles.courseName, { color: c.text }]}>{course.name}</Text>
                  <Text style={[styles.courseProf, { color: c.subText }]}>{course.prof}</Text>
                  <Text style={[styles.courseTime, { color: c.subText }]}>🕐 {course.time}</Text>
                  <View style={[styles.courseBtn, !course.active && { backgroundColor: c.bg }]}>
                    <Text style={[styles.courseBtnText, !course.active && { color: '#9ca3af' }]}>
                      {course.btn}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>Pending Tasks</Text>
            <TouchableOpacity><Text style={styles.viewAll}>+ Add</Text></TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: c.card }]}>
            {[
              { name: 'Submit Algorithm Project', priority: 'HIGH', type: 'Course', color: '#fee2e2', textColor: '#dc2626' },
              { name: 'Register for next semester', priority: 'MEDIUM', type: 'Personal', color: '#fef3c7', textColor: '#d97706' },
              { name: 'Return Library Book', priority: 'LOW', type: 'Personal', color: '#dcfce7', textColor: '#16a34a' },
            ].map((task, i) => (
              <View key={i} style={[styles.taskRow, i === 2 && { borderBottomWidth: 0 }, { borderBottomColor: c.border }]}>
                <View style={[styles.taskCheck, { borderColor: c.border }]} />
                <View style={styles.taskInfo}>
                  <Text style={[styles.taskName, { color: c.text }]}>{task.name}</Text>
                  <View style={styles.taskMeta}>
                    <View style={[styles.priorityBadge, { backgroundColor: task.color }]}>
                      <Text style={[styles.priorityText, { color: task.textColor }]}>{task.priority}</Text>
                    </View>
                    <Text style={[styles.taskType, { color: c.subText }]}>{task.type}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>Recent Grades</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View Report Card</Text></TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: c.card }]}>
            <View style={[styles.tableHeader, { borderBottomColor: c.border }]}>
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
              <View key={i} style={[styles.tableRow, i === 2 && { borderBottomWidth: 0 }, { borderBottomColor: c.border }]}>
                <Text style={[styles.tableCell, { flex: 1, fontWeight: '700', color: c.text }]}>{row.course}</Text>
                <Text style={[styles.tableCell, { flex: 2, color: c.subText }]}>{row.assessment}</Text>
                <Text style={[styles.tableCell, { flex: 1, color: c.subText }]}>{row.score}</Text>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View style={[styles.gradeBadge, { backgroundColor: row.color }]}>
                    <Text style={[styles.gradeText, { color: row.textColor }]}>{row.grade}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Attendance</Text>
          <View style={[styles.card, { backgroundColor: c.card, flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10 }]}>
            <View style={styles.attendanceCircle}>
              <Text style={styles.attendancePercent}>92%</Text>
            </View>
            <View>
              <Text style={[styles.attendanceTitle, { color: c.text }]}>Overall Attendance</Text>
              <Text style={[styles.attendanceSub, { color: c.subText }]}>You missed 3 classes this semester.</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' },
  sidebar: { position: 'absolute', top: 0, left: 0, bottom: 0, width: 260, padding: 24, elevation: 20, paddingTop: 50 },
  sidebarHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
  sidebarItem: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12, borderRadius: 12, marginBottom: 4 },
  sidebarIcon: { fontSize: 20 },
  sidebarLabel: { fontSize: 15, fontWeight: '600', flex: 1 },
  sidebarDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2563eb' },
  header: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3, borderBottomWidth: 1 },
  hamburger: { gap: 5, padding: 4 },
  hLine: { height: 2.5, width: 22, borderRadius: 2 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  iconBtnText: { fontSize: 16 },
  logoSmall: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  logoSmallText: { fontSize: 18 },
  logoName: { fontSize: 15, fontWeight: '900' },
  logoSub: { fontSize: 11 },
  scroll: { padding: 16 },
  welcomeCard: { backgroundColor: '#2563eb', borderRadius: 20, padding: 20, marginBottom: 20 },
  welcomeTop: { flexDirection: 'row', gap: 14, marginBottom: 16 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  avatarText: { fontSize: 28 },
  welcomeInfo: { flex: 1, justifyContent: 'center' },
  welcomeName: { fontSize: 18, fontWeight: '900', color: 'white' },
  welcomeSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  welcomeMeta: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: 10, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '900', color: 'white' },
  statLbl: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700' },
  viewAll: { fontSize: 13, color: '#2563eb', fontWeight: '600' },
  courseCard: { width: 160, borderRadius: 16, marginRight: 12, overflow: 'hidden', elevation: 3 },
  courseTop: { height: 80, padding: 10, justifyContent: 'flex-start' },
  courseCode: { backgroundColor: 'rgba(255,255,255,0.25)', color: 'white', fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  courseBody: { padding: 12 },
  courseName: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  courseProf: { fontSize: 11, marginBottom: 6 },
  courseTime: { fontSize: 11, marginBottom: 10 },
  courseBtn: { backgroundColor: '#2563eb', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  courseBtnText: { color: 'white', fontSize: 12, fontWeight: '700' },
  card: { borderRadius: 16, padding: 16, elevation: 2 },
  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, gap: 12 },
  taskCheck: { width: 20, height: 20, borderRadius: 6, borderWidth: 2 },
  taskInfo: { flex: 1 },
  taskName: { fontSize: 13, fontWeight: '600' },
  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  priorityBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4 },
  priorityText: { fontSize: 10, fontWeight: '700' },
  taskType: { fontSize: 10 },
  tableHeader: { flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1, marginBottom: 4 },
  tableHead: { fontSize: 10, color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 },
  tableCell: { fontSize: 12 },
  gradeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  gradeText: { fontSize: 11, fontWeight: '700' },
  attendanceCircle: { width: 70, height: 70, borderRadius: 35, borderWidth: 7, borderColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  attendancePercent: { fontSize: 16, fontWeight: '900', color: '#2563eb' },
  attendanceTitle: { fontSize: 15, fontWeight: '700' },
  attendanceSub: { fontSize: 12, marginTop: 4 },
});