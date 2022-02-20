import React from 'react';
import {CheckBox} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../constants/colors';
import GlobalStyles from '../constants/GlobalStyles';

function RadioButton(props: any) {
  return (
    <CheckBox
      checkedIcon={
        <MaterialCommunityIcons
          name="radiobox-marked"
          size={24}
          color={colors.secondary}
        />
      }
      uncheckedIcon={
        <MaterialCommunityIcons
          name="radiobox-blank"
          size={24}
          color={colors.secondary}
        />
      }
      checked={props.checked}
      checkedColor={colors.primary}
      title={props.title}
      textStyle={GlobalStyles.defaultText}
      onPress={props.onPress}
      containerStyle={{backgroundColor: 'white', borderColor: 'white'}}
    />
  );
}

export default RadioButton;
