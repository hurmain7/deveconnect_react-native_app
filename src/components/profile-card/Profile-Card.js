import React from "react";
import { Text } from '../text';
import { Avatar } from "react-native-paper";
import {Button } from '../button';
import { Skill } from "../skills/Skill";
import { theme } from "../../constants/navigation-routes";
import { AdjustingNameImage, ProfileCardContainer, NameImageContainer,StatusLocationContainer, ButtonContainer, AdjustingButton } from "./styled";
import { Spacer } from "../spacer";
import * as RootNavigation from '../../navigation/RootNavigation';
import { View } from "react-native";

export const ProfileCard = ({ navigation, name='', imgSource, professionStatus='', location='' , id='', githubusername, skills=[]}) => {
    return (
        <ProfileCardContainer>
            <NameImageContainer>
                <AdjustingNameImage>
                        {/* {!imgSource && <Avatar.Icon size={90} icon={'human'} backgroundColor='#17a2b8' />} */}
                        {imgSource && <Avatar.Image size={70} source={{uri: imgSource}} backgroundColor='#2182BD' />}
                    <Text style={{size: 21, textAlign: 'center', heading: theme.fonts.heading}}>
                        {name}
                    </Text>
                </AdjustingNameImage>
                    <StatusLocationContainer>
                    <Text style={{ size: 15, heading: theme.fonts.body }} >
                        {professionStatus}
                    </Text>

                    <Text style={{ size: 10, heading: theme.fonts.body}}>
                        {location}
                    </Text>                
                </StatusLocationContainer>
            </NameImageContainer>
            <ButtonContainer>
                <Text style={{ size: 25, color: '#17a2b8', heading: theme.fonts.heading}}>
                    Skill Set
                </Text>
                <AdjustingButton>
                    <Button mode={'contained'} style={{height: '5', width: '32', alignItems: 'center'}} onPress={()=> navigation.navigate('ViewProfile', {id, githubusername})}>
                        View Profile
                    </Button>
                </AdjustingButton>
            </ButtonContainer>
            <Spacer position={'top'} size={'small'}>
            <Skill 
                skills={skills}
            />
            </Spacer>
        </ProfileCardContainer>
    )
}
