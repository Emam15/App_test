import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, SafeAreaView,
  TouchableOpacity, TextInput, Alert, ActivityIndicator,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import api from '../../services/api';

export default function TeacherPortal() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await api.get('/announcements');

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

  // اختيار صورة من المعرض
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('تنبيه', 'نحتاج إلى صلاحية الوصول إلى المعرض');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
        setSelectedDocument(null);
        Alert.alert('نجاح', 'تم اختيار الصورة');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصورة');
    }
  };

  // اختيار ملف PDF
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedDocument(result.assets[0]);
        setSelectedImage(null);
        Alert.alert('نجاح', 'تم اختيار الملف');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الملف');
    }
  };

  const handleReply = async (announcementId) => {
    if (!replyText.trim() && !selectedImage && !selectedDocument) {
      Alert.alert('تنبيه', 'الرجاء كتابة رد أو إرفاق صورة أو ملف');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('text', replyText);

      if (selectedImage) {
        formData.append('file', {
          uri: selectedImage.uri,
          type: selectedImage.mimeType || 'image/jpeg',
          name: selectedImage.fileName || 'image.jpg',
        });
        formData.append('fileType', 'image');
      }

      if (selectedDocument) {
        formData.append('file', {
          uri: selectedDocument.uri,
          type: selectedDocument.mimeType || 'application/pdf',
          name: selectedDocument.name || 'document.pdf',
        });
        formData.append('fileType', 'pdf');
      }

      await api.post(`/announcements/${announcementId}/comments`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setReplyText('');
      setSelectedImage(null);
      setSelectedDocument(null);
      setSelectedId(null);
      fetchAnnouncements();
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

            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>💬 التعليقات ({item.comments?.length || 0})</Text>
              {item.comments?.map((comment) => (
                <View key={comment._id} style={styles.commentItem}>
                  <Text style={styles.commentUser}>{comment.userId?.fullName}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  {comment.fileUrl && comment.fileType === 'image' && (
                    <Image source={{ uri: comment.fileUrl }} style={styles.commentImage} />
                  )}
                  {comment.fileUrl && comment.fileType === 'pdf' && (
                    <TouchableOpacity onPress={() => Alert.alert('PDF', 'سيتم فتح الملف قريباً')}>
                      <Text style={styles.pdfLink}>📄 تحميل الملف</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>

            {selectedId === item._id ? (
              <View style={styles.replyContainer}>
                {/* معاينة الصورة المختارة */}
                {selectedImage && (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
                    <TouchableOpacity onPress={() => setSelectedImage(null)}>
                      <Text style={styles.removeImage}>✖️ إزالة الصورة</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* معاينة الملف المختار */}
                {selectedDocument && (
                  <View style={styles.documentPreviewContainer}>
                    <Text style={styles.documentName}>📄 {selectedDocument.name}</Text>
                    <TouchableOpacity onPress={() => setSelectedDocument(null)}>
                      <Text style={styles.removeImage}>✖️ إزالة الملف</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="اكتب ردك..."
                  value={replyText}
                  onChangeText={setReplyText}
                />

                <View style={styles.replyActions}>
                  <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
                    <Text style={styles.imageBtnText}>📷 صورة</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.documentBtn} onPress={pickDocument}>
                    <Text style={styles.documentBtnText}>📁 PDF</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={() => handleReply(item._id)}
                  >
                    <Text style={styles.sendBtnText}>إرسال</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    setSelectedId(null);
                    setSelectedImage(null);
                    setSelectedDocument(null);
                    setReplyText('');
                  }}>
                    <Text style={styles.cancelBtn}>إلغاء</Text>
                  </TouchableOpacity>
                </View>
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
  commentImage: { width: 100, height: 100, borderRadius: 8, marginTop: 5 },
  pdfLink: { fontSize: 11, color: '#2563eb', marginTop: 5 },
  replyContainer: { marginTop: 10, gap: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, fontSize: 14 },
  replyActions: { flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  imageBtn: { backgroundColor: '#e0e0e0', padding: 8, borderRadius: 8 },
  imageBtnText: { fontSize: 12 },
  documentBtn: { backgroundColor: '#e0e0e0', padding: 8, borderRadius: 8 },
  documentBtnText: { fontSize: 12 },
  sendBtn: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8, alignItems: 'center', flex: 1 },
  sendBtnText: { color: 'white', fontWeight: 'bold' },
  cancelBtn: { color: '#dc2626', textAlign: 'center', marginTop: 6 },
  replyBtnText: { color: '#2563eb', fontSize: 12, marginTop: 8, textAlign: 'right' },
  imagePreviewContainer: { alignItems: 'center', marginBottom: 8 },
  imagePreview: { width: 80, height: 80, borderRadius: 8 },
  documentPreviewContainer: { alignItems: 'center', marginBottom: 8, padding: 8, backgroundColor: '#f0f0f0', borderRadius: 8 },
  documentName: { fontSize: 12, color: '#333' },
  removeImage: { color: '#dc2626', fontSize: 11, marginTop: 4 },
});