import React from 'react'
import {useRouter} from 'next/router'
const DynamicUser = () => {
    const {query} = useRouter()
  return (
    <div>Hello Dynamic setting index</div>
  )
}

export default DynamicUser