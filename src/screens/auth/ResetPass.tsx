import React, { FC }              from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ResetPassForm              from '../../components/auth/ResetPassForm'
import AuthLayout                 from '../../ui/auth/AuthLayout'

interface IResetPass {
  navigation: any
}

const ResetPass: FC<IResetPass> = ({ navigation }) => {
  return (
    <AuthLayout>
      <View style={styles.text_wrap}>
        <Text style={styles.text}>Reset password</Text>
      </View>
      <View style={styles.form_wrap}>
        <ResetPassForm />
      </View>
      <View style={styles.link_block}>
        <Text
          style={styles.text_link}
          onPress={() => navigation.navigate('Login')}
        >Back to login</Text>
      </View>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 20
  },
  link_block: {
    alignItems: 'center',
    width: '100%'
  },
  text_link: {
    fontSize: 16,
    marginVertical: 20,
    textDecorationLine: 'underline'
  },
  text_wrap: {
    width: '100%'
  },
  form_wrap: {
    width: '100%'
  }
})

export default ResetPass
