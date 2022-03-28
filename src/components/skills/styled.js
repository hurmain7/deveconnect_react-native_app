import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const StyledSkill = styled.View `
background-color: #17a2b8;
border-radius: 5px;
padding: 10px;
margin-top: 8px;
width: ${wp(34)}px;
height: ${wp(11)}px;
elevation: 2;
`;