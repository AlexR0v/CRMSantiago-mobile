import { useNavigation }                              from '@react-navigation/native'
import { Button, Input }                              from '@rneui/themed'
import React, { useEffect, useState }                 from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import { useOnChangePassMutation }                    from '../../app/services/login'
import { EMAIL_REGEX }                                from '../../utils/regExp'
import { timeout }                                    from '../../utils/timeout'

const ResetPassForm = () => {

  const navigation = useNavigation<any>()

  const [onChangePass] = useOnChangePassMutation()

  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsValidEmail(false)
  }, [email])

  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(email)) {
      return setIsValidEmail(true)
    }
    const body = {
      identifier: email
    }
    try {
      setLoading(true)
      const data: any = await onChangePass({ body })
      if (data?.data?.success) {
        Alert.alert('Success', 'Your password has been successfully changed')
        await timeout(2000)
        return navigation.navigate('Login')
      }
      setLoading(false)
      setEmail('')
      return Alert.alert('Error', 'Initial server error')
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
            title='RESET PASSWORD'
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

export default ResetPassForm

