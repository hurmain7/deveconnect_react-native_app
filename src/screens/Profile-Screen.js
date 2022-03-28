import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ProfileCard } from '../components/profile-card/Profile-Card';
import { ProfileDetails } from '../components/profile-details/Profile-Details';
import { getUserProfile, getLoading, getError } from "../state/selectors/profile";
import { getUser } from '../state/selectors/auth';
import { useSelector, useDispatch } from "react-redux";
import { Header } from '../components/header/Header';
import { ROUTES, theme } from '../constants/navigation-routes';
import { getGithubRepos, getProfileById } from '../state/actions/profile';
import { profileById, getReposData, profileLoading } from '../state/selectors/profile';
import { ActivityIndicator } from 'react-native-paper';
import { animation } from "../assets";
import { AlertView } from "../components/Alert-View/AlertView";
import { removeError } from '../state/actions/error';

export const ProfileScreen = ({navigation, route}) => {
     const { id, githubusername } = route.params;
    const errorMsg = useSelector(getError)

    const dispatch = useDispatch();
    const profile = useSelector(profileById)
    const repos = useSelector(getReposData)

    const loading = useSelector(profileLoading);
     useEffect(()=> {
      dispatch(getProfileById(id, githubusername));
    }, [])

    
const showAlert = (onPressOk,alertMessage, title,okButtonText, jsonPath) => {
  return (
  <AlertView 
      onPressOk={onPressOk}
      okButtonColor={theme.color.red}
      titleColor={theme.color.red}
      message={alertMessage} 
      title={title} 
      jsonPath={jsonPath} 
      okButtonText={okButtonText}
  ></AlertView>
  )
}


const reset = () => {
  dispatch(removeError());
  dispatch(getProfileById(id, githubusername));
}

    return (
      <>
      {errorMsg.length>0? 
          showAlert(reset, 'Network Error', 'Attention!!!', 'Close', animation.error):
<>

      <Header
      iconColor={theme.color.white}
      style={{size: 30, color: theme.color.primary}}
      backPress={()=>navigation.goBack()}
      headerBackgroundColor={theme.color.primary}
      headerTextShown={true}
      headerText={'Profile Details'}
      headerTextColor={theme.color.white}
    />
    
    {!profile? 
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
    <ActivityIndicator  color={theme.color.primary} size={'large'}/> 
    </View>:
    <ScrollView>
    <ProfileDetails 
      profile={profile}
      repos={repos}
      loading={loading}
    />
</ScrollView>
}
</>
}
    </>
  )
}
