import React from 'react'
import { useRouter } from 'next/router';
const page = () => {
    const router = useRouter()

  return (
    <div>page {router.query}</div>
  )
}

export default page