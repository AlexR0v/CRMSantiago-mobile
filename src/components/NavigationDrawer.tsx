import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { Avatar, Icon }                                        from '@rneui/themed'
import React, { FC }                                           from 'react'
import { StyleSheet, Text, View }                              from 'react-native'
import { useSelector }                                         from 'react-redux'
import { userInformation }                                     from '../app/store/userSlice'
import Logo                                                    from '../ui/logo/Logo'

interface NavigationDrawerProps {

}

const NavigationDrawer: FC<NavigationDrawerProps> = (props: any) => {
  const { user } = useSelector(userInformation)
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.avatar_block}>
        <Logo />
      </View>
      <View style={styles.avatar_block}>
        <Avatar
          size={64}
          rounded
          source={user?.avatar ? { uri: user?.avatar } : {}}
          title={!user?.avatar
            ? user?.first_name?.substring(0, 1) || '' + user?.first_name?.substring(0, 1) || ''
            : undefined}
          containerStyle={{ backgroundColor: 'purple' }}
        />
        <Text>{user?.first_name} {user?.last_name}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logout_block}>
        <DrawerItem
          label='Logout'
          icon={() => (
            <Icon
              type='feather'
              name='log-out'
              size={20}
              color={'#999999'}
            />
          )}
          onPress={() => {
            props.navigation.closeDrawer()
          }}
        />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  avatar_block: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10
  },
  logout_block: {
    width: '80%',
    marginTop: 30
  }
})

export default NavigationDrawer

