import {View, StyleSheet, Alert, Text, Image, PermissionsAndroid} from "react-native";
import { Colors } from "../../constants/colors";
import {useState} from "react";
import {launchCameraAsync, useCameraPermissions} from "expo-image-picker";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage}) {
    const [pickedImage, setPickedImage] = useState();

    // const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Get Camera Permission',
                    message:
                        'This App needs access to your camera.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                return true;
            } else {
                console.log('Camera permission denied');
                return false
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // async function verifyPermissions() {
    //     if (
    //         cameraPermissionInformation.status === 'granted'
    //     ) {
    //         const permissionResponse = await requestPermission();
    //         return permissionResponse.granted
    //     }
    //
    //     else if (
    //         cameraPermissionInformation.status === 'undetermined'
    //     ) {
    //         const permissionResponse = await requestPermission();
    //         return permissionResponse.granted
    //     }
    //
    //     else if (
    //         cameraPermissionInformation.status === 'denied'
    //     ) {
    //         Alert.alert(
    //             'Insufficient permissions!',
    //             'You need to grant camera permissions to use this app.',
    //             [{text: 'Okay'}]
    //         );
    //         return false;
    //     }
    // }

    async function takeImageHandler() {
        const hasPermission = await requestCameraPermission();

        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (image.canceled) {
            return;
        }

        const imageUri = image.assets[0].uri;
        setPickedImage(imageUri);
        onTakeImage(imageUri);
    }

    let imagePreview = (
        <Text>No image picked yet.</Text>
    );

    if (pickedImage) {
        imagePreview = (
            <Image source={{ uri: pickedImage }} style={styles.image} />
        );
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlinedButton onPress={takeImageHandler} icon="camera">
                Take Image
            </OutlinedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default ImagePicker;
