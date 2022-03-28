import React from "react";
import { StyledAccountContainer } from "./styled";

export const AccountContainer = ({children}) => {
    
    return(
        <StyledAccountContainer>
            {children}
            </StyledAccountContainer>
    )
}
