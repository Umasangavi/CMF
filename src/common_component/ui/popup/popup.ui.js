import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  SlideAnimation,
  DialogTitle,
} from "react-native-popup-dialog";
import { Colors } from "../../../utils/imports.utils";

export default function Popup(props) {
  const { open, close, content, title, successOnPress } = props;
  return (
    <View style={css.container}>
      <Dialog
        width={"80%"}
        onTouchOutside={close}
        height={"auto"}
        dialogTitle={<DialogTitle title={title} />}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={open}
        footer={
          <DialogFooter>
            <DialogButton
              textStyle={{ fontSize: 18, color: Colors.Dark }}
              style={{ fontSize: 20 }}
              text="Cancel"
              onPress={() => close()}
            />
            <DialogButton
              textStyle={{ fontSize: 18, color: Colors.Dark }}
              text="Ok"
              onPress={() => successOnPress()}
            />
          </DialogFooter>
        }
      >
        <DialogContent style={{ padding: 10, alignItems: "center" }}>
          {content()}
        </DialogContent>
      </Dialog>
    </View>
  );
}

const css = StyleSheet.create({
  width: "100%",
});
