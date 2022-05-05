import { useEffect, useRef } from 'react'

export const useChangeSet = (fn, inputs) => {
  const didMountRef = useRef(false)
  const dependencies = Array.isArray(inputs) ? inputs : [inputs]
  useEffect(() => {
    if (didMountRef.current)
      fn()
    else
      didMountRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}
