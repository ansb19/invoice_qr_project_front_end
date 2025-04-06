import LoadingLogin from "@/app/response_login";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function RootLayout() {

  console.log("루트 레이아웃웃")
  return (
    <AuthProvider>

      <App_Stack />
      <StatusBar style='light' />
    </AuthProvider>
  )
}

function App_Stack() {
  const { isLogined } = useAuth();

  console.log("앱 레이아웃에서 로그인 상태: ", isLogined)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLogined ? (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#25292e" },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="map/[InvoiceNumber]" options={{ title: "지도데이터", headerShown: false }} />
        </Stack>
      ) : (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#25292e" },
            headerTitleAlign: "center",
            headerTintColor: "#ffffff",
          }}
        >
          <Stack.Screen name="kakao_login" options={{ title: "카카오 로그인", headerShown: true }} />
          <Stack.Screen name="response_login" options={{ title: "카카오 인증 로그인", headerShown: true }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      )}
    </GestureHandlerRootView>
  );

}