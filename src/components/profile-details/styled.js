import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const ProfileDetailsCard = styled.View`
height: ${hp(36)}px;
width: ${wp(90)}px;
margin: 10px;
margin-left: 20px; 
border-radius: 20px;
background-color: #17a2b8; 
elevation: 2;
border: rgba(0,0,0,.125)
align-items: center;
`;

export const ProfileDetailsWrapper = styled.View`
align-items: center; 
padding-top: 20px;
`;

export const SocialIconsContainer = styled.View`
flex-direction: row; 
padding-top: 30px;
`;

export const Card = styled.View`
border: rgba(0,0,0,.125)
height: ${hp(14)}px;
width: ${wp(95)}px;
margin: 10px; 
marginTop: 0px;
border-radius: 20px;
background-color: #f8f9fa; 
elevation: 2;
`;

export const BioWrapper = styled.View`
flex-direction: row; 
padding: 5px;
align-self: center;
`;

export const SkillWrapper = styled.View`
    margin: 5px;
`;
