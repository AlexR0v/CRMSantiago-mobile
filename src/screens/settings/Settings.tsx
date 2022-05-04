import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon }                     from '@rneui/themed'
import React, { FC }                from 'react'
import { StyleSheet, Text, View }   from 'react-native'
import General                      from './General'
import UsersGroup                   from './users/UsersGroup'

const Tab = createBottomTabNavigator()

const Settings: FC = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName = ''
          let iconType = ''
          if (route.name === 'General') {
            iconName = 'construction'
            iconType = 'material-icons'
            size = focused ? 25 : 20
          } else if (route.name === 'UsersGroup') {
            iconName = 'users'
            iconType = 'entypo'
            size = focused ? 25 : 20
          }
          return (
            <Icon
              type={iconType}
              name={iconName}
              size={size}
              color={color}
            />
          )
        }
      })}
    >
      <Tab.Screen
        name='General'
        component={General}
      />
      <Tab.Screen
        name='UsersGroup'
        component={UsersGroup}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default Settings
