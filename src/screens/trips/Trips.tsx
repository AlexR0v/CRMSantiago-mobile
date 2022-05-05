import React, { FC }                from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Button }                   from 'react-native-paper'
import Table                        from '../../components/trips/Table'

const Trips: FC = () => {

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: '#eeeeee' }}>
      <View
        style={{
          marginBottom: 10,
          padding: 10,
          justifyContent: 'space-around',
          flexDirection: 'row',
          backgroundColor: '#ffffff'
        }}
      >
        <Button
          mode='contained'
          color='#84c884'
        >
          <Text style={{ color: '#ffffff' }}>Add new</Text>
        </Button>
        <Button mode='contained'>
          <Text>Show Filters</Text>
        </Button>
      </View>
      <Table />
    </SafeAreaView>
  )
}

export default Trips
