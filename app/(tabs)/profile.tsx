import { axios_instanace, requests_url } from '@/api/axios';
import CustomButton from '@/components/CustomButton';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View, StyleSheet, Image, Platform } from 'react-native';

export default function ProfileScreen() {
  const { user, logout, withdraw } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  const handleWithdraw = async () => {
    withdraw();
  };



  return (
    <View style={styles.container}>
      {user ? (
        <>
          {/* 프로필 카드 */}
          <View style={styles.profileCard}>
          <Text style={styles.userName}>{user.id}</Text>
            <Image source={{ uri: user.profile_image }} style={styles.profileImage} />
            <Text style={styles.userName}>{user.profile_nickname}</Text>
            <Text style={styles.userEmail}>{user.account_email}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
          </View>

          {/* 버튼 컨테이너 */}
          <View style={styles.buttonContainer}>
            <CustomButton title="로그아웃" onPress={handleLogout} />
            <CustomButton title="회원탈퇴" onPress={handleWithdraw} />
          </View>
        </>
      ) : (
        <Text style={styles.noUserText}>로그인 후 이용 가능합니다.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // 부모가 자식을 중앙 정렬
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    width: "100%",
    alignSelf: "center",  // 자기 자신을 중앙 정렬
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 16,
    color: "#666",
  },
  noUserText: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
