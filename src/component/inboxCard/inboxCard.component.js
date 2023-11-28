import { StyleSheet, View, TouchableHighlight } from "react-native";
import React from "react";
import { Colors, Image, Text } from "../../utils/imports.utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function InboxCard(props) {

  const { data,onPress } = props;
  return (
    <TouchableHighlight
    underlayColor={Colors.bgGrey}
      onPress={onPress}
      style={{
        width: "100%",
        padding: 5,
        flexDirection: "row",
      }}
    >
      <>
        <View style={{ width: "20%" }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              overflow: "hidden",
            }}
          >
            <Image
              src={data?.sender_profile_picture}
              height="100%"
              width="100%"
              resize="cover"
            />
          </View>
        </View>

        <View style={{ width: "80%", flexDirection: "row" }}>
          <View style={{ width: "80%" }}>
            <Text size={18} color={Colors.Dark} family={"bold"}>
              {data?.sender_name}
            </Text>
            <Text size={18} color={Colors.Dark}>
              {data?.get_last_message}
            </Text>
          </View>
          <View style={{ width: "20%", alignItems: "center", paddingTop: 5 }}>
            <Text size={15} color={Colors.Dark} family={"regular"}>
              15 mins
            </Text>
            {/* <View style={css.msgText}>
              <Text size={15} family={"regular"} color={Colors.light}>
                {10}
              </Text>
            </View> */}
          </View>
        </View>
        {/* <View style={{ width: "20%", backgroundColor: "red" }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "blue",
            }}
          ></View>
        </View> */}
      </>
    </TouchableHighlight>
  );
}

const css = StyleSheet.create({
  msgText: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: Colors.textPrimary,
    top: 6,
    right: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
