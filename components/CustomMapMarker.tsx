import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MapMarker } from "react-kakao-maps-sdk"; // 사용하는 라이브러리에 맞게 임포트

const CustomMapMarker = ({ position, text }: { position: { lat: number; lng: number }; text: string }) => {
    return (
        <MapMarker position={position}>
            <View style={styles.infoWindow}>
                <Text style={styles.infoText}>{text}</Text>
                <View style={styles.infoArrow} />
            </View>
        </MapMarker>
    );
};

const styles = StyleSheet.create({
    infoWindow: {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // 반투명 배경
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: 120,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    infoText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    infoArrow: {
        position: "absolute",
        bottom: -6,
        left: "50%",
        marginLeft: -5,
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 6,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "rgba(255, 255, 255, 0.9)", // 배경과 같은 색으로 조정
    },
});

export default CustomMapMarker;
