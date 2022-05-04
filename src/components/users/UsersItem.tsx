import { Avatar, ListItem }       from '@rneui/themed'
import React, { FC, useState }    from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IUser }                  from '../../types/auth'
import ContactInformation         from './ContactInformation'

interface IUserItem {
  user: IUser
}

const UserItem: FC<IUserItem> = ({ user }) => {

  const [expanded, setExpanded] = useState<boolean>(false)

  const userLetters = (user?.first_name ? user?.first_name?.substring(0, 1) : '') +
    (user?.last_name ? user?.last_name?.substring(0, 1) : '')
  return (
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar
              size={64}
              rounded
              source={user.avatar === null ? undefined : { uri: user?.avatar }}
              title={user.avatar === null
                ? userLetters
                : undefined}
              containerStyle={{ backgroundColor: 'purple' }}
            />
            <View style={{ marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</Text>
                <View style={styles.pivot}>
                  <Text style={styles.pivot_text}>{user?.user_groups_name[0]?.name}</Text>
                </View>
              </View>
              <Text>{user?.email}</Text>
            </View>
          </View>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded)
      }}
    >
      <ContactInformation id={user.id} />
    </ListItem.Accordion>
  )
}

const styles = StyleSheet.create({
  pivot: {
    paddingHorizontal: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 18,
    backgroundColor: '#9744d0',
    marginLeft: 20
  },
  pivot_text: {
    color: '#ffffff',
    fontSize: 10
  }
})

export default UserItem
