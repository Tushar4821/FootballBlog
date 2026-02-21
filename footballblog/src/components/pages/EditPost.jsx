import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/config'
import Container from '../Container/Container'
import PostForm from '../post-form/PostForm'

function EditPost() {
  const [post, setPost] = useState(null)        
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getPost(slug)
        .then((fetchedPost) => {
          if (fetchedPost) {
            setPost(fetchedPost)
          } else {
            navigate('/')
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error)
          navigate('/')
        })
    }
  }, [slug, navigate])

  // Optional: nice loading state
  if (!post) {
    return (
      <div className="min-h-screen bg-[#1A2238] flex items-center justify-center">
        <div className="text-gray-300 text-xl font-medium animate-pulse">
          Loading post...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A2238] text-gray-100 py-10 md:py-12">
      <Container>
        {/* Card-like wrapper with subtle elevation */}
        <div className="max-w-4xl mx-auto bg-[#242F4A]/70 backdrop-blur-sm 
                        border border-gray-700/40 rounded-2xl shadow-2xl 
                        overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-700/50 bg-[#1E293B]/60">
            <h1 className="text-2xl md:text-3xl font-bold text-indigo-400">
              Edit Post
            </h1>
            <p className="mt-1 text-gray-400 text-sm md:text-base">
              Update your thoughts • {slug}
            </p>
          </div>

          {/* Form area */}
          <div className="p-6 md:p-8">
            <PostForm post={post} />
          </div>

          {/* Optional subtle footer */}
          <div className="px-6 py-4 border-t border-gray-700/50 bg-[#1E293B]/40 
                         text-xs text-gray-500 text-center">
            Changes will be saved to Appwrite • Make sure content is appropriate
          </div>
        </div>
      </Container>
    </div>
  )
}

export default EditPost