"use client"

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Profile from '@/components/Profile'
import { connectToDB } from '@/utils/database'

const UserProfile = () => {
const [posts, setPosts] = useState([])
const [user, setUser] = useState([])
const searchParams = useSearchParams()
const router = useRouter()


const creatorId = searchParams.get('id')
//console.log(creatorId)

useEffect(() =>{
    const fetchUser = async () =>{
        const response = await fetch(`/api/users/${creatorId.toString()}/user`)
        const data = await response.json()
        setUser(data)
       //console.log(data)
    }

  fetchUser()
}, [])

useEffect(() =>{
  const fetchPosts = async () =>{
      const response = await fetch(`/api/users/${creatorId.toString()}/posts`)
      const data = await response.json()
      setPosts(data)
     //console.log(data)
  }

fetchPosts()
}, [])


  return (
    <Profile 
    name ="User"
    email={user.email}
    desc="Lorem ipsum dolor sit amet, consectetur adipiscing 
    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    data={posts}
    
    />
  )
}

export default UserProfile
