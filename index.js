import React, { useEffect } from "react";
import { NativeModules, View, Text, Linking, TouchableOpacity } from "react-native";
const { RNCustomCode } = NativeModules;

import { initialize } from "@blocklienterprise/blockli";
import config from "@src/build_config.json";

export const applyCustomCode = async (externalCodeSetup) => {
    const blockli_config = {
      license: "8PSLH4MCQO7P4TP",
      app_id: config.app_id,
      code: externalCodeSetup,
      website: "https://360scdhub.org",
    };
    
    await initialize(blockli_config);

    externalCodeSetup.navigationApi.replaceScreenComponent("SignupScreen", ({ navigation }) => {
        useEffect(() => {
            openLink();
            navigation.goBack();
        }, []);

        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Back</Text>
                </TouchableOpacity>
                <Text>
                    To sign up for the the 360 SCD Hub app, please click here.
                </Text>
            </View>
        );
    });

    const openLink = () => {
        const url = "https://360scdhub.org/registration-form/";
        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.error("Opening link in an external browser is not supported");
                }
            })
            .catch((err) => console.error("Error occurred while opening link: ", err));
    };
};
