import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "../../screen/home/Home.screen";
import MyEvents from "../../screen/myEvents/MyEvents.screen";
import ChatBox from "../../screen/chatbox/chatbox.screen";
import MyProfile from "../../screen/myProfile/myProfile.screen";
import MyNetwork from "../../screen/myNetwork/MyNetwork.screen";
import EventDetails from "../../screen/eventDetails/eventDetails.screen";
import CustomBottomTabBar from "./customBottomTabBar";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (   
    <BottomTab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          headerShown: false,
          tabBarIconName: 'home-outline',
        })}
      />
      <BottomTab.Screen
        name="My Events"
        component={MyEvents}
        options={{
          headerShown: false,
          tabBarIconName: 'mail-outline',
        }}
      />
      <BottomTab.Screen
        name="Chatbox"
        component={ChatBox}
        options={{
          headerShown: false,
          tabBarIconName: 'chatbox-outline',
        }}
      />
      <BottomTab.Screen
        name="My Network"
        component={MyNetwork}
        options={{
          headerShown: false,
          tabBarIconName: 'people-outline',
        }}
      />
      <BottomTab.Screen
        name="My Profile"
        component={MyProfile}
        options={{
          headerShown: false,
          tabBarIconName: 'person-outline',
        }}
      />
    </BottomTab.Navigator>
  );
  }