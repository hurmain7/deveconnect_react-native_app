import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const StyledCard = styled.View`
border: rgba(0,0,0,.125)
width: ${props => wp(props.width)}px;
height: ${props => hp(props.height)}px;
border-radius: ${props => props.radius}px;
background-color: #f8f9fa; 
elevation: 2;
align-items: center;
align-self: auto
`;