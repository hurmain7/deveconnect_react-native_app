import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  ActivityIndicator, SafeAreaView, View } from 'react-native';
import { Text } from '../components/text';
import { TextInput } from '../components/text-input';
import { Header } from '../components/header';
import { Button } from '../components/button';
import { ROUTES, theme } from '../constants/navigation-routes';
import { Spacer } from '../components/spacer';
import { AccountContainer } from '../components/account-container/AccountContainer';
import { ErrorContainer } from '../components/error-container.js/styled';
import { TextButton } from '../components/text-button/TextButton';
import { AnimatedView } from '../components/animation/Animated-View';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { register } from '../state/actions/auth';
import { setError, removeError } from '../state/actions/error';
import { getError, getLoading } from '../state/selectors/auth';

export  const SignupScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch()
    const errorMessage = useSelector(getError)
    const loading = useSelector(getLoading)

    useEffect(()=> {
    dispatch(removeError())
    }, [])

    const onSubmit = () => {        
    if (password!== confirmPassword) {
        dispatch(setError(['Passwords do not match']))
    }
    else {
        dispatch(register({ name, email, password }));
    }}
    return (
     <>
        <AccountContainer>
            <Text 
             style={{ 
                size: theme.size.xlarge, 
                textAlign: 'center', 
                heading: theme.fonts.heading }}
            >
             Sign Up
            </Text>
            <Spacer position={'top'} size={'medium'}>
                <Text 
                 style={{ 
                    size: theme.size.medium, 
                    textAlign: 'center',
                    heading: theme.fonts.body}}
                >
                 Create DevConnector Account
                </Text>
            </Spacer>
            <Spacer position={'top'} size={'medium'}>
                <TextInput
                    placeholder='Name'
                    text={'* Name is required'}
                    value={name}
                    onChangeText={(e) => setName(e)}
                />
            </Spacer>
            <Spacer position={'top'} size={'medium'}> 
                <TextInput
                    placeholder='Email'
                    text={'* Email is required'}
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                />
            </Spacer>
            <Spacer position={'top'} size={'medium'}>
                <TextInput
                    placeholder='Password'
                    value={password}
                    secureText
                    onChangeText={(e) => setPassword(e)}  
                />
            </Spacer>
            <Spacer position={'top'} size={'medium'}>
                <TextInput
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    secureText
                    onChangeText={(e) => setConfirmPassword(e)}
                />
            </Spacer>
            <TextButton
                buttonText={'Login'}
                text={'Already have an account?'}
                onPress={()=> navigation.navigate(ROUTES.LOGIN)}
            />
            { loading ? <ActivityIndicator color={theme.color.primary} /> : 
                <Spacer position={'top'} size={'medium'}>
                    <Button
                        mode={'contained'}
                        style={{ width: theme.size.xlarge, height:theme.size.small}}
                        onPress={() => onSubmit()}
                    >
                     Register
                    </Button>
                </Spacer>
            }
            { errorMessage.length > 0 && errorMessage.map((error, index)=> {
             return (
                <AnimatedView animation="fadeInUpBig" key={index.toString()}>
                    <ErrorContainer>
                        <Spacer position={'left'} size={'medium'}>             
                            <Text 
                             style={{
                                color: theme.color.red, 
                                textAlign: 'center',
                                size: theme.size.medium}}
                            >
                             * {error}
                            </Text>
                        </Spacer>
                    </ErrorContainer>
                </AnimatedView>
                )})
            }
            </AccountContainer>
     </>
    )
}
