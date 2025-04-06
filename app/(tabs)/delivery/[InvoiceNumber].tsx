import { useGlobalSearchParams } from "expo-router";
import { axios_instanace, requests_url } from '@/api/axios';
import CustomButton from '@/components/CustomButton';
import KakaoMap from '@/components/KakaoMap';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, SafeAreaView, FlatList, Platform, Linking, ScrollView } from 'react-native';
import { getLinkingURL } from "expo-linking";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from "expo-auth-session";

export interface DeliveryInfo {
  wblNo: string,
  sndrNm: string,
  sndrClphno: string,
  sndrAddr: string,
  rcvrNm: string,
  rcvrClphno: string,
  rcvrAddr: string,
  repGoodsNm: string,
  qty: string,
}

export interface DeliveryTrack {
  branNm: string,
  procBranTelNo: string,
  workDt: string,
  workHms: string,
  crgStDnm: string,
  crgStDcdVal: string,
}

export interface Coord {
  latitude: number;
  longitude: number;
  address: string;
}

const TRACKER_HEADERS = ["처리점소", "전화번호", "처리일자", "처리시각", "상품상태", "상세"];

const INVOICE_HEADERS: Record<string, string> = {
  wblNo: "운송장 번호",
  sndrNm: "송화인",
  sndrClphno: "송화인 연락처",
  sndrAddr: "송화인 주소",
  rcvrNm: "수화인",
  rcvrClphno: "수화인 연락처",
  rcvrAddr: "수화인 주소",
  repGoodsNm: "품목",
  qty: "수량",
}


export default function DeliveryDetail() {
  const { InvoiceNumber } = useGlobalSearchParams(); // URL 파라미터 가져오기

  const [delivery_info, setDelivery_info] = useState<DeliveryInfo | undefined>(undefined);
  const [delivery_tracker, setDelivery_tracker] = useState<DeliveryTrack[] | undefined>(undefined);
  const [delivery_coords, setDelivery_coords] = useState<Coord[] | null>(null);
  const [map_location, setMap_location] = useState<Coord | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (InvoiceNumber) { // && !isFetched
      onSearch_invoice();
      //setIsFetched(true);
    }
  }, [InvoiceNumber]);

  const onSearch_invoice = async () => {

    try {

      let [response, response2, response3] = await Promise.all([
        axios_instanace.get(
          `${requests_url.info}/${InvoiceNumber}`
        ),
        axios_instanace.get(
          `${requests_url.tracker}/${InvoiceNumber}`
        ),
        axios_instanace.get(
          `${requests_url.coords}/${InvoiceNumber}`
        ),

      ])

      const delivery_info: DeliveryInfo = response.data.data;
      setDelivery_info(delivery_info);

      if (response.status === 200) {
        await axios_instanace.post(requests_url.find_my_invoice, { invoice_number: InvoiceNumber });
      }
      const delivery_tracker: DeliveryTrack[] = response2.data.data;
      setDelivery_tracker(delivery_tracker);

      const delivery_coord = response3.data.data;
      setDelivery_coords(delivery_coord);

      const map_init_coord: Coord = {
        latitude: (parseFloat(delivery_coord[0].latitude) + parseFloat(delivery_coord[delivery_coord.length - 1].latitude)) / 2,  // 좌표값 예시
        longitude: (parseFloat(delivery_coord[0].longitude) + parseFloat(delivery_coord[delivery_coord.length - 1].longitude)) / 2,
        address: "맵 초기 위치"
      }
      setMap_location(map_init_coord);

    } catch (error) {
      alert('송장 번호가 틀렸습니다. 다시 조회해주세요.');
      console.error(error);
    }
    // alert(`입력한 값: ${Invoice_number}`);
  };




  const onChangeQR = async () => {
    let current_url;

    if (Platform.OS === 'web') {
      current_url = window.location.href;

      console.log("current",current_url);
    }
    else {
      
      console.log("current_url2");
      
      current_url = makeRedirectUri( { scheme: 'invoice_qr', path: `delivery/${InvoiceNumber}`});
      console.log(current_url);
    }


    try {
      console.log("현재 url:", current_url);
      const response = await axios_instanace.get(
        `${requests_url.qr_code}`, {
        params: {
          url: current_url,
        }
      }
      )

      const qr_code_url = response.data.data;
      console.log(qr_code_url);
      //await Linking.openURL(qr_code_url);
      WebBrowser.openBrowserAsync(qr_code_url);

      // const openAuthSession = async (url: string) => {
      //   const result = await WebBrowser.openAuthSessionAsync(url);
      //   if (result.type === "success") {
      //     WebBrowser.maybeCompleteAuthSession();
      //   }
      // };
    } catch (error) {
      console.error(error);
      alert(" qr 코드 생성 에러 발생");
    }
  }



  return (
    <ScrollView scrollEnabled={true} centerContent={true}>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.background}>


          <Text style={styles.title}>📦 송장정보</Text>

          <View style={styles.card}>
            {Object.keys(INVOICE_HEADERS).map((key) => (
              <View key={key} style={styles.rowContainer}>
                <Text style={styles.label}>{INVOICE_HEADERS[key]}</Text>
                <Text style={styles.value}>{delivery_info?.[key as keyof DeliveryInfo] || "N/A"}</Text>
              </View>
            ))}
          </View>


          <Text style={styles.title}>🚚 위치정보 </Text>

          <View style={styles.header}>
            {TRACKER_HEADERS.map((header, index) => (
              <Text key={index} style={styles.headerText}>{header}</Text>
            ))}
          </View>
          <FlatList data={delivery_tracker} style={{ flex: 1, width: Platform.OS === 'web' ? "50%" : "90%" }}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.branNm}</Text>
                <Text style={styles.cell}>{item.procBranTelNo}</Text>
                <Text style={styles.cell}>{item.workDt}</Text>
                <Text style={styles.cell}>{item.workHms}</Text>
                <Text style={styles.cell}>{item.crgStDnm}</Text>
                <Text style={styles.cell}>{item.crgStDcdVal}</Text>
              </View>
            )}
          />

          {delivery_coords && <KakaoMap delivery_coords={delivery_coords} init_map_coord={map_location} />}


          <View style={styles.buttonContainer}>
            <CustomButton title='QR 코드로 생성' onPress={() => onChangeQR()}></CustomButton>
          </View>

        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },


  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  text: {
    color: '#111',
    fontSize: 28,
    fontWeight: "bold",

  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 16,
    justifyContent: "space-between", // ✅ 열 간격 정렬
    width: Platform.OS === 'web' ? "50%" : "90%", // ✅ 전체 너비를 동일하게 설정
    paddingHorizontal: 10, // ✅ 좌우 패딩 추가
  },
  headerText: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5, // 패딩 추가로 텍스트 정렬 보정
  },
  row: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginTop: 4,
  },
  evenRow: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: 'heavy',
    paddingHorizontal: 5, // 패딩 추가로 텍스트 정렬 보정
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    width: Platform.OS === 'web' ? "50%" : "90%",
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 10,  // 좌우 마진 추가
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: "row",  // 가로 정렬 적용
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    flexWrap: "wrap",  // ✅ 줄 바꿈 적용
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,  // ✅ 자동 확장 (너무 길어지지 않게)
    maxWidth: "20%", // ✅ 라벨이 너무 길어지는 것 방지
    color: "#007bff",
    flexWrap: "wrap",  // ✅ 줄 바꿈 적용
    margin: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    flex: 2,  // ✅ 값을 차지할 공간을 늘림
    maxWidth: "75%", // ✅ 줄 바꿈을 위해 너비 제한
  },
  buttonContainer: {
    width: Platform.OS === 'web' ? "25%" : "50%",
  }
});

