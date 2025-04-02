import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,

                headerTitleAlign: 'center',
                headerTintColor: '#ffffff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
                tabBarActiveTintColor: '#FF7F11',
            }}
        
        >
            <Tabs.Screen name='index'
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen name='delivery'
                options={{
                    title: "Delivery",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={focused ? 'truck-delivery' : 'truck-delivery-outline'} color={color} size={24} />
                    ),
                }} />
            <Tabs.Screen name='chatbot'
                options={{
                    title: "Chatbot",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name={focused ? 'chat-question' : 'chat-question-outline'} color={color} size={24} />
                    ),
                }} />
            <Tabs.Screen name='profile'
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
                    ),
                }} />
                
        </Tabs>
    )
}