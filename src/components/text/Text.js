import React from "react";
import { StyledText } from "./styled";
import { theme } from "../../constants/navigation-routes";
export const Text = ({ children,
                        style,
                        onPress
                     }) => {
    const {
            fontWeight='normal',
            size=20, 
            color='black', 
            underline='none',
            textAlign= 'left',
            heading='Oswald',                       // by default oswald is body font not heading whereas Lato is heading font
          } = style || {};
    return (
        <StyledText
            fontWeight={fontWeight}
            textAlign={textAlign}
            weight={fontWeight} 
            size={size} 
            color={color} 
            onPress={onPress} 
            underline={underline}
            heading={heading}
            > {children}
        </StyledText> 
        );
};