import { useEffect, useState } from "react";
import { View, StyleSheet, Image, Pressable, Platform } from "react-native";

type Props = {
    onPress: () => void;
}

export default function KakaoLoginButton({ onPress }: Props) {

    let image_source;
    let size;
    if (Platform.OS === 'web') {
        image_source = require('@/assets/images/kakao_login_large_narrow.png');
    }
    else {
        image_source = require('@/assets/images/kakao_login_large_narrow.png');

    }

    return (

        <Pressable style={styles.button} onPress={onPress}>
            <Image source={image_source} style={styles.image} />
        </Pressable>

    )

}

const styles = StyleSheet.create({
    button: {
        width: Platform.OS === 'web' ? 600 : 366,
        height: Platform.OS === 'web' ? 90 : 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    }
})
