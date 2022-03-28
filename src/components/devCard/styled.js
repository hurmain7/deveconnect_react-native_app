import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const StyledDevCard = styled(View)`
background-color: white;
padding: 32px;
margin-top: 8px;
width: ${wp(400)}px;
height: ${wp(100)}px;
display: flex;
`;