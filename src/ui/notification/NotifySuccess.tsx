import React, { FC }                           from 'react'
import { Snackbar }                            from 'react-native-paper'
import { useDispatch, useSelector }            from 'react-redux'
import { isNotifyVisible, setIsNotifyVisible } from '../../app/store/notifySlice'

const NotifySuccess: FC = () => {

  const notify = useSelector(isNotifyVisible)
  const dispatch = useDispatch()

  return (
    <Snackbar
      duration={2000}
      style={{ backgroundColor: '#84c884' }}
      visible={notify.visible}
      onDismiss={() => dispatch(setIsNotifyVisible({ visible: false, message: '' }))}
    >
      {notify.message}
    </Snackbar>
  )
}

export default NotifySuccess

