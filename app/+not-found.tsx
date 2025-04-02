import { Link, Stack } from "expo-router";
import { View, StyleSheet } from 'react-native';
import { Unmatched } from 'expo-router';

export default Unmatched;
export function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Opps! Not Found' }} />
            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    404 NOT FOUND
                    Go back to Home screen!
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});