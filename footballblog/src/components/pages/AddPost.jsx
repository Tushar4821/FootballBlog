import React from 'react'
import { PostForm } from '../index'
import Container from '../Container/Container'

function AddPost() {
  return (
    <div className="min-h-screen bg-[#1A2238] py-10 md:py-12">
      <Container>
        <div 
          className="
            mx-auto max-w-3xl 
            bg-[#242F4A]/70 
            backdrop-blur-sm 
            border border-gray-700/40 
            rounded-xl 
            shadow-xl 
            shadow-black/30 
            p-6 md:p-8 lg:p-10
          "
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-8 tracking-tight">
            Create New Post
          </h1>

          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default AddPost