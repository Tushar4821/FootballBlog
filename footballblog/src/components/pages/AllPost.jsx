import React, { useState, useEffect } from "react";
import service from "../../appwrite/config";
import PostCard from "../PostCard";
import Container from "../Container/Container";
import stadiumbg from "../../assets/stadiumbg.jfif";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts && posts.documents) {
                setPosts(posts.documents);
            }
        }).catch((error) => {
            console.error("Appwrite service :: getPosts :: error", error);
        });
    }, []);

    
    const categories = [
        "All",
        ...new Set(posts.flatMap(post => post.categories || []))
    ];

    
    const filteredPosts = posts.filter((post) => {

        const matchesCategory =
            selectedCategory === "All" ||
            post.categories?.includes(selectedCategory);

        const matchesSearch =
            post.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.Content?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="relative w-full py-8 min-h-screen overflow-hidden">

            
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${stadiumbg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: '0.15'
                }}
            />

            
            <div className="absolute inset-0 z-10 bg-linear-to-b from-black/85 via-black/50 to-[#1A2238]"></div>

            <div className="relative z-20">
                <Container>

                    
                    <div className="mb-8 flex justify-center">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md px-4 py-2 rounded-full bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    
                    <div className="flex flex-wrap gap-3 mb-8 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                    selectedCategory === cat
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    
                  <div className="flex flex-wrap justify-center">
                   {filteredPosts.length > 0 ? (
                 filteredPosts.map((post) => (
                    <div
                      className="p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                       key={post.$id}
                     >
                <PostCard {...post} />
                   </div>
                  ))
    ) : (
            <div className="w-full text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
                No Posts Found
            </h2>
            <p className="text-gray-500">
                Try changing category or search keyword.
            </p>
            </div>
             )}
             </div>

                </Container>
            </div>
        </div>
    );
}

export default AllPost;
