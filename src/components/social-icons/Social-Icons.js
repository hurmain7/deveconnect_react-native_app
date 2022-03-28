import React, { Children } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyledSocialIcons } from './styled';

export const SocialIcons = ({ children, name, style, onPress}) => {
    const {size, color } = style;
    return(
        <TouchableOpacity onPress={onPress}>   
    <StyledSocialIcons 
        name={name}  
        size={size} 
        color={color}
        >{children}
    </StyledSocialIcons>
    </TouchableOpacity>
    )
}