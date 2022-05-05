import { createBottomTabNavigator }      from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Icon }                          from '@rneui/themed'
import React, { FC }                     from 'react'
import GeneralView                       from './GeneralView'
import HistoryView                       from './HisoryView'

const Tab = createMaterialTopTabNavigator()

const TripDetails: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = ''
          let iconType = ''
          if (route.name === 'GeneralView') {
            iconName = 'construction'
            iconType = 'material-icons'
          } else if (route.name === 'HistoryView') {
            iconName = 'history'
            iconType = 'font-awesome'
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
        name='GeneralView'
        component={GeneralView}
        options={{
          title: 'General View'
        }}
      />
      <Tab.Screen
        name='HistoryView'
        component={HistoryView}
        options={{
          title: 'History View'
        }}
      />
    </Tab.Navigator>
  )
}

export default TripDetails

