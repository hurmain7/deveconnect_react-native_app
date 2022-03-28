import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, RefreshControl } from 'react-native';
import { Text } from '../components/text';
import { ScrollView } from 'react-native';
import { Header } from '../components/header/Header';
import { theme } from '../constants/navigation-routes';
import { useDispatch, useSelector } from 'react-redux';
import { totalProfiles, getTotalProfilesLength, getPerPage, currentPage } from '../state/selectors/profile';
import { ProfileCard } from '../components/profile-card/Profile-Card';
import { loadMoreProfiles, resetPage, loadInitialProfiles } from '../state/actions/profile';

export const DevelopersScreen = ({ navigation }) => {
  const [load, setLoad] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const profiles = useSelector(totalProfiles);
  const profilesLength= useSelector(getTotalProfilesLength)
  const page = useSelector(currentPage)
  const perPage = useSelector(getPerPage);
  let total = page*perPage;

  useEffect(()=>{
    if(page==1){
      dispatch(loadInitialProfiles())
    }
  },[])

  const wait = async (timeout) => {
    return await new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback( () => {
    setRefreshing(true);
    wait(500).then(() =>{ 
      setRefreshing(false)
      dispatch(loadInitialProfiles())
        }
    );
  }, []);

  const updateProfiles = () => {
    dispatch(loadMoreProfiles())
  }

  const renderProfileCard = ( profile, navigation, key ) => {
    const { 
      profileName, 
      skills, 
      status, 
      location, 
      user, 
      githubusername } = profile;
      let id = {};
      let avatar = '';
      if(user){
       id = user._id;
       avatar= user.avatar;
      }
    return (
      <View key={key}>
        <ProfileCard
          name={profileName}
          skills={skills}
          professionStatus={status}
          location={location}
          githubusername={githubusername}
          id={id}
          imgSource={avatar}
          navigation={navigation}
        />
      </View>)
  }

    return (
      <>
        <Header
        headerTextShown={true}
        iconColor={theme.color.white}
        headerText={'Developer Profiles'}
        style={{size: 30, color: theme.color.primary, heading: theme.fonts.heading}}
        headerBackgroundColor={theme.color.primary}
        backPress={()=> navigation.goBack()}
      />
      { profiles.length == 0 && 
        <Text 
          style={{ 
            textAlign: 'center'}}
        >
          There are no Profiles Yet.{'\n'}Be the First to Create Profile : )
        </Text>
      }
      { profiles.length > 0 &&
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.color.primary]}
              progressBackgroundColor={theme.color.white}
            />
          }
          onMomentumScrollBegin=
          { () => { setLoad(true)
                    if(total<=profilesLength) updateProfiles() 
                    }
          }
          onMomentumScrollEnd={()=> {
            setTimeout(()=>{
            setLoad(false)
            },2000)
          }

                }
        >
          { page == 1 &&
              profiles.map((profile,index)=> {
                  if(index<perPage)
                  return renderProfileCard(profile,navigation,index)})
          }
          { page > 1 &&
            <>
              { profiles.map((profile,index)=> {
                if(index<total)
                return renderProfileCard(profile,navigation,index)})
              }
            </>
          } 
          { load &&
            <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
              <ActivityIndicator/>
            </View>
          }     
        </ScrollView>
      }
      </>        
    );
    };
