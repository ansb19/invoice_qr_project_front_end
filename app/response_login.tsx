import { axios_instanace, requests_url } from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

export default function Response_Login() {
    const { code } = useGlobalSearchParams();
    const { response_login } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (code)
            receice_code();
        console.log("리스폰트에서 코드:",code);
    }, []);

    const receice_code = async () => {        
        response_login(code);
        
    }

    return (
        <View>

        </View>
    )
}
