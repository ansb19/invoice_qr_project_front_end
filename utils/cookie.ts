import CookieManager from "@react-native-cookies/cookies";
import Constants from "expo-constants";
import { Platform } from "react-native";
import Cookies from "universal-cookie";


const cookies = new Cookies();
const backend_base_api: string = Constants.expoConfig?.extra?.BACK_END_URL;
const frontend_base_api: string = Constants.expoConfig?.extra?.FRONT_END_URL;

export const setCookie = async (name: string, value: string, options = {}) => {
    if (Platform.OS === "web") {
      cookies.set(name, value, options);
    } else {
      await CookieManager.set(frontend_base_api, {
        name,
        value,
        domain: "your-api.com",
        path: "/",
        expires: "2025-12-31T23:59:59.999Z",
      });
    }
  };
  
  export const getCookie = async (name: string) => {
    if (Platform.OS === "web") {
      return cookies.get(name);
    } else {
      const cookieData = await CookieManager.get(frontend_base_api);
      return cookieData[name]?.value || null;
    }
  };
  
  export const removeCookie = async (name: string) => {
    if (Platform.OS === "web") {
      cookies.remove(name);
    } else {
      await CookieManager.clearAll();
    }
  };

  