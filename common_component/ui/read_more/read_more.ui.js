import * as React from "react";
import { View, Text } from "react-native";
import ReadMore from "@expo/react-native-read-more-text";
import { Colors } from "../../../utils/imports.utils";

export default Read_more = (props) => {
  const { text } = props;
  return (
    <ReadMore
      numberOfLines={2}
      renderTruncatedFooter={renderTruncatedFooter}
      renderRevealedFooter={renderRevealedFooter}
    >
      <Text
        style={{
          color: Colors.textColor,
          fontFamily: "regular",
          fontSize: 15,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </ReadMore>
  );
};

const renderTruncatedFooter = (handlePress) => {
  return (
    <Text
      style={{ color: Colors.textGray, fontFamily: "bold" }}
      onPress={handlePress}
    >
      Read more
    </Text>
  );
};

const renderRevealedFooter = (handlePress) => {
  return (
    <Text
      style={{ color: Colors.textGray, fontFamily: "bold" }}
      onPress={handlePress}
    >
      Show less
    </Text>
  );
};
