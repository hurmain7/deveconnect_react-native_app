import React from 'react'
import { CreateUpdateProfile } from '../components/create-update-profile/CreateUpdateProfile'
import { Header } from '../components/header/Header';
import { theme } from '../constants/navigation-routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context';

export const UpdateProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
            <Header
              headerTextShown={true}
              iconColor={theme.color.white}
              headerText={'Update Profile'}
              style={{size: 30, color: theme.color.primary}}
              headerBackgroundColor={theme.color.primary}
              backPress={()=> navigation.goBack()}
            />
            <CreateUpdateProfile 
              update={true}
              navigation={navigation}
            />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
