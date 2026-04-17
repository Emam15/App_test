import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, FlatList, SafeAreaView, 
  TouchableOpacity, Modal, ScrollView, TextInput, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StudentPortal() {
  const [announcements, setAnnouncements] = useState([
    { 
      id: '1', 
      title: 'بدء تسجيل الأنشطة الطلابية', 
      description: 'يمكنكم الآن التوجه لرعاية الشباب لتسجيل أسمائكم في الأنشطة الرياضية والثقافية المتاحة للترم الحالي.', 
      audience: 'Students', 
      date: 'منذ ساعة',
      comments: [{ user: 'أحمد علي', text: 'هل متاح نشاط الشطرنج؟' }]
    }
  ]);

  const [selectedNotif, setSelectedNotif] = useState(null);
  const [commentText, setCommentText] = useState('');

  const addComment = () => {
    if (!commentText.trim()) return;
    const updated = announcements.map(item => {
      if (item.id === selectedNotif.id) {
        return { ...item, comments: [...(item.comments || []), { user: 'أنا (طالب)', text: commentText }] };
      }
      return item;
    });
    setAnnouncements(updated);
    setSelectedNotif({ ...selectedNotif, comments: [...(selectedNotif.comments || []), { user: 'أنا (طالب)', text: commentText }] });
    setCommentText('');
  };

  return (
    <SafeAreaView style={styles.containerStudent}>
      <View style={styles.headerStudent}>
        <Text style={styles.headerTitle}>اشعارات الطالب</Text>
        <Ionicons name="notifications-outline" size={24} color="#1E293B" />
      </View>

      <FlatList
        data={announcements}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cardStudent} onPress={() => setSelectedNotif(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.commentCount}>💬 {item.comments?.length || 0} تعليقات</Text>
              <Text style={styles.moreText}>عرض التفاصيل</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedNotif} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{selectedNotif?.title}</Text>
              <Text style={styles.modalDesc}>{selectedNotif?.description}</Text>
              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>التعليقات</Text>
              {selectedNotif?.comments?.map((c, i) => (
                <View key={i} style={styles.commentBox}>
                  <Text style={styles.commentUser}>{c.user}</Text>
                  <Text style={styles.commentText}>{c.text}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.sendIcon} onPress={addComment}>
                <Ionicons name="send" size={20} color="white" />
              </TouchableOpacity>
              <TextInput 
                style={styles.commentInput} 
                placeholder="اكتب تعليقك..." 
                value={commentText}
                onChangeText={setCommentText}
              />
            </View>
            <TouchableOpacity style={styles.btnClose} onPress={() => setSelectedNotif(null)}>
              <Text style={styles.btnCloseText}>إغلاق</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerStudent: { flex: 1, backgroundColor: '#F8FAFC' },
  headerStudent: { height: 80, backgroundColor: 'white', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  cardStudent: { backgroundColor: 'white', borderRadius: 15, padding: 15, marginBottom: 15, borderRightWidth: 4, borderRightColor: '#3B82F6', elevation: 3 },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  desc: { fontSize: 14, color: '#64748B', textAlign: 'right', marginTop: 5 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 10 },
  moreText: { color: '#3B82F6', fontSize: 12, fontWeight: 'bold' },
  commentCount: { color: '#94A3B8', fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 },
  modalDesc: { fontSize: 15, color: '#475569', textAlign: 'right', lineHeight: 24 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 },
  commentBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 10, marginBottom: 8, alignSelf: 'flex-end', minWidth: '50%' },
  commentUser: { fontSize: 11, fontWeight: 'bold', color: '#3B82F6', textAlign: 'right' },
  commentText: { fontSize: 13, textAlign: 'right' },
  inputArea: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  commentInput: { flex: 1, backgroundColor: '#F8FAFC', borderRadius: 20, paddingHorizontal: 15, height: 45, textAlign: 'right', borderWidth: 1, borderColor: '#E2E8F0' },
  sendIcon: { backgroundColor: '#3B82F6', width: 45, height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  btnClose: { marginTop: 15, padding: 12, alignItems: 'center' },
  btnCloseText: { color: '#64748B', fontWeight: 'bold' }
});