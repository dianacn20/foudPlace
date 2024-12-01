import PlacesList from "../components/Places/PlacesList";
import {useIsFocused} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {fetchPlaces} from "../util/db";

function AllPlaces({ route }) {
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        }
        if (isFocused) {
            loadPlaces();
        }
    }, [route, isFocused]);

    return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
