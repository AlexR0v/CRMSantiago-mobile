import { Button, Icon, Switch }                                              from '@rneui/themed'
import React, { FC, useEffect, useState }                                    from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View }       from 'react-native'
import { Snackbar }                                                          from 'react-native-paper'
import { useDispatch }                                                       from 'react-redux'
import { useOnEditUserMutation, useOnGetUserQuery, useOnGetUsersGroupQuery } from '../../app/services/usersGroup'
import { setIsNotifyVisible }                                                from '../../app/store/notifySlice'
import { IUser }                                                             from '../../types/auth'
import RNPickerSelect                                                        from 'react-native-picker-select'

interface ContactInformationProps {
  id: number
}

const ContactInformation: FC<ContactInformationProps> = ({ id }) => {

  const dispatch = useDispatch()

  const [user, setUser] = useState<IUser>(null)
  const [userGroupIds, setUserUserGroupIds] = useState<number[]>([])
  const [isChange, setIsChange] = useState<boolean>(false)

  const [updateUser, { isLoading: isLoadingMutation }] = useOnEditUserMutation()
  const { data, isLoading, isFetching, refetch } = useOnGetUserQuery(id)
  const group = useOnGetUsersGroupQuery('').data

  useEffect(() => {
    if (data?.user) {
      setUser(data.user)
      setUserUserGroupIds([data.user.user_groups_name[0].pivot.user_group_id])
    }
  }, [data, isFetching, isChange])

  const onSubmit = async () => {
    const body = {
      id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_active: user.is_active,
      phone: user.phone,
      user_group_ids: userGroupIds
    }
    try {
      const { data }: any = await updateUser({ body })
      if (data.success) {
        dispatch(setIsNotifyVisible({ visible: true, message: data.messages }))
      }
    } catch (err) {
      Alert.alert('Error', err.toString())
    }
  }

  if (isLoading || isFetching || isLoadingMutation) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Contact Information</Text>
        <Icon
          type='font-awesome-5'
          name='user-edit'
          size={20}
          color='#969696'
          onPress={() => setIsChange(!isChange)}
        />
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={styles.user_block}>
          <Text style={styles.user_title}>First Name:</Text>
          <Text style={styles.user_title}>Last Name:</Text>
          <Text style={styles.user_title}>Email:</Text>
          <Text style={styles.user_title}>Phone Number:</Text>
          <Text style={styles.user_title}>Profile Group:</Text>
          <Text style={styles.user_title}>Active:</Text>
        </View>
        {
          isChange ?
            <>
              <View style={styles.user_block}>
                <TextInput
                  style={styles.input}
                  value={user.first_name}
                  onChangeText={text => setUser({ ...user, first_name: text })}
                />
                <TextInput
                  style={styles.input}
                  value={user.last_name}
                  onChangeText={text => setUser({ ...user, last_name: text })}
                />
                <TextInput
                  style={styles.input}
                  value={user.email}
                  onChangeText={text => setUser({ ...user, email: text })}
                />
                <TextInput
                  style={styles.input}
                  value={user.phone}
                  onChangeText={text => setUser({ ...user, phone: text })}
                />
                <RNPickerSelect
                  items={group as any}
                  style={{
                    placeholder: {
                      color: '#000000'
                    }
                  }}
                  placeholder={{
                    label: user.user_groups_name[0].name,
                    value: user.user_groups_name[0].pivot.user_group_id
                  }}
                  onValueChange={(value) => setUserUserGroupIds([Number(value)])}
                />
                <Text style={styles.user_title}>
                  <Switch
                    value={user.is_active === 1}
                    color='#84c884'
                    onValueChange={(value) => setUser({ ...user, is_active: value ? 1 : 0 })}
                  />
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
                  <Button
                    buttonStyle={{ backgroundColor: '#84c884' }}
                    containerStyle={{
                      height: 40,
                      width: 80,
                      marginHorizontal: 5
                    }}
                    onPress={onSubmit}
                    title='Save'
                  />
                  <Button
                    buttonStyle={{ backgroundColor: '#a8a8a8' }}
                    containerStyle={{
                      height: 40,
                      width: 80,
                      marginHorizontal: 5
                    }}
                    onPress={() => {
                      refetch()
                      setIsChange(false)
                    }}
                    title='Cancel'
                  />
                </View>
              </View>
            </> :
            <View style={styles.user_block}>
              <Text style={styles.user_title}>{data.user.first_name}</Text>
              <Text style={styles.user_title}>{data.user.last_name}</Text>
              <Text style={styles.user_title}>{data.user.email}</Text>
              <Text style={styles.user_title}>{data.user.phone}</Text>
              <Text style={styles.user_title}>{data.user.user_groups_name[0].name}</Text>
              <Text style={styles.user_title}>
                <Switch
                  value={!!data.user.is_active}
                  color='#84c884'
                />
              </Text>
            </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10
  },
  title: {
    fontWeight: 'bold',
    color: '#000000'
  },
  user_block: {
    paddingLeft: 30
  },
  user_title: {
    paddingVertical: 15,
    color: '#000000'
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#969696'
  }

})

export default ContactInformation

