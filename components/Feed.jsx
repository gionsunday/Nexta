'use client'

import { useState, useEffect } from "react"
import PromptCards from "./PromptCards"
import { set } from "mongoose"

const PromptCardList = ({data, handleTagClick })=>{
 return (
  <div className="mt-16 prompt_layout">
     {data.map((post) => (
      <PromptCards 
      key={post._id}
      post={post}
      handleTagClick ={handleTagClick} />
     ))}
  </div>
 )
}
const Feed = () => {
  const [searchText, setSearchText] = useState()
  const [posts, setPosts] = useState([])
  
  const [searchTimeout, setSearchTimeout] = useState()
  const [searchResults, setSearchResults] = useState([])
  
  const fetchPost = async ()=>{
    const response = await fetch('/api/prompt')
    const data = await response.json()
    setPosts(data)
    setSearchResults(data)
  }

  const filterPrompts = (searchText) =>{
    const regex = new RegExp(searchText, 'i')

    return posts.filter((item) =>
         regex.test(item.creator.username) ||
         regex.test(item.tag) ||
         regex.test(item.prompt)
    )
  }
  
  
  const handleSearchChange = (e) =>{
       const newSearchWord = e.target.value
       clearTimeout(searchTimeout)
       setSearchText(newSearchWord)

       setSearchTimeout(
        setTimeout(() =>{
          const searchResult = filterPrompts(e.target.value)
          setSearchResults(searchResult)
          console.log(searchResult.length)
          if(searchResult.length == 0){
            fetchPost()
            setSearchResults(posts)
          }
          setPosts(searchResults)

        }, 500)
       )
  }

  const handleTagClick = (tag) =>{
    setSearchText(tag)

    const searchResult = filterPrompts(tag)
    setSearchResults(searchResult)
    if(searchResult.length == 0){
      setPosts(posts)
    }
    setPosts(searchResults)

  }
  useEffect(() =>{
   
    fetchPost()
    setSearchResults(posts)
   
  }, [])


  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text"
        placeholder="Search for a tag or username" 
        onChange={handleSearchChange}
        value={searchText}
        required
        className="search_input peer"/>
      </form>

      <PromptCardList
       data= {searchResults} 
       handleTagClick={handleTagClick} />
      
    </section>
  )
}

export default Feed