import { Linking } from "react-native";
import { axios_instanace, requests_url } from "./axios"
import { User } from "@/types/user";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


export async function get_profile(): Promise<User | null> {
    const response = await axios_instanace.get(
        requests_url.find_profile
    )
    const user: User = response.data;
    return user;
}