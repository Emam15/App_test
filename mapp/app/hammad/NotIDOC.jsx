import React, { useState } from 'react';
import {
  StyleSheet, Text, View, FlatList, SafeAreaView,
  TouchableOpacity, TextInput, Modal, Alert, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

export default function TeacherPortal() {
  const [notifs, setNotifs] = useState([
    {
      id: '1',
      title: 'موعد تسليم المشروع النهائي',
      description: 'يرجى الالتزام بالموعد المحدد لتسليم المشاريع (الخميس القادم).',
      audience: 'Students',
      date: '10:00 AM',
      comments: [
        { user: 'أحمد محمود (طالب)', text: 'هل يمكن التمديد ليوم السبت؟' },
        { user: 'المعلم (أنا)', text: 'للأسف المواعيد نهائية يا أحمد.' }
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
    console.log("openAdd pressed");
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
    if (!title.trim() || !desc.trim()) return Alert.alert("تنبيه", "يرجى ملء البيانات");
    if (isEditMode) {
      setNotifs(notifs.map(n => n.id === currentId ? { ...n, title, description: desc } : n));
    } else {
      setNotifs([{ id: Date.now().toString(), title, description: desc, audience: 'Students', date: 'الآن', comments: [] }, ...notifs]);
    }
    setIsModalVisible(false);
  };

  const handleTeacherReply = () => {
    if (!replyText.trim()) return;
    const updated = notifs.map(n => {
      if (n.id === currentId) {
        return { ...n, comments: [...n.comments, { user: 'المعلم (أنا)', text: replyText }] };
      }
      return n;
    });
    setNotifs(updated);
    setReplyText('');
  };

  const confirmDelete = () => {
    Alert.alert("حذف", "هل تريد حذف هذا التنبيه؟", [
      { text: "إلغاء" },
      { text: "حذف", style: 'destructive', onPress: () => { setNotifs(notifs.filter(n => n.id !== currentId)); setIsModalVisible(false); } }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header - اللون الأساسي الأزرق الملكي */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.addBtn} onPress={openAdd}>
          <Text style={{ fontSize: 24, color: 'white' }}>➕</Text>
          <Text style={styles.addBtnText}>إضافة منشور</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>لوحة المعلم</Text>
      </View>

      <FlatList
        data={notifs}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openEdit(item)}>
            <View style={styles.cardHeader}>
              <View style={styles.teacherBadge}>
                <Text style={styles.teacherBadgeText}>لوحة التحكم</Text>
              </View>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.commHint}>💬 {String(item.comments?.length || 0)} تعليقات</Text>
              <View style={styles.manageBtn}>
                <Text style={styles.manageBtnText}>إدارة وتعليقات</Text>
                <Text style={styles.editIcon}>✏️</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={{ fontSize: 26, color: '#64748B' }}>✖️</Text>
              </TouchableOpacity>              <Text style={styles.modalHeaderTitle}>{isEditMode ? 'تعديل المنشور' : 'نشر جديد'}</Text>
              {isEditMode && (
                <TouchableOpacity onPress={confirmDelete}>
                  <Text style={{ fontSize: 22, color: '#EF4444' }}>🗑️</Text>
                </TouchableOpacity>
              )}            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="عنوان التنبيه" textAlign="right" />
              <TextInput style={[styles.input, { height: 80 }]} value={desc} onChangeText={setDesc} multiline placeholder="التفاصيل..." textAlign="right" />

              {isEditMode && (
                <View style={styles.commentsSection}>
                  <Text style={styles.sectionTitle}>الردود والتعليقات:</Text>
                  {notifs.find(n => n.id === currentId)?.comments.map((c, i) => (
                    <View key={i} style={[styles.cBox, c.user.includes('المعلم') && styles.teacherCBox]}>
                      <Text style={[styles.cUser, c.user.includes('المعلم') && { color: '#10B981' }]}>{c.user}</Text>
                      <Text style={styles.cText}>{c.text}</Text>
                    </View>
                  ))}

                  <View style={styles.replyArea}>
                    <TouchableOpacity style={styles.sendReplyBtn} onPress={handleTeacherReply}>
                      <Text style={{ fontSize: 18, color: 'white' }}>📤</Text>                    </TouchableOpacity>
                    <TextInput style={styles.replyInput} placeholder="اكتب ردك..." value={replyText} onChangeText={setReplyText} textAlign="right" />
                  </View>
                </View>
              )}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                <Text style={styles.btnSaveText}>حفظ ونشر</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { height: 100, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  addBtn: { backgroundColor: '#2563EB', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, gap: 5 },
  addBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  card: { backgroundColor: 'white', borderRadius: 16, padding: 18, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#10B981', elevation: 3 },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 10 },
  teacherBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  teacherBadgeText: { color: '#15803D', fontSize: 11, fontWeight: 'bold' },
  dateText: { color: '#94A3B8', fontSize: 12 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', textAlign: 'right', color: '#1E293B' },
  cardDesc: { fontSize: 14, color: '#64748B', textAlign: 'right', marginTop: 5 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 },
  commHint: { fontSize: 12, color: '#94A3B8' },
  manageBtn: { flexDirection: 'row-reverse', alignItems: 'center', gap: 5 },
  manageBtnText: { fontSize: 12, color: '#10B981', fontWeight: 'bold' },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: 'white', borderRadius: 25, padding: 25, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalHeaderTitle: { fontSize: 18, fontWeight: 'bold' },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 12, marginBottom: 10 },

  commentsSection: { marginTop: 15, padding: 15, backgroundColor: '#F1F5F9', borderRadius: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 },
  cBox: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 8, borderRightWidth: 3, borderRightColor: '#CBD5E1' },
  teacherCBox: { borderRightColor: '#10B981', backgroundColor: '#F0FDF4' },
  cUser: { fontSize: 11, fontWeight: 'bold', textAlign: 'right' },
  cText: { fontSize: 13, textAlign: 'right' },

  replyArea: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  replyInput: { flex: 1, backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 15, height: 40, borderWidth: 1, borderColor: '#10B981' },
  sendReplyBtn: { backgroundColor: '#10B981', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },

  modalActions: { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15, marginTop: 10 },
  btnSave: { backgroundColor: '#1E293B', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnSaveText: { color: 'white', fontWeight: 'bold' }
});