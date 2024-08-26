import React, { useEffect } from "react"; // Combined import statement for React and useEffect
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { NativeModules } from "react-native";
const { RNCustomCode } = NativeModules;

import { initialize } from "@blocklienterprise/blockli";
import config from "@src/build_config.json";

export const applyCustomCode = async (externalCodeSetup) => {
  const blockli_config = {
    license: "8PSLH4MCQO7P4TP", // Enter your 15 digit Blockli App Kit license key here. See your account dashboard at https://blockli.dev/dashboard
    app_id: config.app_id,
    code: externalCodeSetup,
    //bcdn_token: "BUNNYCDN-TOKEN-AUTH-KEY",
    website: "https://360scdhub.org", // Enter your app domain here with NO trailing slash.
    // NOTE: If you have a staging site, please use a different Git branch for your test app and COPY this entire code to the test branch and enter the staging site domain.
  };

  await initialize(blockli_config);

  externalCodeSetup.navigationApi.replaceScreenComponent(
    "SignupScreen",
    ({ navigation }) => {
      // Ensure the hook is called inside the function
      useEffect(() => {
        openLink();
        navigation.goBack(); // Automatically trigger back navigation
      }, []); // Run only once when the component is mounted

      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              Back
            </Text>
          </TouchableOpacity>
          <Text>To sign up for the app, please click here.</Text>
        </View>
      );
    }
  );

  const openLink = () => {
    const url = "https://360scdhub.org/registration-form/";
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error("Opening link in an external browser is not supported");
        }
      })
      .catch((err) =>
        console.error("Error occurred while opening link: ", err)
      );
  };
};
