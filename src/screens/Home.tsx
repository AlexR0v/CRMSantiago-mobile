import React, { FC }  from 'react'
import { Text, View } from 'react-native'

interface IHome {

}

const Home: FC<IHome> = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, color: '#000000' }}>Home</Text>
    </View>
  )
}

export default Home
