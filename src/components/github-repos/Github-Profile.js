import React from 'react';
import { Text } from '../text/Text';
import { theme } from '../../constants/navigation-routes';
import { TouchableOpacity, View, Pressable, Linking, ActivityIndicator } from 'react-native';
import { RepoCard, RepoDetailsCard, TextWrapper, RepoContainer, RepoTextWrapper, RepoDetailsContainer, RepoDetailsText } from './styled';
import { Spacer } from '../spacer';
import { Header } from '../header/Header';
import { NavigationContainer } from '@react-navigation/native';
import { profileLoading } from '../../state/selectors/profile';
import { useSelector } from 'react-redux';
export const GithubProfile = ({navigation,userName, repos=[]}) => {
  const loading = useSelector(profileLoading)
    const repoCardPressed = async (url) => {
        await Linking.openURL(url)
    }
console.log(repos,'repos');
    return (
        <View>
 <Spacer size={'medium'} position={'top'}>
                              <Text 
                                style={{
                                    color: theme.color.primary,
                                    size: theme.size.xmedium, textAlign: 'center'}}
                                >
                                    Latest Github repos 
                              </Text> 
                             </Spacer>

            { repos.length > 0 ? 
                repos.map((repo,index)=> {
                    return (
                        <View style={{flex: 1}} key={index.toString()}>
                        <Pressable  style={({pressed})=> [ {  backgroundColor: pressed ? 'lightgray': theme.color.white,}, {borderRadius: 40,}]} 
                        onPress={()=> repoCardPressed(repo.html_url)}>
                         <RepoCard>
                            
                            <RepoContainer>
                                <RepoTextWrapper>
                                    <Text 
                                        style={{ 
                                            size: theme.size.xmedium, 
                                            color: theme.color.primary, 
                                            fontWeight: 500, textAlign: 'left'}}
                                    >
                                        {repo.name ? repo.name: 'Repo Name not found'}
                                    </Text>
                                    <Spacer size={'small'} position={'left'}>
                                    <Spacer size={'small'} position={'top'}>
                                        <Text style={{ size: theme.size.xxsmall }}>
                                            {repo.description ? repo.description : 'Repo description not found'}
                                        </Text>
                                    </Spacer>
                                    </Spacer>
                                </RepoTextWrapper>
                                <RepoDetailsContainer>
                                    <RepoDetailsCard color={theme.color.primary}>
                                    <RepoDetailsText>
                                        <Spacer position={'bottom'} size={'small'}>
                                         <Text style={{size: theme.size.xxsmall, color: theme.color.white}}>
                                             Stars : {repo.stargazers_count? repo.stargazers_count: 0}
                                         </Text>
                                         </Spacer>
                                        </RepoDetailsText>

                                    </RepoDetailsCard>
                                    <RepoDetailsCard color={'#343a40'}>
                                    <RepoDetailsText>
                                        <Spacer position={'bottom'} size={'small'}>
                                            <Text style={{size: theme.size.xxsmall, color: theme.color.white}}>
                                                Watchers : {repo.watchers_count? repo.watchers_count: 0}
                                            </Text>
                        </Spacer>
                        </RepoDetailsText>
                                    </RepoDetailsCard>
                                    <RepoDetailsCard color={'#f8f9fa'}>
                                    <RepoDetailsText>
                                        <Spacer position={'bottom'} size={'small'}>
                                            <Text style={{size: theme.size.xxsmall}}>
                                                Forks : {repo.forks_count? repo.forks_count: 0}
                                            </Text>
                                        </Spacer>
                                        </RepoDetailsText>
                                    </RepoDetailsCard>
                                </RepoDetailsContainer>
                            </RepoContainer>
                        </RepoCard>
                        </Pressable>
                        </View>
                    )}): 
                                        <RepoCard>

<TextWrapper>

                                        <Spacer position={'left'} size={'small'}>

                        <Text style={{heading: theme.fonts.body, size: 13}}>No repos found</Text>
                        </Spacer>

                    </TextWrapper>
                    </RepoCard>

            }       
        </View>
    );
};