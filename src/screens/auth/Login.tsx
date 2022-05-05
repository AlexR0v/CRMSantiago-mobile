import React, { FC }              from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoginForm                  from '../../components/auth/LoginForm'
import AuthLayout                 from '../../ui/auth/AuthLayout'

interface ILogin {
  navigation: any
}

const Login: FC<ILogin> = ({ navigation }) => {
  return (
    <AuthLayout>
      <View style={styles.text_wrap}>
        <Text style={styles.text}>Sign in</Text>
      </View>
      <View style={styles.form_wrap}>
        <LoginForm />
      </View>
      <View style={styles.link_block}>
        <Text
          style={styles.text_link}
          onPress={() => navigation.navigate('ResetPass')}
        >I don’t remember my password</Text>
      </View>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 20,
    color: '#000000'
  },
  text_link: {
    color: '#000000',
    fontSize: 16,
    marginVertical: 20,
    textDecorationLine: 'underline'
  },
  link_block: {
    alignItems: 'center',
    width: '100%'
  },
  text_wrap: {
    width: '100%'
  },
  form_wrap: {
    width: '100%'
  }
})

export default Login
