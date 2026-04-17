import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, FlatList, SafeAreaView, Alert, Modal, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [announcements, setAnnouncements] = useState([
    { id: '1', title: 'Exam Schedule Updated', description: 'Final exams for Fall 2024 published.', audience: 'Students', date: 'Oct 24' },
  ]);

  const [notifications, setNotifications] = useState([
    { id: '1', msg: 'Your assignment has been graded', type: 'Student', read: false },
    { id: '2', msg: 'New student enrolled', type: 'Teacher', read: false },
  ]);

  // States للفورم
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('Students'); // النوع المختار افتراضياً

  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // مكون اختيار الجمهور (Chips)
  const AudienceSelector = ({ selected, onSelect }) => (
    <View style={styles.selectorContainer}>
      {['Students', 'Teacher', 'All Users'].map((item) => (
        <TouchableOpacity 
          key={item} 
          style={[styles.chip, selected === item && styles.chipSelected]} 
          onPress={() => onSelect(item)}
        >
          <Text style={[styles.chipText, selected === item && styles.chipTextSelected]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handlePublish = () => {
    if (!title.trim() || !description.trim()) return Alert.alert("Error", "Fill all fields");
    const newItem = { id: Date.now().toString(), title, description, audience, date: 'Today' };
    setAnnouncements([newItem, ...announcements]);
    setTitle(''); setDescription(''); setAudience('Students');
  };

  const saveEdit = () => {
    setAnnouncements(announcements.map(a => a.id === editingItem.id ? editingItem : a));
    setIsEditModalVisible(false);
  };

  const renderNotifItem = ({ item }) => (
    <View style={[styles.notifItem, { borderLeftColor: item.type === 'Student' ? '#3B82F6' : '#10B981' }]}>
      <View style={{flex: 1}}><Text style={styles.notifText}>{item.msg}</Text><Text style={styles.notifType}>{item.type}</Text></View>
      {!item.read && <View style={styles.unreadDot} />}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topHeader}>
        <Text style={styles.logoText}>UniPlatform</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setIsNotifVisible(true)} style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={26} color="#111827" />
            {unreadCount > 0 && <View style={styles.badgeCount}><Text style={styles.badgeCountText}>{unreadCount}</Text></View>}
          </TouchableOpacity>
          <Ionicons name="person-circle-outline" size={30} color="#111827" />
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.mainHeading}>Management</Text>
          
          {/* Add Form */}
          <View style={styles.formCard}>
            <View style={styles.formHeader}><Ionicons name="megaphone" size={18} color="#2563EB" /><Text style={styles.formTitle}> Add New</Text></View>
            
            <Text style={styles.label}>Target Audience</Text>
            <AudienceSelector selected={audience} onSelect={setAudience} />
            <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
            <TextInput style={[styles.input, styles.textArea]} multiline placeholder="Description" value={description} onChangeText={setDescription} />
            <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}><Text style={styles.publishBtnText}>Publish</Text></TouchableOpacity>
          </View>

          {/* List */}
          {announcements.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View style={[styles.badge, {backgroundColor: item.audience === 'Teacher' ? '#DCFCE7' : '#E0F2FE'}]}>
                  <Text style={[styles.badgeText, {color: item.audience === 'Teacher' ? '#15803D' : '#0369A1'}]}>{item.audience}</Text>
                </View>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => {setEditingItem({...item}); setIsEditModalVisible(true);}}><Ionicons name="pencil" size={14} color="#4B5563" /><Text style={styles.actionBtnText}> Edit</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, {borderColor: '#FEE2E2'}]} onPress={() => Alert.alert("Delete", "ِAre you Sure?", [{text: "No"}, {text: "Yes", onPress: () => setAnnouncements(announcements.filter(a => a.id !== item.id))}])}><Ionicons name="trash" size={14} color="#EF4444" /><Text style={[styles.actionBtnText, {color: '#EF4444'}]}> Delete</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Notif Modal */}
      <Modal visible={isNotifVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.notifCard}>
            <View style={styles.notifHeader}><Text style={styles.notifTitle}>Notifications</Text><TouchableOpacity onPress={() => setIsNotifVisible(false)}><Ionicons name="close-circle" size={28} color="#6B7280" /></TouchableOpacity></View>
            <FlatList data={notifications} keyExtractor={item => item.id} renderItem={renderNotifItem} />
            <TouchableOpacity style={styles.markReadBtn} onPress={() => {setNotifications(notifications.map(n => ({...n, read: true}))); setIsNotifVisible(false);}}><Text style={styles.markReadText}>Mark all as read</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Modal المطور مع اختيار الجمهور */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.notifCard, {maxHeight: '85%'}]}>
            <Text style={styles.notifTitle}>Edit Announcement</Text>
            
            <Text style={[styles.label, {marginTop: 20}]}>Target Audience</Text>
            <AudienceSelector 
              selected={editingItem?.audience} 
              onSelect={(val) => setEditingItem({...editingItem, audience: val})} 
            />

            <TextInput style={[styles.input, {marginTop: 10}]} value={editingItem?.title} onChangeText={t => setEditingItem({...editingItem, title: t})} />
            <TextInput style={[styles.input, styles.textArea]} multiline value={editingItem?.description} onChangeText={t => setEditingItem({...editingItem, description: t})} />
            
            <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
              <TouchableOpacity style={[styles.publishBtn, {flex: 1, backgroundColor: '#F3F4F6'}]} onPress={() => setIsEditModalVisible(false)}><Text style={{color: '#4B5563'}}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.publishBtn, {flex: 1}]} onPress={saveEdit}><Text style={styles.publishBtnText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  topHeader: { height: 70, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  logoText: { fontSize: 18, fontWeight: 'bold', color: '#2563EB' },
  headerIcons: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  notifBtn: { position: 'relative' },
  badgeCount: { position: 'absolute', right: -2, top: -2, backgroundColor: '#EF4444', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'white' },
  badgeCountText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  mainHeading: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#4B5563', marginBottom: 8 },
  
  // Selector Styles (الزرار اللي زي الصورة)
  selectorContainer: { flexDirection: 'row', gap: 8, marginBottom: 15 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  chipSelected: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { fontSize: 12, color: '#4B5563', fontWeight: '600' },
  chipTextSelected: { color: 'white' },

  formCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 25, borderWidth: 1, borderColor: '#E5E7EB' },
  formHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  formTitle: { fontSize: 15, fontWeight: 'bold' },
  input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 10 },
  textArea: { height: 80, textAlignVertical: 'top' },
  publishBtn: { backgroundColor: '#2563EB', padding: 14, borderRadius: 8, alignItems: 'center' },
  publishBtnText: { color: 'white', fontWeight: 'bold' },
  itemCard: { backgroundColor: 'white', borderRadius: 12, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  itemDate: { fontSize: 11, color: '#9CA3AF' },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 5 },
  itemDesc: { fontSize: 14, color: '#6B7280', marginBottom: 15 },
  itemActions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 10, gap: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#E5E7EB' },
  actionBtnText: { fontSize: 12, fontWeight: '600', color: '#4B5563' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  notifCard: { backgroundColor: 'white', borderRadius: 20, padding: 20, maxHeight: '70%' },
  notifHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  notifTitle: { fontSize: 20, fontWeight: 'bold' },
  notifItem: { flexDirection: 'row', padding: 15, backgroundColor: '#F8FAFC', borderRadius: 12, marginBottom: 10, borderLeftWidth: 4 },
  notifText: { fontSize: 14, color: '#1E293B', fontWeight: '500' },
  notifType: { fontSize: 11, color: '#64748B', marginTop: 4 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  markReadBtn: { marginTop: 15, alignItems: 'center', padding: 10 },
  markReadText: { color: '#2563EB', fontWeight: 'bold' },
});