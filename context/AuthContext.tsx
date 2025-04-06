import React, { Children, createContext, useContext, useEffect, useState } from "react";
import { User } from '../types/user';
import { axios_instanace, requests_url } from "@/api/axios";
import { useRouter } from "expo-router";
import { Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import { usePathname } from "expo-router";

interface AuthContextType {
    isLogined: boolean | null,
    user: User | null,
    login: () => void,
    response_login: (code: string | string[]) => void,
    login_app: (session_id: string) => void,
    logout: () => void,
    withdraw: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();
    const pathname = usePathname();

    const check_login_status = async () => {
        try {
            const redirect_url = makeRedirectUri({ scheme: 'invoiceqr', path: "response_login" });
            console.log("리다이렉트 앱", redirect_url)


            const response = await axios_instanace.get(requests_url.find_profile);
            console.log(response.data.data);
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response.data.data);
                console.log("auth의 자동로그인 상태 체크: 성공", isAuthenticated);
            }
            else if (response.status === 204) {
                setIsAuthenticated(false);
                setUser(null);
                console.log("auth의 자동 로그인 상태 체크: 실패", isAuthenticated);

                //router.replace('/kakao_login');
                // setTimeout(() => {
                //     alert("로그인이 되어 있지 않습니다 로그인 홈페이지로 돌아갑니다");
                //     router.replace('/kakao_login');
                // }, 1000);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            alert(`에러 발생 ${error}`);
            console.error("자동 세션 조회 중 오류 발생", error);
        }
    }

    useEffect(() => {
        if (pathname.includes("/map")) {
            return;
        }
        check_login_status();


    }, []);

    const login = async () => {
        try {
            const redirect_url = makeRedirectUri({ scheme: 'invoiceqr', path: "response_login" });
            const response = await axios_instanace.post(requests_url.kakao_signup_url, { redirect_url });

            console.log("response", response);
            if (response.status === 201) {
                const kakao_login_url = response.data.data;
                console.log(response);


                console.log("로그인 버튼 클릭!");
                if (Platform.OS === 'web') {
                    window.location.href = kakao_login_url;
                }

                else {
                    await WebBrowser.openAuthSessionAsync(kakao_login_url, redirect_url);
                }


            }
            else {
                alert("서버와의 응답 실패");
            }
        } catch (error) {
            alert(`로그인 실패: ${error}`);
            console.error("로그인 실패", error);
        }

    };

    const response_login = async (code: string | string[]) => {
        try {

            const redirect_url = makeRedirectUri({ scheme: 'invoiceqr', path: 'response_login' });
            const response = await axios_instanace.get(`${requests_url.kakao_signup}/?code=${code}&redirect_url=${encodeURIComponent(redirect_url)}`);

            console.log("코드:", code);
            if (response.status === 200) {
                setUser(response.data.data);
                await AsyncStorage.setItem("session_id", response.data.meta.session_id);
                console.log("setitem 저장", response.data.meta.session_id);
                setIsAuthenticated(true);
                router.replace('/kakao_login');
            }
            else if (response.status === 401) {
                alert(response.data.message);
                return;
            }
        } catch (error) {
            console.error("코드를 받고 유저 정보 조회 중 오류 발생", error)
        }
    }

    const login_app = async (session_id: string) => {
        try {
            await AsyncStorage.setItem("session_id", session_id);

            const response = await axios_instanace.get(requests_url.find_profile);
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response.data.data);
            }
            else if (response.status === 204) {
                setIsAuthenticated(false);
                setUser(null);


                //router.replace('/kakao_login');
                // setTimeout(() => {
                //     alert("로그인이 되어 있지 않습니다 로그인 홈페이지로 돌아갑니다");
                //     router.replace('/kakao_login');
                // }, 1000);
            }

            router.replace('/kakao_login');
        } catch (error) {
            console.error("앱 카카오 로그인 중 오류 발생", error)
        }

    }

    const logout = async () => {
        try {
            const response = await axios_instanace.post(requests_url.kakao_logout);
            if (response.status === 200) {

                setIsAuthenticated(false);
                setUser(null);
                await AsyncStorage.removeItem("session_id");
                alert(response.data.message);
                setTimeout(() => {
                    router.replace('/kakao_login');
                }, 0);
            }
            else {
                alert(`error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("로그아웃 에러", error);
        }
    }

    const withdraw = async () => {
        try {
            const response = await axios_instanace.delete(requests_url.kakao_withdrawal);
            if (response.status === 200 || response.status === 202) {

                setIsAuthenticated(false);
                setUser(null);
                await AsyncStorage.removeItem("session_id");
                alert(response.data.message);
                setTimeout(() => {
                    router.replace('/kakao_login');
                }, 0);
            }

            else {
                alert(`error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("회원탈퇴 에러", error);
        }
    }

    return (
        <AuthContext.Provider value={{ isLogined: isAuthenticated, user, login, logout, withdraw, response_login, login_app }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

