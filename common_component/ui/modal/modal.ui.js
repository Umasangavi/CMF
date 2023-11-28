import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";

export default function Modals(props) {
  const { open, close,renderComponent } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={close}
    >
      {renderComponent()}
    </Modal>
  );
}

const styles = StyleSheet.create({});
