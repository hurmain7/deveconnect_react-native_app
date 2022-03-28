import React from "react";
import styled from 'styled-components/native';
import { Text } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const StyledText = styled.Text`
   color: ${props => props.color};
   font-size: ${props => props.size}px;
   font-weight: ${props => props.weight};
   textDecorationLine: ${props => props.underline};
   text-align: ${props => props.textAlign};
   font-family: ${props => props.heading };
   `;