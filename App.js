import {createStackNavigator} from "@react-navigation/stack";
import {useEffect} from "react";
import {init} from "./util/db";
import * as SplashScreen from "expo-splash-screen";
import {StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {Colors} from "./constants/colors";
import AllPlaces from "./screens/AllPlaces";
import IconButton from "./components/UI/IconButton";
import AddPlace from "./screens/AddPlace";
import PlaceDetails from "./screens/PlaceDetails";
import Map from "./screens/Map"

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
    useEffect(() => {
        init()
            .then(async () => {
                await SplashScreen.hideAsync();
            })
            .catch((error) => console.log(error))
    }, []);

    return (
        <>
            <StatusBar style='dark'/>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {backgroundColor: Colors.primary500},
                        headerTintColor: Colors.gray700,
                        cardStyle: {backgroundColor: Colors.gray700}
                    }}
                >
                    <Stack.Screen
                        name='AllPlaces'
                        component={AllPlaces}
                        options={({navigation}) => ({
                            title: 'Your Favourite Places',
                            headerRight: ({tintColor}) => (
                                <IconButton
                                    color={tintColor}
                                    icon='add'
                                    size={24}
                                    onPress={() => {
                                        navigation.navigate('AddPlace')
                                    }}
                                />
                            )
                        })}
                    />
                    <Stack.Screen
                        name='AddPlace'
                        component={AddPlace}
                        options={{ title: 'Add a new place' }}
                    />
                    <Stack.Screen
                        name='PlaceDetails'
                        component={PlaceDetails}
                        options={{ title: 'Loading Place...' }}
                    />
                    <Stack.Screen
                        name='Map'
                        component={Map}
                        options={{ title: 'Map' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
