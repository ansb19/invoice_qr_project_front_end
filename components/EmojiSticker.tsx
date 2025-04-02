import { ImageSource } from "expo-image"
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
}

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    const sclaeImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        if (sclaeImage.value !== imageSize * 2) {
            sclaeImage.value = sclaeImage.value * 2;
        }
        else {
            sclaeImage.value = Math.round(sclaeImage.value / 2);
        }
    })

    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(sclaeImage.value),
            height: withSpring(sclaeImage.value),
        };
    })

    const styles = StyleSheet.create({
        image: {
            width: imageSize,
            height: imageSize,
        }
    })

    const drag = Gesture.Pan().onChange(event => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    })

    const containerStyle = useAnimatedStyle(()=>{
        return{
            transform:[
                {translateX: translateX.value},
                {translateY: translateY.value},
            ]
        }
    })

    return (
        <GestureDetector gesture={drag}>
        <Animated.View style={[containerStyle,{ top: 0 }]}>
            <GestureDetector gesture={doubleTap}>
                <Animated.Image
                    source={stickerSource} style={[imageStyle, styles.image]} resizeMode={"contain"} />
            </GestureDetector>
        </Animated.View>
        </GestureDetector>
    );
}

