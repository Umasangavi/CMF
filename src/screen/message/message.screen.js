import React, { useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Containers from "../../common_component/hoc/container.hoc";
import { LinearGradient } from "expo-linear-gradient";
import {
  Assets,
  ChatInput,
  Colors,
  Flatlist,
  Header,
  Models,
  NavButton,
  Text,
  TextInput,
} from "../../utils/imports.utils";
import { Height, useSetState } from "../../utils/function.utils";

const Message = (props) => {
  const userId = props.route?.params?.userId;
  console.log("✌️userId --->", userId);

  const [state, setState] = useSetState({
    text: "",
    isAttach: false,
  });
  useEffect(() => {
    get_message();
  }, []);

  const icons = [Assets.attach, Assets.camera, Assets.mic, Assets.yellowClose];

  const get_message = async () => {
    try {
      const response = await Models.chatBox.get_message(userId);
      console.log("✌️response --->", response);
    } catch (e) {
      console.log(e);
    }
  };
  const arr = [
    { id: 1, img: "sample", message: "sendretgireoureuuwwoiwowie" },
    { id: 2, img: "sample", message: "Hi buddy rrhihirwhriwhwiue" },
    {
      id: 1,
      img: "sample",
      message:
        "send fjgherihrie riutiruiur weiuiryre iugheriuyre irguheriurei irgherier riuerier",
    },
    {
      id: 2,
      img: "sample",
      message:
        "Hi buddy  riutiruiur weiuiryre iugheriuyre irguheriurei irgherier",
    },
    { id: 1, img: "sample", message: "send" },
    { id: 2, img: "sample", message: "Hi buddy" },
    { id: 1, img: "sample", message: "send" },
    { id: 2, img: "sample", message: "Hi buddy" },
  ];
  const renderChatItem = (item) => {
    const isSentByUser = item.id === 2; // Check if the message is sent by the user

    return (
      <View
        style={[
          styles.chatItem,
          isSentByUser ? styles.sentByUser : styles.received,
        ]}
      >
        <Text size={18} color={isSentByUser ? Colors.light : Colors.Dark}>
          {item.message}
        </Text>
        <View style={{ alignSelf: "flex-end" }}>
          <Text size={18} color={isSentByUser ? Colors.light : Colors.Dark}>
            {"12PM"}
          </Text>
        </View>
      </View>
    );
  };

  const sendMessage = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  const menuOnPress = (index) => {
    if (index == 0) {
    } else if (index == 1) {
    } else if (index == 2) {
    } else {
      setState({ isAttach: false });
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
      <Containers style={styles.container} screen>
        <View style={styles.wrapper}>
          <View style={styles.nameContainer}>
            <Header label="Name" />
          </View>
          <View style={styles.messageContainer}>
            <Flatlist
              data={arr}
              paddingBottom={5}
              renderComponent={(item) => renderChatItem(item)}
              // To display messages in descending order
            />
          </View>
          <View style={styles.textRowContainer}>
            <View style={styles.textContainer}>
              <ChatInput
                value={state.text}
                onChange={(val) => setState({ text: val })}
                rightIcon={state.text && Assets.forward}
                notSecure
                height={45}
                imageWidth={25}
                imageHeight={25}
                backgroundColor={Colors.light}
                placeholder="Type somthing ..."
                size={18}
                rightIconOnPress={() => sendMessage()}
              />
            </View>

            <View style={styles.addIcon}>
              <NavButton
                height={45}
                width={45}
                radius={30}
                icon={Assets.greenPlus}
                onPress={() => setState({ isAttach: !state.isAttach })}
                background={Colors.light}
                color={Colors.light}
                iconWidth={25}
                iconHeight={25}
              />
            </View>
          </View>
          {state.isAttach && (
            <View style={styles.iconsContainer}>
              <View>
                {icons?.map((img, index) => (
                  <NavButton
                    height={45}
                    width={45}
                    radius={30}
                    icon={img}
                    onPress={() => menuOnPress(index)}
                    background={Colors.light}
                    color={Colors.light}
                    iconWidth={18}
                    iconHeight={20}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </Containers>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    width: "98%",
    alignItems: "center",
  },
  nameContainer:{
    height: "8%", 
    width: "100%"
  },
messageContainer:{
  padding: 5,
  height: "82%",
  width: "100%",
},
textRowContainer:{
  height: "10%",
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
},
textContainer:{
  width: "85%", 
  alignItems: "center" 
},
addIcon:{
  width: "15%", 
  alignItems: "center"
},
iconsContainer:{
  position: "absolute", 
  right: 5, 
  bottom: 60
},






  chatItem: {
    margin: 5,
    padding: 8,
    maxWidth: "100%", // Maximum width of chat items
    alignSelf: "flex-start",
    gap: 2,
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sentByUser: {
    alignSelf: "flex-end",
    backgroundColor: Colors.textPrimary,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
});

export default Message;
