import { axios_instanace, requests_url } from "@/api/axios";
import KakaoLoginButton from "@/components/KakaoLoginButton";
import MyInvoice from "@/components/MyInvoice";
import { useAuth } from "@/context/AuthContext";
import { ImageBackground } from "expo-image";
import { View, StyleSheet, Text, ScrollView } from "react-native";

export default function Index() {

    // 만약 쿠키가 없으면 로그인 하라고 띄움 있으면 홈 화면에 최근 조회 송장 10개 불러옴


    return (
        
            <View style={styles.container}>

                <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.background}>

                    <Text style={styles.text}>QR 송장 </Text>
                    <Text style={styles.textContent}>QR 송장에 오신 걸 환영 합니다.</Text>


                    
                    <MyInvoice />
                    
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
        marginTop: 35,
        marginBottom: 35,
        fontWeight: "bold",
    },

    kakao_map: {
        flex: 1,
    }

})