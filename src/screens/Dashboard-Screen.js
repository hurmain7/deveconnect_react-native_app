import React, { useEffect, useState} from "react";
import { Text } from "../components/text";
import { Button } from '../components/button/Button'
import { TextButton } from '../components/text-button/TextButton'
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/native";
import  Fontisto from 'react-native-vector-icons/Fontisto';
import { theme } from "../constants/navigation-routes";
import { Spacer } from "../components/spacer";
import { ActivityIndicator } from "react-native-paper";
import { Header } from "../components/header/Header";
import { getAuthUserProfile } from "../state/actions/profile";
import { removeError } from '../state/actions/error';
import { getUser, getError } from '../state/selectors/auth';
import { getProfileData } from "../state/actions/profile";
import LottieView from 'lottie-react-native';
import { animation } from "../assets";
import { AlertView } from "../components/Alert-View/AlertView";
import { CommonActions } from '@react-navigation/native';
import { 
  getAuthProfile, 
  profileLoading, 
  getAuthProfileId, 
  getAuthProfileGithub } from "../state/selectors/profile";

export const DashboardScreen = ({ navigation, route }) => {
const { update, create } = route.params;
const dispatch = useDispatch()
const profile = useSelector(getAuthProfile)
const errorMsg = useSelector(getError)
const id = useSelector(getAuthProfileId)
const githubusername = useSelector(getAuthProfileGithub)
const user = useSelector(getUser)
const loading = useSelector(profileLoading);

useEffect(()=> {
dispatch(getAuthUserProfile())
dispatch(getProfileData());

},[])

const Submit =(navigation) => {
    navigation.navigate('CreateProfile')
}   

const Update =(navigation) => {
    navigation.navigate('UpdateProfile')
}

const TextWrapper = styled.View`
flex-direction: row;
align-items: center;
padding: 20px;
`;

const AnimationWrapper = styled.View`
    align-items: center;
    justify-content: center;
    flex:1
`;

const showAlert = (onPressOk,alertMessage, title,okButtonText, jsonPath) => {
    return (
    <AlertView 
        onPressOk={onPressOk}
        okButtonColor={errorMsg.length > 0 ? theme.color.red: theme.color.success}
        titleColor={errorMsg.length > 0 ? theme.color.red: theme.color.success}
        message={alertMessage} 
        title={title} 
        jsonPath={jsonPath} 
        okButtonText={okButtonText}
    ></AlertView>
    )
}

const reset = () => {
    dispatch(removeError());
    dispatch(getAuthUserProfile())
    dispatch(getProfileData());
    navigation.dispatch(CommonActions.setParams({ update: '' }));
    navigation.dispatch(CommonActions.setParams({ create: '' }));
}
return (
  <>
      {update || create || errorMsg.length > 0 ? 
        update ?
          showAlert(reset, 'Profile Updated Successfully', 'Updated', 'Ok', animation.success):
        create ?
          showAlert(reset, 'Profile Created Successfully', 'Created', 'Ok', animation.success):
          showAlert(reset, 'Network Error', 'Attention!!!', 'Close', animation.error):
        <>
          <Header
            headerTextShown={true}
            iconColor={theme.color.white}
            headerText={'Dashboard'}
            style={{
                size: 30, 
                color: theme.color.primary, 
                heading: theme.fonts.heading }}
                headerBackgroundColor={theme.color.primary}
                backPress={false}
           />
         { loading && <ActivityIndicator color={theme.color.primary}/>}
        <>
          { !profile && !loading &&
            <>
              <Spacer position={'left'} size={'large'}>
                <Spacer position={'top'} size={'medium'}>
                    <Spacer position={'bottom'} size={'medium'}>
                        <Text 
                          style={{size: 15, heading: theme.fonts.body}}
                        >
                        You have not setup profile yet, please add some info
                        </Text>
                    </Spacer>
                    <Button 
                        mode={'contained'} 
                        style={{width: 40, height: 5}}
                        onPress={()=> Submit(navigation)}
                    >
                    Create Profile
                    </Button>
                </Spacer>
              </Spacer>           
            </> 
          } 
          { profile && !loading &&
            <>
            <TextWrapper>
                <Fontisto 
                    name="person" 
                    size={30} 
                    color={ theme.color.primary} 
                />
                <Spacer position={'bottom'} size={'small'}>
                    <Spacer position={'left'} size={'medium'}>
                        <Text 
                            style={{color: theme.color.lightblack, 
                            size: theme.size.xmedium,
                            heading: theme.fonts.body
                            }}>
                            Welcome
                        </Text>
                    </Spacer>
                </Spacer>
                <Spacer position={'left'} size={'small'}>
                <Spacer position={'bottom'} size={'large'}>
                    <TextButton 
                        buttonText={user && `${user.name}`} 
                        style={{ size: theme.size.xmedium , 
                        underline: 'underline',
                        heading: theme.fonts.heading }} 
                        onPress={()=> { id && 
                          navigation.navigate('ViewProfile', 
                          { id, githubusername })}}
                    />
                </Spacer>
                </Spacer>
            </TextWrapper> 
            <Spacer position={'left'} size={'large'}>
              <Button 
                mode={'contained'} 
                style={{width: 40, height: 5}}
                onPress={()=> Update(navigation)}
              >
               Update Profile
              </Button>
            </Spacer>
          </>
          }
            </>
          <AnimationWrapper>
            <LottieView
                key='animation'
                colorFilters={[
                {
                  keypath: 'button',
                  color: 'black',
                  },
                  {
                  keypath: 'Sending Loader',
                  color: 'black',
                  },
                ]}
                autoPlay
                resizeMode='contain'
                source={animation.welcome}
            />
          </AnimationWrapper>
        </>
      }
   </>   
)}
