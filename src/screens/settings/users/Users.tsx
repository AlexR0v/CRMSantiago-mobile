import React, { FC, memo, useState }                                             from 'react'
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, Text, View } from 'react-native'
import { useDispatch, useSelector }                                              from 'react-redux'
import { useOnGetUsersListQuery }                                                from '../../../app/services/usersGroup'
import { setIsNotifyVisible }                                                    from '../../../app/store/notifySlice'
import { userInformation }                                                       from '../../../app/store/userSlice'
import UserItem
                                                                                 from '../../../components/users/UsersItem'
import NotifySuccess
                                                                                 from '../../../ui/notification/NotifySuccess'

const Users: FC = () => {

  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState(false)

  const user = useSelector(userInformation)

  const { data, isLoading, refetch } = useOnGetUsersListQuery(user.access_token)

  const onRefresh = async () => {
    setRefresh(true)
    await refetch()
    dispatch(setIsNotifyVisible({ visible: true, message: 'Users list updated.' }))
    setRefresh(false)
  }

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
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        }
      />
      <NotifySuccess />
    </SafeAreaView>
  )
}

export default memo(Users)
