'use client'

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/Profile'

const MyProfile = () => {
const [posts, setPosts] = useState([])
const {data: session} = useSession()

useEffect(() =>{
    const fetchPost = async () =>{
        const response = await fetch(`/api/user/${session?.user.id}/posts`)
        const data = await response.json()

        setPosts(data)
    }
    console.log(posts)

    fetchPost()
}, [])

    const handleEdit = () =>{

    }

   const handleDelete = async () =>{

   }
  return (
    <MyProfile 
    name = "My"
    desc="Welcome to your personalized profile page"
    data={[posts]}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile