import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "../../screen/home/Home.screen";
import MyEvents from "../../screen/myEvents/MyEvents.screen";
import ChatBox from "../../screen/chatbox/chatbox.screen";
import MyProfile from "../../screen/myProfile/myProfile.screen";
import MyNetwork from "../../screen/myNetwork/MyNetwork.screen";
import EventDetails from "../../screen/eventDetails/eventDetails.screen";
// import CustomBottomTabBar from "./customBottomTabBar";

// const BottomTab = createBottomTabNavigator();
// export default function BottomTabNavigation() {
//   return (
    
//     <BottomTab.Navigator
//       tabBar={(props) => <CustomBottomTabBar {...props} />}
//     >
//       <BottomTab.Screen
//         name="Home"
//         component={Home}
//         options={({ route }) => ({
//           headerShown: false,
//           tabBarIconName: 'home-outline',
//         })}
//       />
//       <BottomTab.Screen
//         name="My Events"
//         component={MyEvents}
//         options={{
//           headerShown: false,
//           tabBarIconName: 'mail-outline',
//         }}
//       />
//       <BottomTab.Screen
//         name="Chatbox"
//         component={ChatBox}
//         options={{
//           headerShown: false,
//           tabBarIconName: 'chatbox-outline',
//         }}
//       />
//       <BottomTab.Screen
//         name="My Network"
//         component={MyNetwork}
//         options={{
//           headerShown: false,
//           tabBarIconName: 'people-outline',
//         }}
//       />
//       <BottomTab.Screen
//         name="My Profile"
//         component={MyProfile}
//         options={{
//           headerShown: false,
//           tabBarIconName: 'person-outline',
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Svg, { G, Path, ClipPath, Defs, Rect, Circle } from 'react-native-svg';
// import {Avatar, Box, Image, Stack, Text, useTheme} from 'native-base'
// import EHR from '../../../assets/images/dashboard/ehr.svg'

//Component
import { useNavigation } from '@react-navigation/native'

const BottomTabNavigation = () => {
   const Tab = createBottomTabNavigator()
   const navigation = useNavigation()
  //  const theme = useTheme()
  
   const styles = StyleSheet.create({
    mainlogo:{
     width:90,
     height:62,
    //  resizeMode:'contain'
    marginTop:-113
    }
  })


  return (
   <Tab.Navigator screenOptions={{
     headerShown:false,
     tabBarActiveTintColor:"black",
     tabBarInactiveTintColor:"gray",
     tabBarStyle:{
      backgroundColor:"white",
      height:70,
      paddingBottom:15,
      paddingTop:6,
      borderTopRightRadius:16,
      borderTopLeftRadius:16,
     },
     tabBarLabelStyle:{
      fontSize:12,
      fontFamily:'regular',
     },    
    
   }} initialRouteName='home'>

     <Tab.Screen name='home' 
      component={Home}
      options={{
        tabBarLabel:'Home',
        tabBarIcon: ({focused}) => (
          <Svg width="25" height="25" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
           <Path
            d="M10.9532 24.6813V16.9759H17.0401V24.6813C17.0401 25.5288 17.7248 26.2223 18.5618 26.2223H23.127C23.9639 26.2223 24.6487 25.5288 24.6487 24.6813V13.8937H27.2356C27.9356 13.8937 28.2704 13.0153 27.7378 12.553L15.0162 0.948639C14.4379 0.424672 13.5553 0.424672 12.9771 0.948639L0.255425 12.553C-0.261962 13.0153 0.0576003 13.8937 0.757595 13.8937H3.34453V24.6813C3.34453 25.5288 4.02931 26.2223 4.86626 26.2223H9.43144C10.2684 26.2223 10.9532 25.5288 10.9532 24.6813Z"
            fill={focused ? '#FF4E98' : '#A6A3B8'}/>
          </Svg>
          ),
       }}/>

     <Tab.Screen name='MyEvents'
       component={MyEvents}
       options={{
       tabBarLabel: 'MyEvents',
       tabBarIcon: ({ color,focused}) => (
        <Svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clip-path="url(#clip0_389_105)">
        <Path d="M18.0192 19.9138C18.2673 20.162 18.5718 20.286 18.9327 20.286C19.2936 20.286 19.6093 20.1507 19.88 19.88C20.1281 19.6319 20.2522 19.3161 20.2522 18.9327C20.2522 18.5492 20.1281 18.2335 19.88 17.9853L15.82 13.9253V9.01952C15.82 8.63607 15.6901 8.32029 15.4302 8.07218C15.1704 7.82407 14.8492 7.70002 14.4667 7.70002C14.0832 7.70002 13.7616 7.82994 13.5017 8.08978C13.2419 8.34962 13.1124 8.67081 13.1133 9.05335V14.4328C13.1133 14.6133 13.1472 14.7883 13.2148 14.9579C13.2825 15.1276 13.384 15.2796 13.5193 15.414L18.0192 19.9138ZM14.4667 28C12.5946 28 10.8352 27.6445 9.18867 26.9336C7.54211 26.2226 6.10983 25.2586 4.89183 24.0415C3.67383 22.8235 2.70981 21.3912 1.99976 19.7447C1.28971 18.0981 0.934237 16.3388 0.933334 14.4667C0.933334 12.5946 1.28881 10.8352 1.99976 9.18868C2.71071 7.54213 3.67474 6.10985 4.89183 4.89185C6.10983 3.67385 7.54211 2.70983 9.18867 1.99978C10.8352 1.28973 12.5946 0.934252 14.4667 0.93335C16.3388 0.93335 18.0981 1.28883 19.7447 1.99978C21.3912 2.71073 22.8235 3.67475 24.0415 4.89185C25.2595 6.10985 26.224 7.54213 26.9349 9.18868C27.6459 10.8352 28.0009 12.5946 28 14.4667C28 16.3388 27.6445 18.0981 26.9336 19.7447C26.2226 21.3912 25.2586 22.8235 24.0415 24.0415C22.8235 25.2595 21.3912 26.224 19.7447 26.9349C18.0981 27.6459 16.3388 28.0009 14.4667 28Z"  fill={focused ? '#FF4E98' : '#A6A3B8'}/>
        </G>
        <Defs>
        <ClipPath id="clip0_389_105">
        <Rect width="28" height="28" fill="white"/>
        </ClipPath>
        </Defs>
        </Svg>
        
    )
      }}/>

      
     {/* <Tab.Screen name='ehr'
       component={Ehr}
       options={{
       tabBarLabel: '',
       tabBarIcon: ({ color,focused}) => (
        <Stack mt={-7}>
         <TouchableOpacity onPressIn={()=>navigation.navigate('ehr')}>
          <EHR/>
         </TouchableOpacity> 
        </Stack>       
       
       )
      }}/> */}


     <Tab.Screen 
      name='Chatbox' 
      component={ChatBox}
      options={{
        tabBarLabel: 'Chatbox',
        tabBarIcon: ({ color,focused }) => (
         <Svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M20.9676 26.8227L22.4583 25.3591L16.6898 19.6955L15.1991 21.1591C14.3997 21.9439 14 22.8879 14 23.9909C14 25.0939 14.3997 26.0379 15.1991 26.8227C15.9985 27.6076 16.9599 28 18.0833 28C19.2068 28 20.1682 27.6076 20.9676 26.8227ZM24.2731 23.5773L25.7639 22.1136C26.5633 21.3288 26.963 20.3848 26.963 19.2818C26.963 18.1788 26.5633 17.2348 25.7639 16.45C24.9645 15.6652 24.0031 15.2727 22.8796 15.2727C21.7562 15.2727 20.7948 15.6652 19.9954 16.45L18.5046 17.9136L24.2731 23.5773ZM6.22222 10.1818H19.1852V7.63636H6.22222V10.1818ZM12.7037 4.13636C12.9846 4.13636 13.2166 4.046 13.3998 3.86527C13.583 3.68455 13.6751 3.45673 13.6759 3.18182C13.6759 2.90606 13.5839 2.67824 13.3998 2.49836C13.2157 2.31848 12.9837 2.22812 12.7037 2.22727C12.4228 2.22727 12.1908 2.31764 12.0076 2.49836C11.8244 2.67909 11.7323 2.90691 11.7315 3.18182C11.7315 3.45758 11.8235 3.68539 12.0076 3.86527C12.1917 4.04515 12.4237 4.13552 12.7037 4.13636ZM11.5694 25.4545H3.62963C2.91667 25.4545 2.30611 25.2051 1.79796 24.7062C1.28982 24.2073 1.03617 23.6082 1.03704 22.9091V5.09091C1.03704 4.39091 1.29111 3.79145 1.79926 3.29255C2.30741 2.79364 2.91753 2.54461 3.62963 2.54545H9.07408C9.35494 1.78182 9.82506 1.16667 10.4844 0.7C11.1438 0.233333 11.8836 0 12.7037 0C13.5247 0 14.2649 0.233333 14.9243 0.7C15.5836 1.16667 16.0533 1.78182 16.3333 2.54545H21.7778C22.4907 2.54545 23.1013 2.79491 23.6094 3.29382C24.1176 3.79273 24.3712 4.39176 24.3704 5.09091V12.8864C23.463 12.6742 22.5612 12.6581 21.665 12.838C20.7688 13.0179 19.9422 13.3526 19.1852 13.8422V12.7273H6.22222V15.2727H17.5324L14.9398 17.8182H6.22222V20.3636H12.5417C12.0448 21.1061 11.7043 21.9176 11.5202 22.7984C11.3361 23.6791 11.353 24.5645 11.5707 25.4545H11.5694Z" fill={focused ? '#FF4E98' : '#A6A3B8'}/>
         </Svg> 
         )
       }}
      />

     <Tab.Screen 
      name='MyNetwork' 
      component={MyNetwork}
      options={{
        tabBarLabel: 'MyNetwork',
        tabBarIcon: ({ color, focused }) => (
          <Svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <G clip-path="url(#clip0_389_96)">
          <Path d="M5.34556 4.22297C10.7988 0.404279 18.5926 0.716404 23.6346 4.96323C28.7647 9.28187 29.4656 16.3406 25.2463 21.3939C21.2703 26.1545 14.1033 27.7234 8.13515 25.2679L7.81059 25.1284L1.68999 26.4142L1.58506 26.4321L1.43117 26.4446L1.27309 26.439L1.21153 26.4321L1.05764 26.4045L0.910746 26.3575L0.770846 26.2968L0.664522 26.2388L0.513431 26.1324L0.400113 26.0302L0.297986 25.9156L0.223839 25.812L0.132905 25.6532L0.0741467 25.5068L0.030778 25.3507L0.012591 25.2472L0 25.0952L0.00559591 24.9392L0.012591 24.8784L0.0405709 24.7265L0.0713489 24.6271L1.68019 19.8609L1.64941 19.8112C-1.44236 14.6363 -0.0419695 8.2212 5.02239 4.45637L5.34416 4.22435L5.34556 4.22297Z" fill={focused? '#FF4E98' : '#A6A3B8'}/>
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.00755 8.40991C6.23537 8.40991 5.60939 9.03589 5.60939 9.80807C5.60939 10.5803 6.23537 11.2062 7.00755 11.2062H20.9891C21.7613 11.2062 22.3873 10.5803 22.3873 9.80807C22.3873 9.03589 21.7613 8.40991 20.9891 8.40991H7.00755ZM7.00755 14.0025C6.23537 14.0025 5.60939 14.6285 5.60939 15.4007C5.60939 16.1729 6.23537 16.7989 7.00755 16.7989H15.3965C16.1687 16.7989 16.7947 16.1729 16.7947 15.4007C16.7947 14.6285 16.1687 14.0025 15.3965 14.0025H7.00755Z" fill="white"/>
          </G>
          <Defs>
          <ClipPath id="clip0_389_96">
          <Rect width="28" height="28" fill="white"/>
          </ClipPath>
          </Defs>
          </Svg>
         )
       }}
      />

<Tab.Screen 
      name='MyProfile' 
      component={MyProfile}
      options={{
        tabBarLabel: 'MyProfile',
        tabBarIcon: ({ color, focused }) => (
          <Svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <G clip-path="url(#clip0_389_96)">
          <Path d="M5.34556 4.22297C10.7988 0.404279 18.5926 0.716404 23.6346 4.96323C28.7647 9.28187 29.4656 16.3406 25.2463 21.3939C21.2703 26.1545 14.1033 27.7234 8.13515 25.2679L7.81059 25.1284L1.68999 26.4142L1.58506 26.4321L1.43117 26.4446L1.27309 26.439L1.21153 26.4321L1.05764 26.4045L0.910746 26.3575L0.770846 26.2968L0.664522 26.2388L0.513431 26.1324L0.400113 26.0302L0.297986 25.9156L0.223839 25.812L0.132905 25.6532L0.0741467 25.5068L0.030778 25.3507L0.012591 25.2472L0 25.0952L0.00559591 24.9392L0.012591 24.8784L0.0405709 24.7265L0.0713489 24.6271L1.68019 19.8609L1.64941 19.8112C-1.44236 14.6363 -0.0419695 8.2212 5.02239 4.45637L5.34416 4.22435L5.34556 4.22297Z" fill={focused? '#FF4E98' : '#A6A3B8'}/>
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M7.00755 8.40991C6.23537 8.40991 5.60939 9.03589 5.60939 9.80807C5.60939 10.5803 6.23537 11.2062 7.00755 11.2062H20.9891C21.7613 11.2062 22.3873 10.5803 22.3873 9.80807C22.3873 9.03589 21.7613 8.40991 20.9891 8.40991H7.00755ZM7.00755 14.0025C6.23537 14.0025 5.60939 14.6285 5.60939 15.4007C5.60939 16.1729 6.23537 16.7989 7.00755 16.7989H15.3965C16.1687 16.7989 16.7947 16.1729 16.7947 15.4007C16.7947 14.6285 16.1687 14.0025 15.3965 14.0025H7.00755Z" fill="white"/>
          </G>
          <Defs>
          <ClipPath id="clip0_389_96">
          <Rect width="28" height="28" fill="white"/>
          </ClipPath>
          </Defs>
          </Svg>
         )
       }}
      />
   </Tab.Navigator>
  )
}

export default BottomTabNavigation