import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { UserList } from '../components/userList'
import { localApi } from '../services/axios/localApi'

const Home: NextPage = () => {
  

  return (
    <UserList />
  )
}

export default Home
