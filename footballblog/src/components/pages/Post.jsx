import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import service from '../../appwrite/config'
import parse from 'html-react-parser'
import { Button, Container } from '../index'

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((fetchedPost) => {
                console.log("POST DATA:", fetchedPost)
                if (fetchedPost) {
                    setPost(fetchedPost)
                } else {
                    navigate('/')
                }
            }).catch(err => {
                console.error(err)
                navigate('/')
            })
        }
    }, [slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage)
                navigate('/')
            }
        }).catch(err => console.error("Delete failed:", err))
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#1A2238] flex items-center justify-center">
                <div className="text-gray-300 text-xl animate-pulse">
                    Loading post...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#1A2238] text-gray-100 py-10 md:py-12">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Featured Image Card */}
                    <div className="mb-8 md:mb-10 overflow-hidden rounded-2xl border border-gray-700/40 shadow-2xl bg-[#242F4A]/60 backdrop-blur-sm">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.Title || "Post image"}
                           className="w-full h-auto max-h-[70vh] md:max-h-[75vh] object-cover rounded-2xl"
                               loading="lazy"
                        />
                    </div>

                    {/* Content Card */}
                    <div className="bg-[#242F4A]/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl overflow-hidden">
                        {/* Header / Title + Actions */}
                        <div className="px-6 pt-7 pb-5 border-b border-gray-700/60 bg-[#1E293B]/70">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-300">
                                    {post.Title}
                                </h1>

                                {isAuthor && (
                                    <div className="flex gap-3 self-start sm:self-center">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-md">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button 
                                            onClick={deletePost}
                                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-md"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="p-6 md:p-8 lg:p-10 prose prose-invert prose-headings:text-indigo-300 prose-a:text-indigo-400 max-w-none">
                            {post.Content ? parse(post.Content) : (
                                <p className="text-gray-400 italic">No content available</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Post