import { StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Flatlist,
  Header,
  InboxCard,
  Models,
  SearchBar,
} from "../../utils/imports.utils";

import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { Height, useSetState } from "../../utils/function.utils";
import Containers from "../../common_component/hoc/container.hoc";
import { categories } from "../../utils/constant.utils";

const ChatBox = (props) => {
 
  const isFocused = useIsFocused();
  const [state, setState] = useSetState({
    search: "",
    chat_user_list: [],
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      chat_user_list();
    }
  }, [isFocused]);

  const chat_user_list = async () => {
    try {
      const result = await Models.chatBox.chat_user_list();
      setState({ chat_user_list: result.chats });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      // end={{ x: 1, y: 0.2}}
      colors={[
        "rgba(0, 210, 225, 0.1)", // #00D2E1 with 50% opacity
        "rgba(108, 77, 218, 0.2)", // #6C4DDA with 50% opacity
        "rgba(134, 104, 254, 0.2)", // #8668FE with 50% opacity
        "rgba(255, 78, 152, 0.2)", // #FF4E98 with 50% opacity
        "rgba(255, 191, 53, 0.1)", // #FFBF35 with 50% opacity
        "rgba(255, 195, 203, 0.2)", // #FFC3CB with 50% opacity
        "rgba(255, 195, 221, 0.2)", // #FFC3DD with 50% opacity
        "rgba(255, 226, 133, 0.4)", // #FFE285 with 50% opacity
        "rgba(255, 228, 244, 0.2)", // #FFE4F4 with 50% opacity
        "rgba(0, 210, 225, 0.1)",
      ]}
      // locations={[0.2, 1, 0.2, 1, 1, 1, 1, 1, 1]}
      style={{ width: "100%" }}
      angle={300}
    >
      <Containers style={css.container} screen>
        <View style={css.wrapper}>
          <View style={css.messageContainer}>
            <Header
              label="Message"
              rightIcon={true}
              messageBox={true}
              rightIconOnPress={() => {}}
            />
          </View>
          <View style={css.searchContainer}>
            <SearchBar
              value={state.search}
              placeholder="Search by name"
              onChange={(e) => setState({ search: e })}
            />
          </View>
          <View style={css.chatContainer}>
            <Flatlist
              paddingBottom={100}
              loading={state.loading}
              data={state.chat_user_list}
              renderComponent={(item) => (
                <InboxCard
                  data={item}
                  onPress={() =>
                    navigation.navigate("message", { userId: item?.id })
                  }
                />
              )}
            />
          </View>
        </View>
      </Containers>
    </LinearGradient>
  );
};

export default ChatBox;
const css = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    width: "95%",
    alignItems: "center",
    paddingBottom: 5,
  },
  messageContainer:{
    height: Height(10),
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  searchContainer:{
    height: Height(10),
    width: "100%",
    justifyContent: "center",
  },
  chatContainer:{
    width: "100%", 
    paddingBottom: 50
  },
});
