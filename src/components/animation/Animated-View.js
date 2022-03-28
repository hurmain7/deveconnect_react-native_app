import * as Animatable from 'react-native-animatable';
import React from 'react';
import { View } from 'react-native';

export const AnimatedView = ({children,animation='fadeInUpBig'}) => {
    return (
    <Animatable.View animation={animation} >
    {children}
    </Animatable.View>
    )
}
