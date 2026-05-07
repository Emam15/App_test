import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, SafeAreaView,
  TouchableOpacity, TextInput, Alert, ActivityIndicator
} from 'react-native';
import api from '../../services/api';

export default function TeacherPortal() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await api.get('/announcements');

      // جلب التعليقات لكل إعلان
      const announcementsWithComments = await Promise.all(
        (response.data.announcements || []).map(async (ann) => {
          try {
            const commentsRes = await api.get(`/announcements/${ann._id}/comments`);
            return { ...ann, comments: commentsRes.data.comments || [] };
          } catch (err) {
            return { ...ann, comments: [] };
          }
        })
      );

      setAnnouncements(announcementsWithComments);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      Alert.alert('خطأ', 'فشل تحميل الإعلانات');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (announcementId) => {
    if (!replyText.trim()) {
      Alert.alert('تنبيه', 'الرجاء كتابة رد');
      return;
    }

    try {
      // ✅ استخدم endpoint الإعلانات العامة
      await api.post(`/announcements/${announcementId}/comments`, {
        text: replyText,
      });

      setReplyText('');
      fetchAnnouncements(); // تحديث الإعلانات والتعليقات
      Alert.alert('نجاح', 'تم إضافة ردك');
    } catch (error) {
      console.error('Reply error:', error);
      Alert.alert('خطأ', error.response?.data?.message || 'فشل إضافة الرد');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>إشعارات الدكتور</Text>
      </View>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>

            {/* التعليقات */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>💬 التعليقات ({item.comments?.length || 0})</Text>
              {item.comments?.map((comment) => (
                <View key={comment._id} style={styles.commentItem}>
                  <Text style={styles.commentUser}>{comment.userId?.fullName}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>

            {/* الرد */}
            {selectedId === item._id ? (
              <View style={styles.replyContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="اكتب ردك..."
                  value={replyText}
                  onChangeText={setReplyText}
                />
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={() => handleReply(item._id)}
                >
                  <Text style={styles.sendBtnText}>إرسال</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedId(null)}>
                  <Text style={styles.cancelBtn}>إلغاء</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity onPress={() => setSelectedId(item._id)}>
                <Text style={styles.replyBtnText}>رد</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#2563eb', padding: 20, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  message: { fontSize: 14, color: '#333', marginBottom: 8 },
  time: { fontSize: 11, color: '#999', marginBottom: 12 },
  commentsSection: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#eee' },
  commentsTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 6 },
  commentItem: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 8, marginBottom: 6 },
  commentUser: { fontSize: 11, fontWeight: 'bold', marginBottom: 2 },
  commentText: { fontSize: 12 },
  replyContainer: { marginTop: 10, gap: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 14 },
  sendBtn: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8, alignItems: 'center' },
  sendBtnText: { color: 'white', fontWeight: 'bold' },
  cancelBtn: { color: '#dc2626', textAlign: 'center', marginTop: 6 },
  replyBtnText: { color: '#2563eb', fontSize: 12, marginTop: 8, textAlign: 'right' },
});