import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const backend_base_api: string = process.env.EXPO_PUBLIC_EXPO_ENV as string === 'remote'
    ? process.env.EXPO_PUBLIC_REMOTE_BACK_END_API as string
    : process.env.EXPO_PUBLIC_LOCAL_BACK_END_API as string;



export const axios_instanace = axios.create({
    baseURL: backend_base_api,
    timeout: 5000,
    withCredentials: true,
})

axios_instanace.interceptors.request.use(async (config) => {
    const session_id = await AsyncStorage.getItem("session_id");
    if (session_id) {
        config.headers.Authorization = `Bearer ${session_id}`;
    }
    return config;
})

axios_instanace.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status === 401){ //세션 없을떄
            return Promise.resolve(error.response);
        }
        return Promise.reject(error);
    }
)


export const requests_url = {
    kakao_signup_url: "/user/signup/kakao/url", // post 201
    kakao_signup: "/user/signup/kakao", // get 200
    kakao_logout: "/user/logout/kakao", // post 200
    kakao_withdrawal: "/user/withdrawal/kakao", // delete 200
    find_profile: "/user",


    address: "/address", // post 201 CreateAddressDTO, pathch(:id) 200 UpdateAddressDTO, get(/user/:user_id) 200,  get(:id) 200, delete(:id) 200
    get_address_user: "/address/user",

    invoice: "/invoice", // post 201 CreateInvoiceDTO, delete(:id) 200, patch(:id) 200 UpdateInvoiceDTO, get(:user_id, ) 200 
    info: "/invoice/info",
    tracker: "/invoice/tracker",
    coords: "/invoice/coords",
    qr_code: "invoice/qr_code",
    find_my_invoice: "/invoice/user", // get post

    chatbot: "/chatbot" // get 200 post 201
}