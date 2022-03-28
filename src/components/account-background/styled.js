import styled from "styled-components/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View } from "react-native";

export const StyledAccountBackground = styled.ImageBackground.attrs({
    source: require('../../../../../assets/home_bg.jpg'),
})`
    flex:1;
    align-items: center;
    justify-content: center;
`;
