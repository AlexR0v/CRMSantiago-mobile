import { useNavigation }                                                         from '@react-navigation/native'
import React, { FC, useState }                                                   from 'react'
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataTable }                                                             from 'react-native-paper'
import { useOnGetTripsTableDataQuery }                                           from '../../app/services/tripSearch'
import { formatDate }                                                            from '../../utils/formatDate'
import { columns }                                                               from './columns'
import { initialStateQuery }                                                     from './initialSateQuery'

const Table: FC = () => {

  const { navigate } = useNavigation<any>()

  const [page, setPage] = React.useState<number>(1)
  const [refresh, setRefresh] = useState(false)

  const { data, isLoading, isFetching, refetch } = useOnGetTripsTableDataQuery(initialStateQuery)

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
    <ScrollView>
      <ScrollView
        horizontal
        style={{ backgroundColor: '#ffffff' }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        }
      >
        <DataTable>
          <DataTable.Header>
            {
              columns.map(item => (
                <DataTable.Title
                  key={item.id}
                  numberOfLines={2}
                  textStyle={{ alignContent: 'center', width: 90 }}
                  style={[styles.title]}
                >{item.label}</DataTable.Title>
              ))
            }
          </DataTable.Header>
          {
            data?.trips.map(trip => {
              return (
                <DataTable.Row
                  key={trip.id}
                >
                  <DataTable.Cell
                    centered
                    style={{ width: 10 }}
                    onPress={() => navigate('TripDetails',
                      { id: trip.id, name: trip.trip_name, search_hash: data.search_hash })}
                  >
                    <Text
                      style={[
                        styles.text,
                        { color: 'blue', textDecorationLine: 'underline' }
                      ]}
                    >{trip.trip_name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 10, justifyContent: 'center' }}
                  >
                    <Text
                      style={styles.text}
                    >{trip.customer_name}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 10, justifyContent: 'center' }}
                  >
                    <Text style={styles.text}>{trip.operations_owner}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 10, justifyContent: 'center' }}
                  >
                    <Text style={styles.text}>{formatDate(trip.created_date)}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 10, justifyContent: 'center' }}
                  >
                    <Text style={styles.text}>{formatDate(trip.start_date)}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 10, justifyContent: 'center' }}
                  >
                    <Text style={styles.text}>{formatDate(trip.end_date)}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 10 }}
                  >
                    <Text style={styles.text}>{trip.business_trip_price}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    //style={{ width: 10 }}
                  >
                    <Text style={styles.text}>{trip.business_cost_margin}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                  >
                    <Text style={styles.text}>{trip.travellers}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 10 }}
                  >
                    <Text style={styles.text}>{trip.start_location}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.end_location}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.general_status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.accommodation_status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.normal_status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.luggage_status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.other_status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.voucher_status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.insurance_status}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.pending_tasks}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>{trip.overdue_tasks}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    centered
                    style={{ width: 50 }}
                  >
                    <Text style={styles.text}>
                      <>
                        {trip.tags.map(item => (
                          <Text
                            key={item.tag_id}
                          >
                            {item.tag_name}
                          </Text>
                        ))}
                      </>
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )
            })
          }
        </DataTable>
      </ScrollView>
      <View style={styles.pagination}>
        <Text>Total count: {data.all_count}</Text>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.round(data.all_count / 10)}
          onPageChange={(page) => {
            setPage(page)
            refetch()
          }}
          label={`${page}-10 of ${Math.round(data.all_count / 10)}`}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#000000',
    paddingHorizontal: 5,
    fontWeight: 'bold'
  },
  text: {
    color: '#000000',
    fontSize: 10
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default Table

