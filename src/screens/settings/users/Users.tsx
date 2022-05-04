import React, { FC, memo }                                       from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native'
import { useSelector }                                           from 'react-redux'
import { useOnGetUsersListQuery }                                from '../../../app/services/usersGroup'
import { userInformation }                                       from '../../../app/store/userSlice'
import UserItem                                                  from '../../../components/users/UsersItem'

const Users: FC = () => {

  const user = useSelector(userInformation)

  const { data, isLoading } = useOnGetUsersListQuery(user.access_token)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  const renderItem = ({ item }: any) => (
    <UserItem user={item} />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id ? item.id.toString() : 'null'}
      />
    </SafeAreaView>
  )
}

export default memo(Users)
