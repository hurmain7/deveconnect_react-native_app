import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const StyledButton = styled(Button)`
width: ${props => wp(props.width)}px;
height: ${props => hp(props.height)}px;
`;