import MapView, {Marker} from "react-native-maps";
import {useCallback, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {Alert, StyleSheet} from "react-native";

function Map({ navigation, route }) {

    const initialLocation = route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
    };

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const savedPickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                "No location picked",
                "Please pick a location on the map",
                [{ text: "Okay" }]
            );
            return;
        }

        navigation.navigate("AddPlace", { pickedLocation: selectedLocation });

    }, [selectedLocation, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => {
                return (
                    <IconButton
                        icon="save"
                        size={24}
                        color={tintColor}
                        onPress={savedPickedLocationHandler}
                    />
                )
            },
        });
    }, [
        initialLocation,
        navigation,
        selectedLocation,
        savedPickedLocationHandler
    ]);

    const region = {
        latitude: initialLocation?.lat ?? 47.02624,
        longitude: initialLocation?.lng ?? 28.84161,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event) {
        // if (initialLocation) return;
        const lat = event.nativeEvent.coordinate.latitude;

        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat, lng });
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}
        >
            {selectedLocation && (
                <Marker
                    title="Picked Location"
                    coordinate={{
                        longitude: selectedLocation.lng,
                        latitude: selectedLocation.lat,
                    }}
                />
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default Map;
