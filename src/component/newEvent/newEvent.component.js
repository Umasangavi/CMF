import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {
  Height,
  Width,
  convertDateToTime,
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
  Image,
  Input,
  NavButton,
  PrimaryButton,
  Switch,
  Text,
} from "../../utils/imports.utils";
import { categories, type } from "../../utils/constant.utils";
import * as ImagePicker from "expo-image-picker";

export default function NewEvent(props) {
  const { location, editData, tabIndex } = props;
  const [state, setState] = useSetState({
    full_name: "",
    selectedType: [],
    eventIndex: 0,
    fromDate: null,
    fromTime: null,
    closeDate: null,
    toDate: null,
    toTime: null,
    event_catagory: "",
    event_type: "",
    event_detail: "",
    event_highlight: "",
    location: "",
    venue: "",
    ticketBookingLink: "",
    ticketBookingPlace: "",
    invite: false,
    accept: false,
    event_type: "",
    posterImage: "",
    locationOption: [],
  });

  const get_location = async () => {
    try {
      const result = await locations();

      setState({ locationOption: result });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    get_location();

    if (editData) {
      setState({
        full_name: editData.name,
        selectedType: [],
        fromDate: editData.from_date,
        fromTime: null,
        closeDate: null,
        toDate: editData.to_date,
        toTime: null,
        event_catagory: editData.event_category,
        event_type: editData.event_type,
        event_detail: editData.event_details,
        event_highlight: editData.event_highlights,
        location: editData.location,
        venue: editData.venue,
        ticketBookingLink: editData.ticket_booking_link_1,
        ticketBookingPlace: editData.ticket_booking_place,
        invite: false,
        accept: editData.auto_accept,
        posterImage: editData.poster_image,
      });
    }
  }, []);

  const handleSubmit = async () => {
    const body = {
      full_name: state.full_name,
      event_catagory: state.event_catagory,
      event_type: state.event_type,
      event_detail: state.event_detail,
      event_highlight: state.event_highlight,
      location: state.location,
      closeDate: state.closeDate,
      fromDate: state.fromDate,
      fromTime: state.fromTime,
      toDate: state.toDate,
      toTime: state.toTime,
      venue: state.venue,
      ticketBookingLink: state.ticketBookingLink,
      ticketBookingPlace: state.ticketBookingPlace,
      invite: state.invite,
      accept: state.accept,
    };
    console.log("body", body);
    if (editData) {
      //For update event
    } else {
      //Create new event
    }
  };

  const uploadImages = async () => {
    try {
      const result = await uploadImage();
      console.log("result: ", result);
      setState({ posterImage: result.uri });
    } catch (e) {
      console.log(e);
    }
  };
  return (
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
              onPress={() => setState({ eventIndex: index, event_type: item })}
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
          value={state.location}
          onchange={(value) => setState({ location: value })}
          option={state.locationOption || []}
          backgroundColor={Colors.light}
          placeholder="Location"
          headerText="Location"
          require
        />
        <DatePickerInput
          heading={"Registration close date"}
          require={true}
          onChange={(val) => {
            setState({ closeDate: val });
          }}
          placeholder={"Close Date"}
        />
        <DatePickerInput
          heading={"From date"}
          require={true}
          onChange={(val) => {
            setState({ fromDate: val });
          }}
          placeholder={"From Date"}
        />
        <DatePickerInput
          heading={"From time"}
          require={true}
          mode="time"
          onChange={(val) => {
            console.log("val: ", val);
            setState({ fromTime: val });
          }}
          placeholder={"From time"}
          value={state.fromTime}
        />
        <DatePickerInput
          heading={"To date"}
          require={true}
          onChange={(val) => {
            setState({ toDate: val });
          }}
          placeholder={"To Date"}
        />
        <DatePickerInput
          heading={"To time"}
          require={true}
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
                height: Height(15),
                width: Width(30),
                borderRadius: 15,
                overflow: "hidden",
              }}
            >
              <Image
                src={state.posterImage}
                height={"100%"}
                width={"100%"}
                resize="cover"
              />
              <View></View>
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
            text={`${editData ? "Update" : "Post"} Event`}
            height={50}
            width={150}
            family="regular"
            size={18}
            backgroundColor={Constants.btnGold}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
