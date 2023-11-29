import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import {
  Text,
  Colors,
  Constants,
  Models,
  Header,
} from "../../utils/imports.utils";
import Containers from "../../common_component/hoc/container.hoc";
import { Height, Width, useSetState } from "../../utils/function.utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Sample(props) {
  //navigation
  const navigation = useNavigation();

  //addEventListener
  const isFocused = useIsFocused();

  //Ref
  const sampleRef = useRef();

  //useState
  const [state, setState] = useSetState({
    loading: false,
  });

  //ComponentDidMount
  useEffect(() => {
    getData();
  }, []);

  //Api call
  const getData = async () => {
    try {
      setState({ loading: true });
      const body = {};
      //   const response = await Models.auth.forget_password();
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
    }
  };

  //sample data
  const data = ["a", "b"];

  //logic

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
      <Containers
        screen
        style={css.container}
        backgroundColor={Colors.textPrimary}
        loading={state.loading}
      >
        <View style={css.wrapper}>
          <View style={css.headingContainer}>
            <Header label="Sign In" />
          </View>
        </View>
      </Containers>
    </LinearGradient>
  );
}

const css = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  headingContainer:{
    height: Height(10),
    alignItems: "center",
    justifyContent: "center",
  },
  
});
