import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, Title, featuredImage,categories=[] }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] group shadow-xl'>
        
       
        <div className='w-full aspect-video overflow-hidden rounded-xl mb-4'>
          <img 
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={Title} 
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
          />
        </div>

       
        <h2 className='text-xl font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2'>
          {Title}
        </h2>
        
        <div className="mt-3 flex flex-wrap gap-2">
           {categories.map((cat, index) => (
             <span
              key={index}
         className="px-3 py-1 text-xs font-medium rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30"
             >
            {cat}
             </span>
           ))}
        </div>
        
        <div className='mt-3 flex items-center text-sm text-gray-400 font-medium'>
          <span>Read Post</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
          </svg>
        </div>

      </div>
    </Link>
  )
}

export default PostCard