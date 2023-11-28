import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CommentInput() {
  return (
    <View
      style={{
        flexDirection: "row",
        height: "auto",
        borderRadius: 30,
        backgroundColor: "yellow",
        padding:10
      }}
    >
      <View
        style={{ width: "20%", height: "100%", alignItems: "center",backgroundColor:"red"}}
      >
        <View style={{height:50,width:50,borderRadius:30,backgroundColor:"blue"}}></View>
      </View>
      <View
        style={{ width: "80%", height: "100%", alignItems: "center",backgroundColor:"green"}}
      >
        <View style={{height:50,width:50,borderRadius:30,backgroundColor:"blue"}}></View>
      </View>
    </View>
  );
}

const css = StyleSheet.create({});
