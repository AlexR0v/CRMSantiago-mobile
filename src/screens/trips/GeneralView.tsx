import { useRoute }                                                  from '@react-navigation/native'
import React, { FC, useState }                                       from 'react'
import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native'
import { useOnGetTripDetailQuery }                                   from '../../app/services/tripSearch'

const GeneralView: FC = () => {

  const { params }: any = useRoute()

  const dataQuery = {
    accommodation_global_status_id: 2,
    id: params?.id,
    search_hash: params?.search_hash
  }

  const [refresh, setRefresh] = useState(false)

  const { data, isLoading, refetch } = useOnGetTripDetailQuery(dataQuery)

  const onRefresh = async () => {
    setRefresh(true)
    await refetch()
    setRefresh(false)
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <ScrollView
      style={{ backgroundColor: '#ffffff' }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: '#000000' }}>General View</Text>
      </View>
    </ScrollView>
  )
}

export default GeneralView

