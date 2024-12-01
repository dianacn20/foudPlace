import {ScrollView, StyleSheet, View, Text, Image} from "react-native";
import { Colors } from "../constants/colors";
import {useEffect, useState} from "react";
import {fetchPlaceDetails, removePlace} from "../util/db";
import OutlinedButton from "../components/UI/OutlinedButton";

function PlaceDetails({ route, navigation }) {
    const [fetchedPlace, setFetchedPlace] = useState();

    function showOnMapHandler() {
        navigation.navigate("Map", {
            initialLat: fetchedPlace.location.lat,
            initialLng: fetchedPlace.location.lng,
        });
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function loadPlaceData() {
            const place = await fetchPlaceDetails(selectedPlaceId);
            setFetchedPlace(place);
            navigation.setOptions({
                title: place.title,
            });
        }
        loadPlaceData();
    }, [selectedPlaceId]);

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text>Loading place data...</Text>
            </View>
        );
    }

    // EXTRA
    const onRemovePlaceHandler = () => {
        removePlace(selectedPlaceId)
            .then(res => console.log('Place removed!'))
            .catch(() => console.log('Something went wrong. Try again later.'))
        navigation.navigate('AllPlaces')
    }

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: fetchedPlace.imageUri }}
            />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{fetchedPlace.address}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <OutlinedButton icon="map" onPress={showOnMapHandler}>
                        View on Map
                    </OutlinedButton>
                    <OutlinedButton icon='remove' onPress={onRemovePlaceHandler}>
                        Remove Place
                    </OutlinedButton>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: "35%",
        minHeight: 300,
        width: "100%",
    },
    locationContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: 'row'
    }
});

export default PlaceDetails;
