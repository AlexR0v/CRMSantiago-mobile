import AsyncStorage                                          from '@react-native-async-storage/async-storage'
import { createDrawerNavigator }                             from '@react-navigation/drawer'
import { createNativeStackNavigator }                        from '@react-navigation/native-stack'
import { Button, Icon }                                      from '@rneui/themed'
import React, { useEffect, useState }                        from 'react'
import { ActivityIndicator, View }                           from 'react-native'
import { useDispatch, useSelector }                          from 'react-redux'
import { setIsLoading, setUserInformation, userInformation } from '../app/store/userSlice'
import NavigationDrawer                                      from '../components/NavigationDrawer'
import Login                                                 from '../screens/auth/Login'
import ResetPass                                             from '../screens/auth/ResetPass'
import Verify                                                from '../screens/auth/Verify'
import Dossiers                                              from '../screens/Dossiers'
import Home                                                  from '../screens/Home'
import Invoices                                              from '../screens/Invoices'
import Locations                                             from '../screens/Locations'
import Providers                                             from '../screens/Providers'
import Settings                                              from '../screens/settings/Settings'
import Tasks                                                 from '../screens/Tasks'
import Transfers                                             from '../screens/Transfers'
import TripDetails                                           from '../screens/trips/TripDetails'
import Trips                                                 from '../screens/trips/Trips'
import { routeMainList }                                     from './routeList'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Navigation = () => {

  const dispatch = useDispatch()
  const user = useSelector(userInformation)

  const getToken = async () => {
    try {
      const dataToken = await AsyncStorage.getItem('token')
      const dataUserId = await AsyncStorage.getItem('userId')
      const dataUserAva = await AsyncStorage.getItem('avatar')
      const dataUserFirstName = await AsyncStorage.getItem('userFirstName')
      const dataUserLastName = await AsyncStorage.getItem('userLastName')
      if (dataUserId && dataUserFirstName && dataUserLastName) {
        const user = {
          id: Number(dataUserId),
          avatar: dataUserAva ? JSON.parse(dataUserAva) : null,
          first_name: JSON.parse(dataUserFirstName || ''),
          last_name: JSON.parse(dataUserLastName || '')
        }
        dispatch(setUserInformation({ access_token: dataToken, user }))
      }
      dispatch(setIsLoading(false))
    } catch (err: any) {
      //Alert.alert('Error', err.toString())
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  if (user.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <>
      {
        !user.access_token ?
          <Stack.Navigator>
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ResetPass'
              component={ResetPass}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Verify'
              component={Verify}
              options={{ headerShown: false }}
            />
          </Stack.Navigator> :
          <Drawer.Navigator
            useLegacyImplementation
            initialRouteName='Home'
            drawerContent={props => <NavigationDrawer {...props} />}
            screenOptions={{
              headerTintColor: '#ffffff',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#313949'
              }
            }}
          >
            <Drawer.Screen
              name='Home'
              component={Home}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='feather'
                    name='home'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Tasks'
              component={Tasks}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='font-awesome-5'
                    name='tasks'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Trips'
              component={Trips}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='material-icons'
                    name='card-travel'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Providers'
              component={Providers}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='font-awesome'
                    name='handshake-o'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Locations'
              component={Locations}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='font-awesome-5'
                    name='city'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Transfers'
              component={Transfers}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='material-icons'
                    name='transform'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Dossiers'
              component={Dossiers}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='entypo'
                    name='text-document'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Invoices'
              component={Invoices}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='font-awesome-5'
                    name='file-invoice-dollar'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Drawer.Screen
              name='Settings'
              component={Settings}
              options={{
                drawerIcon: ({ focused }) => (
                  <Icon
                    type='feather'
                    name='settings'
                    size={focused ? 25 : 20}
                    color={focused ? '#0080ff' : '#999999'}
                  />
                )
              }}
            />
            <Stack.Screen
              name='TripDetails'
              component={TripDetails}
              options={({ route, navigation }: any) => ({
                title: route.params?.name ? route.params?.name : '',
                headerRight: () => (
                  <Icon
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate('Trips')}
                    type='ant-design'
                    name='arrowleft'
                    size={30}
                    color='#fff'
                  />
                )
              })}
            />
          </Drawer.Navigator>
      }
    </>
  )
}

export default Navigation

