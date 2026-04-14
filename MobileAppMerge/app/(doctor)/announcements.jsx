import { useState } from 'react';
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Modal, ScrollView, TextInput,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function DoctorAnnouncements() {
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [notifs, setNotifs] = useState([
    {
      id: '1',
      title: 'Project Submission Deadline',
      description: 'Please submit your final projects by Thursday.',
      audience: 'Students',
      date: '10:00 AM',
      comments: [
        { user: 'Ahmed (Student)', text: 'Can we get an extension?' },
        { user: 'Me (Doctor)', text: 'Sorry, the deadline is final.' }
      ]
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [replyText, setReplyText] = useState('');

  const openAdd = () => {
    setIsEditMode(false);
    setTitle(''); setDesc('');
    setIsModalVisible(true);
  };

  const openEdit = (item) => {
    setIsEditMode(true);
    setCurrentId(item.id);
    setTitle(item.title);
    setDesc(item.description);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (!title.trim() || !desc.trim()) return Alert.alert('Error', 'Please fill all fields');
    if (isEditMode) {
      setNotifs(notifs.map(n => n.id === currentId ? { ...n, title, description: desc } : n));
    } else {
      setNotifs([{ id: Date.now().toString(), title, description: desc, audience: 'Students', date: 'Now', comments: [] }, ...notifs]);
    }
    setIsModalVisible(false);
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    setNotifs(notifs.map(n => n.id === currentId
      ? { ...n, comments: [...n.comments, { user: 'Me (Doctor)', text: replyText }] }
      : n
    ));
    setReplyText('');
  };

  const confirmDelete = () => {
    Alert.alert('Delete', 'Delete this announcement?', [
      { text: 'Cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { setNotifs(notifs.filter(n => n.id !== currentId)); setIsModalVisible(false); } }
    ]);
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
              <Text style={[styles.logoSub, { color: c.subText }]}>Instructor Portal</Text>
            </View>
          </View>
          {[
            { icon: '🏠', label: 'Home', route: '/(doctor)/home' },
            { icon: '📚', label: 'Classes', route: '/(doctor)/classes' },
            { icon: '👥', label: 'Students' },
            { icon: '📅', label: 'Schedule' },
            { icon: '📊', label: 'Reports' },
            { icon: '💬', label: 'Announcements', active: true },
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
        <Text style={[styles.headerTitle, { color: c.text }]}>My Announcements</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={[styles.addBtn]} onPress={openAdd}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]} onPress={toggleDark}>
            <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={notifs}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: c.card }]}
            onPress={() => openEdit(item)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.teacherBadge}>
                <Text style={styles.teacherBadgeText}>My Post</Text>
              </View>
              <Text style={[styles.dateText, { color: c.subText }]}>{item.date}</Text>
            </View>
            <Text style={[styles.cardTitle, { color: c.text }]}>{item.title}</Text>
            <Text style={[styles.cardDesc, { color: c.subText }]} numberOfLines={2}>{item.description}</Text>
            <View style={[styles.cardFooter, { borderTopColor: c.border }]}>
              <Text style={[styles.commHint, { color: c.subText }]}>💬 {item.comments?.length || 0} comments</Text>
              <Text style={styles.manageText}>Manage & Replies →</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: c.card }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={26} color={c.subText} />
              </TouchableOpacity>
              <Text style={[styles.modalHeaderTitle, { color: c.text }]}>
                {isEditMode ? 'Edit Post' : 'New Post'}
              </Text>
              {isEditMode && (
                <TouchableOpacity onPress={confirmDelete}>
                  <Ionicons name="trash-outline" size={22} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                style={[styles.input, { backgroundColor: c.bg, borderColor: c.border, color: c.text }]}
                value={title}
                onChangeText={setTitle}
                placeholder="Announcement title"
                placeholderTextColor={c.subText}
              />
              <TextInput
                style={[styles.input, { height: 80, backgroundColor: c.bg, borderColor: c.border, color: c.text }]}
                value={desc}
                onChangeText={setDesc}
                multiline
                placeholder="Details..."
                placeholderTextColor={c.subText}
              />

              {isEditMode && (
                <View style={[styles.commentsSection, { backgroundColor: c.bg }]}>
                  <Text style={[styles.sectionTitle, { color: c.text }]}>Replies & Comments:</Text>
                  {notifs.find(n => n.id === currentId)?.comments.map((comment, i) => (
                    <View key={i} style={[
                      styles.cBox,
                      { backgroundColor: c.card },
                      comment.user.includes('Doctor') && { borderLeftColor: '#10B981', backgroundColor: '#F0FDF4' }
                    ]}>
                      <Text style={[styles.cUser, comment.user.includes('Doctor') && { color: '#10B981' }]}>{comment.user}</Text>
                      <Text style={[styles.cText, { color: c.subText }]}>{comment.text}</Text>
                    </View>
                  ))}
                  <View style={styles.replyArea}>
                    <TouchableOpacity style={styles.sendReplyBtn} onPress={handleReply}>
                      <Ionicons name="send" size={16} color="white" />
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.replyInput, { backgroundColor: c.card, borderColor: '#10B981', color: c.text }]}
                      placeholder="Write your reply..."
                      placeholderTextColor={c.subText}
                      value={replyText}
                      onChangeText={setReplyText}
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save & Publish</Text>
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
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2563eb', alignItems: 'center', justifyContent: 'center' },
  card: { borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2, borderLeftWidth: 4, borderLeftColor: '#10B981' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  teacherBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  teacherBadgeText: { color: '#15803D', fontSize: 11, fontWeight: '700' },
  dateText: { fontSize: 12 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  cardDesc: { fontSize: 14, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, paddingTop: 10 },
  commHint: { fontSize: 12 },
  manageText: { fontSize: 12, color: '#10B981', fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalContent: { borderRadius: 24, padding: 24, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalHeaderTitle: { fontSize: 18, fontWeight: '800' },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10, fontSize: 14 },
  commentsSection: { marginTop: 10, padding: 14, borderRadius: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 10 },
  cBox: { padding: 10, borderRadius: 10, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#CBD5E1' },
  cUser: { fontSize: 11, fontWeight: '700', color: '#64748b', marginBottom: 2 },
  cText: { fontSize: 13 },
  replyArea: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  replyInput: { flex: 1, borderRadius: 20, paddingHorizontal: 14, height: 40, borderWidth: 1 },
  sendReplyBtn: { backgroundColor: '#10B981', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  saveBtn: { backgroundColor: '#1e293b', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 14 },
  saveBtnText: { color: 'white', fontWeight: '700', fontSize: 15 },
});