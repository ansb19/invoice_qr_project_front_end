import CustomButton from "@/components/CustomButton";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function DeliveryCard() {
    return (
        <View style={styles.container}>
            <CustomButton title="클릭하세요" onPress={() => alert("버튼 클릭됨!")} />
            <CustomButton title="아웃라인 버튼" onPress={() => console.log("Outline 클릭!")} type="outline" />

            <CustomButton title="비활성화 버튼" onPress={() => { }} type="disabled" />
            <CustomButton title="로딩 중..." onPress={() => { }} loading={true} />

            <CustomButton
                title="아이콘 버튼"
                onPress={() => console.log("아이콘 버튼 클릭!")}
                icon={<MaterialIcons name="send" size={20} color="white" />}
            />

        </View>
    );
}

// ✅ Label (항목명) 데이터
const labelData = {
    trackingNumber: "운송장번호",
    sender: "송화인",
    senderAddress: "송화인 주소",
    receiver: "수화인",
    receiverAddress: "수화인 주소",
    item: "품목",
    quantity: "수량",
    recipient: "인수자명",
    recipientRelation: "인수자관계",
};

// ✅ Value (실제 데이터) - API 응답 데이터로 대체 가능
const valueData = {
    trackingNumber: "595320445933",
    sender: "지**",
    senderAddress: "전북특별자치도 군산시 오식도동******",
    receiver: "안**",
    receiverAddress: "부산광역시 금정구 부곡로168번길******",
    item: "PORTABLE AUTOMATIC DATA PROCESSING MACHINES 2024\n8128GB Haze Purple",
    quantity: "1",
    recipient: "현**",
    recipientRelation: "기타",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // Android 그림자
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
    },
    value: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#222",
        marginTop: 4,
    },
});
