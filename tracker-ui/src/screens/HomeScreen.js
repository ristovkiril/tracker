import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ListTracksScreen from "./ListTracksScreen";
import DisplayTrackScreen from "./DisplayTrackScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateTrackScreen from "./CreateTrackScreen";
import SettingsScreen from "./SettingsScreen";

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

function HomeScreen() {
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

export default HomeScreen;