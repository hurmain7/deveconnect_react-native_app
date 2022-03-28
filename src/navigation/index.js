import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './auth';
import { MainStack } from './main';
import { navigationRef } from "./RootNavigation";
import { isAuthenticated } from '../state/selectors/auth'
import { useSelector } from "react-redux";

export const Routes = () => {
  const isAuth= useSelector(isAuthenticated)

  return (
    <NavigationContainer ref={navigationRef}>
      { isAuth ? <MainStack /> : <AuthStack /> }
    </NavigationContainer>
  );
};
