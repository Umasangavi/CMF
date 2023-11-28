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
  BottomSheets,
  Colors,
  Dropdown,
  Flatlist,
  Image,
  Input,
  Modal,
  Models,
  PerformersCard,
  Popup,
  PrimaryButton,
  Text,
  UpComingEvent,
  WallCard,
} from "../../utils/imports.utils";
import Containers from "../../common_component/hoc/container.hoc";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const MyProfile = () => {
  const navigation = useNavigation();

  const addPerformersRef = useRef();
  const addHighlightRef = useRef();

  const isFocused = useIsFocused();

  const [state, setState] = useSetState({
    musician: [],
    troupe: [],
    profileData: {},
    loading: false,
    open: false,
    selectedMusician: "",
    selectedTroupe: "",
    isOpenPerformers: false,
    performerId: "",
    selectedHighlight: {},
    highlightTitle: "",
    highlightVideoLink: "",
    highlightDecs: "",
    isRemoveHighlight: "",
    performerData: [],
    highlightsData: [],
    recent_event: [],
    eventData: [],
    postData: [],
    recent_post: [],
  });

  useEffect(() => {
    if (isFocused) {
      profileData(true);
      get_eventperformerAdd();
      recent_event();
      recent_post();
    }
  }, [isFocused]);

  useEffect(() => {
    if (state.selectedHighlight) {
      setState({
        highlightTitle: state.selectedHighlight.title,
        highlightVideoLink: state.selectedHighlight.video_link,
        highlightDecs: state.selectedHighlight.description,
      });
    }
  }, [state.selectedHighlight]);

  const recent_event = async () => {
    try {
      // setState({ loading: true });
      const result = await Models.event.recent_event();

      //For eventData
      let eventData = [];
      if (result.events?.length > 3) {
        eventData = result.events.slice(0, 3);
      } else {
        eventData = result.events;
      }
      setState({ eventData, recent_event: result.events,loading: false });
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

      let postData = [];
      if (result?.length > 3) {
        postData = result.slice(0, 3);
      } else {
        postData = result;
      }
      setState({ postData, recent_post: result,loading: false });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };
  const [error, setError] = useState(null);

  const addPerformer = async () => {
    try {
      const body = {
        musician: state.selectedMusician,
        troupe: state.selectedTroupe,
      };
      await Models.people.add_performer(body);
      addPerformersRef.current.close();
      profileData(false);
      setState({ selectedMusician: "", selectedTroupe: "" });
    } catch (e) {
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
      profileData(false);
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
      profileData(false);
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

  const deletePerformer = async () => {
    try {
      await Models.people.delete_performer(state.performerId);
      setState({ open: false, performerId: "" });
      profileData(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteHightlight = async () => {
    try {
      await Models.people.delete_highlight(state.selectedHighlight.id);
      setState({ isRemoveHighlight: false });
      profileData(false);
    } catch (e) {
      console.log(e);
    }
  };

  const profileData = async (load = true) => {
    try {
      if (load) {
        setState({ loading: true });
      }
      const result = await Models.auth.my_profile();
      let performerData = [];
      let highlightsData = [];
      //For event_performers
      if (result.event_performers?.length > 3) {
        performerData = result.event_performers.slice(0, 3);
      } else {
        performerData = result.event_performers;
      }
      //For event_highlight
      if (result.highlights?.length > 3) {
        highlightsData = result.highlights.slice(0, 3);
      } else {
        highlightsData = result.highlights;
      }
      setState({
        performerData,
        highlightsData,
        profileData: result,
        loading: false,
      });
    } catch (e) {
      setState({ loading: false });

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

  const viewAll = (type) => {
    if (type == "performer") {
      navigation.navigate("view_all", { type: "performer" });
    } else if (type == "highlight") {
      navigation.navigate("view_all", { type: "highlight" });
    } else if (type == "recent_post") {
      navigation.navigate("view_all", { type: "recent_post" });
    } else if (type == "recent_event") {
      navigation.navigate("view_all", { type: "recent_event" });
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
      <Containers
        screen
        style={styles.container}
        backgroundColor={Colors.textPrimary}
        loading={state.loading}
      >
        <View style={styles.wrapper}>
          <View style={styles.profileContainer}>
            <View style={styles.buttonContainer}>
              <View style={styles.editIconContainer}>
                <TouchableHighlight
                  underlayColor={Colors.lightDark}
                  onPress={() => navigation.navigate("editProfile")}
                  style={styles.editIcon}>
                  <Icon name="pencil" size={25} color={Colors.light} />
                </TouchableHighlight>
              </View>
              <View style={styles.profileImageContainer}>
                <View
                  style={styles.profileImage}>
                  <Image
                    src={state.profileData.user?.profile_picture}
                    width={"100%"}
                    height={"100%"}
                  />
                </View>
                <View style={styles.profileNameContainer}>
                  <View>
                    <Text color={Colors.light} size={25} family={"regular"}>
                      {`${state.profileData.user?.first_name} ${state.profileData.user?.last_name}`}
                    </Text>
                    <Text color={Colors.light} size={18} family={"regular"}>
                      {state.profileData.role}
                    </Text>
                  </View>
                  <View style={styles.followersFollowingContainer}>
                    <View style={styles.countsContainer}>
                      <Text color={Colors.Dark} size={18} family={"bold"}>
                        {state.profileData.user?.followers_count > 0
                          ? state.profileData.user?.followers_count
                          : 0}
                      </Text>
                      <Text
                        color={Colors.lightGray}
                        size={18}
                        family={"regular"}
                      >
                        Followers
                      </Text>
                    </View>
                    <View style={styles.countsContainer}>
                      <Text color={Colors.Dark} size={20} family={"bold"}>
                        {state.profileData.user?.following_count > 0
                          ? state.profileData.user?.following_count
                          : 0}
                      </Text>
                      <Text
                        color={Colors.lightGray}
                        size={18}
                        family={"regular"}
                      >
                        Following
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollviewContainer}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.aboutmeContainer}>
                <Text color={Colors.Dark} size={20} family={"bold"}>
                  About Me
                </Text>
                <Text color={Colors.lightGray} size={18} family={"regular"}>
                  {state.profileData.event_about_me?.about_us}
                </Text>
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.headingRowContainer}>
                  <Text color={Colors.Dark} size={20} family={"bold"}>
                    My Performers
                  </Text>

                  <TouchableHighlight
                    underlayColor={Colors.lightDark}
                    onPress={() => addPerformersRef.current.open()}
                    style={styles.addIcon}
                  >
                    <Image
                      src={Assets.add}
                      height={25}
                      width={25}
                      onPress={() => addPerformersRef.current.open()}
                    />
                  </TouchableHighlight>
                </View>
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
                {state.profileData?.event_performers?.length > 3 && (
                  <View style={styles.viewAllContainer}>
                    <TouchableHighlight
                      onPressIn={() => viewAll("performer")}
                      underlayColor={Colors.bgGrey}
                      onPress={() => {}}
                      style={styles.viewAll}
                    >
                      <Text
                        color={Colors.textPrimary}
                        size={18}
                        family="italic"
                        textDecorationLine="underline"
                      >
                        View all
                      </Text>
                    </TouchableHighlight>
                  </View>
                )}
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.headingRowContainer}>
                  <Text color={Colors.Dark} size={20} family={"bold"}>
                    My Highlights
                  </Text>

                  <TouchableHighlight
                    underlayColor={Colors.lightDark}
                    onPress={() => {
                      addHighlightRef.current.open();
                      setState({
                        highlightTitle: "",
                        highlightVideoLink: "",
                        highlightDecs: "",
                        selectedHighlight: {},
                      });
                    }}
                    style={styles.addIcon}
                  >
                    <Image
                      src={Assets.add}
                      height={25}
                      width={25}
                      onPress={() => {
                        addHighlightRef.current.open();
                        setState({
                          highlightTitle: "",
                          highlightVideoLink: "",
                          highlightDecs: "",
                        });
                      }}
                    />
                  </TouchableHighlight>
                </View>
                {state.highlightsData?.length > 0 && (
                  <View>
                    <Flatlist
                      paddingBottom={2}
                      data={state.highlightsData}
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
                {state.profileData?.highlights?.length > 3 && (
                  <View style={styles.viewAllContainer}>
                    <TouchableHighlight
                      onPress={() => viewAll("highlight")}
                      underlayColor={Colors.bgGrey}
                      style={styles.viewAll}
                    >
                      <Text
                        color={Colors.textPrimary}
                        size={18}
                        family="italic"
                        textDecorationLine="underline"
                      >
                        View all
                      </Text>
                    </TouchableHighlight>
                  </View>
                )}
              </View>

              <View style={styles.cardContainer}>
                <View style={styles.headingRowContainer}>
                  <Text color={Colors.Dark} size={20} family={"bold"}>
                    Recent Events
                  </Text>
                </View>
                <Flatlist
                  paddingBottom={15}
                  // loading={state.loading}
                  data={state.eventData}
                  renderComponent={(item, index) => (
                    <View
                      style={[styles.recentEvents,
                        {paddingBottom:
                          index === state.eventData?.length - 1 ? 10 : 0,}]
                      }
                    >
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
                {state.recent_event?.length > 3 && (
                  <View style={styles.viewAllContainer}>
                    <TouchableHighlight
                      onPress={() => viewAll("recent_event")}
                      underlayColor={Colors.bgGrey}
                      style={styles.recentViewall}
                    >
                      <Text
                        color={Colors.textPrimary}
                        size={18}
                        family="italic"
                        textDecorationLine="underline"
                      >
                        View all
                      </Text>
                    </TouchableHighlight>
                  </View>
                )}
              </View>

              <View style={styles.cardContainer}>
              <View style={styles.headingRowContainer}>
                  <Text color={Colors.Dark} size={20} family={"bold"}>
                    Recent Post
                  </Text>
                </View>
                <View style={styles.WallCardContainer}>
                  <Flatlist
                    paddingBottom={1}
                    loading={state.loading}
                    data={state.postData}
                    renderComponent={(item) => (
                      <WallCard
                        data={item}
                        updateList={() => recent_post(false)}
                      />
                    )}
                  />
                </View>
                {state.recent_post?.length > 3 && (
                  <View style={styles.viewAllContainer}>
                    <TouchableHighlight
                      underlayColor={Colors.bgGrey}
                      onPress={() => viewAll("recent_post")}
                      style={styles.recentViewall}
                    >
                      <Text
                        color={Colors.textPrimary}
                        size={18}
                        family="italic"
                        textDecorationLine="underline"
                      >
                        View all
                      </Text>
                    </TouchableHighlight>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
        {/* for performer  */}
        <BottomSheets
          height={350}
          ref={addPerformersRef}
          renderComponent={() => (
            <View style={styles.modalContainer}>
              <View style={styles.modalrowContainer}>
                <View style={styles.modalHeadingContainer}>
                  <Text color={Colors.Dark} size={22} family={"bold"}>
                    Add Performer
                  </Text>
                </View>
                <View style={styles.modalCloseContainer}>
                  <TouchableHighlight
                    underlayColor={Colors.lightDark}
                    onPress={() => {
                      addPerformersRef.current.close();
                      setState({ selectedMusician: "", selectedTroupe: "" });
                    }}
                    style={styles.toggleClose}>
                    <Image src={Assets.close} height={15} width={15} />
                  </TouchableHighlight>
                </View>
              </View>

              <View style={styles.dropdownContainer}>
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
              <View style={styles.buttonsContainer}>
                <View style={styles.buttons}>
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
                <View style={styles.buttons}>
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
              <View style={styles.errorMessage}>
                {error && <Text style={{ color: "red" }}>{error}</Text>}
              </View>
            </View>
          )}
        />
        {/* for highlights  */}
        <BottomSheets
          height={450}
          ref={addHighlightRef}
          renderComponent={() => (
            <View style={styles.modalContainer}>
              <View style={styles.modalrowContainer}>
                <View style={styles.modalHeadingContainer}>
                  <Text color={Colors.Dark} size={22} family={"bold"}>
                    {Object.keys(state.selectedHighlight)?.length === 0
                      ? "Add"
                      : "Edit"}
                    Highlight
                  </Text>
                </View>
                <View style={styles.modalCloseContainer}>
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
                    style={styles.toggleClose}>
                    <Image src={Assets.close} height={15} width={15} />
                  </TouchableHighlight>
                </View>
              </View>

              <View  style={styles.dropdownContainer}>
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
              <View style={styles.buttonsContainer}>
                <View style={styles.buttons}>
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
                <View style={styles.buttons}>
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
              <View style={styles.errorMessage}>
                {error && <Text style={{ color: "red" }}>{error}</Text>}
              </View>
            </View>
          )}
        />
        <Popup
          successOnPress={() => deletePerformer()}
          close={() => setState({ open: false })}
          open={state.open}
          title={"Are you sure ?"}
          content={() => (
            <View style={styles.deleteContainer}>
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
            <View style={styles.deleteContainer}>
              <Text color={Colors.Dark} family="regular" size={20}>
                Are you sure to delete ?
              </Text>
            </View>
          )}
        />
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
  profileContainer:{
    height: "30%", 
    width: "100%",
  },
  buttonContainer: {
    height: "75%",
    backgroundColor: Colors.textPrimary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
  },
editIconContainer:{
  width: "98%",
  alignItems: "flex-end",
  paddingRight: 15,
},
editIcon:{
  height: 40,
  width: 40,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 15,
},
profileImageContainer:{
  flexDirection: "row",
  paddingTop: 50,
  width: "98%",
  paddingLeft: 5,
  gap: 10,
},
profileImage:{
  height: 120,
  width: 120,
  overflow: "hidden",
  borderRadius: 15,
},
profileNameContainer:{
  paddingTop: 10, 
  gap: 10,
},
followersFollowingContainer:{
  flexDirection: "row",
  gap: 50,
},
countsContainer:{
  gap: 1, 
  alignItems: "center"
},
detailsContainer:{
  height: "70%", 
  paddingTop: 15, 
  width: "96%"
},
scrollviewContainer:{
  paddingBottom: 20, 
  height: "100%", 
  width: "100%",
},
contentContainer:{
  paddingBottom: 10, 
  gap: 10 
},
aboutmeContainer:{
  backgroundColor: Colors.light,
  padding: 15,
  borderRadius: 10,
  gap: 8,
},
cardContainer:{
  backgroundColor: Colors.light,
  padding: 15,
  borderRadius: 10,
  gap: 10,
},
headingRowContainer:{
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
addIcon:{
  padding: 5, 
  borderRadius: 15
},
viewAllContainer:{
  flexDirection: "row", 
  justifyContent: "flex-end" 
},
viewAll:{
  padding: 3
},
recentEvents:{
  width: "100%",
  padding: 5,
},
recentViewall:{
  paddingRight: 15, 
  paddingBottom: 15,
},
WallCardContainer:{
  width: "98%" 
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
errorMessage:{
  flexDirection: "row",
  justifyContent: "space-evenly",
},

deleteContainer:{
  paddingTop: 10
},
});
export default MyProfile;