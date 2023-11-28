import React, { useRef } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Height, Width, useSetState } from "../../utils/function.utils";
import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import {
  Assets,
  Colors,
  Header,
  Image,
  Modal,
  Models,
  NavButton,
  PrimaryButton,
  Text,
} from "../../utils/imports.utils";
import Container, { Toast } from "toastify-react-native";
import Containers from "../../common_component/hoc/container.hoc";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { btnBlue } from "../../utils/constant.utils";
import { useIsFocused } from "@react-navigation/native";
import BottomTabNavigation from "../../common_component/navigation/BottomNavigation";


const EventDetails = ({ route }) => {
  const { eventId } = route?.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [state, setState] = useSetState({
    data: {},
    loading: false,
    rerender: false,
  });

  const scrollViewRef = useRef(null);

  const get_EventDetails = async (id = eventId) => {
    try {
      setState({ loading: true });
      const result = await Models.event.event_details(id);
      setState({ data: result, loading: false });
    } catch (e) {
      setState({ loading: false });
      console.log(e);
    }
  };

  // useEffect(() => {
  //   get_EventDetails();
  // }, []);

  useEffect(() => {
    console.log("isFocused:", isFocused);
    get_EventDetails();
  }, [isFocused]);
  

  const formatDate = (date) => {
    return moment(date).format("MMM DD, YY h:mm a");
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0.1 }}
      // end={{ x: 1, y: 0.2}}
      colors={[
        "rgba(255, 191, 53, 0.1)", // #FFBF35 with 50% opacity
        "rgba(108, 77, 218, 0.2)", // #6C4DDA with 50% opacity
        "rgba(255, 195, 203, 0.2)", // #FFC3CB with 50% opacity
        "rgba(255, 195, 221, 0.2)", // #FFC3DD with 50% opacity
        "rgba(255, 228, 244, 0.2)", // #FFE4F4 with 50% opacity
        "rgba(0, 210, 225, 0.1)", // #00D2E1 with 50% opacity
        "rgba(255, 226, 133, 0.4)", // #FFE285 with 50% opacity
        "rgba(0, 210, 225, 0.1)",
        "rgba(134, 104, 254, 0.2)", // #8668FE with 50% opacity
        "rgba(255, 78, 152, 0.2)", // #FF4E98 with 50% opacity
      ]}
      // locations={[0.2, 1, 0.2, 1, 1, 1, 1, 1, 1]}
      angle={300}
    >
      <Containers
        style={styles.container}
        screen
        backgroundColor="transparent"
        // loading={state.loading}
      >
        <Container style="top" />
        <View style={styles.wrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.img_container}>
              <Image
                src={state.data.event?.poster_image}
                height={"100%"}
                width={"100%"}
                resize="cover"
              />
              <View style={styles.arrowContainer}>
                <NavButton
                  height={40}
                  width={40}
                  radius={100}
                  icon={Assets.left_arrow}
                  iconWidth={20}
                  iconHeight={20}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>

            <Text size={24} family="bold">{state.data.event?.name}</Text>
            <View style={styles.line} />

            <View style={styles.dateRow}>
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color="blue"
                style={styles.icon}
              />
              <Text size={16}>
                {formatDate(state.data.event?.from_date)} -
                {formatDate(state.data.event?.to_date)}
              </Text>
            </View>
            <View style={styles.locationRow}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="blue"
                style={styles.icon}
              />
              <Text size={16}>{state.data.event?.venue}</Text>
            </View>
            <View style={styles.addCalendarContainer}>
              <PrimaryButton
                backgroundColor={btnBlue}
                text="Add to Google Calender"
                family="regular"
                size={16}
                width={Width(70)}
              />
            </View>

            <View style={styles.line} />
            <View style={styles.eventBookingContainer}>
              <View style={styles.firstContainer}>
                <Text size={18} color={Colors.textPrimary} family={"bold"}>Event Type</Text>
                <Text style={styles.eventType}>
                  {state.data.event?.event_type}
                </Text>
                <Text size={18} color={Colors.textPrimary} family={"bold"}>Event Catagory </Text>
                <Text style={styles.eventType}>
                  {state.data.event?.event_category}
                </Text>
              </View>
              <View style={styles.secondContainer}>
                <Text size={18} color={Colors.textPrimary} family={"bold"}>Skills Wanted</Text>
                {state.data.skill?.map((skillItem, index) => (
                  <Text style={styles.skills} key={index}>
                    {skillItem.skill}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.line} />

            <Text size={18} color={Colors.textPrimary} family={"bold"}>Event Details</Text>
            <Text style={styles.eventDetails}>
              {state.data.event?.event_details}
            </Text>
            <View style={styles.line} />
            <Text size={18} color={Colors.textPrimary} family={"bold"}>Event Highlight</Text>
            <Text style={styles.eventHighlights}>
              {state.data.event?.highlight}
            </Text>
            <View style={styles.line} />

            <View style={styles.eventOrganizerContainer}>
              <View style={styles.eventOrganizer}>
                <Text size={18} color={Colors.textPrimary} family={"bold"}>Organized by </Text>
                <Text style={styles.eventOrganizer}>
                  {state.data.event?.event_organizer}
                </Text>
              </View>
              <View style={styles.eventDate}>
                <Text size={18} color={Colors.textPrimary} family={"bold"}>Registration Close Date</Text>
                <Text style={styles.registrationDate}>
                  {state.data.event?.registration_close_date}
                </Text>
              </View>
            </View>

            <View>
              <Text size={18} color={Colors.textPrimary} family={"bold"}>Email </Text>
              <Text style={styles.emailmobileText}>{state.data?.organizer?.email}</Text>
            </View>
            <View>
              <Text size={18} color={Colors.textPrimary} family={"bold"}>Mobile No </Text>
              <Text style={styles.emailmobileText}>
                {state.data?.organizer?.mobile_no}
              </Text>
            </View>
            <View style={styles.line} />
            <View >
              <Text style={styles.eventHighlights}>
                Click on show interest to stay updated about this event
              </Text>
              <View style={styles.sendInvitationContainer}>
                <PrimaryButton
                  backgroundColor={btnBlue}
                  text="Send Invitation"
                  family="regular"
                  size={16}
                  width={Width(50)}
                />
              </View>
            </View>

            <View style={styles.eventline} />
            {state.data.more_events_by?.length > 0 && (
              <View style={styles.eventsHeadingContainer}>
                <Text color={Colors.textPrimary} size={18} family="bold">
                  More Events By
                </Text>
                <View style={styles.eventsContainer}>
                  <ScrollView
                    style={styles.scrollviewContainer}
                    ref={scrollViewRef}
                    horizontal={true}
                    contentContainerStyle={{ gap: 5 }}
                    scrollEventThrottle={10}
                    showsHorizontalScrollIndicator={false}
                  >
                    {state.data.more_events_by?.map((item, index) => (
                      <TouchableHighlight
                        onPress={() => get_EventDetails(item.id)}
                        key={index}
                        style={styles.eventsCardContainer}
                      >
                        <Image
                          src={item?.poster_image}
                          height={"100%"}
                          width={"100%"}
                          resize="cover"
                          onPress={() => get_EventDetails(item.id)}
                        />
                      </TouchableHighlight>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}

            <View style={styles.relevantline} />

            <View style={styles.eventsHeadingContainer}>
              <Text color={Colors.textPrimary} size={18} family="bold">
                Related Events
              </Text>
              <View  style={styles.eventsContainer}>
                <ScrollView
                  style={styles.scrollviewContainer}
                  ref={scrollViewRef}
                  horizontal={true}
                  contentContainerStyle={{ gap: 5 }}
                  scrollEventThrottle={10}
                  showsHorizontalScrollIndicator={false}
                >
                  {state.data.related_events?.map((item, index) => (
                    <TouchableHighlight
                      onPress={() => get_EventDetails(item.id)}
                      key={index}
                      style={styles.eventsCardContainer}
                    >
                      <Image
                        src={item?.poster_image}
                        height={"100%"}
                        width={"100%"}
                        resize="cover"
                        onPress={() => get_EventDetails(item.id)}
                      />
                    </TouchableHighlight>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.lastline} />
          </ScrollView>
          
        </View>
        {navigation.isFocused() && (
          <BottomTabNavigation />
        )}
      </Containers>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "100%",
    width: "95%",
    
  },
  img_container: {
    height: Height(30),
    borderRadius: 20,
    overflow: "hidden",
  },
  arrowContainer:{
    position: "absolute",
    left: 10 
  },
  line: {
    borderBottomColor: Colors.textGray,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    marginTop: 10,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
    color:Colors.textPrimary
  },
addCalendarContainer:{
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  width: "100%",
},
eventBookingContainer: {
  flexDirection: "row",
},
firstContainer: { width: "50%" },
eventType: {
  fontSize: 16,
  marginBottom: 8,
},
secondContainer: { width: "50%" },
skills: {
  flexDirection: "row",
  fontSize: 16,
},
eventDetails: {
  fontSize: 16,
  lineHeight: 24,
  textAlign: "justify",
},
eventHighlights: {
  fontSize: 16,
  lineHeight: 24,
  textAlign: "justify",
},
eventOrganizerContainer: {
  flexDirection: "row",
},
eventOrganizer: {
  fontSize: 16,
  marginBottom: 8,
},
eventDate: {
  marginLeft: 40,
},
registrationDate: {
  fontSize: 16,
  marginBottom: 16,
},

emailmobileText: {
  fontSize: 16,
  marginBottom: 8,
},
sendInvitationContainer:{
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},
eventline: {
  borderBottomColor: Colors.textGray,
  borderBottomWidth: 0.5,
},
eventsHeadingContainer:{
  paddingTop: 5
},
eventsContainer:{
  height: Height(20), 
  padding: 5 
},
scrollviewContainer:{
  height: "100%", 
  width: "100%"
},

eventsCardContainer:{
  height: Height(18),
  width: Width(45),
  borderRadius: 15,
  borderColor: Colors.disableGrey,
  overflow: "hidden",
},
relevantline: {
  borderBottomColor: Colors.textGray,
  borderBottomWidth: 0.5,
},

lastline: {
  borderBottomColor: "grey",
  borderBottomWidth: 1,
},  
});
export default EventDetails;