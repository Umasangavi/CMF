import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

export const BottomSheets = forwardRef((props, ref) => {
  const { renderComponent, height } = props;
  const refRBSheet = useRef();

  const open = () => {
    refRBSheet.current.open();
  };
  const Close = () => {
    refRBSheet.current.close();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      open();
    },
    close: () => {
      Close();
    },
  }));

  return (
    <RBSheet
      height={height ? height : "auto"}
      openDuration={0}
      animationType={"slide"}
      // closeOnDragDown={true}
      closeOnPressMask={true}
      closeDuration={0}
      keyboardAvoidingViewEnabled
      ref={refRBSheet}
      customStyles={{
        container: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          alignItems: "center",
        },
      }}
    >
      {renderComponent()}
    </RBSheet>
  );
});

const css = StyleSheet.create({});
