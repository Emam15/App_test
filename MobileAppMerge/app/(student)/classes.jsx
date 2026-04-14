// import { useState } from 'react';
// import {
//   View, Text, ScrollView, StyleSheet,
//   TouchableOpacity, Image, Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import { useTheme } from '../../context/ThemeContext';


// const CLASSES = [
//   {
//     id: 1,
//     code: 'CS-402',
//     name: 'Network Security Fundamentals',
//     desc: 'A deep dive into modern encryption and firewall architectures.',
//     doctor: 'Dr. Marcus Thorne',
//     dept: 'Computer Science Dept.',
//     rating: 4.8,
//     students: 120,
//     category: 'Computer Science',
//     image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80',
//     joined: false,
//   },
//   {
//     id: 2,
//     code: 'ENG-310',
//     name: 'Advanced Robotics Lab',
//     desc: 'Hands-on experience with kinematic programming and sensory integration.',
//     doctor: 'Dr. Sarah Jenkins',
//     dept: 'Mechatronics Dept.',
//     rating: 4.9,
//     students: 45,
//     category: 'Engineering',
//     image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80',
//     joined: false,
//   },
//   {
//     id: 3,
//     code: 'ART-105',
//     name: 'UI/UX Architectural Systems',
//     desc: 'Mastering the balance between aesthetic brilliance and functional design.',
//     doctor: 'Prof. Elias Vance',
//     dept: 'Visual Arts Dept.',
//     rating: 5.0,
//     students: 82,
//     category: 'Design & Arts',
//     image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
//     joined: true,
//   },
//   {
//     id: 4,
//     code: 'MTH-500',
//     name: 'Stochastic Processes',
//     desc: 'Mathematical modeling of systems that evolve with uncertainty.',
//     doctor: 'Dr. Lisa Ray',
//     dept: 'Applied Mathematics',
//     rating: 4.7,
//     students: 30,
//     category: 'Mathematics',
//     image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80',
//     joined: false,
//   },
//   {
//     id: 5,
//     code: 'HUM-221',
//     name: 'Post-Modern Narratives',
//     desc: 'Analyzing the shift from absolute truths to relative perspectives.',
//     doctor: 'Dr. Angela Wu',
//     dept: 'Literature Dept.',
//     rating: 4.5,
//     students: 55,
//     category: 'Humanities',
//     image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
//     joined: false,
//   },
//   {
//     id: 6,
//     code: 'BUS-440',
//     name: 'Global Market Analytics',
//     desc: 'Predictive modeling for emerging international trade opportunities.',
//     doctor: 'Prof. Robert Chen',
//     dept: 'School of Business',
//     rating: 4.6,
//     students: 110,
//     category: 'Business',
//     image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80',
//     joined: false,
//   },
// ];

// const FILTERS = ['All Categories', 'Computer Science', 'Engineering', 'Mathematics', 'Design & Arts', 'Humanities', 'Business'];

// export default function StudentClasses() {
//   const [menuOpen, setMenuOpen] = useState(false);
//    const [activeFilter, setActiveFilter] = useState('All Categories');
//   const [classes, setClasses] = useState(CLASSES);
// const { colors: c, toggleDark, dark } = useTheme();
//   const router = useRouter();

//   const filtered = activeFilter === 'All Categories'
//     ? classes
//     : classes.filter(cls => cls.category === activeFilter);

//   const handleJoin = (id, e) => {
//     e.stopPropagation();
//     const cls = classes.find(c => c.id === id);
//     setClasses(prev => prev.map(c =>
//       c.id === id ? { ...c, joined: !c.joined } : c
//     ));
//     Alert.alert(
//       cls.joined ? 'Left Class' : 'Joined! 🎉',
//       cls.joined ? `You left ${cls.name}` : `You joined ${cls.name} successfully!`
//     );
//   };

//   return (
//     <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>

//       {/* Sidebar Modal */}
//       {menuOpen && (
//         <View style={styles.sidebarWrap}>
//           <TouchableOpacity style={styles.overlay} onPress={() => setMenuOpen(false)} />
//           <View style={[styles.sidebar, { backgroundColor: c.card }]}>
//             <View style={styles.sidebarHeader}>
//               <View style={styles.logoSmall}>
//                 <Text style={styles.logoSmallText}>🎓</Text>
//               </View>
//               <View>
//                 <Text style={[styles.logoName, { color: c.text }]}>UAPMP</Text>
//                 <Text style={[styles.logoSub, { color: c.subText }]}>Student Portal</Text>
//               </View>
//             </View>
//             {[
//               { icon: '🏠', label: 'Dashboard', route: '/(student)/home' },
//               { icon: '📚', label: 'Courses', active: true },
//               { icon: '⭐', label: 'Grades' },
//               { icon: '📅', label: 'Schedule' },
//               { icon: '⚙️', label: 'Settings' },
//             ].map((item, i) => (
//               <TouchableOpacity
//                 key={i}
//                 style={[styles.sidebarItem, item.active && { backgroundColor: '#2563eb22' }]}
//                 onPress={() => {
//                   setMenuOpen(false);
//                   if (item.route) router.push(item.route);
//                 }}
//               >
//                 <Text style={styles.sidebarIcon}>{item.icon}</Text>
//                 <Text style={[styles.sidebarLabel, { color: item.active ? '#2563eb' : c.text }]}>
//                   {item.label}
//                 </Text>
//                 {item.active && <View style={styles.sidebarDot} />}
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity
//               style={[styles.sidebarItem, { marginTop: 20, borderTopWidth: 1, borderTopColor: c.border }]}
//             >
//               <Text style={styles.sidebarIcon}>🚪</Text>
//               <Text style={[styles.sidebarLabel, { color: '#dc2626' }]}>Logout</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Header */}
//       <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
//         <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.hamburger}>
//           <View style={[styles.hLine, { backgroundColor: c.text }]} />
//           <View style={[styles.hLine, { backgroundColor: c.text, width: 16 }]} />
//           <View style={[styles.hLine, { backgroundColor: c.text, width: 10 }]} />
//         </TouchableOpacity>
//         <Text style={[styles.headerTitle, { color: c.text }]}>Classes</Text>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]}>
//             <Text style={styles.iconBtnText}>🔔</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.iconBtn, { backgroundColor: c.bg }]}
//             onPress={() => setDark(!dark)}
//           >
//             <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView contentContainerStyle={styles.scroll}>

//         {/* Banner */}
//         <View style={styles.banner}>
//           <Text style={styles.bannerTitle}>Spring 2024 Course Catalog</Text>
//           <Text style={styles.bannerSub}>
//             Explore available programs and design your academic pathway for the upcoming semester.
//           </Text>
//         </View>

//         {/* Filters */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filtersScroll}
//           contentContainerStyle={styles.filtersContent}
//         >
//           {FILTERS.map((f, i) => (
//             <TouchableOpacity
//               key={i}
//               style={[
//                 styles.filterChip,
//                 { borderColor: c.border, backgroundColor: c.card },
//                 activeFilter === f && styles.filterChipActive,
//               ]}
//               onPress={() => setActiveFilter(f)}
//             >
//               <Text style={[
//                 styles.filterText,
//                 { color: c.subText },
//                 activeFilter === f && styles.filterTextActive,
//               ]}>{f}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Classes Grid */}
//         <View style={styles.grid}>
//           {filtered.map((cls) => (
//             <TouchableOpacity
//               key={cls.id}
//               style={[styles.classCard, { backgroundColor: c.card }]}
//               onPress={() => router.push('/(student)/class-details')}
//               activeOpacity={0.9}
//             >
//               {/* Image */}
//               <View style={styles.imageWrap}>
//                 <Image
//                   source={{ uri: cls.image }}
//                   style={styles.classImage}
//                   resizeMode="cover"
//                 />
//                 <View style={styles.codeBadge}>
//                   <Text style={styles.codeText}>{cls.code}</Text>
//                 </View>
//                 {cls.joined && (
//                   <View style={styles.joinedBadge}>
//                     <Text style={styles.joinedText}>✓ Enrolled</Text>
//                   </View>
//                 )}
//               </View>

//               {/* Info */}
//               <View style={styles.classBody}>
//                 <Text style={[styles.className, { color: c.text }]}>{cls.name}</Text>
//                 <Text style={[styles.classDesc, { color: c.subText }]} numberOfLines={2}>{cls.desc}</Text>

//                 {/* Doctor */}
//                 <View style={styles.doctorRow}>
//                   <View style={styles.doctorAvatar}>
//                     <Text style={styles.doctorAvatarText}>{cls.doctor[3]}</Text>
//                   </View>
//                   <View>
//                     <Text style={[styles.doctorName, { color: c.text }]}>{cls.doctor}</Text>
//                     <Text style={[styles.doctorDept, { color: c.subText }]}>{cls.dept}</Text>
//                   </View>
//                 </View>

//                 {/* Rating + Join */}
//                 <View style={styles.cardBottom}>
//                   <View style={styles.ratingRow}>
//                     <Text style={styles.star}>⭐</Text>
//                     <Text style={[styles.ratingVal, { color: c.text }]}>{cls.rating}</Text>
//                     <Text style={[styles.ratingCount, { color: c.subText }]}>({cls.students})</Text>
//                   </View>
//                   <TouchableOpacity
//                     style={[styles.joinBtn, cls.joined && styles.joinBtnLeave]}
//                     onPress={(e) => handleJoin(cls.id, e)}
//                   >
//                     <Text style={[styles.joinBtnText, cls.joined && styles.joinBtnTextLeave]}>
//                       {cls.joined ? 'Leave' : 'Join Class'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
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
//   sidebarWrap: {
//     position: 'absolute', top: 0, left: 0,
//     right: 0, bottom: 0, zIndex: 100,
//   },
//   overlay: {
//     position: 'absolute', top: 0, left: 0,
//     right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   sidebar: {
//     position: 'absolute', top: 0, left: 0,
//     bottom: 0, width: 260, padding: 24,
//     elevation: 20, paddingTop: 50,
//   },
//   sidebarHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
//   sidebarItem: {
//     flexDirection: 'row', alignItems: 'center',
//     gap: 14, padding: 12, borderRadius: 12, marginBottom: 4,
//   },
//   sidebarIcon: { fontSize: 20 },
//   sidebarLabel: { fontSize: 15, fontWeight: '600', flex: 1 },
//   sidebarDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2563eb' },
//   header: {
//     padding: 14, flexDirection: 'row',
//     justifyContent: 'space-between', alignItems: 'center',
//     elevation: 3, borderBottomWidth: 1,
//   },
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
//   banner: {
//     backgroundColor: '#2563eb', borderRadius: 20,
//     padding: 24, marginBottom: 16,
//   },
//   bannerTitle: { fontSize: 22, fontWeight: '900', color: 'white', marginBottom: 8 },
//   bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20 },
//   filtersScroll: { marginBottom: 16 },
//   filtersContent: { gap: 8, paddingRight: 16 },
//   filterChip: {
//     paddingHorizontal: 14, paddingVertical: 8,
//     borderRadius: 20, borderWidth: 1.5,
//   },
//   filterChipActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
//   filterText: { fontSize: 13, fontWeight: '600' },
//   filterTextActive: { color: 'white' },
//   grid: { gap: 16 },
//   classCard: { borderRadius: 20, overflow: 'hidden', elevation: 3 },
//   imageWrap: { position: 'relative' },
//   classImage: { width: '100%', height: 160 },
//   codeBadge: {
//     position: 'absolute', top: 10, left: 10,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
//   },
//   codeText: { color: 'white', fontSize: 11, fontWeight: '800' },
//   joinedBadge: {
//     position: 'absolute', top: 10, right: 10,
//     backgroundColor: '#16a34a',
//     paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
//   },
//   joinedText: { color: 'white', fontSize: 11, fontWeight: '700' },
//   classBody: { padding: 16 },
//   className: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
//   classDesc: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
//   doctorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
//   doctorAvatar: {
//     width: 36, height: 36, borderRadius: 18,
//     backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center',
//   },
//   doctorAvatarText: { color: 'white', fontSize: 14, fontWeight: '800' },
//   doctorName: { fontSize: 13, fontWeight: '700' },
//   doctorDept: { fontSize: 11, marginTop: 1 },
//   cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
//   ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
//   star: { fontSize: 14 },
//   ratingVal: { fontSize: 14, fontWeight: '700' },
//   ratingCount: { fontSize: 12 },
//   joinBtn: {
//     backgroundColor: '#2563eb', paddingHorizontal: 16,
//     paddingVertical: 8, borderRadius: 10,
//   },
//   joinBtnLeave: { backgroundColor: '#fee2e2', borderWidth: 1, borderColor: '#dc2626' },
//   joinBtnText: { color: 'white', fontSize: 13, fontWeight: '700' },
//   joinBtnTextLeave: { color: '#dc2626' },
// });

import { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Image, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const CLASSES = [
  { id: 1, code: 'CS-402', name: 'Network Security Fundamentals', desc: 'A deep dive into modern encryption and firewall architectures.', doctor: 'Dr. Marcus Thorne', dept: 'Computer Science Dept.', rating: 4.8, students: 120, category: 'Computer Science', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80', joined: false },
  { id: 2, code: 'ENG-310', name: 'Advanced Robotics Lab', desc: 'Hands-on experience with kinematic programming and sensory integration.', doctor: 'Dr. Sarah Jenkins', dept: 'Mechatronics Dept.', rating: 4.9, students: 45, category: 'Engineering', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80', joined: false },
  { id: 3, code: 'ART-105', name: 'UI/UX Architectural Systems', desc: 'Mastering the balance between aesthetic brilliance and functional design.', doctor: 'Prof. Elias Vance', dept: 'Visual Arts Dept.', rating: 5.0, students: 82, category: 'Design & Arts', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', joined: true },
  { id: 4, code: 'MTH-500', name: 'Stochastic Processes', desc: 'Mathematical modeling of systems that evolve with uncertainty.', doctor: 'Dr. Lisa Ray', dept: 'Applied Mathematics', rating: 4.7, students: 30, category: 'Mathematics', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80', joined: false },
  { id: 5, code: 'HUM-221', name: 'Post-Modern Narratives', desc: 'Analyzing the shift from absolute truths to relative perspectives.', doctor: 'Dr. Angela Wu', dept: 'Literature Dept.', rating: 4.5, students: 55, category: 'Humanities', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80', joined: false },
  { id: 6, code: 'BUS-440', name: 'Global Market Analytics', desc: 'Predictive modeling for emerging international trade opportunities.', doctor: 'Prof. Robert Chen', dept: 'School of Business', rating: 4.6, students: 110, category: 'Business', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80', joined: false },
];

const FILTERS = ['All Categories', 'Computer Science', 'Engineering', 'Mathematics', 'Design & Arts', 'Humanities', 'Business'];

export default function StudentClasses() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Categories');
  const [classes, setClasses] = useState(CLASSES);
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();

  const filtered = activeFilter === 'All Categories' ? classes : classes.filter(cls => cls.category === activeFilter);

  const handleJoin = (id) => {
    const cls = classes.find(cl => cl.id === id);
    setClasses(prev => prev.map(cl => cl.id === id ? { ...cl, joined: !cl.joined } : cl));
    Alert.alert(cls.joined ? 'Left Class' : 'Joined! 🎉', cls.joined ? `You left ${cls.name}` : `You joined ${cls.name} successfully!`);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>

      {menuOpen && (
        <View style={styles.sidebarWrap}>
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
              { icon: '🏠', label: 'Home', route: '/(student)/home' },
              { icon: '📚', label: 'Courses', active: true },
              { icon: '⭐', label: 'Grades' },
              { icon: '📅', label: 'Schedule' },
              { icon: '💬', label: 'Announcements', route: '/(student)/announcements' },
              { icon: '⚙️', label: 'Settings' },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.sidebarItem, item.active && { backgroundColor: '#2563eb22' }]}
                onPress={() => { setMenuOpen(false); if (item.route) router.push(item.route); }}
              >
                <Text style={styles.sidebarIcon}>{item.icon}</Text>
                <Text style={[styles.sidebarLabel, { color: item.active ? '#2563eb' : c.text }]}>{item.label}</Text>
                {item.active && <View style={styles.sidebarDot} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.sidebarItem, { marginTop: 20, borderTopWidth: 1, borderTopColor: c.border }]}>
              <Text style={styles.sidebarIcon}>🚪</Text>
              <Text style={[styles.sidebarLabel, { color: '#dc2626' }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.hamburger}>
          <View style={[styles.hLine, { backgroundColor: c.text }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 16 }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 10 }]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Classes</Text>
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
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Spring 2024 Course Catalog</Text>
          <Text style={styles.bannerSub}>Explore available programs and design your academic pathway.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll} contentContainerStyle={styles.filtersContent}>
          {FILTERS.map((f, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.filterChip, { borderColor: c.border, backgroundColor: c.card }, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, { color: c.subText }, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {filtered.map((cls) => (
            <TouchableOpacity
              key={cls.id}
              style={[styles.classCard, { backgroundColor: c.card }]}
              onPress={() => router.push('/(student)/class-details')}
              activeOpacity={0.9}
            >
              <View style={styles.imageWrap}>
                <Image source={{ uri: cls.image }} style={styles.classImage} resizeMode="cover" />
                <View style={styles.codeBadge}>
                  <Text style={styles.codeText}>{cls.code}</Text>
                </View>
                {cls.joined && (
                  <View style={styles.joinedBadge}>
                    <Text style={styles.joinedText}>✓ Enrolled</Text>
                  </View>
                )}
              </View>
              <View style={styles.classBody}>
                <Text style={[styles.className, { color: c.text }]}>{cls.name}</Text>
                <Text style={[styles.classDesc, { color: c.subText }]} numberOfLines={2}>{cls.desc}</Text>
                <View style={styles.doctorRow}>
                  <View style={styles.doctorAvatar}>
                    <Text style={styles.doctorAvatarText}>{cls.doctor[3]}</Text>
                  </View>
                  <View>
                    <Text style={[styles.doctorName, { color: c.text }]}>{cls.doctor}</Text>
                    <Text style={[styles.doctorDept, { color: c.subText }]}>{cls.dept}</Text>
                  </View>
                </View>
                <View style={styles.cardBottom}>
                  <View style={styles.ratingRow}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={[styles.ratingVal, { color: c.text }]}>{cls.rating}</Text>
                    <Text style={[styles.ratingCount, { color: c.subText }]}>({cls.students})</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.joinBtn, cls.joined && styles.joinBtnLeave]}
                    onPress={() => handleJoin(cls.id)}
                  >
                    <Text style={[styles.joinBtnText, cls.joined && styles.joinBtnTextLeave]}>
                      {cls.joined ? 'Leave' : 'Join Class'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  sidebarWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 },
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
  banner: { backgroundColor: '#2563eb', borderRadius: 20, padding: 24, marginBottom: 16 },
  bannerTitle: { fontSize: 22, fontWeight: '900', color: 'white', marginBottom: 8 },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20 },
  filtersScroll: { marginBottom: 16 },
  filtersContent: { gap: 8, paddingRight: 16 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
  filterChipActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  filterText: { fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: 'white' },
  grid: { gap: 16 },
  classCard: { borderRadius: 20, overflow: 'hidden', elevation: 3 },
  imageWrap: { position: 'relative' },
  classImage: { width: '100%', height: 160 },
  codeBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  codeText: { color: 'white', fontSize: 11, fontWeight: '800' },
  joinedBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#16a34a', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  joinedText: { color: 'white', fontSize: 11, fontWeight: '700' },
  classBody: { padding: 16 },
  className: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  classDesc: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
  doctorRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  doctorAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  doctorAvatarText: { color: 'white', fontSize: 14, fontWeight: '800' },
  doctorName: { fontSize: 13, fontWeight: '700' },
  doctorDept: { fontSize: 11, marginTop: 1 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  star: { fontSize: 14 },
  ratingVal: { fontSize: 14, fontWeight: '700' },
  ratingCount: { fontSize: 12 },
  joinBtn: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  joinBtnLeave: { backgroundColor: '#fee2e2', borderWidth: 1, borderColor: '#dc2626' },
  joinBtnText: { color: 'white', fontSize: 13, fontWeight: '700' },
  joinBtnTextLeave: { color: '#dc2626' },
});