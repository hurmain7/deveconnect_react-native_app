import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { AnimatedView } from '../components/animation/Animated-View';
import { Text } from '../components/text';
import { ErrorContainer } from '../components/error-container.js/styled';
import { TextInput } from '../components/text-input';
import { Button } from '../components/button';
import { ROUTES, theme } from '../constants/navigation-routes';
import { Spacer } from '../components/spacer';
import { AccountContainer } from '../components/account-container/AccountContainer';
import { TextButton } from '../components/text-button/TextButton';
import LottieView from 'lottie-react-native';
import { removeError } from '../state/actions/error';
import { login } from '../state/actions/auth';
import { getError, getLoading } from '../state/selectors/auth';
import { animation } from '../assets';
import Feather from 'react-native-vector-icons/Feather';

export const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const errorMessage = useSelector(getError)
    const loading = useSelector(getLoading)
    const [showPassword,setShowPassword] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
            dispatch(removeError())
        });
        return unsubscribe;
    }, [navigation]);

    const onSubmit = () => {
        dispatch(login({ email, password }))
    }

    const AnimationWrapper = styled.View`
        align-items: center;
        width: 40%;
        height: 20%;
        position: absolute;
        margin-left: 120px;
        top: 150px;
        margin-top: 370px;
`;

const handleShowPassword = ( ) => {
    setShowPassword(!showPassword)
}

return(
    <>
     <AccountContainer>
        <Text 
            style={{ 
            size: theme.size.xlarge,
            textAlign: 'center', 
            heading: theme.fonts.heading }}
        >
            Sign In
        </Text>
        <Spacer position={'top'} size={'medium'}>
            <Text 
             style={{ 
                size: theme.size.medium, 
                textAlign: 'center', 
                heading: theme.fonts.body }}
            >
             Sign Into your Account
            </Text>
        </Spacer>
        <Spacer position={'top'} size={'medium'}>          
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={(e) => setEmail(e)}
            />
        </Spacer>
        <Spacer position={'top'} size={'medium'}>
            <TextInput
                placeholder='Password'
                secureText={showPassword ? true : false}
                value={password}
                onChangeText={(e) => setPassword(e)}
            />
            <TouchableOpacity 
                style={{
                    position: 'absolute', 
                    left: 305, 
                    top: 20}} 
                onPress={handleShowPassword}>
            {showPassword ? 
                <Feather name="eye-off" color={theme.color.primary} size={20} />:
                <Feather name="eye" color={theme.color.primary} size={20} />    
            }
            </TouchableOpacity>

        </Spacer>
        <TextButton
            buttonText={'Sign Up'}
            text={"Don't have an account?"}
            onPress={()=> navigation.navigate(ROUTES.REGISTER)}
        />
        { loading ? <ActivityIndicator color={theme.color.primary} /> :
            <Spacer position={'top'} size={'medium'}>
                <Button
                    mode={'contained'}
                    style={{ width: theme.size.xlarge, height:theme.size.small}}
                    onPress={() => onSubmit(navigation)}
                >
                    Login
                </Button>
            </Spacer>
        }
        { errorMessage.length > 0 && errorMessage.map((e, index)=> {
            return (
                <AnimatedView animation="fadeInUpBig" key={index.toString()}>
                    <ErrorContainer>
                        <Spacer position={'left'} size={'medium'}>             
                            <Text 
                             style={{
                                color: 'red', 
                                textAlign: 'center',
                                size: theme.size.medium}}
                            > * {e}
                            </Text>
                        </Spacer>
                    </ErrorContainer>
                </AnimatedView>
            )})
        }
     </AccountContainer>
     <AnimationWrapper>
        <LottieView
            key='animation'
            autoPlay
            loop
            resizeMode='contain'
            source={animation.login}
        />
     </AnimationWrapper>
    </>
)}
