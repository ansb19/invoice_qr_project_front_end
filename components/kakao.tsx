import Constants from "expo-constants";
import { View, StyleSheet, Platform, Alert, ActivityIndicator, Text } from "react-native";
import WebView from "react-native-webview";
import { useKakaoLoader as useKakaoLoaderOrigin, Map, MapMarker } from "react-kakao-maps-sdk"
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function KakaoMap() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(false);

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

    //앱
    const kakaoMapHtml = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${api_key}&libraries=services,clusterer,drawing"></script>
    <style>
        body, html { margin: 0; padding: 0; height: 100%; }
        #map { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        window.onload = function () {
            var mapContainer = document.getElementById('map'); 
            var mapOption = { 
                center: new kakao.maps.LatLng(${location?.coords.latitude}, ${location?.coords.longitude}), 
                level: 3
            }; 
            var map = new kakao.maps.Map(mapContainer, mapOption); 
        }
    </script>
</body>
</html>
`;

    const getLocation = async () => {
        try {
            setLoading(true);

            if (Platform.OS === 'web') {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            coords: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
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
        getLocation();
    }, []);

    return (
        <View style={styles.map_container}>
            {loading ? (
                <ActivityIndicator size={"large"} color={"#00af00"} />
            )
                : location ?
                    (
                        Platform.OS === 'web' ? (
                            <Map id="map" center={{ lat: location!.coords.latitude, lng: location!.coords.longitude }} style={styles.map} level={3}>
                                <MapMarker position={{ lat: location!.coords.latitude, lng: location!.coords.longitude }}>
                                    내 위치
                                </MapMarker>
                            </Map>

                        ) : (
                            <WebView originWhitelist={["*"]}
                                source={{ uri: "https://qdvyuoo-ansb-8081.exp.direct/ex" }}
                                style={styles.map}
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
        width: "100%",
        height: 350,
    },
    map: {
        marginTop: 20,
        marginBottom: 20,
        flex: 1,
        borderRadius: 16,
    }
});