import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Colors, Loader, Text } from "../../utils/imports.utils";

export default function Flatlist(props) {
  const { loading, data, renderComponent } = props;
  return loading ? (
    <View style={{ alignItems: "center", paddingTop: 200 }}>
      <Loader />
    </View>
  ) : data?.length > 0 ? (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={({ item, index }) => renderComponent(item,index)}
      numColumns={2}
      contentContainerStyle={{
        marginBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <View style={{ alignItems: "center", paddingTop: 200 }}>
      <Text color={Colors.textGray} size={20}>
        No Data found
      </Text>
    </View>
  );
}

const css = StyleSheet.create({});
