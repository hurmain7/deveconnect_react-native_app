import React from "react";
import { SafeAreaView, View } from "react-native";
import { StyledTextInput } from "./styled";
import { Text } from '../text';
import { SocialIcons } from "../social-icons/Social-Icons";
import { theme } from '../../constants/navigation-routes'
import { Card } from "../profile-details/styled";
import { Spacer } from "../spacer";
import Feather from 'react-native-vector-icons/Feather';


export const TextInput = ({ children, 
                            style,
                            placeholder='', 
                            secureText, 
                            onChangeText, 
                            text,
                            textAlign, 
                            leftIcon, 
                            iconColor,
                            iconType,
                            iconSize,
                            multiline,
                            noOfLines,
                            value=''
}) => {
    const {
        fontSize= 15, height= 50, width= 300
      } = style || {};
        
      return (
            <SafeAreaView>
                {leftIcon ? (
                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Spacer position={'top'} size={'small'}></Spacer>
                     <SocialIcons name={iconType} style={{ size: iconSize ? iconSize: theme.size.xxslarge, color: iconColor ? iconColor: theme.color.primary}} color={iconColor}/>
                     <Spacer position={'left'} size={'medium'}></Spacer>
                     
                     <StyledTextInput  
                        style={{fontSize,height,width}} 
                        width={width}
                        height={height} 
                        placeholder={placeholder} 
                        value={value}
                        secureTextEntry={secureText} 
                        onChangeText={onChangeText}
                        mode={'outlined'}
                        multiline={multiline}
                        selectionColor={theme.color.primary}
                        outlineColor={theme.color.black}
                        activeOutlineColor={theme.color.primary}
                        dense={false}
                        numberOfLines={noOfLines}
                     />
                    </View>

                ):
<View>

                <StyledTextInput  
                    style={{fontSize,height,width}} 
                    width={width} 
                    placeholder={placeholder} 
                    secureTextEntry={secureText}                   
                    onChangeText={onChangeText}
                    value={value}
                    mode={'outlined'}
                    multiline={multiline}
                    selectionColor={theme.color.primary}
                    outlineColor={theme.color.black}
                    activeOutlineColor={theme.color.primary}
                    dense={false}
                    numberOfLines={noOfLines}
    
                >
                    {children}
                </StyledTextInput>
                
                </View>
            }
                { text && (
                    <Text style={{color: '#343a40', size: 10, textAlign: textAlign? textAlign : 'left' }}>{text}</Text>
                )}
                

            </SafeAreaView>
    
    );
}