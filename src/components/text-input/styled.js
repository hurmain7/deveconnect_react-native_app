import React from 'react';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const StyledTextInput = styled(TextInput)`
    width: ${props => wp(props.width)}px;
    height: ${props => hp(props.height)}px;
`;