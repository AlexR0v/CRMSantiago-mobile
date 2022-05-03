import React, { FC }         from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo: FC = () => {
  return (
    <Image
      style={styles.logo}
      source={require('../../../assets/images/logo.png')}
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 204,
    height: 48
  }
})

export default Logo

