import Constants from "expo-constants";
import { View, StyleSheet, Platform, Alert, ActivityIndicator, Text, } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useKakaoLoader as useKakaoLoaderOrigin, Map, MapMarker } from "react-kakao-maps-sdk"
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { Coord } from "@/app/(tabs)/delivery/[InvoiceNumber]";
import { useLocalSearchParams } from "expo-router";

interface KakaoMapProps {
    delivery_coords?: Coord[];
    init_map_coord?: Coord | null;
}
export default function KakaoMap({ delivery_coords = [], init_map_coord }: KakaoMapProps) {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(false);
    const { InvoiceNumber } = useLocalSearchParams(); // URL 파라미터 가져오기

    const api_key = process.env.EXPO_PUBLIC_NODE_ENV === "production"
        ? process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY as string
        : process.env.EXPO_PUBLIC_KAKAO_MAP_TEST_API_KEY as string

    const webviewRef = useRef<WebView>(null);


    //웹
    if (Platform.OS === 'web') {
        useKakaoLoaderOrigin({
            appkey: api_key,
            libraries: ["clusterer", "drawing", "services"],
        })
    }

    const getLocation = async () => {
        try {
            setLoading(true);

            if (Platform.OS === 'web') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            coords: {
                                latitude: position.coords.latitude, //  position.coords.latitude
                                longitude: position.coords.longitude, //  position.coords.longitude
                                altitude: position.coords.altitude,
                                accuracy: position.coords.accuracy,
                                altitudeAccuracy: position.coords.altitudeAccuracy,
                                heading: position.coords.heading,
                                speed: position.coords.speed,
                            },
                            timestamp: position.timestamp,
                        });
                        setLoading(false);
                    },
                    (error) => {
                        alert("위치 가져오기 실패");
                        setLoading(false);
                    }
                )
            }
            else {
                const { status } = await Location.requestForegroundPermissionsAsync(); //사용자가 이용중에만 권한 요청 background는 백그라운드에서도 요청
                if (status !== "granted") {
                    Alert.alert("권한 필요, 위치 권한을 허용해주세요");
                    setLoading(false);
                    return;
                }
                const current_location = await Location.getCurrentPositionAsync();
                setLocation(current_location);
            }
        } catch (error) {
            console.error("위치 가져오기 실패", error);
            alert("위치를 가져올 수 없습니다");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (Platform.OS === 'web') {
            getLocation();
        }
        else { //앱 환경이라면면
            const data = {
                delivery_coords, init_map_coord
            }

            const script = `
        window.postMessage(${JSON.stringify(data)}, "*");
        true;
      `;
            if (webviewRef.current)
                webviewRef.current.injectJavaScript(script);
        }
    }, []);

    return (
        <View style={styles.map_container}>
            {loading ? (
                <ActivityIndicator size={"large"} color={"#00af00"} />
            )
                : location ?
                    (
                        Platform.OS === 'web' ? (
                            <Map id="map" center={{ lat: init_map_coord!.latitude, lng: init_map_coord!.longitude }} style={styles.map} level={13}>

                                {delivery_coords.map((coord, index) => {
                                    
                                    let label = `배송 ${index + 1}`;

                                    if(index === 0)
                                        label = "출발지";
                                    else if(index === delivery_coords.length -1)
                                        label = "도착지";

                                    return (<MapMarker key={index} position={{ lat: coord.latitude, lng: coord.longitude }}>
                                        <View style={styles.markerTextContainer}>
                                            <Text style={styles.markerText}>{label}</Text>
                                        </View>
                                    </MapMarker>)
                                })}

                            </Map>

                        ) : (
                            <WebView originWhitelist={["*"]}
                                source={{ uri: `https://qdvyuoo-ansb-8081.exp.direct/map/${InvoiceNumber}` }}
                                style={styles.map}
                                ref={webviewRef}
                                onMessage={(event: WebViewMessageEvent) => {
                                    console.log("웹에서 보낸 데이터:", JSON.parse(event.nativeEvent.data));
                                }}
                                geolocationEnabled={true}

                            />
                        )
                    )
                    : (<Text>위치 정보를 가져올 수 없음. 권한을 허용해주세요</Text>)
            }
        </View>
    )

}

const styles = StyleSheet.create({
    map_container: {
        width: "50%",
        height: 550,
    },
    map: {
        marginTop: 20,
        marginBottom: 20,
        flex: 1,
        borderRadius: 16,
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