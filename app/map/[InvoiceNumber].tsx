import Constants from "expo-constants";
import { View, StyleSheet, Platform, Alert, ActivityIndicator, Text, ScrollView } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useKakaoLoader as useKakaoLoaderOrigin, Map, MapMarker } from "react-kakao-maps-sdk"
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Coord } from "@/app/(tabs)/delivery/[InvoiceNumber]";


// * 웹으로 전체 화면 보여주는곳

export default function KakaoMap_Web() {
    const [deliveryCoords, setDeliveryCoords] = useState<Coord[]>([]);
    const [initMapCoord, setInitMapCoord] = useState<Coord | null>(null);

    const api_key = process.env.EXPO_PUBLIC_NODE_ENV === "production"
        ? process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY as string
        : process.env.EXPO_PUBLIC_KAKAO_MAP_TEST_API_KEY as string


    //웹
    if (Platform.OS === 'web') {
        useKakaoLoaderOrigin({
            appkey: api_key,
            libraries: ["clusterer", "drawing", "services"],
        })
    }

    // const getLocation = async () => {
    //     try {
    //         setLoading(true);

    //         if (Platform.OS === 'web') {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     setLocation({
    //                         coords: {
    //                             latitude: position.coords.latitude, //  position.coords.latitude
    //                             longitude: position.coords.longitude, //  position.coords.longitude
    //                             altitude: position.coords.altitude,
    //                             accuracy: position.coords.accuracy,
    //                             altitudeAccuracy: position.coords.altitudeAccuracy,
    //                             heading: position.coords.heading,
    //                             speed: position.coords.speed,
    //                         },
    //                         timestamp: position.timestamp,
    //                     });
    //                     setLoading(false);
    //                 },
    //                 (error) => {
    //                     alert("위치 가져오기 실패");
    //                     setLoading(false);
    //                 }
    //             )
    //         }
    //         else {
    //             const { status } = await Location.requestForegroundPermissionsAsync(); //사용자가 이용중에만 권한 요청 background는 백그라운드에서도 요청
    //             if (status !== "granted") {
    //                 Alert.alert("권한 필요, 위치 권한을 허용해주세요");
    //                 setLoading(false);
    //                 return;
    //             }
    //             const current_location = await Location.getCurrentPositionAsync();
    //             setLocation(current_location);
    //         }
    //     } catch (error) {
    //         console.error("위치 가져오기 실패", error);
    //         alert("위치를 가져올 수 없습니다");
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }



    useEffect(() => {
        const handleMessage = (event: any) => {
            try {
                const data = event.data;
                console.log("앱에서 보낸 데이터:", data);
                setDeliveryCoords(data.deliveryCoords);
                setInitMapCoord(data.init_map_coord);
            } catch (error) {
                console.error("데이터 파싱 오류:", error);
            }
        };
        const receiver = Platform.OS === 'web' ? document : window;

        receiver.addEventListener("message", handleMessage);

        return () => {
            receiver.removeEventListener("message", handleMessage);
        };
    }, []);

    return (
        
        <ScrollView style={styles.map_container} scrollEnabled={true}>
            {/* // <Map id="map" center={{ lat: init_map_coord!.latitude, lng: init_map_coord!.longitude }} style={styles.map} level={13}> */}
            <Map id="map" center={{ lat: initMapCoord!.latitude, lng: initMapCoord!.longitude }} style={styles.map} level={12}>
                {deliveryCoords.map((coord, index) => (
                    (<MapMarker key={index} position={{ lat: coord.latitude, lng: coord.longitude }}>
                        <View style={styles.markerTextContainer}>
                            <Text style={styles.markerText}>배송 {index + 1}</Text>
                        </View>
                    </MapMarker>)
                ))}
            </Map>
        </ScrollView>
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