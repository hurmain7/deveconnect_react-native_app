import React from 'react'
import { CreateUpdateProfile } from '../components/create-update-profile/CreateUpdateProfile'
import { Header } from '../components/header/Header';
import { theme } from '../constants/navigation-routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context';

export const CreateProfileScreen = ({navigation}) => {
  return (
<SafeAreaView>
  <KeyboardAwareScrollView>
      <Header
        headerTextShown={true}
        iconColor={theme.color.white}
        headerText={'Create Profile'}
        style={{size: 30, color: theme.color.primary}}
        headerBackgroundColor={theme.color.primary}
        backPress={()=> navigation.goBack()}
        />
      <CreateUpdateProfile 
        navigation={navigation}
      />
  </KeyboardAwareScrollView>
</SafeAreaView>
  )
}
