import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import ListTracksScreen from "./src/screens/ListTracksScreen";
import CreateTrackScreen from "./src/screens/CreateTrackScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DisplayTrackScreen from "./src/screens/DisplayTrackScreen";
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();


function TrackNavigation() {
    return (
        <HomeStack.Navigator initialRouteName={"Tracks"}>
            <HomeStack.Screen options={{title: "Home"}} name={"Tracks"} component={ListTracksScreen} />
            <HomeStack.Screen name={"DisplayTrack"} component={DisplayTrackScreen} />
        </HomeStack.Navigator>
    )
}
function HomeStackScreen() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => {
                return {
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName = 'ios-home';
                        if (route.name === "Create") {
                            iconName = "add-circle"
                        } else if (route.name === "Settings") {
                            iconName = "settings"
                        }
                        if (focused) {
                            iconName += "-outline";
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                }
            }}
            initialRouteName={"TrackNavigation"}
        >
            <Tab.Screen options={{title: "Home", headerShown: false}} name="TrackNavigation" component={TrackNavigation}/>
            <Tab.Screen name="Create" component={CreateTrackScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer
        >
            <Stack.Navigator
                initialRouteName={"Login"}
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Group>
                    <Stack.Screen name="Home" component={HomeStackScreen} />
                </Stack.Group>
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}