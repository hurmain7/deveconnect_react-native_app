import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {HomeScreen}  from '../screens/Home-Screen';
import  {SettingsScreen}  from '../screens/Settings-Screen';
import  {DashboardScreen}  from '../screens/Dashboard-Screen';
import { ProfileScreen } from '../screens/Profile-Screen';
import { DevelopersScreen } from '../screens/Developers-Screen';
import { View } from 'react-native';
import { ROUTES, theme } from '../constants/navigation-routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Button,  Icon } from 'react-native-elements';
import  Fontisto from 'react-native-vector-icons/Fontisto';
import  Feather from 'react-native-vector-icons/Feather';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateProfileScreen } from '../screens/Create-Profile-Screen';
import { UpdateProfileScreen } from '../screens/Update-Profile-Screen';
import { Text } from '../components/text';
import { Header } from '../components/header/Header';
import { AuthStack } from './auth';
import { StackActions } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export const NestedDevelopersStack = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen 
          name="Developer" 
          component={DevelopersScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="ViewProfile" 
          component={ProfileScreen} 
          options={{headerShown: false}}
        />
     </Stack.Navigator>
     
  )
}

export const  NestedDashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
            name={ROUTES.DASHBOARD}
            component={DashboardScreen}
            options={{headerShown:false}}
            initialParams={{update: '', create:''}}
                         
      />
      {/* <Stack.Screen name="ViewProfile" component={ProfileScreen} options={{headerShown: false,}}/>     */}
      <Stack.Screen name="ViewProfile" component={ProfileScreen} options={{headerShown: false,}}/>    
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={{headerShown: false, headerTitle: 'Hello'}}/>    
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} options={{headerShown: false, headerTitle: 'Hello'}}/>          
    </Stack.Navigator>
  );
}

export const MainStack = () => {
 return (   
    <Tab.Navigator
    >
        <Tab.Screen 
          name="Dashboard" 
          component={NestedDashboardStack} 
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate('Dashboard')
            }
          })}
          options={{  
            headerShown: false,
           
            tabBarActiveTintColor: theme.color.white,
            tabBarInactiveTintColor: theme.color.primary,
            tabBarActiveBackgroundColor: theme.color.primary,
            tabBarInactiveBackgroundColor: theme.color.white,
            tabBarIcon: ({ focused }) => 
            { return <MaterialCommunityIcons name="monitor-dashboard" 
                     size={28} color={ focused? theme.color.white: theme.color.primary} />
            }
          }}
        />
        <Tab.Screen 
          name="Developers"  
          component={NestedDevelopersStack}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Developers' }],
              });
              // navigation.navigate('Developers')
            }
          })} 
          options={{  headerShown: false, 
            tabBarActiveTintColor: theme.color.white,
            tabBarInactiveTintColor: theme.color.primary,
            tabBarActiveBackgroundColor: theme.color.primary,
            tabBarInactiveBackgroundColor: theme.color.white,
            tabBarIcon: ({ focused }) => 
            { return <Fontisto name="person" 
                      size={28} color={ focused? theme.color.white: theme.color.primary} />
            }                      
          }}
        />
        <Tab.Screen 
          name={"Settings"} 
          component={SettingsScreen} 
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Settings' }],
              });
              // navigation.navigate('Settings')

            }
          })}
            options={{ headerShown: false, 
              tabBarActiveTintColor: theme.color.white,
              tabBarInactiveTintColor: theme.color.primary,
              tabBarActiveBackgroundColor: theme.color.primary,
              tabBarInactiveBackgroundColor: theme.color.white,
              tabBarIcon: ({ focused }) => 
              { return ( <Feather name="settings" 
                 size={28} color={ focused? theme.color.white: theme.color.primary} />)}
            }}
         /> 
     </Tab.Navigator>
)}
