import Constants from "expo-constants";
import { View, StyleSheet, Platform, Alert, ActivityIndicator, Text, ScrollView } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useKakaoLoader as useKakaoLoaderOrigin, Map, MapMarker } from "react-kakao-maps-sdk"
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Coord } from "@/app/(tabs)/delivery/[InvoiceNumber]";
import { Stack } from "expo-router";


// * 웹으로 전체 화면 보여주는곳

export default function KakaoMap_Web() {
    const [deliveryCoords, setDeliveryCoords] = useState<Coord[]>([]);
    const [initMapCoord, setInitMapCoord] = useState<Coord | null>(null);

    const api_key = process.env.EXPO_PUBLIC_NODE_ENV === "production"
        ? process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY as string
        : process.env.EXPO_PUBLIC_KAKAO_MAP_TEST_API_KEY as string



    useKakaoLoaderOrigin({
        appkey: api_key,
        libraries: ["clusterer", "drawing", "services"],
    })




    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            try {
                const { delivery_coords, init_map_coord } = JSON.parse(event.data);
                console.log("앱에서 보낸 데이터:", event.data + delivery_coords);
                if (delivery_coords.length > 0) {
                    setDeliveryCoords(delivery_coords);
                }

                if (init_map_coord) {
                    setInitMapCoord(init_map_coord);
                }
            } catch (error) {
                console.error("데이터 파싱 오류:", error);
            }
        };
        //const receiver = Platform.OS === 'web' ? document : window;

        document.addEventListener("message", handleMessage as EventListener);
        window.addEventListener("message", handleMessage);

        return () => {
            document.removeEventListener("message", handleMessage as EventListener);
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.map_container} >
                {/* // <Map id="map" center={{ lat: init_map_coord!.latitude, lng: init_map_coord!.longitude }} style={styles.map} level={13}> */}
                {initMapCoord ? (
                    <Map id="map" center={{ lat: initMapCoord!.latitude, lng: initMapCoord!.longitude }} style={styles.map} level={13}>

                        {deliveryCoords.map((coord, index) => {

                            let label = `배송 ${index + 1}`;

                            if (index === 0)
                                label = "출발지";
                            else if (index === deliveryCoords.length - 1)

                                label = "도착지";
                            return (<MapMarker key={index} position={{ lat: coord.latitude, lng: coord.longitude }}>
                                <View style={styles.markerTextContainer}>
                                    <Text style={styles.markerText}>배송 {index + 1}</Text>
                                </View>
                            </MapMarker>)
                        })}
                    </Map>
                )
                    : (<Text>지도 로딩 중...</Text>)
                }
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    map_container: {
        width: "100%",
        height: "100%",
    },
    map: {

        flex: 1,

    },
    markerTextContainer: {
        backgroundColor: "rgba(255, 255, 25, 0.8)", // 반투명 배경
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8, // 모서리 둥글게
        borderWidth: 1,
        borderColor: "#ccc",
        shadowColor: "#000", // 그림자 효과 추가
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Android 그림자 효과
        maxWidth: 120, // 너무 길어지지 않도록 제한
        alignItems: "center",
        justifyContent: "center",
    },
    markerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
});