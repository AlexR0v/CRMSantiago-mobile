import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Icon }                          from '@rneui/themed'
import React, { FC }                     from 'react'
import { StyleSheet, Text, View }        from 'react-native'
import General                           from '../General'
import SecurityControl                   from './SecurityControl'
import Users                             from './Users'

const Tab = createMaterialTopTabNavigator()

const UsersGroup: FC = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = ''
          let iconType = ''
          if (route.name === 'Users') {
            iconName = 'addusergroup'
            iconType = 'ant-design'
          } else if (route.name === 'SecurityControl') {
            iconName = 'security'
            iconType = 'material-icons'
          }
          return (
            <Icon
              type={iconType}
              name={iconName}
              size={focused ? 25 : 20}
              color={color}
            />
          )
        }
      })}
    >
      <Tab.Screen
        name='Users'
        component={Users}
      />
      <Tab.Screen
        name='SecurityControl'
        component={SecurityControl}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default UsersGroup
