import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Platform } from 'react-native';
import Colors from '../../constants/Colors';

const CustomHeader = (props) => {
  return (
    <TouchableOpacity {...props}>
      <Ionicons
        name={props.iconName}
        size={24}
        color={Platform.OS === 'android' ? 'white' : Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default CustomHeader