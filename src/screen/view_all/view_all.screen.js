import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import {
  Text,
  Colors,
  Constants,
  Models,
  Header,
  Flatlist,
  PerformersCard,
  Popup,
  Assets,
  PrimaryButton,
  Dropdown,
  BottomSheets,
  Image,
  Input,
  UpComingEvent,
  WallCard,
} from "../../utils/imports.utils";
import Containers from "../../common_component/hoc/container.hoc";
import { Height, Width, useSetState } from "../../utils/function.utils";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ViewAll(props) {
  const type = props.route.params.type;
  console.log("✌️type --->", type);
  //navigation
  const navigation = useNavigation();

  //addEventListener
  const isFocused = useIsFocused();

  //Ref
  const addPerformersRef = useRef();
  const addHighlightRef = useRef();

  //useState
  const [state, setState] = useSetState({
    loading: false,
    performerData: [],
    highlightData: [],
    recent_post: [],
    recent_event: [],
    open: false,
    performerId: "",
    selectedMusician: "",
    selectedTroupe: "",
    selectedHighlight: {},
    isRemoveHighlight: false,
    highlightTitle: "",
    highlightVideoLink: "",
    highlightDecs: "",
  });

  //ComponentDidMount
  useEffect(() => {
    if (type == "performer") {
      myPerformer(true);
      get_eventperformerAdd();
    } else if (type == "highlight") {
      myHighlight();
    } else if (type == "recent_post") {
      recent_post();
    } else {
      recent_event();
    }
  }, [type]);

  useEffect(() => {
    if (state.selectedHighlight) {
      setState({
        highlightTitle: state.selectedHighlight.title,
        highlightVideoLink: state.selectedHighlight.video_link,
        highlightDecs: state.selectedHighlight.description,
      });
    }
  }, [state.selectedHighlight]);

  //Api call

  const myPerformer = async (load = true) => {
    try {
      {
        load && setState({ loading: true });
      }
      const result = await Models.auth.my_profile();
      setState({
        performerData: result.event_performers,
        loading: false,
      });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const deletePerformer = async () => {
    try {
      await Models.people.delete_performer(state.performerId);
      setState({ open: false, performerId: "" });
      myPerformer(false);
    } catch (e) {
      console.log(e);
    }
  };

  const myHighlight = async (load = true) => {
    try {
      {
        load && setState({ loading: true });
      }
      const result = await Models.auth.my_profile();
      console.log("✌️result --->", result);
      setState({
        highlightData: result.highlights,
        loading: false,
      });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const addHighlight = async () => {
    try {
      const body = {
        title: state.highlightTitle,
        video_link: state.highlightVideoLink,
        description: state.highlightDecs,
      };
      await Models.people.add_highlight(body);
      addHighlightRef.current.close();
      myHighlight(false);
      setState({
        highlightTitle: "",
        highlightVideoLink: "",
        highlightDecs: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const updateHighlight = async () => {
    try {
      const body = {
        title: state.highlightTitle,
        video_link: state.highlightVideoLink,
        description: state.highlightDecs,
      };
      await Models.people.update_highlight(state.selectedHighlight.id, body);
      addHighlightRef.current.close();
      myHighlight(false);
      setState({
        highlightTitle: "",
        highlightVideoLink: "",
        highlightDecs: "",
        selectedHighlight: {},
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHightlight = async () => {
    try {
      await Models.people.delete_highlight(state.selectedHighlight.id);
      setState({ isRemoveHighlight: false });
      myHighlight(false);
    } catch (e) {
      console.log(e);
    }
  };

  const get_eventperformerAdd = async () => {
    try {
      const result = await Models.event.event_performer_add();

      //change dropdown format
      const musicianData = result.musicians?.map((item) => {
        return { label: item.user_name, value: item.id };
      });
      const troupeData = result.troupes?.map((item) => {
        return { label: item.user_name, value: item.id };
      });

      //Remove empty username
      const musicianArr = musicianData.filter((item) => item.label !== "");
      const troupeArr = troupeData.filter((item) => item.label !== "");

      if (state.profileData?.event_performers?.length > 0) {
        //Remove already selected musician
        const event_performersId = new Set(
          state.profileData?.event_performers.map((item) => item.musician_id)
        );

        const filteredArr = musicianArr.filter(
          (item) => !event_performersId.has(item.value)
        );
        setState({ musician: filteredArr });
      } else {
        setState({ musician: musicianArr });
      }
      setState({ troupe: troupeArr });
    } catch (e) {
      console.log(e);
    }
  };

  const addPerformer = async () => {
    try {
      const body = {
        musician: state.selectedMusician,
        troupe: state.selectedTroupe,
      };
      await Models.people.add_performer(body);
      addPerformersRef.current.close();
      myPerformer(false);
      setState({ selectedMusician: "", selectedTroupe: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const recent_event = async () => {
    try {
      setState({ loading: true });
      const result = await Models.event.recent_event();
      setState({ recent_event: result.events, loading: false });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  const recent_post = async (load = false) => {
    try {
      if (load) {
        setState({ loading: true });
      }
      const result = await Models.event.all_wall();
      setState({ recent_post: result, loading: false });
    } catch (e) {
      setState({ loading: false });

      console.log(e);
    }
  };

  //sample data
  const data = ["a", "b"];

  //logic
  const heading = () => {
    let label = "";
    if (type == "performer") {
      label = "My Performer";
    } else if (type == "highlight") {
      label = "My Highlight";
    } else if (type == "recent_post") {
      label = "Recent Post";
    } else {
      label = "My Events";
    }
    return label;
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
      <Containers screen style={css.container} loading={state.loading}>
        <View style={css.wrapper}>
          <View
            style={css.addIconContainer}>
            <Header
              label={heading()}
              rightIcon={
                (type == "performer" || type == "highlight") && Assets.add
              }
              rightIconOnPress={() => {
                if (type == "performer") {
                  addPerformersRef.current.open();
                } else {
                  addHighlightRef.current.open();
                  setState({
                    highlightTitle: "",
                    highlightVideoLink: "",
                    highlightDecs: "",
                    selectedHighlight: {},
                  });
                }
              }}
            />
          </View>
          <View style={css.performersContainer}>
            {state.performerData?.length > 0 && (
              <View>
                <Flatlist
                  paddingBottom={2}
                  data={state.performerData}
                  renderComponent={(item) => (
                    <>
                      <PerformersCard
                        rightIconOnPress={() =>
                          setState({ open: true, performerId: item.id })
                        }
                        onPress={() => {}}
                        logo={item?.musician_profile_picture}
                        content={item?.musician}
                        rightIcon={"trash"}
                      />
                    </>
                  )}
                />
              </View>
            )}
            {state.highlightData?.length > 0 && (
              <View>
                <Flatlist
                  paddingBottom={2}
                  data={state.highlightData}
                  renderComponent={(item) => (
                    <>
                      <PerformersCard
                        rightIconOnPress={() => {
                          addHighlightRef.current.open();
                          setState({ selectedHighlight: item });
                        }}
                        onPress={() => {}}
                        content={item.title}
                        rightIcon={"pencil"}
                        right2Icon={true}
                        right2IconOnPress={() =>
                          setState({
                            isRemoveHighlight: true,
                            selectedHighlight: item,
                          })
                        }
                      />
                    </>
                  )}
                />
              </View>
            )}
            {state.recent_event?.length > 0 && (
              <Flatlist
                loading={state.loading}
                data={state.recent_event}
                renderComponent={(item, index) => (
                  <View
                    style={css.recentEventsContainer}>
                    <UpComingEvent
                      editIcon={true}
                      data={item}
                      editOnPress={() =>
                        navigation.navigate("newEvent", {
                          eventId: item.id,
                        })
                      }
                    />
                  </View>
                )}
              />
            )}
            {state.recent_post?.length > 3 && (
              <Flatlist
                paddingBottom={1}
                loading={state.loading}
                data={state.recent_post}
                renderComponent={(item) => (
                  <WallCard data={item} updateList={() => recent_post(false)} />
                )}
              />
            )}
          </View>
        </View>
        <Popup
          successOnPress={() => deletePerformer()}
          close={() => setState({ open: false })}
          open={state.open}
          title={"Are you sure ?"}
          content={() => (
            <View style={css.deleteTextContainer}>
              <Text color={Colors.Dark} family="regular" size={20}>
                Are you sure to delete ?
              </Text>
            </View>
          )}
        />

        <Popup
          successOnPress={() => deleteHightlight()}
          close={() => setState({ isRemoveHighlight: false })}
          open={state.isRemoveHighlight}
          title={"Are you sure ?"}
          content={() => (
            <View style={css.deleteTextContainer}>
              <Text color={Colors.Dark} family="regular" size={20}>
                Are you sure to delete ?
              </Text>
            </View>
          )}
        />

        <BottomSheets
          height={350}
          ref={addPerformersRef}
          renderComponent={() => (
            <View style={css.modalContainer}>
              <View style={css.modalrowContainer}>
                <View style={css.modalHeadingContainer}>
                  <Text color={Colors.Dark} size={22} family={"bold"}>
                    Add Performer
                  </Text>
                </View>
                <View style={css.modalCloseContainer}>
                  <TouchableHighlight
                    underlayColor={Colors.lightDark}
                    onPress={() => {
                      addPerformersRef.current.close();
                      setState({ selectedMusician: "", selectedTroupe: "" });
                    }}
                    style={css.toggleClose}
                  >
                    <Image src={Assets.close} height={15} width={15} />
                  </TouchableHighlight>
                </View>
              </View>

              <View style={css.dropdownContainer}>
                <Dropdown
                  headerText="Musician"
                  height={50}
                  option={state.musician}
                  placeholder="Choose Musician"
                  size={18}
                  value={state.selectedMusician}
                  onchange={(value) => setState({ selectedMusician: value })}
                />
                <Dropdown
                  headerText="Troupe"
                  height={50}
                  option={state.troupe}
                  placeholder="Choose Troupe"
                  size={18}
                  value={state.selectedTroupe}
                  onchange={(value) => setState({ selectedTroupe: value })}
                />
              </View>
              <View style={css.buttonsContainer}>
                <View style={css.buttons}>
                  <PrimaryButton
                    text={"Save"}
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#1ce589", "#74f2ce"]}
                    size={18}
                    onPress={() => addPerformer()}
                  />
                </View>
                <View style={css.buttons}>
                  <PrimaryButton
                    text={"Close"}
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#a216cd", "#de0993"]}
                    size={18}
                    onPress={() => {
                      addPerformersRef.current.close();
                      setState({ selectedMusician: "", selectedTroupe: "" });
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />

        {/* for highlights  */}
        <BottomSheets
          height={450}
          ref={addHighlightRef}
          renderComponent={() => (
            <View style={css.modalContainer}>
              <View style={css.modalrowContainer}>
              <View style={css.modalHeadingContainer}>
                  <Text color={Colors.Dark} size={22} family={"bold"}>
                    {Object.keys(state.selectedHighlight)?.length === 0
                      ? "Add"
                      : "Edit"}
                    Highlight
                  </Text>
                </View>
                <View style={css.modalCloseContainer}>
                  <TouchableHighlight
                    underlayColor={Colors.lightDark}
                    onPress={() => {
                      addHighlightRef.current.close();
                      setState({
                        highlightTitle: "",
                        highlightVideoLink: "",
                        highlightDecs: "",
                        selectedHighlight: {},
                      });
                    }}
                    style={css.toggleClose}
                  >
                    <Image src={Assets.close} height={15} width={15} />
                  </TouchableHighlight>
                </View>
              </View>

              <View style={css.dropdownContainer}>
                <Input
                  value={state.highlightTitle}
                  onChange={(e) => setState({ highlightTitle: e })}
                  size={20}
                  headerFamily="bold"
                  headerText="Title :"
                  numberOfLines={1}
                  height={50}
                  placeholder="Title"
                  textAlignVertical="top"
                  paddingTop={10}
                  require
                />

                <Input
                  value={state.highlightVideoLink}
                  onChange={(e) => setState({ highlightVideoLink: e })}
                  size={20}
                  headerFamily="bold"
                  headerText="Video link :"
                  numberOfLines={1}
                  height={50}
                  placeholder="Link ..."
                  textAlignVertical="top"
                  paddingTop={10}
                  require
                />
                <Input
                  value={state.highlightDecs}
                  onChange={(e) => setState({ highlightDecs: e })}
                  size={20}
                  headerFamily="bold"
                  headerText="Description :"
                  numberOfLines={1}
                  height={50}
                  placeholder="Description"
                  textAlignVertical="top"
                  paddingTop={10}
                  require
                />
              </View>
              <View style={css.buttonsContainer}>
                <View style={css.buttons}>
                  <PrimaryButton
                    text={"Close"}
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#a216cd", "#de0993"]}
                    size={18}
                    onPress={() => {
                      addHighlightRef.current.close();
                      setState({
                        highlightTitle: "",
                        highlightVideoLink: "",
                        highlightDecs: "",
                      });
                    }}
                  />
                </View>
                <View style={css.buttons}>
                  <PrimaryButton
                    text={
                      Object.keys(state.selectedHighlight)?.length === 0
                        ? "Save"
                        : "Update"
                    }
                    height={40}
                    width={"100%"}
                    borderRadius={12}
                    family="regular"
                    backgroundColor={["#1ce589", "#74f2ce"]}
                    size={18}
                    onPress={() => {
                      if (Object.keys(state.selectedHighlight)?.length === 0) {
                        addHighlight();
                      } else {
                        updateHighlight();
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />
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
    width: "98%",
    alignItems: "center",
  },
  addIconContainer:{
    height: Height(10),
    alignItems: "center",
    justifyContent: "center",
  },
  performersContainer:{
   padding: 5
  },
  modalContainer: {
    backgroundColor: Colors.light,
    borderRadius: 10,
    padding: 10,
    gap: 20,
    width: "100%",
  },
  modalrowContainer:{
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  modalHeadingContainer:{
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
  },
  modalCloseContainer:{
    width: "10%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  toggleClose:{
    padding: 10, 
    borderRadius: 15
  },
  dropdownContainer:{
    gap: 10
  },
  buttonsContainer:{
    flexDirection: "row", 
    gap: 10, 
    width: "100%"
  },
  buttons:{
    width: "48%"
  },
});
