import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const ProfileCardContainer = styled.View`
height: ${hp(28)}px;
width: ${wp(95)}px;
padding: 15px; 
border-radius: 20px;
color: #17a2b8;
background-color: white; 
elevation: 3;
margin-top: 10px;
margin-left: 10px;
shadow-opacity: 10;
`;

export const NameImageContainer = styled.View`
flex-direction: row;
`;

export const AdjustingNameImage = styled.View`
flex-direction: row;
align-items: center;
`;

// export const StatusContainer = styled.View`
// padding-right: 10px; 
// position: absolute; 
// right: -5px; 
// top: 10px;   
// `;
export const StatusLocationContainer = styled.View`
flex: 1;
flex-direction: column;
align-items: flex-end; 
padding-top:10px;
`;
export const ButtonContainer = styled.View`
flex-direction: row;
margin-bottom: 5px;
margin-top: 10px;
`;

export const AdjustingButton = styled.View`
position: absolute; 
right: 5px; 
bottom: -3px;
`;

export const SkillContainer = styled.View`
position: absolute; 
right: 5px; 
top: 0px;
`;

export const Skill1 = styled.View`
flex: 1;    
justify-content: flex-end;
`;