import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import { Colors } from "../../constants/colors";
import {useCallback, useState} from "react";
import {Place} from "../../models/place";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

function PlaceForm({ onCreatePlace }) {
    const [enteredText, setEnteredText] = useState("");
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();

    function changeTitleHandler(text) {
        setEnteredText(text);
    }

    function savePlaceHandler() {
        const placeData = new Place(enteredText, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickedLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Place Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onLocationPick={pickedLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: { flex: 1, padding: 24 },
    label: { fontWeight: "bold", marginVertical: 4, color: Colors.primary700 },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
});

export default PlaceForm;
