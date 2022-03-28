import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from '../components/button';
import { Spacer } from '../components/spacer';
import { Text } from '../components/text';
import { logoutUser, removeUser } from '../state/actions/auth';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { Avatar } from "react-native-paper";
import { userEmail, userImageUrl } from '../state/selectors/auth';
import { Card } from '../components/card/Card';
import { theme } from '../constants/navigation-routes';
import { Header } from '../components/header/Header';
import { getLoading } from '../state/selectors/auth'
import { AlertView } from '../components/Alert-View/AlertView';
import { animation } from '../assets';

export const SettingsScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [alert,setAlert] = useState(false)
    const ButtonsWrapper = styled.View`
        flex: 1
        align-items: center;
        justify-content: center;
    `;

    const CardWrapper = styled.View`
        flex: 1;
        align-items: center;  
    `;

    const loading = useSelector(getLoading);
    const imgUrl = useSelector(userImageUrl);
    const email = useSelector(userEmail)
    // const imgUrl= false;
    const onLogout = () => {
        dispatch(logoutUser());
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Dashboard' }],
        //   });
    
    }

    const DeleteAccount = ()=> {
        dispatch(removeUser())
        //   navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Dashboard' }],
        //   });
    }

const showAlert = (
    onPressOk, 
    onPressCancel,
    alertMessage, 
    title,
    okButtonText,
    cancelButtonText, 
    jsonPath) => {
    return (
    <AlertView 
        onPressCancel={onPressCancel} 
        onPressOk={onPressOk}
        okButtonColor={theme.color.red}
        cancelButtonColor={theme.color.lightblack} 
        titleColor={theme.color.red}
        message={alertMessage} 
        title={title} 
        jsonPath={jsonPath} 
        okButtonText={okButtonText}
        cancelButtonText={cancelButtonText}
    ></AlertView>
    )
}
    return (
     <>
        <Header
        iconColor={theme.color.white}
        style={{size: 30, color: theme.color.primary}}
        backPress={()=> navigation.goBack()}
        headerBackgroundColor={theme.color.primary}
        headerTextShown={true}
        headerText={'Settings'}
        headerTextColor={theme.color.white}
        />
        <CardWrapper>
            <Spacer position={'top'} size={'xLarge'}>
            </Spacer>        
            <Card 
                width={theme.size.xxxlarge} 
                height={theme.size.large} 
                radius={theme.size.xxslarge}
            >
                <Spacer position={'top'} size={'large'}>
                    { imgUrl && 
                        <Avatar.Image 
                            size={150} 
                            source={{uri: imgUrl}} 
                            backgroundColor='#2182BD' 
                        />
                    } 
                    {/* { !imgUrl && 
                        <Avatar.Icon 
                            size={150} 
                            icon={'human'} 
                            backgroundColor={theme.color.lightblack} 
                        />
                    } */}
                </Spacer>
                <Spacer position={'top'} size={'medium'}>
                    {email ?
                        <Text 
                            style={{ 
                                size: theme.size.medium, 
                                color: theme.color.lightblack,
                                underline: 'underline' } }>
                            {email}
                        </Text>: 
                        <ActivityIndicator/>}
                </Spacer>
            </Card>
            <Spacer position={'top'} size={'xxLarge'}> 
             <Card 
                width={theme.size.xxxlarge} 
                height={theme.size.large} 
                radius={theme.size.xxslarge}
             >
                <ButtonsWrapper>
                    {loading ? 
                        <ActivityIndicator 
                            color={theme.color.primary} 
                        /> : 
                     <>
                        <Button 
                            mode={'contained'} 
                            style={{
                                width: theme.size.xxslarge, 
                                height: theme.size.small, 
                                color: theme.color.red}} 
                            onPress={()=> setAlert(true)}
                        >
                         Delete Account
                        </Button>
                        <Spacer position={'top'} size={'large'}>
                            <Button 
                                mode={'contained'} 
                                style={{
                                    width: 50, 
                                    height: 5, 
                                    color: theme.color.primary}} 
                                onPress={()=> onLogout(navigation)}
                            >
                             Logout
                            </Button>
                        </Spacer>
                     </>
                    }
                </ButtonsWrapper>
             </Card>
            </Spacer>
        </CardWrapper>
            {alert && 
                showAlert(
                    DeleteAccount,
                    setAlert,
                    'Are you sure?',
                    'Delete Account',
                    'Yes','No', 
                    animation.delete)}
    </>
 )}
