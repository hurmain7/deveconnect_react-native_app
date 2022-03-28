import React, { useState, useEffect } from 'react'
import { TextInput } from '../text-input'
import { Spacer } from '../spacer'
import { Alert, View } from 'react-native'
import { TextButton } from '../text-button/TextButton'
import { theme } from '../../constants/navigation-routes'
import {Picker as SelectPicker } from '@react-native-picker/picker';
import { Button } from '../button';
import { ScrollView } from 'react-native';
import { createProfile } from '../../state/actions/profile';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthProfile, profileLoading } from "../../state/selectors/profile";
import { ActivityIndicator } from 'react-native-paper';
import { AlertView } from '../Alert-View/AlertView'
import { animation } from '../../assets';
export const CreateUpdateProfile = ({update=false, navigation}) => {
    const dispatch = useDispatch();
    const [alert,setAlert]= useState(false)
    const loading = useSelector(profileLoading);
    const profile = useSelector(getAuthProfile)
    const [formData, setFormData] = useState({
        profileName: '',
        company:'',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        facebook: 'https:',
        twitter: 'https:',
        linkedin: 'https:',
        youtube: 'https:'
    })
    const [toggleSocialInput, setToggleSocialInput] = useState(false);
    const {
        profileName,
        status,
        company,
        website,
        location,
        skills,
        githubusername,
        bio,
        facebook,
        twitter,
        linkedin,
        youtube,
    } = formData;

    useEffect(()=> {
        if (profile){
            const {
                profileName,
                company,
                website,
                location,
                status,
                skills,
                githubusername,
                social,
                bio,
            } = profile;
            const { facebook, youtube, twitter, linkedin } = social || {};
            setFormData({
                profileName: !profileName ? '' : profileName,
                website:  !website  ? '' : website,
                company:  !company  ? '' : company,
                location:  !location  ? '' : location,
                status:  !status  ? '' : status,
                skills:  !skills  ? '' : skills.join(),
                githubusername:  !githubusername? '' : githubusername,
                bio:  !bio  ? '' : bio,
                facebook:  !facebook  ? 'https:' : facebook,
                twitter:  !twitter  ? 'https:' : twitter,
                youtube:  !youtube  ? 'https:' : youtube,
                linkedin:  !linkedin  ? 'https:' : linkedin })
        }},[])

      const onChangeText = (e) => {
        return (val)=>(
            setFormData({...formData,[e]: val })
        )    
      }
      const selectedPickerText = (value) => {
        setFormData({...formData, 'status': value})
    }

    const onSubmitForm = async (update=false) => {
        if(!profileName){
            setAlert(true)
        }
        else if (!skills || (skills.match(/,/g) || []).length <= 1) {               // atleast 2 commas requires to get 3 skills
            setAlert(true)

        }
        else {
            await dispatch(createProfile({formData, update}))
        }       
    }

    const showAlert = (onPressOk,alertMessage, title,okButtonText, jsonPath) => {
        return (
        <AlertView 
            onPressOk={onPressOk}
            okButtonColor={theme.color.red}
            titleColor={theme.color.red}
            message={alertMessage} 
            title={title} 
            jsonPath={jsonPath} 
            okButtonText={okButtonText}
        ></AlertView>
        )
    }

    const reset = () => {
        setAlert(false)
    }

  return (
    <>
{alert && !profileName && 
  showAlert(reset, '*Profile Name is required', 'Alert!', 'Close', animation.error)}
{alert && 
  (skills.match(/,/g) || []).length <= 1 && 
  showAlert(reset, '*Atleast 3 Skills are required', 'Alert!', 'Close', animation.error)}

        { !update ? 
        <ScrollView>  
        <View style={{alignItems: 'center', marginTop: theme.size.small}}>

        <TextInput
            placeholder='Profile Name'
            style={{width: 360}}
            value={profileName}
            text={'* Name is required'}
            onChangeText={onChangeText('profileName')}
        />
        <Spacer position={'bottom'} size={'small'}></Spacer>
        <SelectPicker
            dropdownIconColor={theme.color.white}
            dropdownIconRippleColor={theme.color.white}
            style={{color: theme.color.white, backgroundColor: theme.color.primary, width: 358}}
            mode='dropdown'
            selectedValue={status}
            onValueChange={(itemValue) =>
            selectedPickerText(itemValue)}
        >
        <SelectPicker.Item label="No Professional Status" value="No Profession" />
        <SelectPicker.Item label="App Developer" value="App developer" />
        <SelectPicker.Item label="Student" value="Student" />
        <SelectPicker.Item label="Manager" value="Manager" />
        <SelectPicker.Item label="Instructor" value="Instructor" />
        <SelectPicker.Item label="Intern" value="Intern" />
        <SelectPicker.Item label="Other" value="Other" />
        </SelectPicker>
        <Spacer position={'bottom'} size={'small'}></Spacer>
        <TextInput
            placeholder='Company'
            style={{width: 360}}
            value={company}
            onChangeText={onChangeText('company')}
        />
        <Spacer position={'bottom'} size={'small'}></Spacer>
        <TextInput
            placeholder='Website'
            value={website}
            style={{width: 360}}
            onChangeText={onChangeText('website')}

        />
        <Spacer position={'bottom'} size={'small'}></Spacer>

        <TextInput
            placeholder='Location'
            style={{width: 360}}
            value={location}
            onChangeText={onChangeText('location')}

        />
        <Spacer position={'bottom'} size={'small'}></Spacer>

        <TextInput
            placeholder='Skills'
            text={'* Skill is required. *Comma separated skills  e.g  js, css'}
            style={{width: 360}}
            value={skills}
            onChangeText={onChangeText('skills')}

        />
        <Spacer position={'bottom'} size={'small'}></Spacer>
        <TextInput
            placeholder='Github Username'
            style={{width: 360}}
            value={githubusername}
            onChangeText={onChangeText('githubusername')}
        />
        <Spacer position={'bottom'} size={'small'}></Spacer>

        <TextInput
            placeholder='Short Bio'
            style={{width: 360, height: 100}}
            value={bio}
            multiline={true}
            noOfLines={1}
            onChangeText={onChangeText('bio')}
        />                
        {!toggleSocialInput ?
        <>
            <Spacer position={'bottom'} size={'large'}></Spacer>
            {loading ? <ActivityIndicator color={theme.color.primary} /> :
            <Button
                mode={'contained'}
                style={{ width: theme.size.xlarge, height:theme.size.small, color: theme.color.primary}}
                onPress={() => onSubmitForm()}
            >Submit
            </Button>
            }
            <Spacer position={'bottom'} size={'small'}></Spacer>
            
            <TextButton
                buttonText={'Add Social Network Links :'}
                text={"Optional"}
                buttonPosition={'left'}
                onPress={()=> setToggleSocialInput(true)}
            />

        </>:
        <View style={{ flexGrow:1,alignItems: 'center', paddingTop: theme.size.small}}>
            <TextButton
                buttonText={'Add Social Network Links :'}
                text={"Optional"}
                buttonPosition={'left'}
                onPress={()=> setToggleSocialInput(false)}
            />
            <Spacer position={'bottom'} size={'small'}></Spacer>
            <TextInput
                textAlign={'center'}
                placeholder='Facebook Profile Url'
                text={'e.g https:facebook.com/user name'}
                style={{width: 320, height: 42}}
                value={facebook}
                leftIcon={true}
                iconType={'facebook-square'}
                iconColor={ theme.color.facebook }
                iconSize={ theme.size.xlarge }
                onChangeText={onChangeText('facebook')}
                />
            <Spacer position={'bottom'} size={'small'}></Spacer>
            <TextInput
                placeholder='Twitter Profile Url'
                text={'e.g https:twitter.com/user name'}
                textAlign={'center'}
                style={{width: 320,height: 42 }}
                value={twitter}
                leftIcon={true}
                iconType={'twitter'}
                iconColor={ theme.color.twitter }
                iconSize={ theme.size.xlarge }
                onChangeText={onChangeText('twitter')}

            />
            <Spacer position={'bottom'} size={'small'}></Spacer>
             <TextInput
                placeholder='Youtube Channel Url'
                text={'e.g https:youtube.com/channel name'}
            textAlign={'center'}
                style={{width: 320, height: 42}}
                value={youtube}
                leftIcon={true}
                iconType={'youtube'}
                iconColor={ theme.color.youtube }
                iconSize={ theme.size.xlarge }
                onChangeText={onChangeText('youtube')}
            />
            <Spacer position={'bottom'} size={'small'}></Spacer>
            <TextInput
                placeholder='LinkIn Profile Url'
                text={'e.g https:linkedin.com/username'}
                textAlign={'center'}
                style={{width: 320, height: 43}}
                value={linkedin}
                leftIcon={true}
                iconType={'linkedin-square'}
                iconColor={ '#0077b5' }
                iconSize={ theme.size.xlarge }
                onChangeText={onChangeText('linkedin')}

            />
            <Spacer position={'bottom'} size={'large'}></Spacer>
            {loading ? <ActivityIndicator color={theme.color.primary} /> :

            <Button
                mode={'contained'}
                style={{ width: theme.size.xlarge, height:theme.size.small, color: theme.color.primary}}
                onPress={() => onSubmitForm()}
            >Submit
            </Button>    
            }
            <Spacer position={'bottom'} size={'large'}></Spacer>
        </View>        
       }

     </View>
   </ScrollView>:
    <>
    <ScrollView>  
    <View style={{alignItems: 'center', marginTop: theme.size.small}}>

    <TextInput
        placeholder='Profile Name'
        style={{width: 360}}
        value={profileName}
        text={'* Name is required'}
        onChangeText={onChangeText('profileName')}
    />
    <Spacer position={'bottom'} size={'small'}></Spacer>
    <SelectPicker
        dropdownIconColor={theme.color.white}
        dropdownIconRippleColor={theme.color.white}
        style={{color: theme.color.white, backgroundColor: theme.color.primary, width: 358}}
        mode='dropdown'
        selectedValue={status}
        onValueChange={(itemValue) =>
        selectedPickerText(itemValue)}
    >
    <SelectPicker.Item label={formData.status} value="No Profession" />
    <SelectPicker.Item label="App Developer" value="App developer" />
    <SelectPicker.Item label="Student" value="Student" />
    <SelectPicker.Item label="Manager" value="Manager" />
    <SelectPicker.Item label="Instructor" value="Instructor" />
    <SelectPicker.Item label="Intern" value="Intern" />
    <SelectPicker.Item label="Other" value="Other" />
    </SelectPicker>
    <Spacer position={'bottom'} size={'small'}></Spacer>
    <TextInput
        placeholder='Company'
        style={{width: 360}}
        value={company}
        onChangeText={onChangeText('company')}
    />
    <Spacer position={'bottom'} size={'small'}></Spacer>
    <TextInput
        placeholder='Website'
        value={website}
        style={{width: 360}}
        onChangeText={onChangeText('website')}

    />
    <Spacer position={'bottom'} size={'small'}></Spacer>

    <TextInput
        placeholder='Location'
        style={{width: 360}}
        value={location}
        onChangeText={onChangeText('location')}

    />
    <Spacer position={'bottom'} size={'small'}></Spacer>

    <TextInput
        placeholder='Skills'
        text={'* Skill is required. *Comma separated skills  e.g  js, css'}
        style={{width: 360}}
        value={skills}
        onChangeText={onChangeText('skills')}

    />
    <Spacer position={'bottom'} size={'small'}></Spacer>
    <TextInput
        placeholder='Github Username'
        style={{width: 360}}
        value={githubusername}
        onChangeText={onChangeText('githubusername')}
    />
    <Spacer position={'bottom'} size={'small'}></Spacer>

    <TextInput
        placeholder='Short Bio'
        style={{width: 360, height: 100}}
        value={bio}
        multiline={true}
        noOfLines={1}
        onChangeText={onChangeText('bio')}
    />                
    {!toggleSocialInput ?
    <>
        <Spacer position={'bottom'} size={'large'}></Spacer>
        {loading ? <ActivityIndicator color={theme.color.primary} /> :

        <Button
            mode={'contained'}
            style={{ width: theme.size.xlarge, height:theme.size.small, color: theme.color.primary}}
            onPress={() => onSubmitForm(update=true)}
        >Update
        </Button>
        }
        <Spacer position={'bottom'} size={'small'}></Spacer>
        
        <TextButton
            buttonText={'Add Social Network Links :'}
            text={"Optional"}
            buttonPosition={'left'}
            onPress={()=> setToggleSocialInput(true)}
        />

    </>:
    <View style={{ flexGrow:1,alignItems: 'center', paddingTop: theme.size.small}}>
        <TextButton
            buttonText={'Add Social Network Links :'}
            text={"Optional"}
            buttonPosition={'left'}
            onPress={()=> setToggleSocialInput(false)}
        />
        <Spacer position={'bottom'} size={'small'}></Spacer>
        <TextInput
            placeholder='Facebook Profile Url'
            text={'e.g https:facebook.com/user name'}
            textAlign={'center'}
            style={{width: 320, height: 42}}
            value={facebook}
            leftIcon={true}
            iconType={'facebook-square'}
            iconColor={ theme.color.facebook }
            iconSize={ theme.size.xlarge }
            onChangeText={onChangeText('facebook')}
            />
        <Spacer position={'bottom'} size={'small'}></Spacer>
        <TextInput
                placeholder='Twitter Profile Url'
                text={'e.g https:twitter.com/user name'}
                textAlign={'center'}
                style={{width: 320,height: 42 }}
                value={twitter}
                leftIcon={true}
                iconType={'twitter'}
                iconColor={ theme.color.twitter }
                iconSize={ theme.size.xlarge }
                onChangeText={onChangeText('twitter')}

            />
        <Spacer position={'bottom'} size={'small'}></Spacer>
         <TextInput
            placeholder='Youtube Channel Url'
            text={'e.g https:youtube.com/channel name'}
            textAlign={'center'}
            style={{width: 320, height: 42}}
            value={youtube}
            leftIcon={true}
            iconType={'youtube'}
            iconColor={ theme.color.youtube }
            iconSize={ theme.size.xlarge }
            onChangeText={onChangeText('youtube')}
        />
        <Spacer position={'bottom'} size={'small'}></Spacer>
        <TextInput
            placeholder='LinkIn Profile Url'
            text={'e.g https:linked.com/user name'}
            textAlign={'center'}
            style={{width: 320, height: 43}}
            value={linkedin}
            leftIcon={true}
            iconType={'linkedin-square'}
            iconColor={ '#0077b5' }
            iconSize={ theme.size.xlarge }
            onChangeText={onChangeText('linkedin')}

        />
        <Spacer position={'bottom'} size={'large'}></Spacer>
        {loading ? <ActivityIndicator color={theme.color.primary} /> :

        <Button
            mode={'contained'}
            style={{ width: theme.size.xlarge, height:theme.size.small, color: theme.color.primary}}
            onPress={() => onSubmitForm(update=true)}
        >Update
        </Button>    
        }
        <Spacer position={'bottom'} size={'large'}></Spacer>
    </View>        
   }

 </View>
</ScrollView>

</>
}

  </>
  )
}
