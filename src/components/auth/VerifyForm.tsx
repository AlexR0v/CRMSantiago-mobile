import AsyncStorage                                   from '@react-native-async-storage/async-storage'
import { useNavigation }                              from '@react-navigation/native'
import { Button, Input }                              from '@rneui/themed'
import React, { useEffect, useState }                 from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector }                   from 'react-redux'
import { useOnVerifyMutation }                        from '../../app/services/login'
import { setIsLoading, setUserInformation }           from '../../app/store/userSlice'
import { userVerifyInformation }                      from '../../app/store/virifySlice'

const VerifyForm = () => {

  const dispatch = useDispatch()
  const user = useSelector(userVerifyInformation)
  const [onVerify] = useOnVerifyMutation()

  const [code, setCode] = useState('')
  const [isValidCode, setIsValidCode] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsValidCode(false)
    setLoading(false)
  }, [code])

  const handleSubmit = async () => {
    if (!code) {
      return setIsValidCode(true)
    }
    const body = {
      user_id: user.user_id,
      code
    }
    try {
      setLoading(true)
      const data: any = await onVerify({ body })
      if (data.success) {
        setLoading(false)
        dispatch(setIsLoading(true))
        dispatch(setUserInformation(data))
        await AsyncStorage.setItem('token', data?.data?.access_token)
        await AsyncStorage.setItem('rights', JSON.stringify(data?.data?.right))
        await AsyncStorage.setItem('avatar', JSON.stringify(data?.data?.user.avatar))
        await AsyncStorage.setItem('userId', JSON.stringify(data?.data?.user.id))
        await AsyncStorage.setItem('userFirstName', JSON.stringify(data?.data?.user.first_name))
        await AsyncStorage.setItem('userLastName', JSON.stringify(data?.data?.user.last_name))
        dispatch(setIsLoading(true))
        return
      }
      if (!data.success) {
        setLoading(false)
        return Alert.alert('Error', Object.values(data.errors).join(', '))
      }
      setLoading(false)
      setCode('')
    } catch (err: any) {
      setLoading(false)
      Alert.alert('Error', err.toString())
    }
  }

  return (
    <>
      <Input
        placeholder='Security code'
        value={code}
        onChangeText={setCode}
        errorMessage={isValidCode ? 'Required' : undefined}
      />
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
            title='VERIFY'
            onPress={handleSubmit}
          />
      }
    </>
  )
}

const styles = StyleSheet.create({
  loader_wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18
  }
})

export default VerifyForm

