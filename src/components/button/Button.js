import React from 'react';
import { StyledButton } from './styled';

export const Button = ({children,style, onPress, mode}) => {
    const { color='#17a2b8', width='50', height='10'} = style || {}
    
    return(
        <StyledButton 
            height={height}
            width={width}
            mode={mode}
            color={color}
            onPress={onPress}
            uppercase={false}
            backgroundColor={'white'}
        >
            {children}
        </StyledButton>
    )
}