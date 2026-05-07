import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, SafeAreaView,
  ActivityIndicator
} from 'react-native';
import api from '../../services/api';

export default function NotofAdmin() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

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
});