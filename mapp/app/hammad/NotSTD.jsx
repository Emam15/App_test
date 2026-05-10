import React, { useState } from 'react';
import {
  StyleSheet, Text, View, FlatList, SafeAreaView,
  TouchableOpacity, Modal, ScrollView, TextInput,
  KeyboardAvoidingView, Platform, Alert, Image
} from 'react-native';

// استدعاء مكتبات الصور والملفات
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function StudentNotifications() {
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'بدء تسجيل الأنشطة الطلابية',
      description: 'يمكنكم الآن التوجه لرعاية الشباب لتسجيل أسمائكم في الأنشطة الرياضية والثقافية المتاحة للترم الحالي.',
      audience: 'Students',
      date: 'منذ ساعة',
      comments: [{ user: 'أحمد علي', text: 'هل متاح نشاط الشطرنج؟', image: null, document: null }]
    },
    {
      id: '2',
      title: 'موعد تسليم المشاريع',
      description: 'آخر موعد لتسليم مشاريع الترم هو 15 مايو',
      audience: 'Students',
      date: 'منذ يومين',
      comments: []
    }
  ]);

  const [selectedNotif, setSelectedNotif] = useState(null);
  const [commentText, setCommentText] = useState('');

  // States للملفات والصور الخاصة بالتعليق
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // دالة اختيار الصورة
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
        setSelectedDocument(null); // عشان نرفع حاجة واحدة بس في التعليق (صورة أو ملف)
      }
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء اختيار الصورة");
    }
  };

  // دالة اختيار الملف
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedDocument(result.assets[0]);
        setSelectedImage(null); // عشان نرفع حاجة واحدة بس في التعليق
      }
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء اختيار الملف");
    }
  };

  const addComment = () => {
    // التأكد إن فيه نص أو صورة أو ملف قبل الإرسال
    if (!commentText.trim() && !selectedImage && !selectedDocument) {
      Alert.alert('تنبيه', 'الرجاء كتابة تعليق أو إرفاق ملف');
      return;
    }

    const newCommentData = {
      user: 'أنا (طالب)',
      text: commentText,
      image: selectedImage ? selectedImage.uri : null,
      document: selectedDocument ? selectedDocument.name : null
    };

    const updated = announcements.map(item => {
      if (item.id === selectedNotif.id) {
        const newComments = [...(item.comments || []), newCommentData];
        return { ...item, comments: newComments };
      }
      return item;
    });

    setAnnouncements(updated);
    setSelectedNotif({
      ...selectedNotif,
      comments: [...(selectedNotif.comments || []), newCommentData]
    });

    // تصفير الحقول بعد الإرسال
    setCommentText('');
    setSelectedImage(null);
    setSelectedDocument(null);
  };

  return (
    <SafeAreaView style={styles.containerStudent}>
      <View style={styles.headerStudent}>
        <Text style={styles.headerTitle}>إشعارات الطالب</Text>
        <Text style={{ fontSize: 24 }}>🔔</Text>
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
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: '75%' }}>
              <Text style={styles.modalTitle}>{selectedNotif?.title}</Text>
              <Text style={styles.modalDesc}>{selectedNotif?.description}</Text>
              <Text style={styles.modalDate}>{selectedNotif?.date}</Text>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>التعليقات</Text>
              {selectedNotif?.comments?.length === 0 ? (
                <Text style={styles.noComments}>لا توجد تعليقات بعد</Text>
              ) : (
                selectedNotif?.comments?.map((c, i) => (
                  <View key={i} style={styles.commentBox}>
                    <Text style={styles.commentUser}>{c.user}</Text>
                    {c.text ? <Text style={styles.commentText}>{c.text}</Text> : null}

                    {/* عرض الصورة جوه التعليق لو موجودة */}
                    {c.image && (
                      <Image source={{ uri: c.image }} style={styles.commentImage} />
                    )}

                    {/* عرض اسم الملف جوه التعليق لو موجود */}
                    {c.document && (
                      <View style={styles.commentDocumentBox}>
                        <Text style={styles.commentDocumentText}>📄 {c.document}</Text>
                      </View>
                    )}
                  </View>
                ))
              )}
            </ScrollView>

            {/* منطقة معاينة المرفقات قبل الإرسال */}
            {(selectedImage || selectedDocument) && (
              <View style={styles.previewArea}>
                {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.previewImage} />}
                {selectedDocument && <Text style={styles.previewDocText}>📄 {selectedDocument.name}</Text>}
                <TouchableOpacity onPress={() => { setSelectedImage(null); setSelectedDocument(null); }} style={styles.cancelAttachmentBtn}>
                  <Text style={styles.cancelAttachmentText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* منطقة إدخال التعليق والمرفقات */}
            <View style={styles.inputArea}>
              <TouchableOpacity style={styles.attachIcon} onPress={pickDocument}>
                <Text style={{ fontSize: 18 }}>📁</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.attachIcon} onPress={pickImage}>
                <Text style={{ fontSize: 18 }}>📷</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.commentInput}
                placeholder="اكتب تعليقك..."
                placeholderTextColor="#999"
                value={commentText}
                onChangeText={setCommentText}
                textAlign="right"
              />

              <TouchableOpacity style={styles.sendIcon} onPress={addComment}>
                <Text style={styles.sendIconText}>📤</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.btnClose} onPress={() => {
              setSelectedNotif(null);
              setSelectedImage(null);
              setSelectedDocument(null);
            }}>
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
  headerStudent: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  cardStudent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderRightWidth: 4,
    borderRightColor: '#3B82F6',
    elevation: 3
  },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'right' },
  desc: { fontSize: 14, color: '#64748B', textAlign: 'right', marginTop: 5 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10
  },
  moreText: { color: '#3B82F6', fontSize: 12, fontWeight: 'bold' },
  commentCount: { color: '#94A3B8', fontSize: 12 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 10,
    height: '85%' // تحديد ارتفاع المودال عشان الـ Scroll يشتغل صح
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 },
  modalDesc: { fontSize: 15, color: '#475569', textAlign: 'right', lineHeight: 24 },
  modalDate: { fontSize: 12, color: '#94A3B8', textAlign: 'right', marginTop: 8 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 },
  noComments: { fontSize: 13, color: '#94A3B8', textAlign: 'center', padding: 20 },

  commentBox: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
    minWidth: '70%',
    maxWidth: '90%'
  },
  commentUser: { fontSize: 11, fontWeight: 'bold', color: '#3B82F6', textAlign: 'right', marginBottom: 4 },
  commentText: { fontSize: 13, textAlign: 'right', marginBottom: 4 },
  commentImage: { width: 150, height: 150, borderRadius: 8, marginTop: 5, alignSelf: 'flex-end' },
  commentDocumentBox: { backgroundColor: '#E2E8F0', padding: 8, borderRadius: 6, marginTop: 5 },
  commentDocumentText: { fontSize: 12, color: '#333', textAlign: 'right' },

  // ستايل منطقة معاينة المرفقات قبل الإرسال
  previewArea: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  previewImage: { width: 40, height: 40, borderRadius: 5, marginLeft: 10 },
  previewDocText: { fontSize: 12, color: '#3B82F6', marginLeft: 10, flex: 1, textAlign: 'right' },
  cancelAttachmentBtn: { padding: 5 },
  cancelAttachmentText: { fontSize: 12, color: 'red' },

  inputArea: { flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginTop: 10 },
  attachIcon: {
    backgroundColor: '#F1F5F9',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  sendIcon: {
    backgroundColor: '#3B82F6',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendIconText: { fontSize: 20, color: 'white' },

  btnClose: { marginTop: 10, padding: 10, alignItems: 'center' },
  btnCloseText: { color: '#64748B', fontWeight: 'bold', fontSize: 16 }
});