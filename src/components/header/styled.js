import styled from "styled-components/native";
import { Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const StyledHeader = styled.View`
 
padding-left: 10px; 
flex-direction: row; 
align-items: center;
elevation: 4;
background-color: ${props => props.backgroundColor}; 
height: 50px;
border-color: '#f8f9fa';
 `;


export const StyledText = styled.Text`
   color: ${props => props.color};
   font-size: ${props => props.size}px;
   textDecorationLine: ${props => props.underline};
   text-align: ${props => props.textAlign};
   font-family: ${props => props.heading};
   `;