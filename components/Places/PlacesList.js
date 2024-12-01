import {FlatList, StyleSheet, View, Text} from "react-native";
import { Colors } from "../../constants/colors";
import {useNavigation} from "@react-navigation/native";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
    const navigation = useNavigation();
    function selectPlaceHandler(id) {
        navigation.navigate("PlaceDetails", { placeId: id });
    }

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    No places found. Maybe start adding some!
                </Text>
            </View>
        );
    }
    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <PlaceItem
                    place={item}
                    onSelect={selectPlaceHandler}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 10,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 18,
        textAlign: "center",
        color: Colors.primary200,
    },
});

export default PlacesList;
