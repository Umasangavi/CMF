import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {
  Height,
  Width,
  convertDateToTime,
  formatDate,
  locations,
  uploadImage,
  useSetState,
} from "../../utils/function.utils";
import {
  Assets,
  Colors,
  Constants,
  DatePickerInput,
  Dropdown,
  Header,
  Image,
  Input,
  Models,
  NavButton,
  PrimaryButton,
  Switch,
  Text,
  Validation,
} from "../../utils/imports.utils";
import { categories, serverUrl, type } from "../../utils/constant.utils";
import * as yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import Containers from "../../common_component/hoc/container.hoc";
import Container, { Toast } from "toastify-react-native";

export default function New_event(props) {
  const params = props.route?.params?.eventId;
  const [state, setState] = useSetState({
    full_name: "",
    eventIndex: 0,
    fromDate: "",
    fromTime: "",
    closeDate: "",
    toDate: "",
    toTime: "",
    event_catagory: "",
    event_type: "",
    event_detail: "",
    event_highlight: "",
    location: [],
    venue: "",
    ticketBookingLink: "",
    ticketBookingPlace: "",
    invite: false,
    accept: false,
    posterImage: "",
    selectedLocation: "",
  });

  useEffect(() => {
    get_location();
    if (params) {
      get_data();
    }
  }, []);

  const get_location = async () => {
    try {
      const result = await locations();
      setState({ location: result });
    } catch (e) {
      console.log(e);
    }
  };

  const get_data = async () => {
    try {
      const response = await Models.event.get_event_by_id(params);
      console.log("get_data --->", response);
      const result = response.event;
      setState({
        full_name: result.name,
        fromDate: result.from_date,
        fromTime: result.from_date,
        closeDate: result.registration_close_date,
        toDate: result.to_date,
        toTime: result.to_date,
        event_catagory:
          result.event_category == "Contest" ? 1 : "Orchestra" ? 2 : 3,
        event_type: result.event_type,
        event_detail: result.event_details,
        event_highlight: result.highlight,
        selectedLocation: result.location.id,
        venue: result.venue,
        ticketBookingLink: result.ticket_booking_link_1,
        ticketBookingPlace: result.ticket_booking_place,
        invite: false,
        accept: result.auto_accept,
        posterImage: result.poster_image,
        eventIndex: result.event_type == "Offline" ? 1 : 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImages = async () => {
    try {
      const result = await uploadImage();
      console.log("✌️result --->", result);
      const body = {
        uri: result.uri,
        name: "profile_picture.jpg",
        type: "image/jpeg", // Adjust the MIME type according to your file
      };
      console.log("✌️body --->", body);

      setState({ posterImage: result.uri, profileFormData: body });
    } catch (e) {
      console.log(e);
    }
  };

  const new_event = yup.object().shape({
    from_date: yup.string().required("fromdate is required"),

    name: yup.string().required("name is required"),
    // driving_licence_front: yup.string().required('Please upload driving licence front'),
    // aadhaar_card_back: yup.string().required('Please upload aadhaar card back'),
    // aadhaar_card_front: yup.string().required('Please upload aadhaar card front'),
    // passport_size_photo: yup.string().required('Please upload passport size photo '),
  });

  const create_event = async () => {
    try {
      const body = {
        name: state.full_name,
        from_date: state.fromDate,
        fromTime: state.fromDate,
        closeDate: state.closeDate,
        toDate: state.toDate,
        toTime: state.toTime,
        event_category: state.event_catagory,
        event_type: state.eventIndex == 1 ? "Offline" : "Online",
        event_details: state.event_detail,
        highlight: state.event_highlight,
        location: state.selectedLocation,
        venue: state.venue,
        ticket_booking_link_1: state.ticketBookingLink,
        ticket_booking_place: state.ticketBookingPlace,
        self_reference: state.invite,
        // accept: state.auto_accept,
        poster_image: state.posterImage,
      };
      await Validation.new_event.validate(body);

      console.log("✌️body --->", body);

      // const formData = new FormData();
      // for (const key in body) {
      //   if (Object.prototype.hasOwnProperty.call(body, key)) {
      //     formData.append(key, body[key]);
      //   }
      // }

      // const token = await AsyncStorage.getItem("token");
      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: `${serverUrl()}create_event/`,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     authorization: token,
      //   },
      //   data: formData,
      // };

      // const res = await Models.auth.updateProfiles(body);
      // axios
      //   .request(config)
      //   .then((response) => {
      //     console.log(JSON.stringify(response.data));
      //     navigation.goBack();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // console.log("create_event --->", result);
      // setState({ locationOption: result });
    } catch (e) {
      Toast.warn(e.errors[0]);
      console.log(e);
    }
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      // end={{ x: 1, y: 0.2}}
      colors={[
        "rgba(255, 226, 133, 0.4)", // #FFE285 with 50% opacity
        "rgba(255, 191, 53, 0.1)", // #FFBF35 with 50% opacity
        "rgba(108, 77, 218, 0.2)", // #6C4DDA with 50% opacity
        "rgba(255, 195, 203, 0.2)", // #FFC3CB with 50% opacity
        "rgba(255, 195, 221, 0.2)", // #FFC3DD with 50% opacity
        "rgba(255, 228, 244, 0.2)", // #FFE4F4 with 50% opacity
        "rgba(0, 210, 225, 0.1)", // #00D2E1 with 50% opacity
        "rgba(0, 210, 225, 0.1)",
        "rgba(134, 104, 254, 0.2)", // #8668FE with 50% opacity
        "rgba(255, 78, 152, 0.2)", // #FF4E98 with 50% opacity
      ]}
      // locations={[0.2, 1, 0.2, 1, 1, 1, 1, 1, 1]}
      style={{ width: "100%" }}
      angle={300}
    >
      <Containers style={css.container} screen backgroundColor="transparent">
        <Container style="top" />
        <View style={css.wrapper}>
          <View style={{ height: Height(10) }}>
            <Header label="Create new event" />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
            // contentContainerStyle={{ width: "100%", height: "100%" }}
          >
            <View style={{ padding: 5 }}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: Colors.light,
                  borderRadius: 15,
                  gap: 20,
                }}
              >
                <Input
                  value={state.full_name}
                  onChange={(e) => setState({ full_name: e })}
                  size={20}
                  headerText="Full name"
                  placeholder="Full name"
                  require
                />

                <Dropdown
                  borderWidth={0.5}
                  borderRadius={10}
                  height={50}
                  size={20}
                  family="regular"
                  value={state.event_catagory}
                  onchange={(value) => setState({ event_catagory: value })}
                  option={categories}
                  backgroundColor={Colors.light}
                  placeholder="Event category"
                  headerText="Event category"
                  require
                />
                <View style={{ gap: 5 }}>
                  <Text size={20} family="regular" bottom={3}>
                    Event Type
                  </Text>
                  {type.map((item, index) => (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        setState({ eventIndex: index, event_type: item.value })
                      }
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        height: 30,
                        alignItems: "center",
                      }}
                    >
                      <View style={{ paddingTop: 5 }}>
                        <Image
                          src={
                            state.eventIndex == index
                              ? Assets.radio_checked
                              : Assets.radio_unchecked
                          }
                          height={40}
                          width={40}
                          onPress={() => setState({ event_type: item.value })}
                        />
                      </View>
                      <Text size={20}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Input
                  value={state.event_detail}
                  onChange={(e) => setState({ event_detail: e })}
                  size={20}
                  headerText="Event details"
                  multiline
                  numberOfLines={10}
                  height={100}
                  scrollEnabled
                  placeholder="Event details"
                  textAlignVertical="top"
                  paddingTop={10}
                  require
                />
                <Input
                  value={state.event_highlight}
                  onChange={(e) => setState({ event_highlight: e })}
                  size={20}
                  headerText="Event highlights"
                  multiline
                  numberOfLines={10}
                  height={100}
                  scrollEnabled
                  placeholder="Event highlights"
                  textAlignVertical="top"
                  paddingTop={10}
                  require
                />
                <Dropdown
                  borderWidth={0.5}
                  borderRadius={10}
                  height={50}
                  size={20}
                  family={"regular"}
                  value={state.selectedLocation}
                  onchange={(value) => setState({ selectedLocation: value })}
                  option={state.location || []}
                  backgroundColor={Colors.light}
                  placeholder="Location"
                  headerText="Location"
                  require
                />

                <DatePickerInput
                  min={new Date()}
                  heading={"Registration close date"}
                  require={true}
                  value={state.closeDate}
                  onChange={(val) => {
                    setState({
                      closeDate: val,
                      open: false,
                      fromDate: "",
                      toDate: "",
                    });
                  }}
                  placeholder={"Close Date"}
                />
                <DatePickerInput
                  max={new Date(state.closeDate)}
                  min={new Date()}
                  heading={"From date"}
                  value={state.fromDate}
                  require={true}
                  onChange={(val) => {
                    setState({ fromDate: val, toDate: "" });
                  }}
                  placeholder={"From Date"}
                />
                <DatePickerInput
                  heading={"From time"}
                  require={true}
                  value={state.fromTime}
                  mode="time"
                  onChange={(val) => {
                    setState({ fromTime: val });
                  }}
                  placeholder={"From time"}
                />
                <DatePickerInput
                  max={new Date(state.closeDate)}
                  min={new Date(state.fromDate)}
                  heading={"To date"}
                  require={true}
                  value={state.toDate}
                  onChange={(val) => {
                    setState({ toDate: val });
                  }}
                  placeholder={"To Date"}
                />
                <DatePickerInput
                  heading={"To time"}
                  require={true}
                  value={state.toTime}
                  mode="time"
                  onChange={(val) => {
                    setState({ toTime: val });
                  }}
                  placeholder={"To time"}
                />
                <Input
                  value={state.venue}
                  onChange={(e) => setState({ venue: e })}
                  size={20}
                  headerText="Venue"
                  placeholder="Venue"
                  require
                />
                <View style={{ gap: 5 }}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text color={Colors.Dark} size={18}>
                      Poster image
                    </Text>
                    <Text color={Colors.error} size={18}>
                      *
                    </Text>
                  </View>
                  {state.posterImage ? (
                    <View
                      style={{
                        height: Height(18),
                        justifyContent: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          height: Height(16),
                          width: "100%",
                          borderRadius: 15,
                          overflow: "hidden",
                          backgroundColor: "red",
                        }}
                      >
                        <Image
                          src={state.posterImage}
                          height={"100%"}
                          width={"100%"}
                          resize="cover"
                        />
                      </View>
                      <View
                        style={{ position: "absolute", right: 5, top: -12 }}
                      >
                        <NavButton
                          icon={Assets.edit}
                          height={30}
                          width={30}
                          radius={30}
                          background={Colors.light}
                          onPress={() => uploadImages()}
                        />
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => uploadImages()}
                      style={{
                        height: Height(6),
                        width: Width(50),
                        borderRadius: 10,
                        backgroundColor: Colors.grey,
                        alignItems: "center",
                        justifyContent: `center`,
                      }}
                    >
                      <Text color={Colors.Dark} size={18}>
                        Choose image
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Input
                  value={state.ticketBookingLink}
                  onChange={(e) => setState({ ticketBookingLink: e })}
                  size={20}
                  headerText="Ticket booking link"
                  placeholder="Ticket booking link"
                  require
                />
                <Input
                  value={state.ticketBookingPlace}
                  onChange={(e) => setState({ ticketBookingPlace: e })}
                  size={20}
                  headerText="Ticket booking place"
                  placeholder="Ticket booking place"
                  require
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text size={18}>
                      Limited to personal invitation,{"\n"}No other registration
                      allowed.
                    </Text>
                  </View>
                  <Switch
                    color={Colors.toggle}
                    value={state.invite}
                    size={20}
                    onchange={() => setState({ invite: !state.invite })}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text size={18} color={Colors.Dark}>
                      Auto accept
                    </Text>
                  </View>
                  <Switch
                    color={Colors.toggle}
                    value={state.accept}
                    size={20}
                    onchange={() => setState({ accept: !state.accept })}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <NavButton
                    icon={Assets.plus_circle}
                    height={55}
                    width={55}
                    radius={30}
                    // onPress={() => navigation.goBack()}
                    background={Colors.textPrimary}
                    color={Colors.light}
                    iconWidth={30}
                    iconHeight={30}
                  />
                  <NavButton
                    height={55}
                    width={55}
                    radius={30}
                    icon={Assets.user}
                    // onPress={() => navigation.goBack()}
                    background={Colors.btnBlue}
                    color={Colors.light}
                    iconWidth={30}
                    iconHeight={30}
                  />
                  <PrimaryButton
                    text={`${true ? "Update" : "Post"} Event`}
                    height={50}
                    width={150}
                    family="regular"
                    size={18}
                    backgroundColor={Constants.btnGold}
                    onPress={() => create_event()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Containers>
    </LinearGradient>
  );
}

const css = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    width: "95%",
    // alignItems: "center",
  },
});
