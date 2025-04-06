
import KakaoLoginButton from "@/components/KakaoLoginButton";
import { useAuth } from "@/context/AuthContext";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Linking, StyleSheet, View, Text, Platform } from "react-native";

export default function KakaoLogin() {
    const router = useRouter();
    const { isLogined, login } = useAuth();




    useEffect(() => {
        console.log("카카오 로그인 상태 체크:", isLogined);
        if (isLogined) {
            router.replace('/(tabs)');
        }
    }, [isLogined]);

    console.log("카카오 로그인 바깥 상태 체크:", isLogined);

    const handle_kakao_login = async () => {

        login();
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.background}>

                <Text style={styles.text}>카카오 로그인</Text>
                <Text style={styles.textContent}>로그인 혹은 회원가입을 진행해주세요.</Text>
                <Text style={styles.textContent}>(카카오톡 앱 권한으로 인해 테스트아이디로 로그인해주세요)</Text>
                <Text style={styles.textContent}>TEST KAKAO ID: dksdudtjr1997@kakao.com</Text>
                <Text style={styles.textContent}>TEST KAKAO P/W: test1997@</Text>

                <KakaoLoginButton onPress={handle_kakao_login} />

            </ImageBackground>
        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: "center", // 콘텐츠 (가로세로) 중앙 정렬
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',

    },
    text: {
        color: "#25292e",
        fontSize: 30,
        marginTop: 100,
        fontWeight: "bold"
    },
    textContent: {
        color: "#25292e",
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
    },

    kakao_map: {
        flex: 1,
    }

})
