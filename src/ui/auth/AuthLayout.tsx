import React, { FC, ReactNode }                            from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
import Logo                                                from '../logo/Logo'

interface iAuthLayout {
  children: ReactNode
}

const AuthLayout: FC<iAuthLayout> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        resizeMode='cover'
        source={require('../../../assets/images/bg-login.png')}
        style={styles.image}
      >
        <View style={styles.block}>
          <View style={styles.block_login}>
            <Logo />
            {children}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  block_login: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 35,
    alignItems: 'flex-start'
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default AuthLayout
