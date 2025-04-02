import { axios_instanace, requests_url } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function MyInvoice() {
  const [recentInvoices, setRecentInvoices] = useState<string[]>([]);
  const isFirstRun = useRef(true);
  const { isLogined } = useAuth();

  const handleNavigate = (invoice_number: string) => {
    router.navigate(`/delivery/${invoice_number}`);
  }

  const loadRecentInvoices = useCallback(async () => {
    try {
      console.log("내 송장에서 로그인 상태체크:", isLogined);
      if (isLogined) {
        // ✅ AsyncStorage 또는 백엔드에서 가져오기 (예시로 하드코딩된 데이터 사용)
        const response = await axios_instanace.get(requests_url.find_my_invoice);

        if (response.status === 200) {
          const my_invoices: string[] = response.data.data;
          console.log(recentInvoices);
          setRecentInvoices(my_invoices);
          setTimeout(() => {
            alert("송장 조회 성공 세션 있음");
          }, 0);
        }
        else if (response.status === 401 && response.data.message) {
          console.log(response.data.message);
          // alert(response.data.message);

          // setTimeout(() => {
          //   alert("송장 조회 세션 실패");
          //   router.replace('/kakao_login');
          // }, 0);
        }
      }
      else{
        alert("로그인이 되어있지 않습니다 로그인을 해주세요");
        setTimeout(() => {
          router.replace('/kakao_login');
        }, 0);
      }
    } catch (error) {
      console.error("송장 목록 불러오기 실패", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRecentInvoices();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 최근 조회한 송장</Text>

      <FlatList
        data={recentInvoices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.invoiceItem} onPress={() => handleNavigate(item)}>
            <Text style={styles.invoiceText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
    width: 'auto',
    height: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  invoiceItem: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  invoiceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});


