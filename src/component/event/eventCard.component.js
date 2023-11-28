import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors, Image, Text } from "../../utils/imports.utils";
import { Height, Width } from "../../utils/function.utils";

const EventCard = (props) => {
  const { data,index } = props;
  const navigation = useNavigation();

  const navigateToEventDetails = () => {
    navigation.navigate('EventDetails', { eventId: data.id});
  };

  return (
    <TouchableOpacity onPress={navigateToEventDetails} style={[styles.eventCard,{
      marginRight: index % 2 !== 0 ? 4 : 5,
    }]}>
      <View style={styles.eventImage}>
        <Image
          src={data?.poster_image}
          height={"100%"}
          width={"100%"}
          resize="cover"
        />
      </View>
      <View style={styles.eventName}>
        <Text color={Colors.textColor} size={20}>
          {data?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#fff",
    height: "auto",
    borderRadius: 15,
    minHeight: Height(25),
    width: "49%",
    overflow: "hidden",
    
  },
  eventImage:{
    height: 150, 
    width: 200
  },
  eventName:{
    padding: 5 
  }
});

export default EventCard;
