import { Stack } from "expo-router";
import DeliveryDetail from "./[InvoiceNumber]";

export default function DeliveryLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#25292e" },
                headerTitleAlign: 'center',
                headerTintColor: '#ffffff',

            }}
            initialRouteName="index"
        >

            <Stack.Screen
                name="index"
                options={{ title: "Delivery" }}

            />
            <Stack.Screen
                name="[InvoiceNumber]"
                options={{
                    title: '배송 상세정보',
                    headerStyle: { backgroundColor: "#25292e" },
                    headerTitleAlign: 'center',
                    headerTintColor: '#ffffff',
                }}

            />
        </Stack>
    );
}
