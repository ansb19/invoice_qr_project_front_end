import { useLocalSearchParams } from "expo-router";
import { axios_instanace, requests_url } from '@/api/axios';
import CustomButton from '@/components/CustomButton';
import KakaoMap from '@/components/KakaoMap';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ImageBackground, SafeAreaView, FlatList, Platform, Linking } from 'react-native';
import { getLinkingURL } from "expo-linking";
import * as WebBrowser from 'expo-web-browser';
import WebView from "react-native-webview";

export interface DeliveryInfo {
  crgStDcd: string;
  empno: string;
  patnBranCd: string;
  branCd: string;
  rcvrClphno: string; //수화인 휴대폰번호
  wblNo: string; //송장 번호
  workHms: string; //처리 시각
  acprRlpDcd: string;
  repGoodsNm: string; //품목
  workDt: string; //처리일자
  procBranTelNo: string; // 처리점소 전화 번호
  sndrAddr: string; // 송화인 주소
  patnBranTelNo: string;
  rcvrAddr: string; // 수화인 주소
  acprNm: string; //인수자명 ??
  crgStDnm: string; //상품 상태
  sndrNm: string; //송화인 이름
  branNm: string; //처리점소
  sndrClphno: string; //송화인 휴대폰번호
  qty: string; // 수량
  crgStDcdVal: string; //상세
  goodsDtlNm: string;
  acprRlpDnm: string; //기타
  rcvrNm: string; //수화인인
  patnBranNm: string; // 상대점소
  empynm: string;
  latitude?: string;
  longitude?: string;
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
  const { InvoiceNumber } = useLocalSearchParams(); // URL 파라미터 가져오기

  const [delivery_info, setDelivery_info] = useState<DeliveryInfo | undefined>(undefined);
  const [delivery_tracker, setDelivery_tracker] = useState<DeliveryInfo[] | undefined>(undefined);
  const [delivery_coords, setDelivery_coords] = useState<Coord[] | null>(null);
  const [map_location, setMap_location] = useState<Coord | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  // useEffect(() => {
  //   if (InvoiceNumber && !isFetched) {
  //     onSearch_invoice();
  //     setIsFetched(true);
  //   }
  // }, [InvoiceNumber]);

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
      const delivery_tracker: DeliveryInfo[] = response2.data.data;
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

    if (Platform.OS === 'web')
      current_url = window.location.href;
    else
      current_url = getLinkingURL();
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
    <View style={styles.map_container}>
      <WebView originWhitelist={["*"]}
        source={{ uri: `https://qdvyuoo-ansb-8081.exp.direct/map/${12}` }}
        style={styles.map}
        geolocationEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  map_container: {
    width: "100%",
    height: "50%",
  },
  scorll_options: {
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
  map: {
    
    flex: 1,
    
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
  },
  headerText: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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

  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
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
    width: '50%',
  }
});

