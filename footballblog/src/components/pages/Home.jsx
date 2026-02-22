import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../Container/Container'
import UpcomingMatches from '../UpcomingMatches'
import { motion } from "framer-motion"
 

function Home() {
    const navigate = useNavigate()
    const fadeUp = {
     hidden: { opacity: 0, y: 40 },
      visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
  }
}

   const staggerContainer = {
     hidden: {},
     visible: {
     transition: {
      staggerChildren: 0.2
    }
  }
} 


    return (
        <div className="w-full min-h-screen bg-[#1A2238] overflow-x-hidden">

  {/* HERO SECTION */}
  <motion.div
  className="relative z-10 text-center max-w-4xl mx-auto"
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
>
  <motion.h1
    variants={fadeUp}
    className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mt-10"
  >
    The Ultimate <span className="text-[#1E73E8]">Football</span> Blog
  </motion.h1>

  <motion.p
    variants={fadeUp}
    className="text-[#B8C1D1] mt-4 sm:mt-6 text-base sm:text-lg max-w-2xl mx-auto"
  >
    Match analysis, player stories, tactical breakdowns and everything football.
  </motion.p>

  <motion.button
    variants={fadeUp}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => navigate('/all-posts')}
    className="mt-5 sm:mt-8 px-6 sm:px-8 py-3 bg-[#1E73E8] hover:bg-[#1558B0] text-white font-semibold rounded-lg shadow-lg"
  >
    Explore Posts
  </motion.button>
</motion.div>

  {/* FEATURES SECTION */}
  <div className="py-16 sm:py-20 mt-10">
    <Container>
      <motion.div
         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
           whileInView="visible"
            viewport={{ once: true }}
         >

       <motion.div
        variants={fadeUp}
       className="bg-[#111827]/50 p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-[#1E73E8] transition-colors"
         >
          <div className="text-[#1E73E8] text-3xl mb-4">⚽</div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Tactical Analysis
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Deep dives into formations, player roles, and managerial masterclasses.
          </p>
         </motion.div>

       <motion.div
         variants={fadeUp}
          className="bg-[#111827]/50 p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-[#1E73E8] transition-colors"
        >
          <div className="text-[#1E73E8] text-3xl mb-4">🏆</div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Match Reports
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Instant reactions and comprehensive reports from the world's biggest leagues.
          </p>
         </motion.div>

        <motion.div
        variants={fadeUp}
        className="bg-[#111827]/50 p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-[#1E73E8]     transition-colors"
       >
          <div className="text-[#1E73E8] text-3xl mb-4">🔥</div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Transfer News
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Stay updated with the latest rumors and confirmed deals across the globe.
          </p>
         </motion.div>

      </motion.div>
    </Container>
  </div>

  {/* UPCOMING MATCHES */}
  <div className="py-16 sm:py-20 bg-[#1A2238]">
    <Container>
      <UpcomingMatches />
    </Container>
  </div>

  {/* CTA SECTION */}
  <div className="py-16 sm:py-20 bg-[#111827]/30">
    <Container>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-linear-to-r from-[#1E73E8]/20 to-transparent p-6 sm:p-10 rounded-3xl border border-[#1E73E8]/30 text-center lg:text-left">

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Have a football story?
          </h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            Join our community of writers and share your insights with the world.
          </p>
        </div>

        <button 
          onClick={() => navigate('/add-post')}
          className="px-6 sm:px-8 py-3 bg-white text-[#1A2238] font-bold rounded-lg hover:bg-gray-200 transition-all"
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



