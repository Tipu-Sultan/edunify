import React from 'react'
import {useRouter} from 'next/router'
const DynamicUser = () => {
    const {query} = useRouter()
  return (
    <div>Hello Setting {query.username}</div>
  )
}

export default DynamicUser