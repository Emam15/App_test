import { useState } from 'react';
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Modal, ScrollView,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function StudentAnnouncements() {
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'Student Activity Registration',
      description: 'You can now register for sports and cultural activities available for this semester.',
      audience: 'Students',
      date: '1 hour ago',
      comments: [{ user: 'Ahmed Ali', text: 'Is chess available?' }]
    },
    {
      id: '2',
      title: 'Exam Schedule Updated',
      description: 'Final exams for Fall 2024 have been published. Check the portal for details.',
      audience: 'Students',
      date: 'Yesterday',
      comments: []
    },
  ]);

  const [selectedAnn, setSelectedAnn] = useState(null);
  const [commentText, setCommentText] = useState('');

  const addComment = () => {
    if (!commentText.trim()) return;
    const updated = announcements.map(item => {
      if (item.id === selectedAnn.id) {
        return { ...item, comments: [...(item.comments || []), { user: 'Me (Student)', text: commentText }] };
      }
      return item;
    });
    setAnnouncements(updated);
    setSelectedAnn({ ...selectedAnn, comments: [...(selectedAnn.comments || []), { user: 'Me (Student)', text: commentText }] });
    setCommentText('');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>

      {/* Sidebar */}
      <Modal visible={menuOpen} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuOpen(false)} />
        <View style={[styles.sidebar, { backgroundColor: c.card }]}>
          <View style={styles.sidebarHeader}>
            <View style={styles.logoSmall}><Text style={styles.logoSmallText}>🎓</Text></View>
            <View>
              <Text style={[styles.logoName, { color: c.text }]}>UAPMP</Text>
              <Text style={[styles.logoSub, { color: c.subText }]}>Student Portal</Text>
            </View>
          </View>
          {[
            { icon: '🏠', label: 'Home', route: '/(student)/home' },
            { icon: '📚', label: 'Courses', route: '/(student)/classes' },
            { icon: '⭐', label: 'Grades' },
            { icon: '📅', label: 'Schedule' },
            { icon: '📢', label: 'Announcements', active: true },
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
      </Modal>

      {/* Header */}
      <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.hamburger}>
          <View style={[styles.hLine, { backgroundColor: c.text }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 16 }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 10 }]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Announcements</Text>
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]} onPress={toggleDark}>
          <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={announcements}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: c.card }]}
            onPress={() => setSelectedAnn(item)}
          >
            <Text style={[styles.cardTitle, { color: c.text }]}>{item.title}</Text>
            <Text style={[styles.cardDesc, { color: c.subText }]} numberOfLines={2}>{item.description}</Text>
            <View style={[styles.cardFooter, { borderTopColor: c.border }]}>
              <Text style={[styles.commentCount, { color: c.subText }]}>💬 {item.comments?.length || 0} comments</Text>
              <Text style={styles.moreText}>View Details →</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Details Modal */}
      <Modal visible={!!selectedAnn} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: c.card }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalTitle, { color: c.text }]}>{selectedAnn?.title}</Text>
              <Text style={[styles.modalDesc, { color: c.subText }]}>{selectedAnn?.description}</Text>
              <View style={[styles.divider, { backgroundColor: c.border }]} />
              <Text style={[styles.sectionTitle, { color: c.text }]}>Comments</Text>
              {selectedAnn?.comments?.map((comment, i) => (
                <View key={i} style={[
                  styles.commentBox,
                  { backgroundColor: c.bg },
                  comment.user.includes('Me') && { borderLeftColor: '#2563eb' }
                ]}>
                  <Text style={[styles.commentUser, comment.user.includes('Me') && { color: '#2563eb' }]}>{comment.user}</Text>
                  <Text style={[styles.commentText, { color: c.subText }]}>{comment.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.sendIcon} onPress={addComment}>
                <Ionicons name="send" size={18} color="white" />
              </TouchableOpacity>
              <TextInput
                style={[styles.commentInput, { backgroundColor: c.bg, borderColor: c.border, color: c.text }]}
                placeholder="Write your comment..."
                placeholderTextColor={c.subText}
                value={commentText}
                onChangeText={setCommentText}
              />
            </View>

            <TouchableOpacity style={[styles.closeBtn, { borderColor: c.border }]} onPress={() => setSelectedAnn(null)}>
              <Text style={[styles.closeBtnText, { color: c.subText }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  logoSmall: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  logoSmallText: { fontSize: 18 },
  logoName: { fontSize: 15, fontWeight: '900' },
  logoSub: { fontSize: 11 },
  header: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3, borderBottomWidth: 1 },
  hamburger: { gap: 5, padding: 4 },
  hLine: { height: 2.5, width: 22, borderRadius: 2 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  iconBtnText: { fontSize: 16 },
  card: { borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2, borderLeftWidth: 4, borderLeftColor: '#2563eb' },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  cardDesc: { fontSize: 14, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, paddingTop: 10 },
  moreText: { color: '#2563eb', fontSize: 12, fontWeight: '700' },
  commentCount: { fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, height: '80%' },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  modalDesc: { fontSize: 15, lineHeight: 24, marginBottom: 8 },
  divider: { height: 1, marginVertical: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 10 },
  commentBox: { padding: 10, borderRadius: 10, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#cbd5e1' },
  commentUser: { fontSize: 11, fontWeight: '700', color: '#64748b', marginBottom: 2 },
  commentText: { fontSize: 13 },
  inputArea: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  commentInput: { flex: 1, borderRadius: 20, paddingHorizontal: 14, height: 44, borderWidth: 1 },
  sendIcon: { backgroundColor: '#2563eb', width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  closeBtn: { marginTop: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderRadius: 12 },
  closeBtnText: { fontWeight: '700' },
});