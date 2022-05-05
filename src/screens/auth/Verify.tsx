import React, { FC }              from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector }            from 'react-redux'
import { userVerifyInformation }  from '../../app/store/virifySlice'
import VerifyForm                 from '../../components/auth/VerifyForm'
import AuthLayout                 from '../../ui/auth/AuthLayout'

interface IVerify {
  navigation: any
}

const Verify: FC<IVerify> = ({ navigation }) => {

  const user = useSelector(userVerifyInformation)

  return (
    <AuthLayout>
      <View style={styles.text_wrap}>
        <Text style={styles.text}>Verify</Text>
      </View>
      <View style={styles.text_wrap}>
        <Text style={styles.text_small}>
          Sms was sent to phone *** ** ** {user.phone}.
          Please enter secure code below:
        </Text>
      </View>
      <View style={styles.form_wrap}>
        <VerifyForm />
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
  text_small: {
    fontSize: 14,
    marginVertical: 20,
    color: '#000000'
  },
  link_block: {
    alignItems: 'center',
    width: '100%'
  },
  text_link: {
    fontSize: 16,
    marginVertical: 20,
    textDecorationLine: 'underline',
    color: '#000000'
  },
  text_wrap: {
    width: '100%'
  },
  form_wrap: {
    width: '100%'
  }
})

export default Verify
