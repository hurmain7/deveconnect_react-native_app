import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const RepoContainer = styled.View`
flex: 1;    
flex-direction: row;
`;


export const RepoCard = styled.View`
border: rgba(0,0,0,.125)
height: ${hp(19)}px;
margin: 10px; 
margin-top: 5px;
border-radius: 10px;
background-color: #f8f9fa; 
elevation: 2;
`;

export const RepoTextWrapper = styled.View`
flex: 0.6;
padding-top: 7px;
padding-left: 3px;
`;

export const RepoDetailsContainer = styled.View`
position: absolute; 
left: 235px; 
top: 30px;
`;

export const RepoDetailsCard = styled.View`
border: rgba(0,0,0,.125);
height: ${hp(3.2)}px;
width: ${wp(26)}px;
margin: 5px;
margin-left: 15px; 
margin-top: 4px;
border-radius: 10px;
background-color: ${props => props.color};
elevation: 2;
`;

export const RepoDetailsText = styled.View`
    padding-left: 3px;
    padding-top: 2px;
`;

export const TextWrapper = styled.View`
padding: 10px;
`;





