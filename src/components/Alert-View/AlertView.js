import React, { useState } from "react";
import { Modal, StyleSheet,TouchableHighlight, View } from 'react-native';
import { Text } from '../text/Text';
import LottieView from 'lottie-react-native';
import { theme } from "../../constants/navigation-routes";
import { Spacer } from "../spacer";

export const AlertView = ({ 
    title='Error', 
    message='Something went wrong', 
    jsonPath, 
    onPressCancel, 
    onPressOk, 
    okButtonText,
    cancelButtonText,
    okButtonColor,
    cancelButtonColor,
    titleColor
}) => {
    const [alertVisible, setAlertVisibe] = useState(true);
    return(
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={alertVisible}

            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ size: 30, heading: theme.fonts.heading, color: titleColor}}>
                        {title}
                    </Text>
                    <View style={{ width: '100%', height: 0.5, backgroundColor: 'gray', marginVertical: 15 }}></View>
                    <View style={{ width: '100%', height: '30%'}}>
                        <LottieView
                            key='animation'
                            autoPlay
                            loop
                            resizeMode="contain"
                            source={jsonPath}
                        >
                        </LottieView>
                    </View>
                    <Text style={{ size: 20, heading: theme.fonts.body }}>{message}</Text>
                   {onPressCancel ?
                    <View style={{flexDirection: 'row'}}>
                    
                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: okButtonColor}}
                    onPress={()=> {
                            onPressOk()
                    }}
                >
                    <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>{okButtonText}</Text>
                </TouchableHighlight>
                <Spacer position={'left'} size='medium'></Spacer>
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: cancelButtonColor}}
                    onPress={()=> {
                        onPressCancel(false)
                    }}
                >
                    <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>{cancelButtonText}</Text>
                </TouchableHighlight>
                </View>:
 <TouchableHighlight
 style={{ ...styles.openButton, backgroundColor: okButtonColor}}
 onPress={()=> {
         onPressOk()
 }}
>
 <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>{okButtonText}</Text>
</TouchableHighlight>
    }
                </View>
                
            </View>
                
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex:1
    },
    modalView: {
        width: '80%',
        height: '50%',
        margin: 10,
        backgroundColor: theme.color.white,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: theme.color.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation: 5
    },
    openButton: {
        backgroundColor: theme.color.white,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '45%',
        marginTop: 40
    },
    textStyle: {
        color: theme.color.lightblack,
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
    },
    okStyle: {
        color: theme.color.white,
        textAlign: 'center',
        fontSize: 20,
    },
    modalText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 34,
        shadowColor: theme.color.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.04,
        elevation: 5
    }
})