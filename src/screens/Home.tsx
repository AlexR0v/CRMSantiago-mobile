import AsyncStorage                                            from '@react-native-async-storage/async-storage'
import { useNavigation }                                       from '@react-navigation/native'
import { Button }                                              from '@rneui/themed'
import React, { FC }                                           from 'react'
import { StyleSheet, Text, View }                              from 'react-native'
import { useDispatch, useSelector }                            from 'react-redux'
import { clearUserInformation, setIsLoading, userInformation } from '../app/store/userSlice'

interface IHome {

}

const Home: FC<IHome> = () => {

  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const user = useSelector(userInformation)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Text>{user?.user?.first_name} {user?.user?.last_name}</Text>
      <Button
        title='LOGOUT'
        onPress={async () => {
          dispatch(setIsLoading(true))
          dispatch(clearUserInformation())
          await AsyncStorage.clear()
          dispatch(setIsLoading(false))
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Home
