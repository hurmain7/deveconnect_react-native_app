import React from "react";
import { View, FlatList } from "react-native";
import { Text } from "../text";
import  Ionicons from 'react-native-vector-icons/Ionicons';
import { StyledSkill } from "./styled";
import { Spacer } from "../spacer";

export const Skill = ({skills=[]}) => {
    //  skills = [ 'mongodbs','mysql','reactnative', 'ads', 'sda', 'dsssds'];   // no more than 7 letters
    
    const renderSkills = ({ item }) => {
        // const skill = item.split(' ')
        return (
            <Spacer size={'small'} position={'right'}>
            <StyledSkill>
                <View style={{flexDirection: 'row', alignItems: 'center'}}> 
                    <Ionicons
                        name="ios-checkmark-done"
                        size={25}
                        color={'white'}
                    />
                    <Text style={{color: 'white', size: 15}}>{`${item}`}</Text></View>
             </StyledSkill>
             </Spacer>
       )
    }

    return (
        <View>
            <FlatList
                data={skills}
                renderItem={renderSkills}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsHorizontalScrollIndicator={false}
                horizontal
         >

            </FlatList>
        </View>
    )
}