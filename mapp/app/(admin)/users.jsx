import { useState, useEffect, useCallback } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { colors: c, dark, toggleDark } = useTheme();
    const router = useRouter();

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            console.log('Fetching users...');
            const response = await api.get('/auth/users');
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            if (response.data.success) {
                setUsers(response.data.users);
                console.log('Users set:', response.data.users.length);
            }
        } catch (error) {
            console.log('Error details:', error);
            Alert.alert('خطأ', 'فشل تحميل المستخدمين');


        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    const handleDeleteUser = async (userId, userName) => {
        Alert.alert(
            'تأكيد الحذف',
            `هل أنت متأكد من حذف المستخدم "${userName}"؟`,
            [
                { text: 'إلغاء', style: 'cancel' },
                {
                    text: 'حذف',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/auth/users/${userId}`);
                            Alert.alert('نجاح', 'تم حذف المستخدم');
                            fetchUsers();
                        } catch (error) {
                            Alert.alert('خطأ', error.response?.data?.message || 'فشل الحذف');
                        }
                    }
                }
            ]
        );
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin': return '#dc2626';
            case 'instructor': return '#16a34a';
            case 'student': return '#2563eb';
            default: return '#6b7280';
        }
    };

    const getRoleName = (role) => {
        switch (role) {
            case 'admin': return 'أدمن';
            case 'instructor': return 'دكتور';
            case 'student': return 'طالب';
            default: return role;
        }
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]}>
            <View style={[styles.header, { backgroundColor: c.card, borderBottomColor: c.border }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={[styles.backIcon, { color: c.text }]}>←</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: c.text }]}>المستخدمين</Text>
                <TouchableOpacity style={[styles.iconBtn, { backgroundColor: c.bg }]} onPress={toggleDark}>
                    <Text style={styles.iconBtnText}>{dark ? '☀️' : '🌙'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                {loading ? (
                    <Text style={{ color: c.text, textAlign: 'center', marginTop: 40 }}>جاري التحميل...</Text>
                ) : users.length === 0 ? (
                    <Text style={{ color: c.subText, textAlign: 'center', marginTop: 40 }}>لا يوجد مستخدمين</Text>
                ) : (
                    users.map((user) => (
                        <View key={user._id} style={[styles.userCard, { backgroundColor: c.card }]}>
                            <View style={styles.userHeader}>
                                <View style={[styles.avatar, { backgroundColor: getRoleBadgeColor(user.role) }]}>
                                    <Text style={styles.avatarText}>{user.fullName?.charAt(0) || '?'}</Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Text style={[styles.userName, { color: c.text }]}>{user.fullName}</Text>
                                    <Text style={[styles.userEmail, { color: c.subText }]}>{user.email}</Text>
                                </View>
                                <View style={[styles.roleBadge, { backgroundColor: getRoleBadgeColor(user.role) + '20' }]}>
                                    <Text style={[styles.roleText, { color: getRoleBadgeColor(user.role) }]}>
                                        {getRoleName(user.role)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.userFooter}>
                                <Text style={[styles.userMeta, { color: c.subText }]}>
                                    🆔 {user.studentId || 'N/A'} • 📅 {new Date(user.createdAt).toLocaleDateString()}
                                </Text>
                                {user.role !== 'admin' && (
                                    <TouchableOpacity
                                        style={styles.deleteBtn}
                                        onPress={() => handleDeleteUser(user._id, user.fullName)}
                                    >
                                        <Text style={styles.deleteBtnText}>🗑️ حذف</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: { padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 },
    backBtn: { padding: 4 },
    backIcon: { fontSize: 22, fontWeight: '800' },
    headerTitle: { fontSize: 18, fontWeight: '800' },
    iconBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    iconBtnText: { fontSize: 16 },
    scroll: { padding: 16 },
    userCard: { borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
    userHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
    avatar: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    userInfo: { flex: 1 },
    userName: { fontSize: 16, fontWeight: 'bold' },
    userEmail: { fontSize: 13, marginTop: 2 },
    roleBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    roleText: { fontSize: 11, fontWeight: 'bold' },
    userFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#e5e5e5' },
    userMeta: { fontSize: 11 },
    deleteBtn: { backgroundColor: '#fee2e2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    deleteBtnText: { color: '#dc2626', fontSize: 12, fontWeight: '600' },
}); 