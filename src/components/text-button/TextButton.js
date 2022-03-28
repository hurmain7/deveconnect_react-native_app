import React from "react";
import { StyledText, StyledTextButton } from "./styled";
import { TouchableOpacity } from "react-native";
import { Text } from "../text";
import { theme } from "../../constants/navigation-routes";
import { View } from "react-native-animatable";

export const TextButton = ({ children,
                        style,
                        text,
                        buttonText,
                        buttonTextColor=theme.color.primary,
                        onPress,
                        buttonPosition='right'
                     }) => {
    const {
            fontWeight='normal',
            size=theme.size.xxsmall, 
            color='black', 
            underline='none',
            textAlign= 'left',
            heading= 'Lato'               // by default oswald is body font not heading whereas Lato is heading font
          } = style || {};
    return (
        
        <StyledTextButton>{children}
        { buttonPosition === 'right' ? 
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <StyledText
                heading={heading}
                textAlign={textAlign}
                weight={fontWeight} 
                size={theme.size.xsmall} 
                color={color} 
                underline={underline}> {text} 
            </StyledText> 
        <TouchableOpacity onPress={onPress} style={{color: 'red'}} >
            <Text style={{color: buttonTextColor, size: theme.size.medium, size: `${size}`, underline, heading: theme.fonts.heading }}>{buttonText}</Text>            
        </TouchableOpacity> 
        </View>
        : 
    <View style={{flexDirection: 'row', alignItems: 'center'}}>        
    <TouchableOpacity onPress={onPress} style={{color: 'red'}} >
    <Text style={{color: buttonTextColor, size: theme.size.medium, size: `${size}`, underline, heading: theme.fonts.heading }}>{buttonText}</Text>            
    </TouchableOpacity> 
    <StyledText
        heading={heading}
        textAlign={textAlign}
        weight={fontWeight} 
        size={theme.size.xxsmall} 
        color={color} 
        underline={underline}> {text} 
    </StyledText>
        </View>
        
        }

        </StyledTextButton> 
        );
};