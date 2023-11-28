import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {
  Assets,
  Colors,
  NavButton,
  Image,
  Text,
  PrimaryButton,
} from "../../utils/imports.utils";
import { Height, Width } from "../../utils/function.utils";
import { btnLightBlue } from "../../utils/constant.utils";

const UpComingEvent = (props) => {
  const { data, editOnPress, editIcon } = props;
  console.log("data: ", data);
  const navigation = useNavigation();

  // const editEvent = () => {
  //   navigation.navigate('EditEvent');
  // };

  const formatDate = (date) => {
    return moment(date).format("MMM DD, YY h:mm a");
  };

  const navigateToEventDetails = () => {
    navigation.navigate("EventDetails", { eventId: data.id });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigateToEventDetails()}
      style={styles.container}
    >
      <View style={styles.profileContainer}>
        <Image
          src={data?.poster_image}
          height={"100%"}
          width={"100%"}
          resize="cover"
        />
      </View>
      {editIcon && (
        <View
          style={styles.editIconContainer}
        >
          <NavButton
            icon={Assets.edit}
            height={40}
            width={40}
            radius={30}
            onPress={() => editOnPress()}
          />
        </View>
      )}
      <View style={styles.eventName}>
        <Text size={20} family={"bold"} color={Colors.Dark}>
          {data?.name}
        </Text>
        <View style={ styles.iconContainer}>
          <View
            style={styles.noteContainer}
          >
            <Image src={Assets.note} height={20} width={20} />
          </View>
          <View style={styles.dateContainer}>
            <Text size={16} family={"regular"} color={Colors.lightGray}>
              {`${formatDate(data?.from_date)} - ${formatDate(data?.to_date)}`}
            </Text>
          </View>
        </View>
        <View style={ styles.iconContainer}>
          <View
             style={styles.noteContainer}
          >
            <Image src={Assets.map} height={28} width={28} />
          </View>
          <View style={styles.locationContainer}>
            <Text size={18} family={"regular"} color={Colors.lightGray}>
              {data?.venue}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <PrimaryButton
            text={"Invitation"}
            height={50}
            width={Width(35)}
            size={18}
            family={"bold"}
            backgroundColor={btnLightBlue}
          />
          <View style={styles.upperButtons}>
            <NavButton
              text={22}
              height={32}
              width={50}
              radius={20}
              onPress={() => navigation.goBack()}
              background={Colors.textPrimary}
              color={Colors.light}
              family="bold"
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <PrimaryButton
            text={"Interest"}
            height={50}
            width={Width(35)}
            size={18}
            family={"bold"}
          />
          <View style={styles.upperButtons}>
            <NavButton
              text={22}
              height={32}
              width={50}
              radius={20}
              onPress={() => navigation.goBack()}
              background={Colors.btnBlue}
              color={Colors.light}
              family="bold"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
    // 
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    borderRadius: 20,
    backgroundColor: Colors.light,
    width: "100%",
    padding: 5,
  },
  profileContainer:{
    height: Height(28), 
    borderRadius: 20, 
    overflow: "hidden",
  },
editIconContainer:{
  position: "absolute",
  alignContent: "flex-end",
  alignItems: "flex-end",
  right: 0,
  top: 10,
  paddingRight: 20,
},
eventName:{
  // alignItems: "center", 
  paddingTop: 5,
  padding:10,
  gap: 10 
},
iconContainer:{
  flexDirection: "row", 
  gap: 10, 
  alignItems: "center",
  
},
noteContainer:{
  width: "10%",
  padding:10,
  // alignItems: "flex-end",
  // justifyContent: "flex-end",
},
dateContainer:{
  width: "90%"
},
locationContainer:{
  width: "71%" ,

},
buttonContainer:{
  flexDirection: "row",
  width: "100%",
},
buttons:{
  width: "50%",
  alignItems: "center",
  justifyContent: "center",
},
upperButtons:{
  position: "absolute", 
  right: 10, 
  top: -20
},
});
export default UpComingEvent;


{/* <ScrollView style={styles.container}>
    //   <View key={data.id} style={styles.card}>
    //     <ImageBackground
    //       source={{ uri: data.poster_image }}
    //       style={styles.image}
    //     >
    //       <View style={styles.editIconContainer}>
    //         <TouchableOpacity onPress={() => editEvent()}>
    //           <Icon name="edit" style={styles.editIcon} />
    //         </TouchableOpacity>
    //       </View>
    //     </ImageBackground>
    //     <Text style={styles.nameText}>{data.name}</Text>
    //     <View style={styles.locationRow}>
    //       <MaterialCommunityIcons
    //         name="map-marker"
    //         size={20}
    //         color="blue"
    //         style={styles.icon}
    //       />
    //       <Text style={styles.locationText}>{data.venue}</Text>
    //     </View>
    //     <View style={styles.dateRow}>
    //       <MaterialCommunityIcons
    //         name="calendar"
    //         size={20}
    //         color="blue"
    //         style={styles.icon}
    //       />
    //       <Text style={styles.dateText}>
    //         {formatDate(data.from_date)} - {formatDate(data.to_date)}
    //       </Text>
    //     </View>

    //     <View style={styles.buttonRow}>
    //       <LinearGradient
    //         start={{ x: 0, y: 0.5 }}
    //         end={{ x: 1, y: 0.5 }}
    //         locations={[0.5, 0.9]}
    //         colors={["#6C4DDA", "#522ED2"]}
    //         style={{
    //           fontWeight: "bold",
    //           borderWidth: 1,
    //           borderRadius: 20,
    //           borderColor: "transparent",
    //         }}
    //       >
    //         <TouchableOpacity style={styles.button} onPress={() => {}}>
    //           <View style={styles.countCircle}>
    //             <LinearGradient
    //               colors={["#FF9FC7", "#F32878"]}
    //               style={{
    //                 fontWeight: "bold",
    //                 borderWidth: 1,
    //                 borderRadius: 10,
    //                 borderColor: "transparent",
    //                 width: 30,
    //                 height: 25,
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //               }}
    //             >
    //               <Text style={styles.countText}>0</Text>
    //             </LinearGradient>
    //           </View>
    //           <Text style={styles.buttonText}>Invitation</Text>
    //         </TouchableOpacity>
    //       </LinearGradient>

    //       <LinearGradient
    //         start={{ x: 0, y: 0.5 }}
    //         end={{ x: 1, y: 0.5 }}
    //         colors={["#FF9FC7", "#F32878"]}
    //         style={{
    //           fontWeight: "bold",
    //           borderWidth: 1,
    //           borderRadius: 20,
    //           borderColor: "transparent",
    //         }}
    //       >
    //         <TouchableOpacity style={styles.button} onPress={() => {}}>
    //           <View style={styles.countCircle}>
    //             <LinearGradient
    //               colors={["#6C4DDA", "#522ED2"]}
    //               style={{
    //                 fontWeight: "bold",
    //                 borderWidth: 1,
    //                 borderRadius: 10,
    //                 borderColor: "transparent",
    //                 width: 30,
    //                 height: 25,
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //               }}
    //             >
    //               <Text style={styles.countText}>0</Text>
    //             </LinearGradient>
    //           </View>
    //           <Text style={styles.buttonText}>Interest</Text>
    //         </TouchableOpacity>
    //       </LinearGradient>
    //     </View>
    //   </View>
    // </ScrollView> */}