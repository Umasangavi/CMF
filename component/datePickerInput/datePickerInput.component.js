import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Colors, Text } from "../../utils/imports.utils";
import {
  convertDateToTime,
  formatDate,
  useSetState,
} from "../../utils/function.utils";

export default function DatePickerInput(props) {
  const { heading, require, onChange, placeholder, mode, value,min,max } = props;

  const [state, setState] = useSetState({
    value: null,
    isOpen: false,
  });
  return (
    <View style={{ gap: 5 }}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text size={20} family="regular" bottom={3}>
          {heading}
        </Text>
        {require && (
          <Text size={20} family="regular" color={Colors.error} bottom={2}>
            *
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => setState({ isOpen: true })}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 10,
          backgroundColor: Colors.light,
          justifyContent: "center",
          paddingLeft: 20,
          borderWidth: 0.5,
          borderColor: Colors.borderColor,
        }}
      >
        {!mode ? (
          <Text size={16} color={Colors.textColor}>
            {value ? moment(value).format("YYYY-MM-DD") : placeholder}
          </Text>
        ) : (
          <Text size={16} color={Colors.textColor}>
            {value ? formatDate(value, "time") : placeholder}
          </Text>
        )}
      </TouchableOpacity>
      {state.isOpen && (
        <DateTimePicker
          display={state.isOpen}
          testID="dateTimePicker"
          value={new Date()}
          minimumDate={min}
          maximumDate={max}
          mode={mode ? mode : "date"}
          is24Hour={true}
          onChange={(val) => {
            const momentDate = moment(val.nativeEvent.timestamp);
            // if (!mode) {
            //   setState({ value: momentDate, isOpen: false });
            //   onChange(momentDate.format());
            // } else {
              setState({ value: convertDateToTime(momentDate), isOpen: false });
              onChange(momentDate.format());

            // }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
