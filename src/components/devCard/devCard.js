import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ProfileCard } from '../profile-card/Profile-Card';
import { ScrollView } from 'react-native';
import { Spacer } from '../spacer';

export const DevCard = ( { users,  }) => {
    const { imgSource,
        name='Hurmain khalid', 
        profession='Soft. Engineer', 
        location='Sahiwal,Pakistan',
        skills=[], 
        id } = users || {};
    return (
            <ScrollView>
              <View  style={{ padding: 10}}             >
                <ProfileCard
                 name={name}
                 imgSource={imgSource}
                 profession={profession} 
                 location={location}

                />
                <Spacer position={'top'} size={'large'}>
                <ProfileCard
                 name={name}
                 imgSource={imgSource}
                 profession={profession} 
                 location={location}
                />
                </Spacer>
                </View>
            </ScrollView>
            
    )
}
