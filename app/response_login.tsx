import { axios_instanace, requests_url } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

export default function Response_Login() {
    const { code } = useGlobalSearchParams();
    const { session_id } = useGlobalSearchParams();
    const { response_login, login_app } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (code)
            receive_code();
        console.log("리스폰트에서 코드:", code);

        if (session_id) {
            login();
        }
    }, [code, session_id]);

    const receive_code = async () => {
        response_login(code);
    }

    const login = async () => {
        const session_ID = Array.isArray(session_id)
            ? session_id[0]
            : session_id ?? null;
        login_app(session_ID);
    }

    return (
        <View>

        </View>
    )
}
