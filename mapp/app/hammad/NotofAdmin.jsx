import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, SafeAreaView,
  ActivityIndicator, TouchableOpacity, Image, Alert
} from 'react-native';
import api from '../../services/api';
// استدعاء مكتبات الصور والملفات
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function NotofAdmin() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات (States) لحفظ الصورة والملف اللي تم اختيارهم
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

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
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // دالة اختيار الصورة
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // اختيار صور فقط
        allowsEditing: true, // السماح بقص الصورة
        quality: 1, // أعلى جودة
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]); // حفظ بيانات الصورة في الـ State
      }
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء اختيار الصورة");
    }
  };

  // دالة اختيار الملف (PDF, Word, الخ)
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // السماح باختيار أي نوع ملف (ممكن تخليها 'application/pdf' مثلاً)
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedDocument(result.assets[0]); // حفظ بيانات الملف في الـ State
      }
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء اختيار الملف");
    }
  };
  const uploadFile = async () => {
    if (!selectedImage && !selectedDocument) {
      Alert.alert('تنبيه', 'الرجاء اختيار صورة أو ملف أولاً');
      return;
    }

    try {
      const formData = new FormData();

      if (selectedImage) {
        formData.append('file', {
          uri: selectedImage.uri,
          type: selectedImage.mimeType || 'image/jpeg',
          name: selectedImage.fileName || 'image.jpg',
        });
        formData.append('type', 'image');
      } else if (selectedDocument) {
        formData.append('file', {
          uri: selectedDocument.uri,
          type: selectedDocument.mimeType || 'application/pdf',
          name: selectedDocument.name,
        });
        formData.append('type', 'document');
      }

      const response = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        Alert.alert('نجاح', 'تم رفع الملف بنجاح');
        setSelectedImage(null);
        setSelectedDocument(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('خطأ', 'فشل رفع الملف');
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
        <Text style={styles.headerTitle}>إشعارات الأدمن</Text>
      </View>
      {/* بعد عرض الملفات */}
      <TouchableOpacity style={styles.uploadSubmitBtn} onPress={uploadFile}>
        <Text style={styles.uploadSubmitText}>📤 رفع الملف</Text>
      </TouchableOpacity>

      {/* ------------ قسم اختيار الملفات والصور ------------ */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadTitle}>إرفاق ملفات (اختياري):</Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Text style={styles.uploadBtnText}>📷 اختيار صورة</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickDocument}>
            <Text style={styles.uploadBtnText}>📁 اختيار ملف</Text>
          </TouchableOpacity>
        </View>

        {/* عرض الصورة المختارة لو موجودة */}
        {selectedImage && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
            <TouchableOpacity onPress={() => setSelectedImage(null)}>
              <Text style={styles.removeText}>❌ إزالة الصورة</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* عرض اسم الملف المختار لو موجود */}
        {selectedDocument && (
          <View style={styles.previewContainer}>
            <Text style={styles.fileNameText}>📄 {selectedDocument.name}</Text>
            <TouchableOpacity onPress={() => setSelectedDocument(null)}>
              <Text style={styles.removeText}>❌ إزالة الملف</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* -------------------------------------------------- */}

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
              <Text style={styles.commentsTitle}>
                💬 التعليقات ({item.comments?.length || 0})
              </Text>
              {item.comments?.map((comment) => (
                <View key={comment._id} style={styles.commentItem}>
                  <Text style={styles.commentUser}>{comment.userId?.fullName}</Text>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>
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
  time: { fontSize: 11, color: '#999', marginBottom: 8 },
  commentsSection: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#eee' },
  commentsTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 6 },
  commentItem: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 8, marginBottom: 6 },
  commentUser: { fontSize: 11, fontWeight: 'bold', marginBottom: 2 },
  commentText: { fontSize: 12 },

  // الاستايلات الجديدة الخاصة بقسم الرفع
  uploadSection: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
  },
  uploadTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  uploadBtn: {
    flex: 1,
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#bfdbfe'
  },
  uploadBtnText: { color: '#2563eb', fontWeight: 'bold', fontSize: 13 },
  previewContainer: {
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
  },
  imagePreview: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  fileNameText: { fontSize: 13, color: '#475569', marginBottom: 8, textAlign: 'center' },
  removeText: { color: '#ef4444', fontSize: 13, fontWeight: 'bold' },
});