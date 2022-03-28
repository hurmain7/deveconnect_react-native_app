import React from "react";
import { StyledError } from "./styled";

export const ErrorContainer = ({ children,
                     }) => {
    return (
        <StyledError> 
            {children} 
        </StyledError> 
        );
};