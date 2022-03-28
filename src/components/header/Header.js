import React from "react";
import { StyledHeader, StyledText } from "./styled";
import {Text} from '../text/Text';
import { TextButton } from '../text-button/TextButton';
import { theme } from "../../constants/navigation-routes";
import  Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from "react-native-animatable";
import { Spacer } from "../spacer";
import { TouchableOpacity} from "react-native";

export const Header = ({ 
    children,
    iconColor=theme.color.primary,
    headerText='',
    headerTextColor= theme.color.white,
    style, 
    backPress=true,
    headerTextShown=true,
    headerBackgroundColor=theme.color.primary
    
}) => {
    
    const {
        fontWeight='bold',
        size=theme.size.xxsmall, 
        color='black', 
        underline='none',
        textAlign= 'center',
        heading= 'Oswald'
      } = style || {};

    return(
        <StyledHeader
            backgroundColor={headerBackgroundColor}
         >{children}
    <View style={{flex: 0.5}}>

        {backPress &&

        <TouchableOpacity onPress={backPress}>
        <Ionicons
        name="chevron-back-outline" 
        size={30} 
        color={ iconColor} 
        />
        </TouchableOpacity>   
    }
        </View>

    <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {headerTextShown &&
        <StyledText
            heading={heading}
            size={size}
            color={headerTextColor} 
            underline={underline}
            textAlign= {textAlign}
            fontWeight={fontWeight}
       >
            {headerText}
        </StyledText>
    }
        </View>
        </StyledHeader>
        
    
    )
}
