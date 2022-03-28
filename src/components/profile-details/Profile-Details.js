import React, { useEffect } from "react";
import { theme, ROUTES } from '../../constants/navigation-routes';
import { ActivityIndicator, Linking, View } from "react-native";
import { ProfileDetailsWrapper, ProfileDetailsCard, SkillWrapper, SocialIconsContainer, Card } from "./styled";
import { Avatar } from "react-native-paper";
import { Skill } from "../skills/Skill";
import { Spacer } from "../spacer";
import { Text } from "../text";
import { SocialIcons} from '../social-icons/Social-Icons';
import { GithubProfile } from "../github-repos/Github-Profile";
import { getAuthProfile } from "../../state/selectors/profile";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../header/Header";
import { getProfileById } from "../../state/actions/profile";
import { profile } from "../../state/selectors/profile";
export const ProfileDetails = ({ profile, repos, loading }) => {
    const { bio='', location='' , profileName='', skills=[], status='', githubusername='', social={}, user } = profile;
    const { facebook, youtube='https:', linkedin, twitter } = social;
    const { avatar } = user
    const iconPressed = async (url) => {
        await Linking.openURL(url)
    }
    return (
    <>
        <ProfileDetailsCard>
            <ProfileDetailsWrapper>
                {avatar && <Avatar.Image source={{ uri: avatar }} size={120} icon={'human'} backgroundColor={'#343a40'}/>}
                    <Spacer position={'top'} size={'small'}>
                </Spacer>
                    <Text 
                        style={{ color: theme.color.white, size: theme.size.xmedium, heading: theme.fonts.body}}>
                            {profileName}
                    </Text>
                   <Spacer position={'top'} size={'small'}>
                    
                        <Text style={{ color: theme.color.white, size: theme.size.xxsmall, heading: theme.fonts.body}}>
                            {status}
                        </Text>
                    </Spacer>
                    <Spacer position={'top'} size={'small'}>
                        <Text style={{ color: theme.color.white, size: theme.size.xxsmall, heading: theme.fonts.body}}>
                            {location}
                        </Text>
                    </Spacer>
                    <SocialIconsContainer>
                        <SocialIcons
                            name='twitter'
                            style={{ size: theme.size.large,
                            color: theme.color.white }}
                            onPress={()=> iconPressed(twitter)}
                         />
                        <Spacer position={'left'} size={'small'}>
                            <SocialIcons
                                name='youtube'
                                style={{ size: theme.size.large,
                                color: theme.color.white }}
                            onPress={()=> iconPressed(youtube)}

                            />
                        </Spacer>
                        <Spacer position={'left'} size={'small'}>
                            <SocialIcons
                                name='facebook-square'
                                style={{ size: theme.size.large,
                                color: theme.color.white }}
                            onPress={()=> iconPressed(facebook)}

                            />
                        </Spacer>
                        <Spacer position={'left'} size={'small'}>
                        
                        <SocialIcons
                                name='linkedin-square'
                                style={{ size: theme.size.large,
                                color: theme.color.white }}
                            onPress={()=> iconPressed(linkedin)}

                            />
                            </Spacer>
                    </SocialIconsContainer>
                </ProfileDetailsWrapper>
            </ProfileDetailsCard>

            <Card>
                <Spacer position={'top'} size={'small'}>  
                    <Text 
                        style={{color: theme.color.primary,
                                textAlign: 'center', size: theme.size.xmedium}}>
                        Bio
                    </Text>
                </Spacer>
                <Spacer position={'top'} size={'medium'}>
                <Spacer position={'left'} size={'medium'}>   
                    {!bio ?                     
                        <Text style={{textAlign: 'left', size: 13, heading: theme.fonts.body}}>
                            {profileName} has no bio.
                        </Text>
                    
                :
                    <Text style={{textAlign: 'left', size: 13, heading: theme.fonts.body}}>
                    {bio}
                    </Text>}
                </Spacer>
                </Spacer>
            </Card>
            <Card>
                <SkillWrapper>
                    <Spacer position={'top'} size={'small'}>
                        <Text 
                            style={{color: theme.color.primary,
                                    textAlign: 'center',size: theme.size.xmedium}}>
                            Skill Set
                        </Text>
                    </Spacer>
                    <Spacer position={'top'} size={'small'}>
                    <Spacer position={'left'} size={'small'}>   
                    <Spacer position={'right'} size={'small'}>   
                        <Skill
                            skills={skills}
                        />
                    </Spacer>
                    </Spacer>
                    </Spacer>
                </SkillWrapper>
            </Card>
        { loading ? <ActivityIndicator/>:
        <GithubProfile
            repos={repos}
        />
        }
    </>
    )
}