import React from "react";
import {View} from "react-native";

export const Spacer = ({children}) => {
    return (
        <View style={{ padding: 15, width: "100%" }}>
            {children}
        </View>
    )
}