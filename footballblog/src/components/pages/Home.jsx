import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../Container/Container'
import UpcomingMatches from '../UpcomingMatches'
 

function Home() {
    const navigate = useNavigate()

    return (
        <div className="w-full min-h-screen bg-[#1A2238]">

            
            <div
                className="relative min-h-[80vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('/stadium.jpg')" }}
            >
                
                <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/50 to-[#1A2238]"></div>

                
                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                        The Ultimate <span className="text-[#1E73E8]">Football</span> Blog
                    </h1>

                    <p className="text-[#B8C1D1] mt-6 text-lg max-w-2xl mx-auto">
                        Match analysis, player stories, tactical breakdowns and everything football.
                    </p>

                    <button
                        onClick={() => navigate('/all-posts')}
                        className="mt-8 px-8 py-3 bg-[#1E73E8] hover:bg-[#1558B0] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                    >
                        Explore Posts
                    </button>
                </div>
            </div>

           
            <div className="py-20">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       
                        <div className="bg-[#111827]/50 p-8 rounded-2xl border border-gray-700 hover:border-[#1E73E8] transition-colors">
                            <div className="text-[#1E73E8] text-3xl mb-4">⚽</div>
                            <h3 className="text-xl font-bold text-white mb-2">Tactical Analysis</h3>
                            <p className="text-gray-400">Deep dives into formations, player roles, and managerial masterclasses.</p>
                        </div>

                       
                        <div className="bg-[#111827]/50 p-8 rounded-2xl border border-gray-700 hover:border-[#1E73E8] transition-colors">
                            <div className="text-[#1E73E8] text-3xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold text-white mb-2">Match Reports</h3>
                            <p className="text-gray-400">Instant reactions and comprehensive reports from the world's biggest leagues.</p>
                        </div>

                       
                        <div className="bg-[#111827]/50 p-8 rounded-2xl border border-gray-700 hover:border-[#1E73E8] transition-colors">
                            <div className="text-[#1E73E8] text-3xl mb-4">🔥</div>
                            <h3 className="text-xl font-bold text-white mb-2">Transfer News</h3>
                            <p className="text-gray-400">Stay updated with the latest rumors and confirmed deals across the globe.</p>
                        </div>
                    </div>
                </Container>
            </div>

                       <div className="py-20 bg-[#1A2238]">
                            <Container>
                            <UpcomingMatches />
                            </Container>
                       </div>

           
            <div className="py-20 bg-[#111827]/30">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between bg-linear-to-r from-[#1E73E8]/20 to-transparent p-10 rounded-3xl border border-[#1E73E8]/30">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Have a football story?</h2>
                            <p className="text-gray-300 mt-2">Join our community of writers and share your insights with the world.</p>
                        </div>
                        <button 
                            onClick={() => navigate('/add-post')}
                            className="mt-6 md:mt-0 px-8 py-3 bg-white text-[#1A2238] font-bold rounded-lg hover:bg-gray-200 transition-all"
                        >
                            Start Writing
                        </button>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Home



