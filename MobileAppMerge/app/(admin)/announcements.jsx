import { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  ScrollView, FlatList, Alert, Modal, KeyboardAvoidingView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function AdminAnnouncements() {
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [announcements, setAnnouncements] = useState([
    { id: '1', title: 'Exam Schedule Updated', description: 'Final exams for Fall 2024 published.', audience: 'Students', date: 'Oct 24' },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('Students');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const AudienceSelector = ({ selected, onSelect }) => (
    <View style={styles.selectorContainer}>
      {['Students', 'Teacher', 'All Users'].map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.chip, { borderColor: c.border }, selected === item && styles.chipSelected]}
          onPress={() => onSelect(item)}
        >
          <Text style={[styles.chipText, { color: c.subText }, selected === item && styles.chipTextSelected]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handlePublish = () => {
    if (!title.trim() || !description.trim()) return Alert.alert('Error', 'Fill all fields');
    setAnnouncements([{ id: Date.now().toString(), title, description, audience, date: 'Today' }, ...announcements]);
    setTitle(''); setDescription(''); setAudience('Students');
  };

  const saveEdit = () => {
    setAnnouncements(announcements.map(a => a.id === editingItem.id ? editingItem : a));
    setIsEditModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>

      {/* Sidebar */}
      <Modal visible={menuOpen} transparent animationType="slide">
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuOpen(false)} />
        <View style={[styles.sidebar, { backgroundColor: c.card }]}>
          <View style={styles.sidebarHeader}>
            <View style={styles.logoSmall}>
              <Text style={styles.logoSmallText}>🎓</Text>
            </View>
            <View>
              <Text style={[styles.logoName, { color: c.text }]}>UAPMP</Text>
              <Text style={[styles.logoSub, { color: c.subText }]}>Admin Console</Text>
            </View>
          </View>
          {[
            { icon: '🏠', label: 'Home', route: '/(admin)/home' },
            { icon: '💬', label: 'Announcements', active: true },
            { icon: '👥', label: 'Users' },
            { icon: '📚', label: 'Classes', route: '/(admin)/classes' },
            { icon: '📊', label: 'Reports' },
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

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.scroll]} showsVerticalScrollIndicator={false}>

          {/* Add Form */}
          <View style={[styles.formCard, { backgroundColor: c.card, borderColor: c.border }]}>
            <View style={styles.formHeader}>
              <Ionicons name="megaphone" size={18} color="#2563EB" />
              <Text style={[styles.formTitle, { color: c.text }]}> Add New Announcement</Text>
            </View>
            <Text style={[styles.label, { color: c.subText }]}>Target Audience</Text>
            <AudienceSelector selected={audience} onSelect={setAudience} />
            <TextInput
              style={[styles.input, { backgroundColor: c.bg, borderColor: c.border, color: c.text }]}
              placeholder="Title"
              placeholderTextColor={c.subText}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: c.bg, borderColor: c.border, color: c.text }]}
              multiline
              placeholder="Description"
              placeholderTextColor={c.subText}
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
              <Text style={styles.publishBtnText}>Publish Now</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          {announcements.map((item) => (
            <View key={item.id} style={[styles.itemCard, { backgroundColor: c.card, borderColor: c.border }]}>
              <View style={styles.itemHeader}>
                <View style={[styles.badge, { backgroundColor: item.audience === 'Teacher' ? '#DCFCE7' : '#E0F2FE' }]}>
                  <Text style={[styles.badgeText, { color: item.audience === 'Teacher' ? '#15803D' : '#0369A1' }]}>{item.audience}</Text>
                </View>
                <Text style={[styles.itemDate, { color: c.subText }]}>{item.date}</Text>
              </View>
              <Text style={[styles.itemTitle, { color: c.text }]}>{item.title}</Text>
              <Text style={[styles.itemDesc, { color: c.subText }]} numberOfLines={2}>{item.description}</Text>
              <View style={[styles.itemActions, { borderTopColor: c.border }]}>
                <TouchableOpacity
                  style={[styles.actionBtn, { borderColor: c.border }]}
                  onPress={() => { setEditingItem({ ...item }); setIsEditModalVisible(true); }}
                >
                  <Ionicons name="pencil" size={14} color="#4B5563" />
                  <Text style={[styles.actionBtnText, { color: c.subText }]}> Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, { borderColor: '#FEE2E2' }]}
                  onPress={() => Alert.alert('Delete', 'Are you sure?', [
                    { text: 'No' },
                    { text: 'Yes', style: 'destructive', onPress: () => setAnnouncements(announcements.filter(a => a.id !== item.id)) }
                  ])}
                >
                  <Ionicons name="trash" size={14} color="#EF4444" />
                  <Text style={[styles.actionBtnText, { color: '#EF4444' }]}> Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Edit Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: c.card, maxHeight: '85%' }]}>
            <Text style={[styles.modalTitle, { color: c.text }]}>Edit Announcement</Text>
            <Text style={[styles.label, { color: c.subText, marginTop: 10 }]}>Target Audience</Text>
            <AudienceSelector
              selected={editingItem?.audience}
              onSelect={(val) => setEditingItem({ ...editingItem, audience: val })}
            />
            <TextInput
              style={[styles.input, { backgroundColor: c.bg, borderColor: c.border, color: c.text }]}
              value={editingItem?.title}
              onChangeText={t => setEditingItem({ ...editingItem, title: t })}
              placeholderTextColor={c.subText}
            />
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: c.bg, borderColor: c.border, color: c.text }]}
              multiline
              value={editingItem?.description}
              onChangeText={t => setEditingItem({ ...editingItem, description: t })}
              placeholderTextColor={c.subText}
            />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 15 }}>
              <TouchableOpacity
                style={[styles.publishBtn, { flex: 1, backgroundColor: c.bg }]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={{ color: c.text, fontWeight: '700' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.publishBtn, { flex: 1 }]} onPress={saveEdit}>
                <Text style={styles.publishBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  scroll: { padding: 16 },
  formCard: { borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1 },
  formHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  formTitle: { fontSize: 15, fontWeight: '800' },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 8 },
  selectorContainer: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  chipSelected: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { fontSize: 12, fontWeight: '600' },
  chipTextSelected: { color: 'white' },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 10, fontSize: 14 },
  textArea: { height: 80, textAlignVertical: 'top' },
  publishBtn: { backgroundColor: '#2563EB', padding: 14, borderRadius: 10, alignItems: 'center' },
  publishBtnText: { color: 'white', fontWeight: '700', fontSize: 15 },
  itemCard: { borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  itemDate: { fontSize: 11 },
  itemTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  itemDesc: { fontSize: 14, marginBottom: 12 },
  itemActions: { flexDirection: 'row', borderTopWidth: 1, paddingTop: 10, gap: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 6, borderWidth: 1 },
  actionBtnText: { fontSize: 12, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalCard: { borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
});