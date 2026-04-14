// import { useState } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Image,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import { useTheme } from '../../context/ThemeContext';


// const ANNOUNCEMENTS = [
//   {
//     id: 1,
//     title: 'Midterm Review Session Scheduled',
//     body: 'The midterm review will take place this Friday at 4:00 PM in Hall B. We will cover complexity analysis and recursive patterns. Bring your questions!',
//     time: '2 HOURS AGO',
//     doctor: 'Dr. Marcus Thorne',
//   },
//   {
//     id: 2,
//     title: 'Updated Lab 4 Submission Guidelines',
//     body: 'Please ensure your Git repositories are public and the README is updated with your full name and student ID.',
//     time: 'YESTERDAY',
//     doctor: 'Dr. Marcus Thorne',
//   },
//   {
//     id: 3,
//     title: 'Extra Credit Opportunity',
//     body: 'Students who attend the guest lecture on Thursday will receive extra credit. Register via the student portal.',
//     time: '3 DAYS AGO',
//     doctor: 'Dr. Marcus Thorne',
//   },
// ];

// const CURRICULUM = [
//   {
//     week: '01',
//     title: 'Introduction to Binary & Logic Gates',
//     desc: 'Exploring the physical foundations of computing and binary arithmetic.',
//     status: 'COMPLETED',
//     files: [
//       { name: 'Lec01_Slides.pdf', size: '2.4 MB', icon: '📄' },
//       { name: 'Recording: Logic Gates', size: '45:12 mins', icon: '🎥' },
//     ],
//   },
//   {
//     week: '02',
//     title: 'Control Flow & Python Basics',
//     desc: 'Starting our journey into high-level programming and conditional logic.',
//     status: 'IN PROGRESS',
//     files: [
//       { name: 'Lab 02: Conditional Exercises', size: '', icon: '📝' },
//       { name: 'Video: While vs For Loops', size: '', icon: '▶️' },
//     ],
//   },
//   {
//     week: '03',
//     title: 'Data Structures: Lists & Tuples',
//     desc: 'Available Mar 15, 2024',
//     status: 'LOCKED',
//     files: [],
//   },
// ];

// const DUE_SOON = [
//   { date: 'MAR 12', title: 'Problem Set 01', sub: 'Computational Thinking', progress: 65, urgent: false },
//   { date: 'MAR 14', title: 'Quiz 02: Binary', sub: 'Online Proctored', progress: 0, urgent: true },
//   { date: 'MAR 18', title: 'Lab Submission 02', sub: 'Control Flow', progress: 0, urgent: false },
// ];

// export default function StudentClassDetails() {
//    const [activeTab, setActiveTab] = useState('announcements');
// const { colors: c, toggleDark, dark } = useTheme();
//   const router = useRouter();

//   return (
//     <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>

//       {/* Header */}
//       <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
//         <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//           <Text style={[styles.backIcon, { color: c.text }]}>←</Text>
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: c.text }]}>Class Details</Text>
//         <TouchableOpacity
//           style={[styles.iconBtn, { backgroundColor: c.bg }]}
//           onPress={() => setDark(!dark)}
//         >
//           <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>

//         {/* Course Banner */}
//         <View style={styles.bannerWrap}>
//           <Image
//             source={{ uri: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80' }}
//             style={styles.bannerImage}
//             resizeMode="cover"
//           />
//           <View style={styles.bannerOverlay}>
//             <View style={styles.bannerBadges}>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>CS-101</Text>
//               </View>
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>SPRING 2024</Text>
//               </View>
//             </View>
//             <Text style={styles.bannerTitle}>Intro to Computer Science</Text>
//             <Text style={styles.bannerSub}>
//               Master the fundamentals of algorithmic thinking, data structures, and modern software engineering with Professor Marcus Sterling.
//             </Text>
//             <View style={styles.bannerBtns}>
//               <TouchableOpacity style={styles.bannerBtn}>
//                 <Text style={styles.bannerBtnText}>⬇️ Download Syllabus</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.bannerBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
//                 <Text style={styles.bannerBtnText}>💬 Class Forum</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         {/* Tabs */}
//         <View style={[styles.tabsRow, { backgroundColor: c.card, borderBottomColor: c.border }]}>
//           {[
//             { key: 'announcements', label: '📢 Announcements' },
//             { key: 'curriculum', label: '📚 Curriculum' },
//             { key: 'due', label: '📅 Due Soon' },
//           ].map((tab) => (
//             <TouchableOpacity
//               key={tab.key}
//               style={[styles.tab, activeTab === tab.key && styles.tabActive]}
//               onPress={() => setActiveTab(tab.key)}
//             >
//               <Text style={[styles.tabText, { color: c.subText }, activeTab === tab.key && styles.tabTextActive]}>
//                 {tab.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Announcements Tab */}
//         {activeTab === 'announcements' && (
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}>
//               <Text style={[styles.sectionTitle, { color: c.text }]}>Recent Announcements</Text>
//               <TouchableOpacity>
//                 <Text style={styles.viewAll}>View All</Text>
//               </TouchableOpacity>
//             </View>
//             {ANNOUNCEMENTS.map((ann) => (
//               <View key={ann.id} style={[styles.announcementCard, { backgroundColor: c.card, borderLeftColor: '#2563eb' }]}>
//                 <View style={styles.annTop}>
//                   <Text style={[styles.annTitle, { color: c.text }]}>{ann.title}</Text>
//                   <Text style={[styles.annTime, { color: c.subText }]}>{ann.time}</Text>
//                 </View>
//                 <Text style={[styles.annBody, { color: c.subText }]}>{ann.body}</Text>
//                 <Text style={[styles.annDoctor, { color: '#2563eb' }]}>— {ann.doctor}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Curriculum Tab */}
//         {activeTab === 'curriculum' && (
//           <View style={styles.section}>
//             <Text style={[styles.sectionTitle, { color: c.text }]}>Course Curriculum</Text>
//             {CURRICULUM.map((week, i) => (
//               <View key={i} style={[
//                 styles.weekCard,
//                 { backgroundColor: c.card },
//                 week.status === 'IN PROGRESS' && { borderWidth: 2, borderColor: '#2563eb' },
//                 week.status === 'LOCKED' && { opacity: 0.6 },
//               ]}>
//                 <View style={styles.weekTop}>
//                   <View style={[
//                     styles.weekNumBox,
//                     { backgroundColor: week.status === 'COMPLETED' ? '#f1f5f9' : week.status === 'IN PROGRESS' ? '#2563eb' : '#e5e7eb' }
//                   ]}>
//                     <Text style={styles.weekLabel}>WEEK</Text>
//                     <Text style={[styles.weekNum, { color: week.status === 'IN PROGRESS' ? 'white' : '#1e1b4b' }]}>{week.week}</Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <View style={styles.weekTitleRow}>
//                       {week.status !== 'LOCKED' && (
//                         <View style={[
//                           styles.statusBadge,
//                           { backgroundColor: week.status === 'COMPLETED' ? '#dcfce7' : '#dbeafe' }
//                         ]}>
//                           <Text style={[
//                             styles.statusText,
//                             { color: week.status === 'COMPLETED' ? '#15803d' : '#1d4ed8' }
//                           ]}>{week.status}</Text>
//                         </View>
//                       )}
//                       {week.status === 'LOCKED' && <Text style={styles.lockIcon}>🔒</Text>}
//                     </View>
//                     <Text style={[styles.weekTitle, { color: c.text }]}>{week.title}</Text>
//                     <Text style={[styles.weekDesc, { color: c.subText }]}>{week.desc}</Text>
//                   </View>
//                 </View>
//                 {week.files.length > 0 && (
//                   <View style={[styles.filesWrap, { borderTopColor: c.border }]}>
//                     {week.files.map((file, j) => (
//                       <TouchableOpacity key={j} style={[styles.fileRow, { backgroundColor: c.bg }]}>
//                         <Text style={styles.fileIcon}>{file.icon}</Text>
//                         <Text style={[styles.fileName, { color: c.text }]}>{file.name}</Text>
//                         {file.size !== '' && (
//                           <Text style={[styles.fileSize, { color: c.subText }]}>{file.size}</Text>
//                         )}
//                         <Text style={styles.fileAction}>→</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Due Soon Tab */}
//         {activeTab === 'due' && (
//           <View style={styles.section}>
//             <Text style={[styles.sectionTitle, { color: c.text }]}>Due Soon</Text>
//             {DUE_SOON.map((item, i) => (
//               <View key={i} style={[styles.dueCard, { backgroundColor: c.card }]}>
//                 <View style={[styles.dueDateBox, { backgroundColor: item.urgent ? '#fee2e2' : '#eff6ff' }]}>
//                   <Text style={[styles.dueDateText, { color: item.urgent ? '#dc2626' : '#2563eb' }]}>{item.date}</Text>
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text style={[styles.dueTitle, { color: c.text }]}>{item.title}</Text>
//                   <Text style={[styles.dueSub, { color: c.subText }]}>{item.sub}</Text>
//                   {item.urgent && (
//                     <View style={styles.urgentBadge}>
//                       <Text style={styles.urgentText}>URGENT</Text>
//                     </View>
//                   )}
//                   {item.progress > 0 && (
//                     <View style={styles.progressWrap}>
//                       <View style={[styles.progressBg, { backgroundColor: c.border }]}>
//                         <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
//                       </View>
//                       <Text style={[styles.progressText, { color: c.subText }]}>{item.progress}% Progress</Text>
//                     </View>
//                   )}
//                   {item.progress === 0 && !item.urgent && (
//                     <Text style={[styles.notStarted, { color: c.subText }]}>Not started</Text>
//                   )}
//                 </View>
//               </View>
//             ))}
//             <TouchableOpacity style={styles.calendarBtn}>
//               <Text style={styles.calendarBtnText}>📅 View Assignment Calendar</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Course Lead */}
//         <View style={styles.section}>
//           <Text style={[styles.sectionTitle, { color: c.text }]}>Course Lead</Text>
//           <View style={[styles.courseLeadCard, { backgroundColor: c.card }]}>
//             <View style={styles.courseLeadAvatar}>
//               <Text style={styles.courseLeadAvatarText}>M</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={[styles.courseLeadName, { color: c.text }]}>Dr. Marcus Sterling</Text>
//               <Text style={[styles.courseLeadRole, { color: c.subText }]}>Head of CS Department</Text>
//               <Text style={[styles.courseLeadInfo, { color: c.subText }]}>✉️ m.sterling@scholar.edu</Text>
//               <Text style={[styles.courseLeadInfo, { color: c.subText }]}>🕐 OH: Tue/Thu 2PM-4PM</Text>
//             </View>
//           </View>
//           <TouchableOpacity style={styles.scheduleBtn}>
//             <Text style={styles.scheduleBtnText}>Schedule Meeting</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={{ height: 20 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const lightColors = {
//   bg: '#f0f4ff',
//   card: '#ffffff',
//   text: '#1e1b4b',
//   subText: '#64748b',
//   border: '#e5e7eb',
// };

// const darkColors = {
//   bg: '#0f172a',
//   card: '#1e293b',
//   text: '#f1f5f9',
//   subText: '#94a3b8',
//   border: '#334155',
// };

// const styles = StyleSheet.create({
//   safe: { flex: 1 },
//   header: {
//     padding: 14, flexDirection: 'row',
//     justifyContent: 'space-between', alignItems: 'center',
//     elevation: 3, borderBottomWidth: 1,
//   },
//   backBtn: { padding: 4 },
//   backIcon: { fontSize: 22, fontWeight: '800' },
//   headerTitle: { fontSize: 18, fontWeight: '800' },
//   iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
//   iconBtnText: { fontSize: 16 },
//   scroll: { paddingBottom: 20 },
//   bannerWrap: { position: 'relative', height: 240 },
//   bannerImage: { width: '100%', height: 240 },
//   bannerOverlay: {
//     position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.55)', padding: 20, justifyContent: 'flex-end',
//   },
//   bannerBadges: { flexDirection: 'row', gap: 8, marginBottom: 10 },
//   badge: {
//     backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10,
//     paddingVertical: 4, borderRadius: 8,
//   },
//   badgeText: { color: 'white', fontSize: 11, fontWeight: '700' },
//   bannerTitle: { fontSize: 22, fontWeight: '900', color: 'white', marginBottom: 8 },
//   bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 18, marginBottom: 14 },
//   bannerBtns: { flexDirection: 'row', gap: 10 },
//   bannerBtn: {
//     flex: 1, backgroundColor: '#2563eb', borderRadius: 10,
//     paddingVertical: 10, alignItems: 'center',
//   },
//   bannerBtnText: { color: 'white', fontSize: 12, fontWeight: '700' },
//   tabsRow: {
//     flexDirection: 'row', borderBottomWidth: 1,
//     paddingHorizontal: 16,
//   },
//   tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
//   tabActive: { borderBottomWidth: 2, borderBottomColor: '#2563eb' },
//   tabText: { fontSize: 12, fontWeight: '600' },
//   tabTextActive: { color: '#2563eb' },
//   section: { padding: 16, marginBottom: 4 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
//   sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
//   viewAll: { fontSize: 13, color: '#2563eb', fontWeight: '600' },
//   announcementCard: {
//     borderRadius: 14, padding: 14, marginBottom: 12,
//     borderLeftWidth: 4, elevation: 2,
//   },
//   annTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
//   annTitle: { fontSize: 14, fontWeight: '700', flex: 1, marginRight: 8 },
//   annTime: { fontSize: 10, fontWeight: '600' },
//   annBody: { fontSize: 13, lineHeight: 19, marginBottom: 8 },
//   annDoctor: { fontSize: 12, fontWeight: '600' },
//   weekCard: { borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2 },
//   weekTop: { flexDirection: 'row', gap: 14 },
//   weekNumBox: {
//     width: 56, height: 56, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   weekLabel: { fontSize: 9, fontWeight: '700', color: '#64748b' },
//   weekNum: { fontSize: 20, fontWeight: '900' },
//   weekTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
//   statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
//   statusText: { fontSize: 10, fontWeight: '700' },
//   lockIcon: { fontSize: 14 },
//   weekTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
//   weekDesc: { fontSize: 12, lineHeight: 16 },
//   filesWrap: { borderTopWidth: 1, marginTop: 14, paddingTop: 12, gap: 8 },
//   fileRow: {
//     flexDirection: 'row', alignItems: 'center',
//     padding: 10, borderRadius: 10, gap: 10,
//   },
//   fileIcon: { fontSize: 18 },
//   fileName: { flex: 1, fontSize: 13, fontWeight: '600' },
//   fileSize: { fontSize: 11 },
//   fileAction: { fontSize: 16, color: '#2563eb', fontWeight: '800' },
//   dueCard: {
//     flexDirection: 'row', gap: 14, padding: 14,
//     borderRadius: 14, marginBottom: 12, elevation: 2, alignItems: 'flex-start',
//   },
//   dueDateBox: {
//     width: 56, height: 56, borderRadius: 12,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   dueDateText: { fontSize: 11, fontWeight: '800', textAlign: 'center' },
//   dueTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
//   dueSub: { fontSize: 12, marginBottom: 6 },
//   urgentBadge: {
//     backgroundColor: '#dc2626', paddingHorizontal: 8,
//     paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start',
//   },
//   urgentText: { color: 'white', fontSize: 10, fontWeight: '700' },
//   progressWrap: { marginTop: 6 },
//   progressBg: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
//   progressFill: { height: 6, backgroundColor: '#2563eb', borderRadius: 3 },
//   progressText: { fontSize: 11 },
//   notStarted: { fontSize: 11 },
//   calendarBtn: {
//     backgroundColor: '#1e293b', borderRadius: 12,
//     paddingVertical: 14, alignItems: 'center', marginTop: 8,
//   },
//   calendarBtnText: { color: 'white', fontSize: 14, fontWeight: '700' },
//   courseLeadCard: {
//     flexDirection: 'row', gap: 14, padding: 16,
//     borderRadius: 16, elevation: 2, marginBottom: 12,
//   },
//   courseLeadAvatar: {
//     width: 56, height: 56, borderRadius: 28,
//     backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center',
//   },
//   courseLeadAvatarText: { color: 'white', fontSize: 22, fontWeight: '900' },
//   courseLeadName: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
//   courseLeadRole: { fontSize: 12, marginBottom: 8 },
//   courseLeadInfo: { fontSize: 12, marginBottom: 4 },
//   scheduleBtn: {
//     borderWidth: 2, borderColor: '#2563eb', borderRadius: 12,
//     paddingVertical: 12, alignItems: 'center',
//   },
//   scheduleBtnText: { color: '#2563eb', fontSize: 14, fontWeight: '700' },
// });


import { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const ANNOUNCEMENTS = [
  { id: 1, title: 'Midterm Review Session Scheduled', body: 'The midterm review will take place this Friday at 4:00 PM in Hall B. We will cover complexity analysis and recursive patterns.', time: '2 HOURS AGO', doctor: 'Dr. Marcus Thorne' },
  { id: 2, title: 'Updated Lab 4 Submission Guidelines', body: 'Please ensure your Git repositories are public and the README is updated with your full name and student ID.', time: 'YESTERDAY', doctor: 'Dr. Marcus Thorne' },
  { id: 3, title: 'Extra Credit Opportunity', body: 'Students who attend the guest lecture on Thursday will receive extra credit. Register via the student portal.', time: '3 DAYS AGO', doctor: 'Dr. Marcus Thorne' },
];

const CURRICULUM = [
  { week: '01', title: 'Introduction to Binary & Logic Gates', desc: 'Exploring the physical foundations of computing and binary arithmetic.', status: 'COMPLETED', files: [{ name: 'Lec01_Slides.pdf', size: '2.4 MB', icon: '📄' }, { name: 'Recording: Logic Gates', size: '45:12 mins', icon: '🎥' }] },
  { week: '02', title: 'Control Flow & Python Basics', desc: 'Starting our journey into high-level programming and conditional logic.', status: 'IN PROGRESS', files: [{ name: 'Lab 02: Conditional Exercises', size: '', icon: '📝' }, { name: 'Video: While vs For Loops', size: '', icon: '▶️' }] },
  { week: '03', title: 'Data Structures: Lists & Tuples', desc: 'Available Mar 15, 2024', status: 'LOCKED', files: [] },
];

const DUE_SOON = [
  { date: 'MAR\n12', title: 'Problem Set 01', sub: 'Computational Thinking', progress: 65, urgent: false },
  { date: 'MAR\n14', title: 'Quiz 02: Binary', sub: 'Online Proctored', progress: 0, urgent: true },
  { date: 'MAR\n18', title: 'Lab Submission 02', sub: 'Control Flow', progress: 0, urgent: false },
];

export default function StudentClassDetails() {
  const [activeTab, setActiveTab] = useState('announcements');
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>
      <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backIcon, { color: c.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Class Details</Text>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]} onPress={toggleDark}>
          <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.bannerWrap}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80' }} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.bannerOverlay}>
            <View style={styles.bannerBadges}>
              <View style={styles.badge}><Text style={styles.badgeText}>CS-101</Text></View>
              <View style={styles.badge}><Text style={styles.badgeText}>SPRING 2024</Text></View>
            </View>
            <Text style={styles.bannerTitle}>Intro to Computer Science</Text>
            <Text style={styles.bannerSub}>Master the fundamentals of algorithmic thinking, data structures, and modern software engineering.</Text>
            <View style={styles.bannerBtns}>
              <TouchableOpacity style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>⬇️ Download Syllabus</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.bannerBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                <Text style={styles.bannerBtnText}>💬 Class Forum</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.tabsRow, { backgroundColor: c.card, borderBottomColor: c.border }]}>
          {[
            { key: 'announcements', label: '📢 Announcements' },
            { key: 'curriculum', label: '📚 Curriculum' },
            { key: 'due', label: '📅 Due Soon' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, { color: c.subText }, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'announcements' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: c.text }]}>Recent Announcements</Text>
              <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
            </View>
            {ANNOUNCEMENTS.map((ann) => (
              <View key={ann.id} style={[styles.annCard, { backgroundColor: c.card }]}>
                <View style={styles.annTop}>
                  <Text style={[styles.annTitle, { color: c.text }]}>{ann.title}</Text>
                  <Text style={[styles.annTime, { color: c.subText }]}>{ann.time}</Text>
                </View>
                <Text style={[styles.annBody, { color: c.subText }]}>{ann.body}</Text>
                <Text style={styles.annDoctor}>— {ann.doctor}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'curriculum' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>Course Curriculum</Text>
            {CURRICULUM.map((week, i) => (
              <View key={i} style={[
                styles.weekCard, { backgroundColor: c.card },
                week.status === 'IN PROGRESS' && { borderWidth: 2, borderColor: '#2563eb' },
                week.status === 'LOCKED' && { opacity: 0.6 },
              ]}>
                <View style={styles.weekTop}>
                  <View style={[styles.weekNumBox, { backgroundColor: week.status === 'IN PROGRESS' ? '#2563eb' : c.bg }]}>
                    <Text style={styles.weekLabel}>WEEK</Text>
                    <Text style={[styles.weekNum, { color: week.status === 'IN PROGRESS' ? 'white' : c.text }]}>{week.week}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.weekTitleRow}>
                      {week.status !== 'LOCKED'
                        ? <View style={[styles.statusBadge, { backgroundColor: week.status === 'COMPLETED' ? '#dcfce7' : '#dbeafe' }]}>
                            <Text style={[styles.statusText, { color: week.status === 'COMPLETED' ? '#15803d' : '#1d4ed8' }]}>{week.status}</Text>
                          </View>
                        : <Text>🔒</Text>
                      }
                    </View>
                    <Text style={[styles.weekTitle, { color: c.text }]}>{week.title}</Text>
                    <Text style={[styles.weekDesc, { color: c.subText }]}>{week.desc}</Text>
                  </View>
                </View>
                {week.files.length > 0 && (
                  <View style={[styles.filesWrap, { borderTopColor: c.border }]}>
                    {week.files.map((file, j) => (
                      <TouchableOpacity key={j} style={[styles.fileRow, { backgroundColor: c.bg }]}>
                        <Text style={styles.fileIcon}>{file.icon}</Text>
                        <Text style={[styles.fileName, { color: c.text }]}>{file.name}</Text>
                        {file.size !== '' && <Text style={[styles.fileSize, { color: c.subText }]}>{file.size}</Text>}
                        <Text style={{ color: '#2563eb', fontWeight: '800' }}>→</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {activeTab === 'due' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: c.text }]}>Due Soon</Text>
            {DUE_SOON.map((item, i) => (
              <View key={i} style={[styles.dueCard, { backgroundColor: c.card }]}>
                <View style={[styles.dueDateBox, { backgroundColor: item.urgent ? '#fee2e2' : '#eff6ff' }]}>
                  <Text style={[styles.dueDateText, { color: item.urgent ? '#dc2626' : '#2563eb' }]}>{item.date}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.dueTitle, { color: c.text }]}>{item.title}</Text>
                  <Text style={[styles.dueSub, { color: c.subText }]}>{item.sub}</Text>
                  {item.urgent && <View style={styles.urgentBadge}><Text style={styles.urgentText}>URGENT</Text></View>}
                  {item.progress > 0 && (
                    <View style={styles.progressWrap}>
                      <View style={[styles.progressBg, { backgroundColor: c.border }]}>
                        <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                      </View>
                      <Text style={[styles.progressText, { color: c.subText }]}>{item.progress}% Progress</Text>
                    </View>
                  )}
                  {item.progress === 0 && !item.urgent && <Text style={[styles.notStarted, { color: c.subText }]}>Not started</Text>}
                </View>
              </View>
            ))}
            <TouchableOpacity style={[styles.calendarBtn, { backgroundColor: c.card, borderWidth: 1, borderColor: c.border }]}>
              <Text style={[styles.calendarBtnText, { color: c.text }]}>📅 View Assignment Calendar</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Course Lead</Text>
          <View style={[styles.courseLeadCard, { backgroundColor: c.card }]}>
            <View style={styles.courseLeadAvatar}>
              <Text style={styles.courseLeadAvatarText}>M</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.courseLeadName, { color: c.text }]}>Dr. Marcus Sterling</Text>
              <Text style={[styles.courseLeadRole, { color: c.subText }]}>Head of CS Department</Text>
              <Text style={[styles.courseLeadInfo, { color: c.subText }]}>✉️ m.sterling@scholar.edu</Text>
              <Text style={[styles.courseLeadInfo, { color: c.subText }]}>🕐 OH: Tue/Thu 2PM-4PM</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.scheduleBtn}>
            <Text style={styles.scheduleBtnText}>Schedule Meeting</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3, borderBottomWidth: 1 },
  backBtn: { padding: 4 },
  backIcon: { fontSize: 22, fontWeight: '800' },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  iconBtnText: { fontSize: 16 },
  scroll: { paddingBottom: 20 },
  bannerWrap: { position: 'relative', height: 240 },
  bannerImage: { width: '100%', height: 240 },
  bannerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.55)', padding: 20, justifyContent: 'flex-end' },
  bannerBadges: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: 'white', fontSize: 11, fontWeight: '700' },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: 'white', marginBottom: 8 },
  bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 18, marginBottom: 14 },
  bannerBtns: { flexDirection: 'row', gap: 10 },
  bannerBtn: { flex: 1, backgroundColor: '#2563eb', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  bannerBtnText: { color: 'white', fontSize: 12, fontWeight: '700' },
  tabsRow: { flexDirection: 'row', borderBottomWidth: 1 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#2563eb' },
  tabText: { fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: '#2563eb' },
  section: { padding: 16, marginBottom: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  viewAll: { fontSize: 13, color: '#2563eb', fontWeight: '600' },
  annCard: { borderRadius: 14, padding: 14, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#2563eb', elevation: 2 },
  annTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  annTitle: { fontSize: 14, fontWeight: '700', flex: 1, marginRight: 8 },
  annTime: { fontSize: 10, fontWeight: '600' },
  annBody: { fontSize: 13, lineHeight: 19, marginBottom: 8 },
  annDoctor: { fontSize: 12, fontWeight: '600', color: '#2563eb' },
  weekCard: { borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2 },
  weekTop: { flexDirection: 'row', gap: 14 },
  weekNumBox: { width: 56, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  weekLabel: { fontSize: 9, fontWeight: '700', color: '#64748b' },
  weekNum: { fontSize: 20, fontWeight: '900' },
  weekTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: '700' },
  weekTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  weekDesc: { fontSize: 12, lineHeight: 16 },
  filesWrap: { borderTopWidth: 1, marginTop: 14, paddingTop: 12, gap: 8 },
  fileRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, gap: 10 },
  fileIcon: { fontSize: 18 },
  fileName: { flex: 1, fontSize: 13, fontWeight: '600' },
  fileSize: { fontSize: 11 },
  dueCard: { flexDirection: 'row', gap: 14, padding: 14, borderRadius: 14, marginBottom: 12, elevation: 2, alignItems: 'flex-start' },
  dueDateBox: { width: 56, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  dueDateText: { fontSize: 11, fontWeight: '800', textAlign: 'center' },
  dueTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  dueSub: { fontSize: 12, marginBottom: 6 },
  urgentBadge: { backgroundColor: '#dc2626', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start' },
  urgentText: { color: 'white', fontSize: 10, fontWeight: '700' },
  progressWrap: { marginTop: 6 },
  progressBg: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: 6, backgroundColor: '#2563eb', borderRadius: 3 },
  progressText: { fontSize: 11 },
  notStarted: { fontSize: 11 },
  calendarBtn: { borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  calendarBtnText: { fontSize: 14, fontWeight: '700' },
  courseLeadCard: { flexDirection: 'row', gap: 14, padding: 16, borderRadius: 16, elevation: 2, marginBottom: 12 },
  courseLeadAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  courseLeadAvatarText: { color: 'white', fontSize: 22, fontWeight: '900' },
  courseLeadName: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
  courseLeadRole: { fontSize: 12, marginBottom: 8 },
  courseLeadInfo: { fontSize: 12, marginBottom: 4 },
  scheduleBtn: { borderWidth: 2, borderColor: '#2563eb', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  scheduleBtnText: { color: '#2563eb', fontSize: 14, fontWeight: '700' },
});