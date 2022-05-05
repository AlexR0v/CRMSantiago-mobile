import { Icon }                                                 from '@rneui/themed'
import React, { FC }                                            from 'react'
import { SafeAreaView, StyleSheet, Text, View }                 from 'react-native'
import { Button, Dialog, Drawer, Paragraph, Portal, Searchbar } from 'react-native-paper'
import { useDispatch }                                          from 'react-redux'
import { setTripSearch }                                        from '../../app/store/tripsSearchSlice'
import Table                                                    from '../../components/trips/Table'

const Trips: FC = () => {

  const [searchQuery, setSearchQuery] = React.useState('')
  const [visible, setVisible] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)

  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: '#eeeeee' }}>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title>Add new Trip</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This dialog for add new trip</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Save</Button>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={visible2}
          onDismiss={() => setVisible2(false)}
        >
          <Dialog.Title>Filters</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This dialog for add filter trips</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible2(false)}>Apply</Button>
            <Button onPress={() => setVisible2(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View
        style={styles.container}
      >
        <Icon
          onPress={() => setVisible2(true)}
          type='ant-design'
          name='filter'
          size={25}
          color='blue'
        />
        <Icon
          onPress={() => setVisible(true)}
          type='ant-design'
          name='addfile'
          size={25}
          color='#84c884'
        />
        <Icon
          //onPress={() => navigation.navigate('Trips')}
          type='ant-design'
          name='export'
          size={25}
        />
      </View>
      <View
        style={styles.container}
      >
        <Searchbar
          style={{ color: '#000000', width: '100%', height: '80%' }}
          placeholderTextColor='gray'
          placeholder='Filter...'
          onChangeText={text => {
            setSearchQuery(text)
            if (!text) {
              dispatch(setTripSearch(''))
            }
          }}
          value={searchQuery}
          onIconPress={() => {
            dispatch(setTripSearch(searchQuery))
          }}
        />
      </View>
      <Table />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  }
})

export default Trips
