import { LogBox, StatusBar } from "react-native";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReadMore from "@expo/react-native-read-more-text";
import Container, { Toast } from "toastify-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./src/screen/login/login.screen";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { useFonts } from "expo-font";
import SignUp from "./src/screen/signUp/signUp.screen";
import Forget_password from "./src/screen/forget_password/forget_password.screen";
import Select_location from "./src/screen/select_location/select_location.screen";
import Role from "./src/screen/role/role.screen";
import Test from "./src/screen/test/test.screen";
import Create_password from "./src/screen/create_password/create_password.screen";
import Splash from "./src/screen/splash/splash.screen";
import Intro from "./src/screen/intro/intro.screen";
import New_event from "./src/screen/new_event/new_event.screen";
import BottomTabNavigation from "./src/common_component/navigation/BottomNavigation";
import Home from "./src/screen/home/Home.screen";
import MyEvents from "./src/screen/myEvents/MyEvents.screen";
import ChatBox from "./src/screen/chatbox/chatbox.screen";
import MyProfile from "./src/screen/myProfile/myProfile.screen";
import MyNetwork from "./src/screen/myNetwork/MyNetwork.screen";

import { DrawerNavigation } from "./src/utils/imports.utils";

import EventDetails from "./src/screen/eventDetails/eventDetails.screen";
import EventInvite from "./src/screen/eventInvite/eventInvite.screen";
import EditProfile from "./src/screen/editProfile/editProfile";
import Sample from "./src/screen/sample/sample.screen";
import Message from "./src/screen/message/message.screen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
LogBox.ignoreAllLogs(true);

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./src/assets/fonts/Roboto-Regular.ttf"),
    bold: require("./src/assets/fonts/Roboto-Bold.ttf"),
    italic: require("./src/assets/fonts/Roboto-Italic.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Return null or a loading indicator while fonts are loading.
  }
  return (
    <Provider store={store}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor="transparent"
        translucent={true}
      ></StatusBar>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="splash" component={Splash} /> */}
          {/* <Stack.Screen name="intro" component={Intro} />
          <Stack.Screen name="signIn" component={Login} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="forget_password" component={Forget_password} />
          <Stack.Screen name="create_password" component={Create_password} />
          <Stack.Screen name="select_location" component={Select_location} />  */}
          <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
          <Stack.Screen name="eventInvite" component={EventInvite} />
          <Stack.Screen name="MyEvents" component={MyEvents} />
          <Stack.Screen name="newEvent" component={New_event} />
          <Stack.Screen name="ChatBox" component={ChatBox} />
          <Stack.Screen name="message" component={Message} />

          <Stack.Screen name="myProfile" component={MyProfile} />

          <Stack.Screen name="editProfile" component={EditProfile} />
          <Stack.Screen name="MyNetwork" component={MyNetwork} />  

          <Stack.Screen name="new_event" component={New_event} />

          {/* <Stack.Screen name="test" component={Test} />
          <Stack.Screen name="sample" component={Sample} /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
