import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import { Height, Width, useSetState } from "../../utils/function.utils";
import {
  Assets,
  Colors,
  UpComingEvent,
  CompletedEvent,
  Flatlist,
  Modal,
  Models,
  NavButton,
  Text,
  NewEvent,
} from "../../utils/imports.utils";
import Container, { Toast } from "toastify-react-native";
import Containers from "../../common_component/hoc/container.hoc";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const MyEvents = () => {
  const [state, setState] = useSetState({
    tabActive: false,
    tabIndex: 0,
    loading: false,
    upcomingEventData: [],
    completedEventData: [],
    edit: false,
    editData: {},
  });
  console.log("editId: ", state.editData);

  const eventstabs = ["Upcoming Event", "Completed Event"];

  const navigation = useNavigation();

  useEffect(() => {
    if (state.tabIndex == 0) {
      get_upcomingEventData();
    }
    if (state.tabIndex == 1) {
      get_completedEventData(true);
    }
  }, []);

  useEffect(() => {
    // if (state.editData) {
    //   setState({ edit: true });
    // } else {
    //   setState({ edit: false });
    // }
  }, [state.tabIndex]);

  const get_upcomingEventData = async () => {
    try {
      setState({ loading: true });
      const result = await Models.event.recent_event();
      setState({ upcomingEventData: result.events });
      console.log("result.events: ", result.events);
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
    }
  };

  const get_completedEventData = async () => {
    console.log("called: ");
    try {
      setState({ loading: true });
      const result = await Models.event.all_event();
      setState({ completedEventData: result.events });
      setState({ loading: false });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  useEffect(() => {
    if (!state.edit) {
      setState({ editData: {} });
    }
  }, [state.edit]);

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
      style={{ width: "100%", height: "100%" }}
      angle={300}
    >
      <Containers style={styles.container} screen backgroundColor="transparent">
        <Container style="top" />
        <View style={styles.wrapper}>
          <View style={styles.tabContainer}>
            {eventstabs?.map((label, index) => (
              <View style={styles.tabWidth}>
                <TouchableHighlight
                  underlayColor={Colors.lightGrey}
                  onPress={() => setState({ tabIndex: index })}
                  style={[styles.tab,{backgroundColor:state.tabIndex == index ? Colors.blue : Colors.light,}]}>
                  <Text
                    color={state.tabIndex == index ? Colors.light : Colors.Dark}
                    size={18}
                    onPress={() => setState({ tabIndex: index })}
                  >
                    {label}
                  </Text>
                </TouchableHighlight>
              </View>
            ))}
          </View>
          <View style={styles.cardContainer}>
            {
              state.tabIndex == 0 ? (
                <Flatlist
                  loading={state.loading}
                  data={state.upcomingEventData}
                  renderComponent={(item, index) => (
                    <View style={[styles.cardPadding, 
                        {paddingBottom:
                          index === state.upcomingEventData?.length - 1
                            ? 30
                            : 0,}
                      ]}
                    >
                      <UpComingEvent
                        editIcon={true}
                        data={item}
                        editOnPress={() =>
                          navigation.navigate("newEvent", { eventId: item.id })
                        }
                      />
                    </View>
                  )}
                />
              ) : state.tabIndex == 1 ? (
                <Flatlist
                  loading={state.loading}
                  data={state.completedEventData}
                  renderComponent={(item, index) => (
                    <View style={[styles.cardPadding, 
                      {paddingBottom:
                        index === state.completedEventData?.length - 1
                          ? 30
                          : 0,}
                    ]}
                    >
                      <UpComingEvent
                        editIcon={false}
                        data={item}
                        editOnPress={() => console.log("item: ", item)}
                      />
                    </View>
                  )}
                />
              ) : null
              //  : (
              //   <ScrollView
              //     showsVerticalScrollIndicator={false}
              //     style={{ width: "100%" }}
              //     contentContainerStyle={{ paddingBottom: 60 }}
              //   >
              //     <NewEvent
              //       location={state.location}
              //       editData={state.editData}
              //       tabIndex={state.tabIndex}
              //     />
              //   </ScrollView>
              // )
            }
            <View style={styles.addIcon}>
              <NavButton
                icon={Assets.add}
                height={50}
                width={50}
                radius={15}
                iconWidth={30}
                iconHeight={30}
                background={Colors.bgGrey}
                onPress={() => navigation.navigate("newEvent")}
              />
            </View>
          </View>
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
    width: "100%",
    alignItems: "center",
  },
  tabContainer:{
    flexDirection: "row",
    height: Height(8),
    gap: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  tabWidth:{
    width: Width(40)
  },
  tab:{
    height: Height(5),
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer:{
    width: "100%",
    height: "100%",
  },
  cardPadding:{
    padding: 10,
  },
  addIcon:{
    position: "absolute", 
    right: 10, 
    bottom: 80,
  }
});

export default MyEvents;
