import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import Containers from "../../common_component/hoc/container.hoc";
import { LinearGradient } from "expo-linear-gradient";
import {
  Assets,
  Colors,
  Flatlist,
  Header,
  Models,
  SearchBar,
  Text,
  UserCard,
} from "../../utils/imports.utils";
import { Height, Width, useSetState } from "../../utils/function.utils";
import { useIsFocused } from "@react-navigation/native";

const MyNetwork = () => {
  const isFocused = useIsFocused();
  const [state, setState] = useSetState({
    tabIndex: 0,
    search: "",
    loading: false,
  });

  useEffect(() => {
    if (state.tabIndex == 0) {
      followers();
    } else if (state.tabIndex == 1) {
      following();
    } else {
      get_all_people();
    }
  }, [state.tabIndex]);

  const get_all_people = async () => {
    try {
      setState({ loading: true });
      const result = await Models.people.all_people();
      console.log("get_all_people --->", result);
      setState({ people_list: result, loading: false });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const followers = async () => {
    try {
      setState({ loading: true });
      const result = await Models.people.follower();
      console.log("followers --->", result);
      setState({ people_list: result, loading: false });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };
  const following = async () => {
    try {
      setState({ loading: true });
      const result = await Models.people.following();
      console.log("following --->", result);
      setState({ people_list: result, loading: false });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const eventstabs = ["Followers", "Following", "All people"];
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
      <Containers screen style={styles.container} backgroundColor="transparent">
        <View style={styles.wrapper}>
          <Header
            label={"Message"}
            rightIcon={Assets.filter}
            rightIconOnPress={() => {}}
          />
          <KeyboardAvoidingView behavior="position">
            <View
              style={styles.tabContainer}>
              {eventstabs?.map((label, index) => (
                <TouchableHighlight
                  onPress={() => setState({ tabIndex: index })}
                  underlayColor={Colors.lightGrey}
                  style={[styles.tabBar,
                    {backgroundColor:
                      state.tabIndex == index
                        ? Colors.textPrimary
                        : Colors.light,}]}        
                >
                  <Text
                    color={state.tabIndex == index ? Colors.light : Colors.Dark}
                    size={16}
                    family={"regular"}
                  >
                    {label}
                  </Text>
                </TouchableHighlight>
              ))}
            </View>
            <SearchBar
              backgroundColor={Colors.lightGrey}
              value={state.search}
              placeholder="Search ..."
              onChange={(e) => setState({ search: e })}
            />
          </KeyboardAvoidingView>
          {state.people_list?.length > 0 ? (
            <View style={styles.cardContainer}>
              <Flatlist
                gap={5}
                loading={state.loading}
                data={state.people_list}
                renderComponent={(item) => (
                  <View style={styles.userCardContainer}>
                    <UserCard data={item} />
                  </View>
                )}
              />
            </View>
          ) : (
            <View style={styles.textContainer}>
              <Text color={Colors.textGray} size={20}>
                No User found
              </Text>
            </View>
          )}
        </View>
      </Containers>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  wrapper: {
    height: "100%",
    width: "96%",
    alignItems: "center",
  },
  tabContainer:{
    flexDirection: "row",
    gap: 10,
    height: Height(8),
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar:{
    height: Height(5),
    width: Width(30),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
  cardContainer:{
    paddingTop: 10
  },
  userCardContainer:{
    gap: 5
  },
  textContainer:{
    alignItems: "center", 
    paddingTop: 200 
  }

});

export default MyNetwork;
