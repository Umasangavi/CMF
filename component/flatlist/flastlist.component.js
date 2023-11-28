import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Colors, Loader, Text } from "../../utils/imports.utils";

export default function Flatlists(props) {
  const { loading, data, renderComponent, gap, paddingBottom } = props;
  return loading ? (
    <View style={{ alignItems: "center", paddingTop: 200 }}>
      <Loader />
    </View>
  ) : data?.length > 0 ? (
    <FlatList
      data={data}
      style={css.scrollView}
      ItemSeparatorComponent={() => <View style={{ height: gap ? gap : 10 }} />}
      contentContainerStyle={{
        paddingBottom: paddingBottom ? paddingBottom : 100,
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => renderComponent(item)}
    />
  ) : (
    <View style={{ alignItems: "center", paddingTop: 200 }}>
      <Text color={Colors.textGray} size={20}>
        No Data found
      </Text>
    </View>
  );
}

const css = StyleSheet.create({
  scrollView: {
    // gap:5,
    // paddingBottom:30
    // height: "100%",
    // width: "100%",
  },
  contentContainer: {
    // gap:5,
    // paddingBottom: 100,
  },
});
