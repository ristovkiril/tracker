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
import {Provider as AuthProvider} from "./src/context/AuthContext";
import HomeScreen from "./src/screens/HomeScreen";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer
            >
                <Stack.Navigator
                    initialRouteName={"Login"}
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                    </Stack.Group>
                    <Stack.Group>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </Stack.Group>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}