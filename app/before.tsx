import { Link } from "expo-router";
import { StyleSheet, Text, View, Platform } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircoleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import { type ImageSource } from "expo-image";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";
import domtoimage from 'dom-to-image';

const PlaceholderImage = require('@/assets/images/background-image.png');
export default function Index() {
  const imageRef = useRef<View | null>(null);
  const [status, requestPermissions] = MediaLibary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  if (status === null) {
    requestPermissions();
  }

  const pick_image = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
    else {
      alert("you didn't pick an image");
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  }


  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localuri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibary.saveToLibraryAsync(localuri);
        if (localuri) {
          alert("사진이 저장되었습니다");
        }
      } catch (error) {
        console.error("앱 사진 저장중 오류 발생", error);
      }
    }
    else {
      try {
        const dataurl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'captured.jpeg';
        link.href = dataurl;
        link.click();
      } catch (error) {
        console.error("웹 사진 저장 중 오류 발생", error);
      }
    }
  };


  return (

    <GestureHandlerRootView
      style={styles.container}
    >
      <Text style={styles.text}>Home screen</Text>
      <Link href="/" style={styles.button}>
        Go to About screen
      </Link>

      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer} >
          <View style={styles.optionRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      )
        : (
          <View style={styles.footerContainer}>
            <Button label="Choose this a photo" theme="primary" onPress={pick_image} />
            <Button label="Use this photo" onPress={() => { setShowAppOptions(true) }} />
          </View>
        )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    //justifyContent: "center", // (상하) 중앙 정렬
    alignItems: "center", // 콘텐츠 (가로세로) 중앙 정렬
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#1f25ff',
  },

  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
