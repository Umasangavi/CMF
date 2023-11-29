import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/imports.utils';

export default function CustomBottomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:Colors.lightGrey,
        paddingVertical: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ alignItems: 'center' }}
          >
            <Ionicons
              name={options.tabBarIconName || 'ios-information-circle'}
              size={18}
              color={isFocused ? '#FF4E98' : '#292929'}
            />
            <Text size={10} style={{ color: isFocused ? '#FF4E98' : '#292929'}} >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
