import React from "react";
import {View, Text, StyleSheet, Button} from "react-native";

const ListTracksScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Tracks</Text>
            <Button title={"Display track"}
                    onPress={() => navigation.navigate("DisplayTrack")}
            />
        </View>
    )
}

const styles = StyleSheet.create({});

export default ListTracksScreen