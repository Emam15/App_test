import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Alert, Modal, KeyboardAvoidingView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';

export default function AdminAnnouncements() {
  const { colors: c, dark, toggleDark } = useTheme();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('student');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await api.get('/announcements');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      Alert.alert("خطأ", "فشل تحميل الإعلانات");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!title.trim() || !message.trim()) {
      Alert.alert("تنبيه", "الرجاء إدخال العنوان والرسالة");
      return;
    }

    try {
      // ✅ حدد الـ visibleTo حسب القيم المسموحة في الباكند
      let visibleToArray = [];
      if (targetAudience === 'all') {
        visibleToArray = ['student', 'instructor'];  // الاتنين
      } else if (targetAudience === 'student') {
        visibleToArray = ['student'];
      } else if (targetAudience === 'instructor') {
        visibleToArray = ['instructor'];
      }

      await api.post('/announcements', {
        title: title,
        message: message,
        visibleTo: visibleToArray,  // ✅ array من القيم المسموحة
      });

      Alert.alert("نجاح", "تم إرسال الإعلان");
      setTitle('');
      setMessage('');
      setModalVisible(false);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error details:", error.response?.data);
      Alert.alert("خطأ", error.response?.data?.message || "فشل إرسال الإعلان");
    }
  };

  const handleDelete = async (id) => {
    Alert.alert("تأكيد الحذف", "هل أنت متأكد من حذف هذا الإعلان؟", [
      { text: "إلغاء", style: "cancel" },
      {
        text: "حذف", style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/announcements/${id}`);
            fetchAnnouncements();
          } catch (error) {
            Alert.alert("خطأ", "فشل حذف الإعلان");
          }
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.bg }]}>
      <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.headerBack, { color: c.text }]}>← رجوع</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>إدارة الإعلانات</Text>
        <TouchableOpacity onPress={toggleDark}>
          <Text style={[styles.headerDark, { color: c.text }]}>{dark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ إعلان جديد</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <Text style={{ color: c.text, textAlign: 'center' }}>جاري التحميل...</Text>
        ) : announcements.length === 0 ? (
          <Text style={{ color: c.subText, textAlign: 'center', marginTop: 40 }}>لا توجد إعلانات حالياً</Text>
        ) : (
          announcements.map(item => (
            <View key={item._id} style={[styles.card, { backgroundColor: c.card }]}>
              <Text style={[styles.cardTitle, { color: c.text }]}>{item.title}</Text>
              <Text style={[styles.cardMessage, { color: c.subText }]}>{item.message}</Text>
              <View style={styles.cardFooter}>
                <Text style={[styles.cardAudience, { color: '#2563eb' }]}>الجمهور: {item.visibleTo?.join(', ') || 'all'}</Text>
                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  <Text style={styles.deleteText}>🗑️ حذف</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Modal للإضافة */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: c.card }]}>
            <Text style={[styles.modalTitle, { color: c.text }]}>إعلان جديد</Text>
            <TextInput
              style={[styles.input, { backgroundColor: c.bg, color: c.text, borderColor: c.border }]}
              placeholder="العنوان"
              placeholderTextColor={c.subText}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: c.bg, color: c.text, borderColor: c.border }]}
              placeholder="الرسالة"
              placeholderTextColor={c.subText}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <Text style={[styles.label, { color: c.text }]}>يُرى بواسطة:</Text>
            <View style={styles.audienceRow}>
              {['all', 'student', 'instructor'].map(target => (
                <TouchableOpacity key={target} style={[styles.audienceChip, targetAudience === target && styles.audienceChipActive]} onPress={() => setTargetAudience(target)}>
                  <Text style={[styles.audienceChipText, targetAudience === target && { color: 'white' }]}>{target === 'all' ? 'الجميع' : target === 'student' ? 'طلاب' : 'معلمين'}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={handleAdd}>
                <Text style={styles.sendButtonText}>إرسال</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1 },
  headerBack: { fontSize: 16, fontWeight: '500' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerDark: { fontSize: 18 },
  addButton: { backgroundColor: '#2563EB', marginHorizontal: 16, marginVertical: 10, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  scrollContent: { padding: 16 },
  card: { borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2, borderLeftWidth: 4, borderLeftColor: '#2563EB' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  cardMessage: { fontSize: 14, marginBottom: 12, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  cardAudience: { fontSize: 11, fontWeight: '600' },
  deleteText: { fontSize: 12, color: '#EF4444', fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { borderRadius: 20, padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 14 },
  textArea: { height: 80, textAlignVertical: 'top' },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  audienceRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  audienceChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 25, borderWidth: 1, borderColor: '#2563EB' },
  audienceChipActive: { backgroundColor: '#2563EB' },
  audienceChipText: { color: '#2563EB', fontWeight: '600' },
  modalButtons: { flexDirection: 'row', gap: 10, marginTop: 10 },
  button: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  cancelButton: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#D1D5DB' },
  cancelButtonText: { color: '#374151', fontWeight: '700' },
  sendButton: { backgroundColor: '#2563EB' },
  sendButtonText: { color: 'white', fontWeight: '700' },
});