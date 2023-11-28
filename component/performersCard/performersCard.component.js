import { StyleSheet, View, TouchableHighlight } from "react-native";
import React from "react";
import { Colors, Image, Text } from "../../utils/imports.utils";
import Icon from "react-native-vector-icons/FontAwesome";

export default function PerformersCard(props) {
  const { content, rightIcon, rightIconOnPress, onPress, logo, right2Icon,right2IconOnPress } =
    props;
  return (
    <TouchableHighlight
      underlayColor={Colors.lightGrey}
      onPress={() => onPress}
      style={{
        width: "100%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.bgGrey,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <>
        {logo && (
          <View style={{ width: "15%" }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                overflow: "hidden",
                backgroundColor: Colors.textPrimary,
              }}
            >
              <Image src={logo} height={"100%"} width={"100%"} resize="cover" />
            </View>
          </View>
        )}
        <View
          style={{
            width: logo ? "75%" : right2Icon ? "75%" : "90%",
            paddingLeft: 10,
          }}
        >
          <Text color={Colors.lightGray} size={16} family={"regular"}>
            {content}
          </Text>
        </View>
        <View
          style={{
            width: right2Icon ? "25%" : "10%",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <TouchableHighlight
            underlayColor={Colors.lightDark}
            style={{
              height: 30,
              width: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
            onPress={rightIconOnPress}
          >
            <Icon
              name={rightIcon}
              size={20}
              color={Colors.darkPink}
              onPress={rightIconOnPress}
            />
          </TouchableHighlight>
          {right2Icon && (
            <TouchableHighlight
              underlayColor={Colors.lightDark}
              onPress={right2IconOnPress}

              style={{ padding: 10, borderRadius: 15 }}
            >
              <Icon
                name={"trash"}
                size={22}
                color={Colors.darkPink}
                onPress={right2IconOnPress}

              />
            </TouchableHighlight>
          )}
        </View>
      </>
    </TouchableHighlight>
  );
}

const css = StyleSheet.create({});
