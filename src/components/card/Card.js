import React from "react";
import { StyledCard } from "./styled";

export const Card = ({ children,height, width, radius}) => {
    
    return (
        <StyledCard
            height={height}
            width={width}
            radius={radius}

        >
            {children}
        </StyledCard>
            )
}