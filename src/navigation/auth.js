import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SignupScreen } from '../screens/Signup-Screen';
import {LoginScreen } from '../screens/Login-Screen';
import { ROUTES } from '../constants/navigation-routes';
import { MainStack } from './main';

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen}/>
        <Stack.Screen name={ROUTES.REGISTER} component={SignupScreen}/>
    </Stack.Navigator>
);