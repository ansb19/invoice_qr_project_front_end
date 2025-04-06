import { axios_instanace, requests_url } from '@/api/axios';
import CustomButton from '@/components/CustomButton';
import KakaoMap from '@/components/KakaoMap';
import { makeRedirectUri } from 'expo-auth-session';
import { useFocusEffect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ImageBackground, SafeAreaView, Platform } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { InteractionManager } from 'react-native';

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

export interface Coords {
  latitude: string;
  longitude: string;
}

export default function DeliveryScreen() {

  const router = useRouter();
  const params = useLocalSearchParams();
  const [Invoice_number, setInvoice_number] = useState<string>('');
  const [prevAuto, setPrevAuto] = useState<string | null>(null); // ✅ 이전 auto 값 기억


  const auto = Array.isArray(params.auto) ? params.auto[0] : params.auto;

  useFocusEffect(() => {

    if (auto && auto !== prevAuto) {
      setInvoice_number(auto);
      setPrevAuto(auto);
      console.log("Invoice_number", Invoice_number);
      InteractionManager.runAfterInteractions(() => {
        router.push(`/(tabs)/delivery/${auto}`);
      });
    }
    // else if (auto && hasAutoPushed) {
    //   console.log("hasAutoPushed2", hasAutoPushed);
    //   setHasAutoPushed(false);
    //   setInvoice_number('');

    //   InteractionManager.runAfterInteractions(() => {
    //     router.replace(`/(tabs)/delivery`);
    //   });


    // }

  });

  const onChangeText = (input_text: string) => {
    setInvoice_number(input_text);
  }


  const handleNavigate = (InvoiceNumber: string) => {
    router.navigate(`./${InvoiceNumber}`, { relativeToDirectory: true }); // ✅ 동적 URL 이동
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('@/assets/images/background.jpg')} style={styles.background}>

        <Text style={styles.text}>CJ 대한 통운 송장 번호를 입력해주세요</Text>
        <TextInput style={styles.input} value={Invoice_number} onChangeText={onChangeText} placeholder='송장 번호를 입력해주세요.' />
        <CustomButton title='조회' onPress={() => handleNavigate(Invoice_number)}></CustomButton>
        <Text style={styles.text}>입력한 값: {Invoice_number}</Text>


      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',

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
  input: {
    width: Platform.OS === 'web' ? "50%" : "80%",
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
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
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
  labelText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007bff",
    marginBottom: 8,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginTop: 4,
  },

});

