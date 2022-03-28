import React from 'react';
import { SpacerView } from './styled/Spacer-Style';
import { sizeVariant, positionVariant, space } from './styled/spacing';

const getVariant= (position,size) =>  {
    const sizeIndex = sizeVariant[size];
    const property = positionVariant[position];
    const value = space[sizeIndex];
    return `${property}: ${value}`;
};

export const Spacer= ({position,size,children}) => {
    const variant = getVariant(position,size);
    return <SpacerView variant={variant}>{children}</SpacerView>;
}
