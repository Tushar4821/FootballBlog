import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="bg-[#111827] border-b border-white/5 shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/">
            <Logo  />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-3">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 text-[#D1D5DB] font-medium rounded-md transition-all duration-300 hover:bg-[#1E73E8] hover:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </nav>

       {/* Overlay */}
<div
  className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
    menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
  onClick={() => setMenuOpen(false)}
></div>

{/* Slide Menu */}
<div
  className={`fixed top-0 right-0 h-full w-64 bg-[#0F172A] shadow-2xl transform transition-transform duration-300 z-50 ${
    menuOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex items-center justify-between p-5 border-b border-white/10">
    <span className="text-white font-bold text-lg">Menu</span>
    <button
      className="text-white text-xl"
      onClick={() => setMenuOpen(false)}
    >
      ✕
    </button>
  </div>

  <ul className="flex flex-col p-5 gap-3">
    {navItems.map((item) =>
      item.active ? (
        <li key={item.name}>
          <button
            onClick={() => {
              navigate(item.slug)
              setMenuOpen(false)
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-[#1E73E8] hover:text-white transition-all duration-300"
          >
            {item.name}
          </button>
        </li>
      ) : null
    )}

    {authStatus && (
      <li className="pt-3">
        <LogoutBtn />
      </li>
    )}
  </ul>
</div>
      </Container>
    </header>
  )
}

export default Header

