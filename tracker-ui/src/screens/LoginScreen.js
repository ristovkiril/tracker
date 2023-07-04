import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Text, Button, Input} from "react-native-elements";
import {Spacer} from "../components/Spacer";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Login Screen</Text>
            </Spacer>
            <Spacer>
                <Input
                    inputStyle={{ width: "100%" }}
                    label={"Email"}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                />
            </Spacer>
            <Spacer>
                <Input
                    style={{ width: "100%" }}
                    secureTextEntry
                    label={"Password"}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                />
            </Spacer>
            <Spacer>
                <Button
                    buttonStyle={{ width: "100%" }}
                    title={"Login"}
                    onPress={() => navigation.navigate("Home")}
                />
            </Spacer>
            <Spacer>
                <Button
                    type={"clear"}
                    buttonStyle={{ width: "100%" }}
                    title={"dont have account yet?"}
                    onPress={() => navigation.navigate("Register")}
                />
            </Spacer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loginBtn: {

    }
});

export default LoginScreen