import AsyncStorage                                   from '@react-native-async-storage/async-storage'
import { useNavigation }                              from '@react-navigation/native'
import { SerializedError }                            from '@reduxjs/toolkit'
import { FetchBaseQueryError }                        from '@reduxjs/toolkit/query'
import { Button, CheckBox, Icon, Input }              from '@rneui/themed'
import React, { useEffect, useState }                 from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import { useDispatch }                                from 'react-redux'
import { useOnLoginMutation }                         from '../../app/services/login'
import { setIsLoading, setUserInformation }           from '../../app/store/userSlice'
import { setUserVerifyInformation }                   from '../../app/store/virifySlice'
import { IAuth }                                      from '../../types/auth'
import { EMAIL_REGEX }                                from '../../utils/regExp'

interface IResponse {
  data?: IAuth
  error?: FetchBaseQueryError | SerializedError
}

const LoginForm = () => {

  const navigation = useNavigation<any>()

  const [onLogin] = useOnLoginMutation()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)

  const [password, setPassword] = useState('')
  const [isHidePassword, setIsHidePassword] = useState(true)
  const [isValidPass, setIsValidPass] = useState(false)

  const [isRememberMe, setIsRememberMe] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsValidEmail(false)
    setLoading(false)
  }, [email])

  useEffect(() => {
    setIsValidPass(false)
  }, [password])

  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(email)) {
      return setIsValidEmail(true)
    }
    if (!password) {
      return setIsValidPass(true)
    }
    const body = {
      identifier: email,
      password,
      remember: isRememberMe
    }
    try {
      setLoading(true)
      const data: IResponse = await onLogin({ body })
      if (data?.data?.is_need_verify) {
        setLoading(false)
        dispatch(setUserVerifyInformation(data?.data))
        navigation.navigate('Verify')
        return
      }
      if (data?.data?.success) {
        dispatch(setIsLoading(true))
        setLoading(false)
        dispatch(setUserInformation(data?.data))
        console.log('login:  ' + data?.data?.access_token)
        await AsyncStorage.setItem('token', data?.data?.access_token)
        await AsyncStorage.setItem('rights', JSON.stringify(data?.data?.right))
        await AsyncStorage.setItem('avatar', JSON.stringify(data?.data?.user.avatar))
        await AsyncStorage.setItem('userId', JSON.stringify(data?.data?.user.id))
        await AsyncStorage.setItem('userFirstName', JSON.stringify(data?.data?.user.first_name))
        await AsyncStorage.setItem('userLastName', JSON.stringify(data?.data?.user.last_name))
        dispatch(setIsLoading(false))
        return
      }
      if (!data?.data?.success) {
        setLoading(false)
        return Alert.alert('Error', Object.values(data?.data?.errors).join(', '))
      }
      setLoading(false)
      setEmail('')
      setPassword('')
      setIsHidePassword(true)
      setIsRememberMe(false)
    } catch (err: any) {
      Alert.alert('Error', err.toString())
    }
  }

  return (
    <>
      <Input
        placeholder='Email address'
        inputContainerStyle={{ borderWidth: 1 }}
        value={email}
        onChangeText={setEmail}
        errorStyle={{ color: 'red' }}
        errorMessage={isValidEmail ? 'Enter valid email' : undefined}
      />
      <Input
        placeholder='Password'
        inputContainerStyle={{ borderWidth: 1 }}
        value={password}
        onChangeText={setPassword}
        errorStyle={{ color: 'red' }}
        errorMessage={isValidPass ? 'Enter password' : undefined}
        secureTextEntry={isHidePassword}
        rightIcon={
          <Icon
            type='feather'
            name={isHidePassword ? 'eye-off' : 'eye'}
            size={24}
            color='black'
            onPress={() => setIsHidePassword(!isHidePassword)}
          />
        }
      />
      <View style={styles.checkbox_wrap}>
        <CheckBox
          title='Remember me'
          checked={isRememberMe}
          onPress={() => {
            setIsRememberMe(!isRememberMe)
          }}
        />
      </View>
      {
        loading
          ? (
            <View style={styles.loader_wrap}>
              <ActivityIndicator
                animating
                color='blue'
              />
            </View>
          )
          : <Button
            title='SUBMIT'
            onPress={handleSubmit}
          />
      }
    </>
  )
}

const styles = StyleSheet.create({
  checkbox_wrap: {
    flexDirection: 'row',
    alignItems: 'center'
    //marginVertical: 20
  },
  loader_wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18
  }
})

export default LoginForm

