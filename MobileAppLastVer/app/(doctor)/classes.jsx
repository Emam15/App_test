import { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Modal, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

const INITIAL_CLASSES = [
  {
    id: 1,
    code: 'CS101',
    name: 'Intro to Computer Science',
    section: 'Section A',
    students: 45,
    time: 'Mon/Wed 10:00 AM',
    room: 'Room 304',
    status: 'ACTIVE',
    color: '#2563eb',
    announcements: 3,
  },
  {
    id: 2,
    code: 'CS302',
    name: 'Data Structures & Algo',
    section: 'Section B',
    students: 38,
    time: 'Tue/Thu 02:00 PM',
    room: 'Room 105',
    status: 'ACTIVE',
    color: '#059669',
    announcements: 1,
  },
  {
    id: 3,
    code: 'CS450',
    name: 'Web Development Capstone',
    section: 'Section A',
    students: 42,
    time: 'Fri 09:00 AM',
    room: 'Room 201',
    status: 'PAUSED',
    color: '#d97706',
    announcements: 0,
  },
];

export default function DoctorClasses() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [createModal, setCreateModal] = useState(false);
  const [newClass, setNewClass] = useState({ code: '', name: '', section: '', time: '', room: '' });
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();

  const handleCreate = () => {
    if (!newClass.code || !newClass.name) {
      Alert.alert('Error', 'Please fill in Code and Name at least');
      return;
    }
    const created = {
      id: Date.now(),
      code: newClass.code,
      name: newClass.name,
      section: newClass.section || 'Section A',
      students: 0,
      time: newClass.time || 'TBD',
      room: newClass.room || 'TBD',
      status: 'ACTIVE',
      color: '#7c3aed',
      announcements: 0,
    };
    setClasses(prev => [...prev, created]);
    setNewClass({ code: '', name: '', section: '', time: '', room: '' });
    setCreateModal(false);
    Alert.alert('Success! 🎉', `Class "${created.name}" created successfully`);
  };

  const handleDelete = (id, name) => {
    Alert.alert(
      'Delete Class',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: () => setClasses(prev => prev.filter(c => c.id !== id)),
        },
      ]
    );
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
              <Text style={[styles.logoSub, { color: c.subText }]}>Instructor Portal</Text>
            </View>
          </View>
          {[
            { icon: '🏠', label: 'Dashboard', route: '/(doctor)/home' },
            { icon: '📚', label: 'Classes', active: true },
            { icon: '👥', label: 'Students' },
            { icon: '📅', label: 'Schedule' },
            { icon: '📊', label: 'Reports' },
            { icon: '💬', label: 'Messages' },
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
          <TouchableOpacity style={[styles.sidebarItem, { marginTop: 20, borderTopWidth: 1, borderTopColor: c.border }]}>
            <Text style={styles.sidebarIcon}>🚪</Text>
            <Text style={[styles.sidebarLabel, { color: '#dc2626' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Create Class Modal */}
      <Modal visible={createModal} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, { backgroundColor: c.card }]}>
            <Text style={[styles.modalTitle, { color: c.text }]}>Create New Class</Text>

            {[
              { label: 'Course Code *', key: 'code', placeholder: 'e.g. CS101' },
              { label: 'Course Name *', key: 'name', placeholder: 'e.g. Intro to Algorithms' },
              { label: 'Section', key: 'section', placeholder: 'e.g. Section A' },
              { label: 'Schedule', key: 'time', placeholder: 'e.g. Mon/Wed 10:00 AM' },
              { label: 'Room', key: 'room', placeholder: 'e.g. Room 304' },
            ].map((field) => (
              <View key={field.key} style={styles.fieldWrap}>
                <Text style={[styles.fieldLabel, { color: c.subText }]}>{field.label}</Text>
                <TextInput
                  style={[styles.fieldInput, { backgroundColor: c.bg, color: c.text, borderColor: c.border }]}
                  placeholder={field.placeholder}
                  placeholderTextColor={c.subText}
                  value={newClass[field.key]}
                  onChangeText={(val) => setNewClass(prev => ({ ...prev, [field.key]: val }))}
                />
              </View>
            ))}

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={[styles.modalCancelBtn, { borderColor: c.border }]}
                onPress={() => setCreateModal(false)}
              >
                <Text style={[styles.modalCancelText, { color: c.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCreateBtn} onPress={handleCreate}>
                <Text style={styles.modalCreateText}>Create Class</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.hamburger}>
          <View style={[styles.hLine, { backgroundColor: c.text }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 16 }]} />
          <View style={[styles.hLine, { backgroundColor: c.text, width: 10 }]} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>My Classes</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]} onPress={toggleDark}>
            <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Banner */}
        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerTitle}>My Classes</Text>
            <Text style={styles.bannerSub}>{classes.length} Classes • {classes.reduce((a, b) => a + b.students, 0)} Total Students</Text>
          </View>
          <TouchableOpacity style={styles.createBtn} onPress={() => setCreateModal(true)}>
            <Text style={styles.createBtnText}>+ New Class</Text>
          </TouchableOpacity>
        </View>

        {/* Classes List */}
        {classes.map((cls) => (
          <View key={cls.id} style={[styles.classCard, { backgroundColor: c.card }]}>

            {/* Card Header */}
            <View style={[styles.classCardHeader, { backgroundColor: cls.color }]}>
              <View>
                <Text style={styles.classCode}>{cls.code}</Text>
                <Text style={styles.classSection}>{cls.section}</Text>
              </View>
              <View style={[styles.statusBadge, {
                backgroundColor: cls.status === 'ACTIVE' ? '#dcfce7' : '#fef3c7'
              }]}>
                <Text style={[styles.statusText, {
                  color: cls.status === 'ACTIVE' ? '#15803d' : '#d97706'
                }]}>{cls.status}</Text>
              </View>
            </View>

            {/* Card Body */}
            <View style={styles.classCardBody}>
              <Text style={[styles.className, { color: c.text }]}>{cls.name}</Text>

              <View style={styles.metaRow}>
                <Text style={[styles.meta, { color: c.subText }]}>👥 {cls.students} Students</Text>
                <Text style={[styles.meta, { color: c.subText }]}>🕐 {cls.time}</Text>
                <Text style={[styles.meta, { color: c.subText }]}>📍 {cls.room}</Text>
              </View>

              {cls.announcements > 0 && (
                <View style={styles.annBadge}>
                  <Text style={styles.annBadgeText}>📢 {cls.announcements} New Announcements</Text>
                </View>
              )}

              {/* Actions */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => router.push('/(doctor)/class-details')}
                >
                  <Text style={styles.actionBtnText}>Open Class</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtnSecondary, { borderColor: c.border }]}
                  onPress={() => router.push('/(doctor)/class-details')}
                >
                  <Text style={[styles.actionBtnSecondaryText, { color: c.text }]}>👥 Students</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(cls.id, cls.name)}
                >
                  <Text style={styles.deleteBtnText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

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
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 20 },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, fontWeight: '600', marginBottom: 6 },
  fieldInput: { borderWidth: 1.5, borderRadius: 12, padding: 13, fontSize: 14 },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  modalCancelBtn: { flex: 1, borderWidth: 1.5, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  modalCancelText: { fontSize: 15, fontWeight: '700' },
  modalCreateBtn: { flex: 1, backgroundColor: '#2563eb', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  modalCreateText: { color: 'white', fontSize: 15, fontWeight: '700' },
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
  banner: {
    backgroundColor: '#2563eb', borderRadius: 20,
    padding: 20, marginBottom: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  bannerTitle: { fontSize: 20, fontWeight: '900', color: 'white' },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  createBtn: {
    backgroundColor: 'white', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  createBtnText: { color: '#2563eb', fontWeight: '800', fontSize: 13 },
  classCard: { borderRadius: 20, overflow: 'hidden', elevation: 3, marginBottom: 16 },
  classCardHeader: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  classCode: { fontSize: 18, fontWeight: '900', color: 'white' },
  classSection: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '700' },
  classCardBody: { padding: 16 },
  className: { fontSize: 16, fontWeight: '800', marginBottom: 10 },
  metaRow: { gap: 6, marginBottom: 12 },
  meta: { fontSize: 13 },
  annBadge: {
    backgroundColor: '#eff6ff', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6, marginBottom: 12,
    alignSelf: 'flex-start',
  },
  annBadgeText: { color: '#2563eb', fontSize: 12, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flex: 1, backgroundColor: '#2563eb',
    borderRadius: 10, paddingVertical: 10, alignItems: 'center',
  },
  actionBtnText: { color: 'white', fontSize: 13, fontWeight: '700' },
  actionBtnSecondary: {
    flex: 1, borderWidth: 1.5,
    borderRadius: 10, paddingVertical: 10, alignItems: 'center',
  },
  actionBtnSecondaryText: { fontSize: 13, fontWeight: '700' },
  deleteBtn: {
    width: 44, borderRadius: 10,
    backgroundColor: '#fee2e2', alignItems: 'center', justifyContent: 'center',
  },
  deleteBtnText: { fontSize: 18 },
});